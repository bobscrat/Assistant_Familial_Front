// Didier Olga
import React, {Component} from 'react';
import {Container, Grid, Icon} from 'semantic-ui-react';

import {loadCategories} from '../Category/libCategory.js';
import {loadMembers} from '../Member/libMember.js';
import {loadProjects} from '../Project/libProject.js';
import {loadEvents} from '../Event/libEvent.js';

import ModalNewEventIcon from '../Event/NewEventIcon.js';
import Category from '../Category/Category.js';
import Event from '../Event/Event.js';
import Member from '../Member/Member.js';
import Project from '../Project/Project.js';

import Header from './Header.js';
import Footer from './Footer.js';
import './olga.css';

class Home extends Component {

  state = {
    user: {},
    family: {},
    members: [],
    categories: [],
    projects: [],
    events: [],
    selectedCategoryId: 0,
    selectedMemberId: 0,
    selectedProjectId: 0
  };

  componentWillMount() {
    let user = this.props.user;
    let family = this.props.user.family;
    let categories = [];
    let members = [];
    let projects = [];
    let events = [];

    loadCategories(2 ,true)  // must replace 2 by family.id in prod
    .then((response) => {
      categories = response;
      console.log(response);
      return loadMembers(2, true);  // must replace 2 by family.id in prod
    })
    .then((response) => {
      members = response;
      console.log(response);
      return loadProjects(2, false);  // must replace 2 by family.id in prod
    })
    .then((response) => {
      projects = response;
      console.log(response);
      return loadEvents(2);  // must replace 2 by family.id in prod
    })
    .then((response) => {
      events = response;
      console.log(response);
      this.setState({user: user, family: family, categories: categories, members: members, projects: projects, events: events});
    })
    .catch((err => {
      console.log('failed to get Home data :::', err);
    }));
  }

  updateSelectedId = (name, id) => {
    // name = selectedCategoryId, selectedMemberId ou selectedProjectId
    this.setState({[name]: id});
  }

  reloadCategories = () => {
    loadCategories(this.state.family.id).then((response) => {
      this.setState({categories: response})
    });
  }
  reloadMembers = () => {
    loadMembers(this.state.family.id).then((response) => {
      this.setState({members: response})
    });
  }
  reloadProjects = () => {
    loadProjects(this.state.family.id).then((response) => {
      this.setState({projects: response})
    });
  }
  reloadEvents = () => {
    loadEvents(this.state.family.id, this.state.selectedMemberId, this.state.selectedCategoryId, this.state.selectedProjectId)
    .then((response) => {
      this.setState({events: response})
    });
  }

  render() {
    return (
      <Container>
        <Grid>

          <Grid.Row className='header'>
            <Grid.Column width={16}>
              <Header logoutUser={this.props.logoutUser} user={this.props.user}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className='part1'>
            <Grid.Column only='computer' width={2}>
              <div className="plus">
                {/* Modal New Event */}
                <ModalNewEventIcon/>
              </div>
            </Grid.Column>
            <Grid.Column only='tablet mobile' width={4}>
              <div className="plus">
                {/* Modal New Event */}
                <ModalNewEventIcon/>
              </div>
            </Grid.Column>
            <Grid.Column only='computer' width={2}>
              <div className="plus">
                {/* Modal Search */}
                <Icon link color='orange' size='huge' name='search'/>
              </div>
            </Grid.Column>
            <Grid.Column only='tablet mobile' tablet={4} mobile={3}>
              <div className="plus">
                {/* Modale Recherche */}
                <Icon link color='orange' size='huge' name='search'/>
              </div>
            </Grid.Column>
            <Grid.Column only='mobile' width={3}>
              <div className="plus">
                {/* Modale Sélection des Membres */}
                <Icon link color='orange' size='huge' name='users'/>
              </div>
            </Grid.Column>
            <Grid.Column only='tablet mobile' tablet={4} mobile={3}>
              <div className="plus">
                {/* Modale Sélection des Catégories */}
                <Icon link color='orange' size='huge' name='tag'/>
              </div>
            </Grid.Column>
            <Grid.Column only='tablet mobile' tablet={4} mobile={3}>
              <div className="plus">
                {/* Modale Sélection des Projets */}
                <Icon link color='orange' size='huge' name='folder'/>
              </div>
            </Grid.Column>

            <Grid.Column computer={12} only='computer'>
              {/* LES CATEGORIES */}
              <Category categories={this.state.categories} family={this.state.family} selectedId={this.state.selectedCategoryId} select={this.updateSelectedId} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column tablet={6} computer={4} only='tablet computer'>
              {/* LES MEMBRES */}
              <Member members={this.state.members} family={this.state.family} selectedId={this.state.selectedMemberId} select={this.updateSelectedId} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={10} computer={7}>
              {/* LES EVENEMENTS */}
              <Event events={this.state.events} family={this.state.family} />
            </Grid.Column>
            <Grid.Column width={5} only='computer'>
              {/* LES PROJETS */}
              <Project projects={this.state.projects} family={this.state.family} selectedId={this.state.selectedProjectId} select={this.updateSelectedId}
              rload={this.reloadProjects} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className='footer'>
            <Grid.Column>
              <Footer/>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Container>

    )
  }
};

export default Home;
