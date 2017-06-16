// Olga
import React, {Component} from 'react';
import {Popup, Button, Form, Input, Grid, Modal, Icon, Container, Message} from 'semantic-ui-react';
import axios from 'axios';
import {addProjectAttributes} from '../Utils/utils.js';
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
      msgError: ''
    };

  show = () => () => {
    // reset state values
    this.setState({projects: this.props.projects, changes: [], addedProject: {}, family: this.props.family, isProjectAdded: false, msgError: null, open: true});
  }

  close = () => {
    this.setState({open: false});
  }

  validate = () => {
    let projects = this.state.projects;
    let changes = this.state.changes;
    let ok = [];
    // new project has been added
    if (this.state.isProjectAdded) {
      ok.push(this.saveProject(this.state.addedProject));
    }
    // projects have been updated
    for (let i=0; i<changes.length; i++) {
      if (changes[i]) {
        ok.push(this.updateProject(projects[i], i));
      }
    }
    console.log(ok);
    console.log("ok.indexOf('false')<0"+(ok.indexOf('false')<0));
    console.log('ok.indexOf("false")<0'+(ok.indexOf("false")<0));
    // no error
    // if (null === this.state.msgError) is a bad test because the state has not been updated yet
    // if (ok.indexOf('false')<0) {
    //   // reload projects in Home's State
    //   this.props.load();
    //   // close modal
    //   this.close();
    // }
  }

  saveProject = (project) => {
    const newProjects = this.props.projects;
    let ok = false;
    return axios.post('/api/projects', project).then((response) => {
      console.log(response);
      const project = response.data;
      addProjectAttributes(project);
      newProjects.push(project);
      this.setState({projects: newProjects, msgError: null});
      ok = true;
    }).catch((err) => {
      console.log('Failed to add project : ', err);
      this.setState({msgError: err.response.data.message});
    })
  }

  updateProject = (project, index) => {
    const newProjects = this.props.projects;
    let ok = false;
    axios.put('/api/projects', project).then((response) => {
      const project = response.data;
      newProjects[index].name = project.name;
      this.setState({projects: newProjects, msgError: null});
      ok = true;
    }).catch((err) => {
      console.log('Failed to update project : ', err);
      this.setState({msgError: err.response.data.message});
    })
    return ok;
  }

  // add project
  handleChangeAdd = (evt) => {
    let newProject = this.state.addedProject;
    if ('' !== evt.target.value) {
      newProject.name = evt.target.value;
      newProject.family = this.props.family;
      this.setState({addedProject: newProject, isProjectAdded: true});
    }
  }
  // update project
  handleChangeEdit = (evt, index) => {
    let newProjects = this.state.projects;
    let newChanges = this.state.changes;
    newProjects[index].name = evt.target.value;
    newChanges[index] = true;
    this.setState({projects: newProjects, changes: newChanges});
  }

  render() {
    const {open} = this.state;
    return (
      <div className='ribbonOrange'>
        Les projets
        <Popup trigger={<span><Icon link size='large' name='plus' onClick={
              this.show(true)} /><Icon link size='large' name='pencil' onClick={
                  this.show(true)} /></span>}>
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
            <Form error>
                <Form.Group>
                  <Container textAlign='center'>
                    <Input focus label='Nouveau projet' placeholder='Nom du nouveau projet' onChange={(evt) => this.handleChangeAdd(evt)} />
                  </Container>
                </Form.Group>

                <Message error content={this.state.msgError} />

                <Grid stackable doubling columns={3}>
                {/* index = project's rank in the array, not his id */}
                {this.state.projects.map(
                  (project, i) => <ModalEditProjectInput key={i} index={i} id={project.id} catcolor={project.catcolor} name={project.name} change={this.handleChangeEdit}/>
                )}
                </Grid>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color='orange' content='Annuler' onClick={this.close} />
            <Button positive content='Valider' onClick={this.validate} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalEditProject;
