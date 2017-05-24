import React, {Component} from 'react';
import {Popup, Button, Form, Input, Modal, Icon, Container} from 'semantic-ui-react';
import axios from 'axios';
import '../Accueil/olga.css';

import ProjectInput from './ProjectInput.js';

class ProjectModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      projects: this.props.projects,
      changes: []
    };
  }

  show = (dimmer) => () => this.setState({dimmer, open: true})
  close = () => this.setState({open: false})

  componentWillMount() {
    const componentInstance = this;
    // axios.get('/api/projects').then((response) => {
      const projects = this.props.projects;
      const newState = {
        projects: projects
      };
      // ajout des propriétés idName (=0name,1name,2name,etc) à la racine du State
      // pour pouvoir gérer les changements de chaque input "name"
      for (let i = 0; i < projects.length; i++) {
        const idName = projects[i].id + 'name';
        const value = projects[i].name;
        newState[idName] = value;
        // console.log('idName='+idName+', newState[idName]='+newState[idName]);
      }
      componentInstance.setState(newState);
    // }).catch((err) => {
    //   console.log('Failed to get projects : ', err);
    // })
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
    const {open, dimmer} = this.state

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
                {this.state.projects.map(project => <ProjectInput key={project.id} id={project.id} name={this.state[project.id + 'name']} change={this.handleChange}/>)
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
