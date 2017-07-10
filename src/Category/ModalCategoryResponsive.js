import React, {Component} from 'react';
import {Popup, Icon, Modal, List, Button, Label, Container, Grid, Segment} from 'semantic-ui-react';

import CategoryItem from './CategoryItem.js';
import ModalNewCategory from './ModalNewCategory.js';

import '../Home/olga.css';

class ModalCategoryResponsive extends Component {

  state = {
    open: false,
    categories: [],
    selectedId: 0
  };

  // select/unselect a category
  handleClickSelect = (index, bool, id) => {
    const newCategorys = this.props.categories;
    let selectedId;
    // invert this category.activeFilter and unselect others
    for (let i = 0; i < newCategorys.length; i++) {
      if (i === index) {
        newCategorys[i].activeFilter = !bool;
      } else {
        newCategorys[i].activeFilter = false;
      }
    }
    // if category wasn't selected before click, it is now
    if (!bool) {
      selectedId = id;
    }
    this.setState({categories: newCategorys, selectedId: selectedId});
  }

  validate = () => {
    // export selectedId to Home's State
    this.props.select('selectedCategoryId', this.state.selectedId);
    this.close();
  }

  show = () => () => {
    this.setState({
        open: true,
        categories: this.props.categories,
        selectedId: this.props.selectedId
      });
  }

  close = () => {
    this.setState({open: false});
  }

  render() {
    const {open} = this.state;
    return (
      <div>
        <Popup trigger={< Icon link color='orange' size='huge' name='tag' onClick={this.show(true)} />}>
          <Popup.Header>Les catégories</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous pouvez sélectionner une categorie pour filtrer les évènements, ajouter ou modifier des catégories.
          </Popup.Content>
        </Popup>

        <Modal dimmer open={open} onClose={this.close}>
          <Modal.Content>
          <Container>
            <Grid>
              <Grid.Row >
                <Grid.Column width={16}>
                  <Segment raised >
                    <Label color='orange' ribbon>
                      <ModalNewCategory family={this.props.family} rload={this.props.rload} />
                    </Label>
                    <List verticalAlign='middle'>
                      {this.props.categories.map((category, i) => <List.Item key={i}>
                        {/* index = category's rank in the array, not his id */}
                        <CategoryItem 
                            key={i} index={i} name={category.name} id={category.id} 
                            color={category.color} activeFilter={category.activeFilter} 
                            //size={(category.activeFilter)?'large':'medium'}
                            click={this.handleClickSelect}   
                         />
                        </List.Item>
                      )}
                    </List>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
          </Modal.Content>

          <Modal.Actions>
            <Button color='orange' content='Quitter' onClick={this.close} />
            <Button positive content='Valider' onClick={this.validate} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
};

export default ModalCategoryResponsive;
