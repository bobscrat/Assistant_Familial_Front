// Didier Olga
import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment} from 'semantic-ui-react';
import axios from 'axios';
import {addProjectAttributes} from '../Utils/utils.js';

import ProjectItem from './ProjectItem.js';
import ModalEditProject from './ModalEditProject.js';

import './project.css'
import '../Accueil/olga.css';

class Project extends Component {

  state = {
    projects: [],
    family: {}
  };

  handleClickSelect = (index, bool, id) => {
    const newProjects = this.props.projects;
    let selectedId;
    // inverse le booléen "active" pour ce "bouton" et désactive tous les autres
    for (let i = 0; i < newProjects.length; i++) {
      if (i === index) {
        newProjects[i].activefilter = !bool;
      } else {
        newProjects[i].activefilter = false;
      }
    }
    // si le projet n'était pas sélectionné avant le click, il le devient
    if (!bool) {selectedId = id;}
    else {selectedId = 0;}
    // exporte le selectedId dans le State de Accueil
    this.props.select('selectedProjectId', selectedId);
    this.setState({projects: newProjects});
  }

  // pour la modale d'édition
  saveProject = (project) => {
    const newProjects = this.props.projects;
    axios.post('/api/projects', project).then((response) => {
      const project = response.data;
      addProjectAttributes(project);
      newProjects.push(project);
      this.setState({projects: newProjects});
      // rechargement des projets dans le State de Accueil pour les trier correctement
      this.props.maj();
    }).catch((err) => {
    console.log('Failed to add project : ', err);
  })
}

// pour la modale d'édition
updateProject = (project, index) => {
  const newProjects = this.props.projects;
  axios.put('/api/projects', project).then((response) => {
    const project = response.data;
    newProjects[index].name = project.name;
    this.setState({projects: newProjects});
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
                  {/* index = place du projet dans le tableau, pas son id */}
                  <ProjectItem index={i} name={project.name} active={project.activefilter} catcolor={project.catcolor} click={this.handleClickSelect}  color={(project.activefilter)?'orange':'grey'} />
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
