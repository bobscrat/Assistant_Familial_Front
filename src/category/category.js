import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment} from 'semantic-ui-react';
import axios from 'axios';

import ModalEditCategory from './EditCategory.js';
import ModalNewCategory1 from './NewCategoryV1.js';

import '../Accueil/olga.css';

class Category extends Component {

    componentWillMount() {
        this.state = {
            categories: []
        };
        const componentInstance = this;

        axios.get('http://localhost:8080/api/categories')
        .then( (response) => {
            componentInstance.setState({
                categories :response.data
            })
        })
        .catch( (err => {
            console.log('failed to get categories :::', err);
        }))
    }
    render() {

        return(
            <Container>  
                <Grid>                                     
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Segment raised>
                                <Label color='orange' ribbon><ModalNewCategory1 /><ModalEditCategory /></Label>
                                <List celled verticalAlign='middle'> 
                                    { 
                                        this.state.categories.map(
                                            category =>                                                
                                                <Label as='a' tag color={category.color} key={category.id}>{category.name}</Label>                                                                    
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