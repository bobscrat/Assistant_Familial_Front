import React, {Component} from 'react';
import {Header} from 'semantic-ui-react';
import PriorityComponent from './Priority/PriorityComponent.js';

class Admin extends Component {
  render() {
    return (
      <div>
        <Header as="h3" color="orange">Priorités</Header>
        <PriorityComponent/>
        {/* Vos Components en dessous... ou au dessus ! */}
      </div>
    )
  }

}

export default Admin;
