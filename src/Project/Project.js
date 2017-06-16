// Didier Olga
import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment, Icon} from 'semantic-ui-react';
import axios from 'axios';
import {addProjectAttributes} from '../Utils/utils.js';

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

  // add & edit modal
  saveProject = (project) => {
    const newProjects = this.props.projects;
    return axios.post('/api/projects', project).then((response) => {
      const project = response.data;
      addProjectAttributes(project);
      newProjects.push(project);
      // reload projects in Home's State, to sort them
      this.props.rload();
      return newProjects;
    }).catch((err) => {
    console.log('Failed to add project : ', err);
  })
}

// add & edit modal
updateProject = (project, index) => {
  const newProjects = this.props.projects;
  return axios.put('/api/projects', project).then((response) => {
    const project = response.data;
    newProjects[index].name = project.name;
    this.setState({projects: newProjects});
    // reload projects in Home's State, to sort them
    this.props.rload();
  }).catch((err) => {
    console.log('Failed to update project : ', err);
  })
}

render() {
  return (
    <Container >
      <Grid>
        <Grid.Row >
          <Grid.Column width={16}>
            <Segment raised className="project">
              <Label color='orange' ribbon>
                <ModalEditProject projects={this.props.projects} family={this.props.family} save={this.saveProject} update={this.updateProject}/>
              </Label>
              <List verticalAlign='middle'>
                {this.props.projects.map((project, i) => <List.Item key={i}>
                  {/* index = project's rank in the array, not his id */}
                  <ProjectItem index={i} name={project.name} activeFilter={project.activeFilter} click={this.handleClickSelect}  color={(project.activeFilter)?'orange':'grey'} />
                  </List.Item>
                )}
              </List>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>

  )
}
};

export default Project;
