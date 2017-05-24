// Olga
import React, {Component} from 'react';
import {Popup, Button, Form, Input, Modal, Icon, Container} from 'semantic-ui-react';
import axios from 'axios';
import '../Accueil/olga.css';

import ProjectInput from './ProjectInput.js';

class ProjectModal extends Component {

  state = {
      open: false,
      projects: [],
      changes: []
    };

  show = (dimmer) => () => this.setState({dimmer, open: true, projects: this.props.projects})
  close = () => this.setState({open: false})

  initProjects = () => {
    const projects = this.props.projects;
    for (let i = 0; i < projects.length; i++) {
      const idName = projects[i].id + 'name';
      const value = projects[i].name;

      // console.log('idName='+idName+', newState[idName]='+newState[idName]);
    }
    return projects;
  }

  updateProject = (project) => {
    const componentInstance = this;
    axios.put('/api/projects', project).then((response) => {
      if (null != response.data.msgError) {
        componentInstance.setState({msgError: response.data.msgError, msgSuccess: null});
      } else {
        componentInstance.setState({msgSuccess: "Modification réussie !", msgError: null});
      }
    }).catch((err) => {
      console.log('Failed to update project : ', err);
    })
  }

  editProject = (projectId, projectName) => {
    // console.log('editing : ' + projectId + ' ' + projectName);
    this.setState({name: projectName});
    this.updateproject({id: projectId, name: projectName});
  }

  handleChange = (evt, id) => {
    let idName = id + 'name';
    let newName = evt.target.value;
    // modification de la propriété idName (=0name,1name,2name, etc) du State
    // et reset des messages
    this.setState({[idName]: newName, msgSuccess: null, msgError: null});
  }

  render() {
    const {open, dimmer} = this.state;
    console.log(this.state.projects);

    return (
      <div className='ribbonOrange'>
        Les projets
        <Popup trigger={<Icon link size='large' name='pencil' onClick={
            this.show(true)} />}>
          {/*<Popup trigger={<Button color='orange' onClick={this.show(false)}>None</Button>}>*/}
          <Popup.Header>Ajouter ou modifier un projet</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous créez ou modifiez vos projets.
          </Popup.Content>
        </Popup>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>
            <Icon name='folder' color='orange' />
            Ajouter ou modifier un projet
          </Modal.Header>
          <Modal.Content>

            <Modal.Description>
              <Form>
                <Form.Group>
                <Container textAlign='center'>
                  <Input label='Nouveau' color='orange' placeholder='Nom du nouveau projet' focus />
                  </Container>
                </Form.Group>
                <Form.Group inline>
                {/* chaque name = valeur des propriétés 0name,1name,2name du State */}
                {this.state.projects.map(project => <ProjectInput key={project.id} id={project.id} name={project.name} change={this.handleChange}/>)
                }
                </Form.Group>
              </Form>

            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='orange' onClick={this.close}>
              Annuler
            </Button>
            <Button positive onClick={this.close}>
              Valider
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ProjectModal;
