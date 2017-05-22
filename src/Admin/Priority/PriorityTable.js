import React, {Component} from 'react';
import {Form, Label, Message} from 'semantic-ui-react';
import axios from 'axios';

import priorities from './priorities.json';
import Priority from './Priority.js';

class PriorityTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      priority: {},
      msgError: ''
    };
  }

  componentWillMount() {
    this.state = {priorities: priorities.data};
    // const componentInstance = this;
    // axios.get('http://localhost:8080/api/priorities').then((response) => {
    //   componentInstance.setState({priorities: response.data});
    // }).catch((err) => {
    //   console.log('Failed to get priorities : ', err);
    // })
  }

  updatePriority = (priority) => {
    const componentInstance = this;
    axios.put('http://localhost:8080/api/priorities', priority).then((response) => {
      if (null != response.data.msgError) {
        componentInstance.setState({msgError: response.data.msgError, priority: null});
      }
      else {
        componentInstance.setState({priority: response.data, msgError: null});
      }
    }).catch((err) => {
      console.log('Failed to update priority : ', err);
    })
  }

  editPriority = (priorityId, priorityName) => {
    console.log('editing : ' + priorityId + ' ' + priorityName);
    // this.setState({name: priorityName});
    // this.updatePriority({id: priorityId, name: priorityName});
  }

  render() {
    return (
      <Form>
      {/*  */}
          {this.state.priorities.map(
            priority =>
            <Priority key={priority.id} id={priority.id} name={priority.name}
            priority={priority} edit={this.editPriority} />
            )
          }
      </Form>
    )
  }

}
export default PriorityTable;
