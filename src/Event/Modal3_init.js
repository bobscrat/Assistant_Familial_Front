import React, {Component} from 'react';
import { Form, Divider, Grid, Radio } from 'semantic-ui-react';
import axios from 'axios';
import'./event.css';

class Modal1 extends Component {
   constructor(props) {
        super(props);
        this.state = {
            priorities: [],
            periodicities: [],
            value: ''
         } 
         this.handleChange = this.handleChange.bind(this);
         this.changePriority = this.changePriority.bind(this);

    };
  state = { open: false };

  show = (dimmer) => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  componentWillMount() {
      this.getPriorities();
      this.getPeriodicities();
  }

  getPriorities() {
      const componentInstance = this;
      return axios.get('/api/priorities')
          .then( (response) => {
              componentInstance.setState({
                  priorities :response.data
              })
              console.log('Update priorities :::');
          })
          .catch( (err => {
              console.log('failed to get priorities :::', err);
          }))
    }

     getPeriodicities() {
      const componentInstance = this;
      return axios.get('/api/periodicities')
          .then( (response) => {
              componentInstance.setState({
                  periodicities :response.data
              })
              console.log('Update periodicities :::');
          })
          .catch( (err => {
              console.log('failed to get periodicities :::', err);
          }))
    }

    changePriority(event) {
        console.log(event.target.value);
        console.log(event.target.name);
    }

    handleChange(event) {
        console.log(event.target.name);
        this.setState({value: event.target.value});
    }
  //handleChange = (e, { value }) => this.setState({ value })

  render() {

    return (
      <div className='heightModal'>        
        <Grid>
            <Grid.Row>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={5}>
                La périodicité
               <Divider hidden />  
                <Form.Group>
                   { 
                      this.state.periodicities.map(
                          periodicity =>                                         
                            <Form.Field key={periodicity.id}>
                                <Radio 
                                    label={periodicity.name} 
                                    name={periodicity.name} 
                                    value={periodicity.id} 
                                    checked={this.state.value === periodicity.name}
                                    onChange={this.handleChange}
                                /> 
                            </Form.Field>                                              
                      )
                    }
                </Form.Group>
            </Grid.Column>
            <Grid.Column width={5}>
                La priorité
                <Divider hidden />  
                <Form.Group>
                   { 
                      this.state.priorities.map(
                          priority =>                                         
                              <Form.Field key={priority.id}>
                                  <Radio 
                                    label={priority.name}
                                    name='radioPriority'  
                                    value={priority.id}
                                    onChange={this.changePriority}
                                    />    
                                </Form.Field>                                           
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

export default Modal1

 