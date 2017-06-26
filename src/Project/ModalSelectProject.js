// Olga
import React, {Component} from 'react';
import {Popup, Icon, Modal, Message, List, Button, Label, Container, Grid, Segment} from 'semantic-ui-react';

import ProjectItem from './ProjectItem.js';
import ModalEditProject from './ModalEditProject.js';

import './project.css'
import '../Home/olga.css';

class ModalSelectProject extends Component {

  state = {
    open: false,
    projects: [],
    selectedId: 0
  };

  // select/unselect a project
  handleClickSelect = (index, bool, id) => {
    const newProjects = this.props.projects;
    let selectedId;
    // invert this project.activeFilter and unselect others
    for (let i = 0; i < newProjects.length; i++) {
      if (i === index) {
        newProjects[i].activeFilter = !bool;
      } else {
        newProjects[i].activeFilter = false;
      }
    }
    // if project wasn't selected before click, it is now
    if (!bool) {
      selectedId = id;
    }
    this.setState({projects: newProjects, selectedId: selectedId});
  }

  validate = () => {
    // export selectedId to Home's State
    this.props.select('selectedProjectId', this.state.selectedId);
    this.close();
  }

  show = () => () => {
    this.setState({
        open: true,
        projects: this.props.projects,
        selectedId: this.props.selectedId
      });
  }

  close = () => {
    this.setState({open: false});
  }

  render() {
    const {open} = this.state;
    return (
      <div>
        <Popup trigger={< Icon link color='orange' size='huge' name='folder' onClick={this.show(true)} />}>
          <Popup.Header>Les projets</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous pouvez sélectionner un projet pour filtrer les évènements, ajouter ou modifier des projets.
          </Popup.Content>
        </Popup>

        <Modal dimmer open={open} onClose={this.close}>
          <Modal.Content>
          <Container>
            <Grid>
              <Grid.Row >
                <Grid.Column width={16}>
                  <Segment raised className="project">
                    <Label color='orange' ribbon>
                      <ModalEditProject family={this.props.family} rload={this.props.rload} />
                    </Label>
                    <Message color='orange' hidden={this.props.msgHidden}>
                      Aucun projet
                    </Message>
                    <List verticalAlign='middle'>
                      {this.props.projects.map((project, i) => <List.Item key={i}>
                        {/* index = project's rank in the array, not his id */}
                        <ProjectItem index={i} name={project.name} id={project.id} activeFilter={project.activeFilter} click={this.handleClickSelect}  color={(project.activeFilter)?'orange':'grey'} />
                        </List.Item>
                      )}
                    </List>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
          </Modal.Content>

          <Modal.Actions>
            <Button color='orange' content='Quitter' onClick={this.close} />
            <Button positive content='Valider' onClick={this.validate} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
};

export default ModalSelectProject;
