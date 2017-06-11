import axios from 'axios';

// *********************************           USER & FAMILY
// *********************************
export function loadUser(instance) {
  const user = {}; // à récupérer en props depuis le login
  instance.setState({user: user});
}

export function loadFamily(instance) {
  const family = {
    id: 2,
    name: 'Mouse'
  }; // à récupérer du user
  instance.setState({family: family});
}

// *********************************           CATEGORIES
// *********************************
export function addCategoryAttributes(category) {
  category.activefilter = false;
}

export function loadCategories(instance) {
  // axios.get('/api/categories').then((response) => {
  axios
    .get('http://localhost:8080/api/categories')
    .then((response) => {
      const categories = response.data;
      for (let i = 0; i < categories.length; i++) {
        this.addCategoryAttributes(categories[i]);
      }
      instance.setState({categories: categories});
    })
    .catch((err => {
      console.log('failed to get categories :::', err);
    }))
}

// *********************************           MEMBRES
// *********************************
export function addMemberAttributes(member) {
  member.activefilter = false;
}

export function loadMembers(instance) {
  // axios.get('/api/users').then((response) => {
  axios
    .get('http://localhost:8080/api/users')
    .then((response) => {
      const members = response.data;
      for (let i = 0; i < members.length; i++) {
        if (members[i].family.id == '2') {
          this.addMemberAttributes(members[i]);
          console.log('members : ' + members[i].firstName);
        }
        // this.addMemberAttributes(members[i]);
      }
      instance.setState({members: members});
    })
    .catch((err => {
      console.log('failed to get members :::', err);
    }))
}

// *********************************           PROJETS
// *********************************

export function addProjectAttributes(project) {
  project.activefilter = false;
  project.catcolor = 'orange'; // orange par défaut, voir à récupérer la couleur des catégories des events associés
}

export function loadProjects(instance) {
  // axios.get('/api/projects').then((response) => {
  axios
    .get('http://localhost:8080/api/projects')
    .then((response) => {
      const projects = response.data;
      for (let i = 0; i < projects.length; i++) {
        this.addProjectAttributes(projects[i]);
      }
      instance.setState({projects: projects});
    })
    .catch((err => {
      console.log('failed to get projects :::', err);
    }))
}
