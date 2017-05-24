import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment} from 'semantic-ui-react';
import axios from 'axios';

import ProjectButton from './ProjectButton.js';
import ProjectModal from './ProjectModal.js';

import './project.css'
import '../Accueil/olga.css';

class Project extends Component {

  componentWillMount() {
    this.state = {
      projects: []
    };
    const componentInstance = this;

    axios.get('/api/projects').then((response) => {
      const projects = response.data;
      for (let i=0; i<projects.length; i++) {
        projects[i].active = false;
        projects[i].iconcolor = 'orange'; // orange par défaut, voir à récupérer la couleur des catégories des events associés
      }
      componentInstance.setState({projects: projects})
    }).catch((err => {
      console.log('failed to get projects :::', err);
    }))
  }

  handleClick = (Id, Active) => {
    const newProjects = this.state.projects;
    // recherche la position du projet correspondant à Id dans le tableau
    // data.findIndex(function(obj) { return obj[property] === value; })
    // équivalent à data.findIndex(obj => obj[property] === value)
    const index = newProjects.findIndex(obj => obj.id === Id);
    // inverse le booléen "active" pour ce projet et désactive tous les autres projets
    for (let i=0; i<newProjects.length; i++) {
      if (i === index) {newProjects[i].active = !Active;}
      else {newProjects[i].active = false;}
    }
    this.setState({projects: newProjects});
  }

  render() {
    return (
      <Container >
        <Grid>
          <Grid.Row >
            <Grid.Column width={16}>
              <Segment raised className="project">
                <Label color='orange' ribbon>
                  <ProjectModal projects={this.state.projects}/>
                </Label>
                <List verticalAlign='middle'>
                  {this.state.projects.map(project =>
                    <List.Item key={project.id}>
                     <ProjectButton id={project.id} name={project.name} click={this.handleClick} active={project.active} color={(project.active)?'orange':'grey'}
                     iconcolor={project.iconcolor} />
                    </List.Item>)
                    }
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
