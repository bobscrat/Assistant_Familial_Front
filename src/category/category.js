import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment} from 'semantic-ui-react';
import axios from 'axios';

import ModalNewCategory from './newCategory.js';
import ModalEditCategory from './editCategory.js';

import '../accueil/olga.css';

class Category extends Component {

    componentWillMount() {
        this.state = {
            users: [],
            families: []
        };
        const componentInstance = this;

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
                <Grid>                                     
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Segment raised>
                                <Label color='orange' ribbon><ModalNewCategory /><ModalEditCategory /></Label>
                                <List celled verticalAlign='middle'> 
                                    { 
                                        this.state.families.map(
                                            family =>                                                
                                                <Label color='purple' tag><a className="lienCategorie" >{family.name}</a></Label>                            
                                            )
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

export default Category;