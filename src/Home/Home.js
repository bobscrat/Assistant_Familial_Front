// Didier Olga
import React, {Component} from 'react';
import {Container, Grid, Icon} from 'semantic-ui-react';
import * as utils from '../Utils/utils.js';

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
    selectedCategoryId: 0,
    selectedMemberId: 0,
    selectedProjectId: 0
  };

  componentWillMount() {
    let user = this.props.user;
    let family = this.props.user.family;
    this.setState({user: user, family: family});
    //utils.loadCategories(this, family.id, true); // =this.setState({categories: categories})
    //utils.loadCategories(this, family.id); // =this.setState({categories: categories})
    utils.loadCategories(this, 2);
    //utils.loadMembers(this, family.id); // =this.setState({members: members})
    utils.loadMembers(this, 2);
    //utils.loadProjects(this, family.id); // =this.setState({projects: projects})
    utils.loadProjects(this, 2);
  }

  updateSelectedId = (name, id) => {
    // name = selectedCategoryId, selectedMemberId ou selectedProjectId
    this.setState({[name]: id});
  }

  reloadCategories = () => {utils.loadCategories(this, this.state.family.id);}
  reloadMembers = () => {utils.loadMembers(this, this.state.family.id);}
  reloadProjects = () => {utils.loadProjects(this, this.state.family.id);}

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
                {/* Modale Nouvel Evénement */}
                <ModalNewEventIcon/>
              </div>
            </Grid.Column>
            <Grid.Column only='tablet mobile' width={4}>
              <div className="plus">
                {/* Modale Nouvel Evénement */}
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
