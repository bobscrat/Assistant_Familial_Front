// Olga
import React, {Component} from 'react';
import {Form, Message} from 'semantic-ui-react';
import axios from 'axios';

// import priorities from './priorities.json';  // pour test sans le back
import Priority from './Priority.js';

class PriorityTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msgSuccess: null,
      msgError: null,
      priorities: []
    };
  }

  componentWillMount() {
    // this.state = {priorities: priorities.data}; // pour test sans le back
    const componentInstance = this;
    axios.get('/api/priorities').then((response) => {
      const priorities = response.data;
      const newState = {
        priorities: priorities
      };
      // ajout des propriétés idName (=0name,1name,2name,etc) à la racine du State
      // pour pouvoir gérer les changements de chaque input "name"
      for (let i = 0; i < priorities.length; i++) {
        const idName = priorities[i].id + 'name';
        const value = priorities[i].name;
        newState[idName] = value;
        // console.log('idName='+idName+', newState[idName]='+newState[idName]);
      }
      componentInstance.setState(newState);
    }).catch((err) => {
      console.log('Failed to get priorities : ', err);
    })
  }

  updatePriority = (priority) => {
    const componentInstance = this;
    axios.put('http://localhost:8080/api/priorities', priority).then((response) => {
      if (null != response.data.msgError) {
        componentInstance.setState({msgError: response.data.msgError, msgSuccess: null});
      } else {
        componentInstance.setState({msgSuccess: "Modification réussie !", msgError: null});
      }
    }).catch((err) => {
      console.log('Failed to update priority : ', err);
    })
  }

  editPriority = (priorityId, priorityName) => {
    // console.log('editing : ' + priorityId + ' ' + priorityName);
    this.setState({name: priorityName});
    this.updatePriority({id: priorityId, name: priorityName});
  }

  handleChange = (evt, id) => {
    let idName = id + 'name';
    let newName = evt.target.value;
    // modification de la propriété idName (=0name,1name,2name, etc) du State
    // et reset des messages
    this.setState({[idName]: newName, msgSuccess: null, msgError: null,});
  }

  render() {
    return (
      <Form success error>
        <Message success content={this.state.msgSuccess}/>
        <Message error content={this.state.msgError}/>
        {/* chaque name = valeur des propriétés 0name,1name,2name du State */}
        {this.state.priorities.map(priority => <Priority key={priority.id} id={priority.id} name={this.state[priority.id + 'name']} change={this.handleChange} edit={this.editPriority}/>)
}
      <Form.Button type='Submit'>Rafraichir la liste</Form.Button>
      </Form>
    )
  }

}
export default PriorityTable;
