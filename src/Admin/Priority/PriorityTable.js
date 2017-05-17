import React, {Component} from 'react';
import {Icon, Label, Menu, Table} from 'semantic-ui-react';
import axios from 'axios';

import Priority from './Priority.js';

class PriorityTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {}
    };
  }

  componentWillMount() {
    this.state = {
      priorities: []
    };
    const componentInstance = this;
    axios.get('http://localhost:8080/api/priorities').then((response) => {
      componentInstance.setState({priorities: response.data});
    }).catch((err) => {
      console.log('Failed to get priorities : ', err);
    })
  }

  editPriority = (priorityId, priorityName) => {
    console.log('editing : ' + priorityId + ' ' + priorityName);
  }

  deletePriority = (priorityId) => {
    console.log('deleting : ' + priorityId);
  }

  render() {
    return (
      <div>
        {
          this.state.priorities.map((priority, i) =>
          <Priority key={i} id={priority.id} name={priority.name} edit={this.editPriority} suppr={this.deletePriority} />)
        }


      </div>
    )
  }

}
export default PriorityTable;
