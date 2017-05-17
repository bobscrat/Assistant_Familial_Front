import React, {Component} from 'react';
import {Form, Label, Button,Container, Grid, Segment, List } from 'semantic-ui-react';
import axios from 'axios';

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        id: ''
    };

    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
        this.state = {
            users: [],
            families: []
        };
        const componentInstance = this;

        axios.get('http://localhost:8080/acdo/api/family')
        .then( (response) => {
            componentInstance.setState({
                families :response.data
            })
        })
        .catch( (err => {
            console.log('failed to get families :::', err);
        }))
    }

  handleChangeId(event) {
    this.setState({id: event.target.value});
    console.log(this.state.id);
  }

   handleChangeName(event) {
    this.setState({name: event.target.value});
    console.log(this.state.name);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name + ' ' + this.state.id);
    event.preventDefault();
  }

  render() {
    return (
      <Container>  
          <Grid>                                     
              <Grid.Row>
                  <Grid.Column width={16}>
                      <Segment raised>
                          
                          <List celled verticalAlign='middle'> 
                              { 
                                  this.state.families.map(
                                      family =>                                                
                                          <Label color='purple' tag><a className="lienCategorie" >{family.name}</a></Label>                            
                                      )
                              }
                          </List>
                      </Segment>
                  </Grid.Column>
              </Grid.Row>  
              <Form onSubmit={this.handleSubmit}>
                  <Label>
                    Name:
                    <Form.Input type="text" value={this.state.value} onChange={this.handleChangeName} />
                  </Label>
                  <Label>
                    id:
                    <Form.Input type="text" value={this.state.value}  onChange={this.handleChangeId}/>
                  </Label>
                  <Button type='submit'>Submit</Button>
                </Form> 
          </Grid>  
                        
      </Container>
      
    );
  }
};

export default NameForm;