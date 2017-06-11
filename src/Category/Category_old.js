import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment} from 'semantic-ui-react';
import axios from 'axios';

import ModalEditCategory from './EditCategory.js';
import ModalNewCategory from './NewCategory.js';

import '../Accueil/olga.css';

class Category extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         categories: [],
    //         update : false
    //      }  
    // };

    state = {
        categories: [],
        family: {}
    };

    // componentWillMount() {
    //     this.getCategories();
    // }

    // componentDidUpdate() {
    //     if (this.state.update) {
    //         this.getCategories();
    //         this.setState({
    //             update: false
    //         })
    //     }
        
    // }

    getCategories() {
        const componentInstance = this;
        return axios.get('http://localhost:8080/api/categories')
            .then( (response) => {
                componentInstance.setState({
                    categories :response.data
                })
                console.log('Update categories :::');
            })
            .catch( (err => {
                console.log('failed to get categories :::', err);
            }))
    }

    test = (newUpdate) => {
        this.setState({
            update : newUpdate
        })
    }

    render() {

        return(
            <Container>  
                <Grid>                                     
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Segment raised>
                                <Label color='orange' ribbon><ModalNewCategory  test={this.test}/><ModalEditCategory /></Label>
                                <List celled verticalAlign='middle'> 
                                    { 
                                        this.state.categories.map(
                                            category =>                                                
                                                <Label as='a' tag color={category.color} key={category.id}>{category.name}</Label>                                                                    
                                            )
                                    }
                                     { 
                                        this.props.categories.map(
                                            (category, i) =>                                                                                                   
                                                <Label key={i} as='a' tag color={category.color} key={category.id}>{category.name}</Label>                                                                                         
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