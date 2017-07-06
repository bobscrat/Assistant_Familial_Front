import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment} from 'semantic-ui-react';

import ModalNewCategory from './ModalNewCategory.js';
import CategoryItem from './CategoryItem.js';

import '../Home/olga.css';

class Category extends Component {

    state = {
        categories: [],
        family: {}
    };

    // select/unselect a project
  handleClickSelect = (index, bool, id) => {
    const newCategories = this.props.categories;
    let selectedId;
    // invert this project.activeFilter and unselect others
    for (let i = 0; i < newCategories.length; i++) {
      if (i === index) {
        newCategories[i].activeFilter = !bool;
      } else {
        newCategories[i].activeFilter = false;
      }
    }
    // if project wasn't selected before click, it is now
    if (!bool) {selectedId = id;}
    else {selectedId = 0;}
    // export selectedId to Home's State
    this.props.select('selectedCategoryId', selectedId);
    this.setState({categories: newCategories});
  }

    render() {

        return(
            <Container>  
                <Grid>                                     
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Segment raised>
                                <Label color='orange' ribbon>Les catégories
                                    <ModalNewCategory   
                                        categories={this.props.categories} 
                                        family={this.props.family} 
                                        rload={this.props.rload}
                                    />
                                </Label>
                                <List celled verticalAlign='middle'> 
                                    {this.props.categories.map((category, i) => 
                                        <CategoryItem 
                                            key={i} index={i} name={category.name} id={category.id} 
                                            color={category.color} activeFilter={category.activeFilter} 
                                            //size={(category.activeFilter)?'large':'medium'}
                                            click={this.handleClickSelect}   
                                        />
                                    )}
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