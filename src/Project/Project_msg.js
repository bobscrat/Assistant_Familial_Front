// Didier Olga
import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment} from 'semantic-ui-react';
import axios from 'axios';

import ProjectItem from './ProjectItem.js';
import ModalEditProject from './ModalEditProject.js';

import './project.css'
import '../Home/olga.css';

class Project extends Component {

  state = {
    projects: [],
    family: {},
    msgError: ''
  };

  // select/unselect a project
  handleClickSelect = (index, bool, id) => {
    const newProjects = this.props.projects;
    let selectedId;
    // invert this project.active and unselect others
    for (let i = 0; i < newProjects.length; i++) {
      if (i === index) {
        newProjects[i].active = !bool;
      } else {
        newProjects[i].active = false;
      }
    }
    // if project wasn't selected before click, it is now
    if (!bool) {
      selectedId = id;
    } else {
      selectedId = 0;
    }
    // export selectedId to Home's State
    this.props.select('selectedProjectId', selectedId);
    this.setState({projects: newProjects});
  }

  load = () => {
    this.props.load();
  }

  render() {
    return (
      <Container >
        <Grid>
          <Grid.Row >
            <Grid.Column width={16}>
              <Segment raised className="project">
                <Label color='orange' ribbon>
                  <ModalEditProject projects={this.props.projects} family={this.props.family} load={this.load} />
                </Label>
                <List verticalAlign='middle'>
                {this.props.projects.map((project, i) => <List.Item key={i}>
                  {/* index = project's rank in the array, not his id */}
                  <ProjectItem index={i} name={project.name} active={project.active} catcolor={project.catcolor} click={this.handleClickSelect} save={this.saveProject} color={(project.active)?'orange':'grey'} />
                  </List.Item>)
                }
                < /List>
              </Segment >
            </Grid.Column>
          < /Grid.Row>
        </Grid >
      </Container>
    )
  }
};

export default Project;
