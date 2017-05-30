import React, {Component} from 'react';
import { Form, Divider, Grid, Radio } from 'semantic-ui-react';
import axios from 'axios';
import'./event.css';

class Modal4 extends Component {
   constructor(props) {
        super(props);
        this.state = {
            contacts: []
         }  
    };
  state = { open: false };

  show = (dimmer) => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  componentWillMount() {
      this.getContacts();
  }


     getContacts() {
      const componentInstance = this;
      return axios.get('http://localhost:8080/api/contacts')
          .then( (response) => {
              componentInstance.setState({
                  contacts :response.data
              })
              console.log('Update contacts :::');
          })
          .catch( (err => {
              console.log('failed to get contacts :::', err);
          }))
    }

  handleChange = (e, { value }) => this.setState({ value })

  render() {

    return (
      <div className='heightModal'>        
        <Grid>
            <Grid.Row>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={5}>
                Les contacts
               <Divider hidden />  
                <Form.Group>
                   { 
                      this.state.contacts.map(
                          contact =>                                         
                              <Form.Field control={Radio} label={contact.name} key={contact.id} value={contact.id} onChange={this.handleChange}/>                                               
                      )
                    }
                </Form.Group>
            </Grid.Column>
            
            <Grid.Column width={3}>
            </Grid.Column>
            </Grid.Row>
        </Grid>                               
      </div>
    )
  }
}

export default Modal4

 