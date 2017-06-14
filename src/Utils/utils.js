//Olga
import axios from 'axios';

// *********************************
//           CATEGORIES
// *********************************
export function addCategoryAttributes(category) {
  category.activeFilter = false;
}

// export function loadCategories(instance, familyId, bool) {
export function loadCategories(instance, familyId) {
  // bool = true = get family's categories and predefined categories
  // bool = false = get only family's categories
  // const request = '/api/categories/filters?familyId='+familyId+'&getPredefined='+bool;
  // const request = '/api/categories';
  const request = '/api/categories/filters?familyId='+familyId;
  axios.get(request).then((response) => {
    const categories = response.data;
    for (let i = 0; i < categories.length; i++) {
      this.addCategoryAttributes(categories[i]);
    }
    instance.setState({categories: categories});
  }).catch((err => {
    console.log('failed to get categories :::', err);
  }))
}

// *********************************
//           MEMBRES
// *********************************
export function addMemberAttributes(member) {
  member.activeFilter = false;
}

export function loadMembers(instance, familyId) {
  // const request = '/api/users/filters?familyId='+familyId;
  const request = '/api/users';
  axios.get(request).then((response) => {
    const members = response.data;
    for (let i = 0; i < members.length; i++) {
      this.addMemberAttributes(members[i]);
    }
    instance.setState({members: members});
  }).catch((err => {
    console.log('failed to get members :::', err);
  }))
}

// *********************************
//           PROJETS
// *********************************

export function addProjectAttributes(project) {
  project.activeFilter = false;
  project.catcolor = 'orange'; // orange by default, will get category color ?
}

export function loadProjects(instance, familyId) {
  const request = '/api/projects/filters?familyId=' + familyId;
  axios.get(request).then((response) => {
    const projects = response.data;
    for (let i = 0; i < projects.length; i++) {
      this.addProjectAttributes(projects[i]);
    }
    instance.setState({projects: projects});
  }).catch((err => {
    console.log('failed to get projects :::', err);
  }))
}

// *********************************
//           PRIORITIES
// *********************************

export function loadPriorities(instance) {
  axios.get('/api/priorities').then((response) => {
    const priorities = response.data;
    instance.setState({priorities: priorities});
  }).catch((err => {
    console.log('failed to get priorities :::', err);
  }))
}

// *********************************
//           PERIODICITIES
// *********************************

export function loadPeriodicities(instance) {
  axios.get('/api/periodicities').then((response) => {
    const periodicities = response.data;
    instance.setState({periodicities: periodicities});
  }).catch((err => {
    console.log('failed to get periodicities :::', err);
  }))
}

// *********************************
//           CONTACTS
// *********************************

export function loadContacts(instance) {
  axios.get('/api/contacts').then((response) => {
    const contacts = response.data;
    instance.setState({contacts: contacts});
  }).catch((err => {
    console.log('failed to get contacts :::', err);
  }))
}