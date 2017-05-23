import React, {Component} from 'react';
import {Header} from 'semantic-ui-react';
import PriorityComponent from './Priority/PriorityComponent.js';

class Admin extends Component {
  render() {
    return (
      <div>
        <Header as="h3" color="orange">Priorités</Header>
        <PriorityComponent/>
      </div>
    )
  }

}

export default Admin;
