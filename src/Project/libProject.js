//Olga
import axios from 'axios';

// load projects in Home
export function loadProjects(familyId, bool) {
  // bool = true : get all family's projects
  // bool = false : get only family's projects with active events
  let request = '/api/projects/filters?familyId=' + familyId;
  if (bool) {
    request += '&getInactive=' + bool;
  }
  return axios.get(request).then((response) => {
    const projects = response.data;
    for (let i = 0; i < projects.length; i++) {
      projects[i].activeFilter = false;
    }
    return projects;
  })
}

// add & edit modal
export function saveProject(project) {
  return axios.post('/api/projects', project).then((response) => {
    const newProject = response.data;
    newProject.activeFilter = false;
    return newProject;
  })
}

// add & edit modal
export function updateProject(project) {
  // need to keep the filter boolean
  const bool = project.activeFilter;
  return axios.put('/api/projects', project).then((response) => {
    const newProject = response.data;
    newProject.activeFilter = bool;
    return newProject;
  })
}
