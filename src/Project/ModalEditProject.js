// Olga
import React, {Component} from 'react';
import {Popup, Button, Form, Input, Grid, Modal, Icon, Container, Message} from 'semantic-ui-react';
import {loadProjects, saveProject, updateProject} from '../Project/libProject.js';
import '../Home/olga.css';

import ModalEditProjectInput from './ModalEditProjectInput.js';

class ModalEditProject extends Component {

  state = {
    open: false,
    projects: [],
    changes: [],
    addedProject: {},
    isProjectAdded: false,
    family: {},
    msgNoProjectHidden: true,
    msgSuccessHidden: true,
    msgSuccess: [],
    msgErrorHidden: true,
    msgError: []
    };

  show = () => () => {
    // true = all family's projects (with active events or not)
    loadProjects(this.props.family.id, true).then((response) => {
      let msgNoProjectHidden;
      if (response.length < 1) {
        msgNoProjectHidden = false;
      } else {
        msgNoProjectHidden = true;
      }
      // reset other state values
      this.setState({
        open: true,
        projects: response,
        family: this.props.family,
        msgNoProjectHidden: msgNoProjectHidden,
        changes: [],
        addedProject: {},
        value: '',
        isProjectAdded: false,
        msgSuccessHidden: true,
        msgSuccess: [],
        msgErrorHidden: true,
        msgError: []
      });
    }).catch((err) => {
      console.log('failed to load Projects :::', err);
    })
  }

  close = () => {
    this.setState({open: false});
    // reload projects in Home
    this.props.rload();
  }

  validate = () => {
    let projects = this.state.projects;
    let changes = this.state.changes;
    let newProject = this.state.addedProject;
    let isProjectAdded = this.state.isProjectAdded;
    let msgSuccess = [];
    let msgSuccessHidden = true;
    let msgError = [];
    let msgErrorHidden = true;
    // project added
    if (isProjectAdded) {
      saveProject(newProject).then((response) => {
        projects.push(response);
        msgSuccess.push(newProject.name + ' : Ajout effectué avec succès');
        msgSuccessHidden = false;
        this.setState({projects: projects, msgSuccessHidden: msgSuccessHidden, msgSuccess: msgSuccess, addedProject: {}, isProjectAdded: false, value: ''});
      }).catch((err) => {
        console.log('Failed to add project : ', err);
        msgError.push(newProject.name + ' : ' + err.response.data.message);
        msgErrorHidden = false;
        this.setState({msgErrorHidden: msgErrorHidden, msgError: msgError});
      })
    }
    // project(s) updated
    for (let i = 0; i < changes.length; i++) {
      if (changes[i]) {
        updateProject(projects[i], i).then((response) => {
          projects[i].name = response.name;
          msgSuccess.push(projects[i].name + ' : Modification effectuée avec succès');
          msgSuccessHidden = false;
          this.setState({projects: projects, msgSuccessHidden: msgSuccessHidden, msgSuccess: msgSuccess});
        }).catch((err) => {
          console.log('Failed to update project : ', err);
          msgError.push(projects[i].name + ' : ' + err.response.data.message);
          msgErrorHidden = false;
          this.setState({msgErrorHidden: msgErrorHidden, msgError: msgError});
        })
      }
    }
  }

  // add project
  handleChangeAdd = (evt) => {
    let newProject = this.state.addedProject;
    if ('' !== evt.target.value) {
      newProject.name = evt.target.value;
      newProject.family = this.props.family;
      this.setState({addedProject: newProject, isProjectAdded: true, value: evt.target.value});
    }
  }
  // update project
  handleChangeEdit = (evt, index) => {
    let newProjects = this.state.projects;
    let newChanges = this.state.changes;
    newProjects[index].name = evt.target.value;
    newChanges[index] = true;
    this.setState({projects: newProjects, changes: newChanges})
  }

  render() {
    const {open} = this.state;
    return (
      <div className='ribbonOrange'>
        Les projets
        <Popup trigger={
            <span><Icon link size='large' name='pencil' onClick={this.show(true)} /></span>
          }>
          <Popup.Header>Ajouter ou modifier un projet</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous créez ou modifiez vos projets.
          </Popup.Content>
        </Popup>

        <Modal dimmer open={open} onClose={this.close}>
          <Modal.Header>
            <Icon name='folder' color='orange' />
            Ajouter ou modifier un projet
          </Modal.Header>

          <Modal.Content>
            <Form success error>
                <Form.Group>
                  <Container textAlign='center'>
                    <Input focus label='Nouveau projet' placeholder='Nom du nouveau projet' value={this.state.value} onChange={(evt) => this.handleChangeAdd(evt)} />
                  </Container>
                </Form.Group>

                <Message color='orange' hidden={this.state.msgNoProjectHidden}>
                  Aucun projet dans votre famille
                </Message>

                <Message success hidden={this.state.msgSuccessHidden} list={this.state.msgSuccess} />

                <Message error hidden={this.state.msgErrorHidden} list={this.state.msgError} />

                <Grid stackable doubling columns={3}>
                {/* index = project's rank in the array, not his id */}
                {
                  this.state.projects.map((project, i) => <ModalEditProjectInput key={i} index={i} id={project.id} catcolor={project.catcolor} name={project.name} change={this.handleChangeEdit}/>)
                }
                </Grid>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color='orange' content='Quitter' onClick={this.close} />
            <Button positive content='Valider' onClick={this.validate} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalEditProject;
