//Olga
import axios from 'axios';

// *********************************
//           CATEGORIES
// *********************************

// export function loadCategories(familyId, bool) {
export function loadCategories(familyId) {
  // bool = true = get family's categories and predefined categories
  // bool = false = get only family's categories
  // const request = '/api/categories/filters?familyId=' + familyId + '&getPredefined=' + bool;
  const request = '/api/categories';
  //const request = '/api/categories/filters?familyId='+familyId;
  return axios.get(request).then((response) => {
    const categories = response.data;
    for (let i = 0; i < categories.length; i++) {
      categories[i].activeFilter = false;
    }
    return categories;
  }).catch((err => {
    console.log('failed to get categories :::', err);
  }))
}

export function saveCategory(category) {
  return axios.post('/api/categories', category).then((response) => {
    const newCategory = response.data;
    newCategory.activeFilter = false;
    return newCategory;
  }).catch((err) => {
  console.log('Failed to add category : ', err);
  })
}

export function updateCategory(category) {
  // need to keep the filter boolean
  const bool = category.activeFilter;
  return axios.put('/api/categories', category).then((response) => {
    const newCategory = response.data;
    newCategory.activeFilter = bool;
    return newCategory;
  }).catch((err) => {
    console.log('Failed to update category : ', err);
  })
}

// *********************************
//           MEMBRES
// *********************************

export function loadMembers(familyId) {
  // const request = '/api/users/filters?familyId='+familyId;
  const request = '/api/users';
  return axios.get(request).then((response) => {
    const members = response.data;
    for (let i = 0; i < members.length; i++) {
      members[i].activeFilter = false;
    }
    return members;
  }).catch((err => {
    console.log('failed to get members :::', err);
  }))
}

export function saveMember(member) {
  return axios.post('/api/users', member).then((response) => {
    const newMember = response.data;
    newMember.activeFilter = false;
    return newMember;
  }).catch((err) => {
  console.log('Failed to add project : ', err);
  })
}

export function updateMember(member) {
  // need to keep the filter boolean
  const bool = member.activeFilter;
  return axios.put('/api/users', member).then((response) => {
    const newMember = response.data;
    newMember.activeFilter = bool;
    return newMember;
  }).catch((err) => {
    console.log('Failed to update project : ', err);
  })
}

// *********************************
//           PROJETS
// *********************************

export function loadProjects(familyId) {
  const request = '/api/projects/filters?familyId=' + familyId;
  return axios.get(request).then((response) => {
    const projects = response.data;
    for (let i = 0; i < projects.length; i++) {
      projects[i].activeFilter = false;
    }
    return projects;
  }).catch((err => {
    console.log('failed to get projects :::', err);
  }))
}

export function saveProject(project) {
  return axios.post('/api/projects', project).then((response) => {
    const newProject = response.data;
    newProject.activeFilter = false;
    return newProject;
  }).catch((err) => {
  console.log('Failed to add project : ', err);
  })
}

export function updateProject(project) {
  // need to keep the filter boolean
  const bool = project.activeFilter;
  return axios.put('/api/projects', project).then((response) => {
    const newProject = response.data;
    newProject.activeFilter = bool;
    return newProject;
  }).catch((err) => {
    console.log('Failed to update project : ', err);
  })
}

// *********************************
//           PRIORITIES
// *********************************

export function loadPriorities() {
  return axios.get('/api/priorities').then((response) => {
    return response.data;
  }).catch((err => {
    console.log('failed to get priorities :::', err);
  }))
}

// *********************************
//           PERIODICITIES
// *********************************

export function loadPeriodicities() {
  return axios.get('/api/periodicities').then((response) => {
    return response.data;
  }).catch((err => {
    console.log('failed to get periodicities :::', err);
  }))
}

// *********************************
//           CONTACTS
// *********************************

export function loadContacts() {
  return axios.get('/api/contacts').then((response) => {
    return response.data;
  }).catch((err => {
    console.log('failed to get contacts :::', err);
  }))
}
