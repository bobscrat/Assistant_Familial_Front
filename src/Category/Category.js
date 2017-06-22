import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment} from 'semantic-ui-react';

import ModalNewCategory from './NewCategory.js';

import '../Home/olga.css';

class Category extends Component {

    state = {
        categories: [],
        family: {}
    };

    render() {

        return(
            <Container>  
                <Grid>                                     
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Segment raised>
                                <Label color='orange' ribbon><ModalNewCategory  categories={this.props.categories}/></Label>
                                <List celled verticalAlign='middle'> 
                                    { 
                                        this.props.categories.map(
                                            category =>                                                
                                                <Label tag as='a' style={{"backgroundColor" : category.color, "color" : "#ffffff"}} key={category.id}>{category.name}</Label>                                                                    
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