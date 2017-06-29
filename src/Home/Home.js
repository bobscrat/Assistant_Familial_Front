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
import ModalSelectProject from '../Project/ModalSelectProject.js';

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
    selectedProjectId: 0,
    msgNoProjectHidden: true,
    msgNoEventHidden: true
  };

  componentWillMount() {
    let user = this.props.user;
    // let family = this.props.user.family;
    let family = {id: 2, name: "Team ACDO"};
    let categories = [];
    let members = [];
    let projects = [];
    let events = [];
    let msgNoProjectHidden = true;
    let msgNoEventHidden = true;

    loadCategories(family.id, true)
    .then((response) => {
      categories = response;
      return loadMembers(family.id, true);
    }).then((response) => {
      members = response;
      return loadProjects(family.id, false);
    }).then((response) => {
      projects = response;
      if (projects.length < 1) {msgNoProjectHidden = false;}
      else {msgNoProjectHidden = true;}
      return loadEvents(family.id, this.state.selectedMemberId, this.state.selectedCategoryId, this.state.selectedProjectId);
    }).then((response) => {
      events = response;
      if (events.length < 1) {msgNoEventHidden = false;}
      else {msgNoEventHidden = true;}
      this.setState({
        user: user,
        family: family,
        categories: categories,
        members: members,
        projects: projects,
        events: events,
        msgNoProjectHidden: msgNoProjectHidden,
        msgNoEventHidden: msgNoEventHidden
      });
    }).catch((err) => {
      console.log('failed to get Home data :::', err);
    })
  }

  updateSelectedId = (name, id) => {
    switch (name) {
      case "selectedMemberId":
        loadEvents(this.state.family.id, id, this.state.selectedCategoryId, this.state.selectedProjectId)
        .then((response) => {
          let msgNoEventHidden;
          if (response.length < 1) {msgNoEventHidden = false;}
          else {msgNoEventHidden = true;}
          this.setState({events: response, selectedMemberId: id, msgNoEventHidden: msgNoEventHidden});
        })
        .catch((err) => {
          console.log('failed to get Events :::', err);
        })
        break;
      case "selectedCategoryId":
        loadEvents(this.state.family.id, this.state.selectedMemberId, id, this.state.selectedProjectId).then((response) => {
          let msgNoEventHidden;
          if (response.length < 1) {msgNoEventHidden = false;}
          else {msgNoEventHidden = true;}
          this.setState({events: response, selectedCategoryId: id, msgNoEventHidden: msgNoEventHidden});
        })
        .catch((err) => {
          console.log('failed to get Events :::', err);
        })
        break;
      case "selectedProjectId":
        loadEvents(this.state.family.id, this.state.selectedMemberId, this.state.selectedCategoryId, id).then((response) => {
          let msgNoEventHidden;
          if (response.length < 1) {msgNoEventHidden = false;}
          else {msgNoEventHidden = true;}
          this.setState({events: response, selectedProjectId: id, msgNoEventHidden: msgNoEventHidden});
        })
        .catch((err) => {
          console.log('failed to get Events :::', err);
        })
        break;
      default:
        loadEvents(this.state.family.id, this.state.selectedMemberId, this.state.selectedCategoryId, this.state.selectedProjectId)
        .then((response) => {
          let msgNoEventHidden;
          if (response.length < 1) {msgNoEventHidden = false;}
          else {msgNoEventHidden = true;}
          this.setState({events: response, msgNoEventHidden: msgNoEventHidden})
        })
        .catch((err) => {
          console.log('failed to get Events :::', err);
        })
    }
  }

  reloadCategories = () => {
    loadCategories(this.state.family.id, true).then((response) => {
      this.setState({categories: response})
    })
    .catch((err) => {
      console.log('failed to get Categories :::', err);
    })
  }
  reloadMembers = () => {
    loadMembers(this.state.family.id, true).then((response) => {
      this.setState({members: response})
    })
    .catch((err) => {
      console.log('failed to get Members :::', err);
    })
  }
  reloadProjects = () => {
    loadProjects(this.state.family.id, false).then((response) => {
      let msgNoProjectHidden;
      if (response.length < 1) {msgNoProjectHidden = false;}
      else {msgNoProjectHidden = true;}
      this.setState({projects: response, msgNoProjectHidden: msgNoProjectHidden})
    })
    .catch((err) => {
      console.log('failed to get Projects :::', err);
    })
  }
  reloadEvents = () => {
    loadEvents(this.state.family.id, this.state.selectedMemberId, this.state.selectedCategoryId, this.state.selectedProjectId).then((response) => {
      let msgNoEventHidden;
      if (response.length < 1) {msgNoEventHidden = false;}
      else {msgNoEventHidden = true;}
      this.setState({events: response, msgNoEventHidden: msgNoEventHidden})
    })
    .catch((err) => {
      console.log('failed to get Events :::', err);
    })
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
                {/* Modale Recherche */}
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
                <ModalSelectProject projects={this.state.projects} family={this.state.family} selectedId={this.state.selectedProjectId} select={this.updateSelectedId} rload={this.reloadProjects} msgHidden={this.state.msgNoProjectHidden} />
              </div>
            </Grid.Column>

            <Grid.Column computer={12} only='computer'>
              {/* LES CATEGORIES */}
              <Category categories={this.state.categories} family={this.state.family} selectedId={this.state.selectedCategoryId} select={this.updateSelectedId}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column tablet={6} computer={4} only='tablet computer'>
              {/* LES MEMBRES */}
              <Member members={this.state.members} family={this.state.family} selectedId={this.state.selectedMemberId} select={this.updateSelectedId}/>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={10} computer={7}>
              {/* LES EVENEMENTS */}
              <Event events={this.state.events} family={this.state.family} msgHidden={this.state.msgNoEventHidden} />
            </Grid.Column>
            <Grid.Column width={5} only='computer'>
              {/* LES PROJETS */}
              <Project projects={this.state.projects} family={this.state.family} selectedId={this.state.selectedProjectId} select={this.updateSelectedId} rload={this.reloadProjects} msgHidden={this.state.msgNoProjectHidden} />
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
