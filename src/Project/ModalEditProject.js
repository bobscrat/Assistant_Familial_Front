// Olga
import React, {Component} from 'react';
import {Popup, Button, Form, Input, Grid, Modal, Icon, Container} from 'semantic-ui-react';
import '../Accueil/olga.css';

import ModalEditProjectInput from './ModalEditProjectInput.js';

class ModalEditProject extends Component {

  state = {
      open: false,
      projects: [],
      changes: [],
      addedProject: {},
      isProjectAdded: false,
      family: {}
    };

  show = () => () => {
    // reset des valeurs
    this.setState({projects: this.props.projects, changes: [], addedProject: {}, family: this.props.family, isProjectAdded: false, open: true});
  }

  close = () => {
    this.setState({open: false});
  }

  validate = () => {
    let projects = this.state.projects;
    let changes = this.state.changes;
    let newProject = this.state.addedProject;
    let isProjectAdded = this.state.isProjectAdded;
    // ajout
    if (isProjectAdded) {
      this.props.save(newProject);
    }
    // modifications
    for (let i=0; i<changes.length; i++) {
      if (changes[i]) {
        this.props.update(projects[i], i);
      }
    }
    this.close();
  }

  // ajout
  handleChangeAdd = (evt) => {
    let newProject = this.state.addedProject;
    if ('' !== evt.target.value) {
      newProject.name = evt.target.value;
      newProject.family = this.props.family;
      this.setState({addedProject: newProject, isProjectAdded: true});
    }
  }
  // modification
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
            <Form>
                <Form.Group>
                  <Container textAlign='center'>
                    <Input focus label='Nouveau projet' placeholder='Nom du nouveau projet' onChange={(evt) => this.handleChangeAdd(evt)} />
                  </Container>
                </Form.Group>

                <Grid stackable doubling columns={3}>
                {/* index = place du projet dans le tableau, pas son id */}
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
