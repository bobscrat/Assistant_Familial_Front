import React, {Component} from 'react';
import {Container, Grid, Icon, Divider } from 'semantic-ui-react';
import axios from 'axios';

import ModalNewEvent from '../event/newEvent.js';

import Category from '../category/category.js'
import Event from '../event/event.js'
import Member from '../member/member.js'
import Project from '../project/project.js'
import Search from '../search/search.js'
import NameForm from '../search/test.js'
import Header from './header.js';
import './olga.css';

class Accueil extends Component {

    componentWillMount() {
        this.state = {
            users: [],
            families: []
        };
        const componentInstance = this;

        axios.get('http://localhost:8080/acdo/api/contact')
        .then( (response) => {
            componentInstance.setState({
                users :response.data
            })
        })
        .catch( (err => {
            console.log('failed to get users :::', err);
        }))

        axios.get('http://localhost:8080/acdo/api/family')
        .then( (response) => {
            componentInstance.setState({
                families :response.data
            })
        })
        .catch( (err => {
            console.log('failed to get families :::', err);
        }))
    }
    render() {

        return(
            <Container>
                 <Divider hidden />
                
                <Header />   
                <Grid>
                                     
                    <Grid.Row>
                        <Grid.Column width={4}>                            
                            <div className="plus">                                                    
                                <ModalNewEvent />
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
                        <Grid.Column only='tablet mobile' tablet={4} mobile={3}>
                            <div className="plus">
                                <Icon link color='orange' size='huge' name='search'/>
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
                    <Grid.Row>
                        <Grid.Column only='computer'>
                             {/* LES RECHERCHES */}
                            <Search />
                        </Grid.Column>
                    </Grid.Row>
                    {/*<Grid.Row>
                        <Grid.Column width={16} >
                            <div>test</div>
                            <NameForm />
                        </Grid.Column>
                    </Grid.Row>*/}
                </Grid>
                
            </Container>

        )
    }
};

export default Accueil;