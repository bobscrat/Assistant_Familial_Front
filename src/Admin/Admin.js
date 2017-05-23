import React, {Component} from 'react';
import {Header} from 'semantic-ui-react';
import PriorityComponent from './Priority/PriorityComponent.js';
import Category from './Category/NewCategoryV1.js';

class Admin extends Component {
  render() {
    return (
      <div>
        <Header as="h3" color="orange">Priorités</Header>
        <PriorityComponent/>
        <Category/>
      </div>
    )
  }

}

export default Admin;
