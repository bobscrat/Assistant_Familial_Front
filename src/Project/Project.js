// Didier Olga
import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment, Message} from 'semantic-ui-react';

import ProjectItem from './ProjectItem.js';
import ModalEditProject from './ModalEditProject.js';

import './project.css'
import '../Home/olga.css';

class Project extends Component {

  state = {
    projects: [],
    family: {}
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
    if (!bool) {selectedId = id;}
    else {selectedId = 0;}
    // export selectedId to Home's State
    this.props.select('selectedProjectId', selectedId);
    this.setState({projects: newProjects});
  }

render() {
  return (
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
  )}
};

export default Project;
