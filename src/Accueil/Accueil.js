import React, {Component} from 'react';
import {Container, Grid, Icon } from 'semantic-ui-react';

import ModalNewEvent from '../Event/NewEvent.js';

import Category from '../Category/Category.js'
import Event from '../Event/Event.js'
import Member from '../User/User.js'
import Project from '../Project/Project.js'

import Header from './Header.js';
import Footer from './Footer.js';
import './olga.css';


class Accueil extends Component {

    render() {

        return(
            <Container>
                <Grid>                                     
                    <Grid.Row className='header'>
                        <Grid.Column width={16}> 
                            <Header logoutUser={this.props.logoutUser}/>   
                        </Grid.Column>
                    </Grid.Row>                    
                    <Grid.Row className='part1'>
                        <Grid.Column only='computer' width={2}>                            
                            <div className="plus">                                                    
                                <ModalNewEvent />
                            </div>
                        </Grid.Column>
                        <Grid.Column only='tablet mobile' width={4}>                            
                            <div className="plus">                                                    
                                <ModalNewEvent />
                            </div>
                        </Grid.Column>
                        <Grid.Column only='computer' width={2}>                            
                            <div className="plus">                                                    
                                <Icon link color='orange' size='huge' name='search'/>
                            </div>
                        </Grid.Column>
                        <Grid.Column only='tablet mobile' tablet={4} mobile={3}>
                            <div className="plus">
                                <Icon link color='orange' size='huge' name='search'/>
                            </div>
                        </Grid.Column>
                        <Grid.Column only='mobile' width={3}>
                            <div className="plus">
                                <Icon link color='orange' size='huge' name='users'/>
                            </div>
                        </Grid.Column>
                        <Grid.Column only='tablet mobile' tablet={4} mobile={3}>
                            <div className="plus">
                                <Icon link color='orange' size='huge' name='tag'/>
                            </div>
                        </Grid.Column>
                         <Grid.Column only='tablet mobile' tablet={4} mobile={3}>
                            <div className="plus">
                                <Icon link color='orange' size='huge' name='folder'/>
                            </div>
                        </Grid.Column>
                       
                        
                        <Grid.Column computer={12} only='computer'>
                            {/* LES CATEGORIES */}
                            <Category />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column tablet={6} computer={4} only='tablet computer'>
                             {/* LES MEMBRES */}
                            <Member />
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={10} computer={7}>
                             {/* LES EVENEMENTS */}
                            <Event />
                        </Grid.Column>
                        <Grid.Column width={5} only='computer'>
                             {/* LES PROJETS */}
                            <Project />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row  className='footer'>
                        <Grid.Column>                                                         
                            <Footer />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
            </Container>

        )
    }
};

export default Accueil;