// Olga
import React, {Component} from 'react';
import {Form, Message} from 'semantic-ui-react';
import axios from 'axios';

class PrioritySearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      msgSuccess: null,
      msgError: null
    };
  }

  getPriority = (id) => {
    const componentInstance = this;
    axios.get('/api/priorities/' + id).then((response) => {
      // console.log('response.data.msgError=' + response.data.msgError + ', response.data.name=' + response.data.name);
      if (null != response.data.msgError) {
        componentInstance.setState({msgError: response.data.msgError, msgSuccess: null});
      }
      else {
        componentInstance.setState({msgSuccess: "Nom : "+response.data.name, msgError: null});
      }
      // console.log('msgError=' + this.state.msgError + ', msgSuccess=' + this.state.msgSuccess);
    }).catch((err) => {
      console.log('Failed to get priority : ', err);
    })
  }

  // sinon, la valeur du champ revient à '' chaque fois qu'on tape une lettre
  handleChange = (evt) => {
    this.setState({id: evt.target.value});
    console.log('id='+this.state.id);
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    // pour mettre à jour le state avec les toutes dernières valeurs des champs
    // sinon le dernier caractère tapé ne sera pas pris en compte
    this.setState({id: evt.target.value});
    console.log('id='+this.state.id);
    if ('' === this.state.id) {
      this.setState({msgError: "Veuillez saisir un id", msgSuccess: null});
      // console.log('msgError=' + this.state.msgError + ', msgSuccess=' + this.state.msgSuccess);
    } else {
      // console.log('get');
      this.getPriority(this.state.id);
    }

  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} success error>
      <Form.Input label='Recherche par Id' placeholder='Entrez un Id' value={this.state.id} onChange={this.handleChange} />
      <Form.Button type='Submit'>Valider</Form.Button>
      <Message success content={this.state.msgSuccess} />
      <Message error content={this.state.msgError} />
      </Form>
    )
  }

}

export default PrioritySearch;
