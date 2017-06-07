import React, {Component} from 'react';
import {Form, Label, Button,Container, Grid, Segment, List } from 'semantic-ui-react';
import axios from 'axios';

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = { }  
    };

  componentWillMount() {
        this.state = {
            categories: [],
            id: '',
            name: '',
            color: '',
            family: {
                id: 13,
                name: 'didi'
            }
        };
        const componentInstance = this;

        axios.get('/api/categories')
        .then( (response) => {
            componentInstance.setState({
                categories :response.data
            })
            
        })
        .catch( (err => {
            console.log('failed to get categories :::', err);
        }))
    }

    componentWillUpdate() {
        this.state = {
            categories: []
        };
        const componentInstance = this;

        axios.get('/api/categories')
        .then( (response) => {
            componentInstance.setState({
                categories :response.data
            })
        })
        .catch( (err => {
            console.log('failed to get categories :::', err);
        }))
    }

    createCategory = (category) => {
        const componentInstance = this;
        axios.post('/api/category', category).then((response) => {
            componentInstance.setState({category: response.data});
            console.log('post');
            }).catch((err) => {
            console.log('Failed to create Category : ', err);
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        // pour mettre à jour le state avec les toutes dernières valeurs des champs
        const inputName = evt.target.name;
        const inputValue = evt.target.value;
        this.setState({
            [inputName]: inputValue
        });
        console.log('Category = { id: ' + this.state.id + ', name: ' + this.state.name + ', color: ' + this.state.color + 
             ', family: ' + this.state.family.id + '}');
        if ('' === this.state.name) {
            console.log('impossible de créer la catégorie sans nom');  
        } else {
            this.createCategory({name: this.state.name, color: this.state.color, family: this.state.family});          
        }
    }

  // sinon, la valeur du champ revient à '' chaque fois qu'on tape une lettre
  handleChange = (evt) => {
    const inputName = evt.target.name;
    const inputValue = evt.target.value;
    this.setState({
      [inputName]: inputValue
    });
    console.log(inputValue);
    
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
                                  this.state.categories.map(
                                      category =>                                                
                                          <Label color={category.color} tag as='a'>{category.name}</Label>                            
                                      )
                              }
                          </List>
                      </Segment>
                  </Grid.Column>
              </Grid.Row>  
              <Form onSubmit={this.handleSubmit}>
                  <Label>
                    Name:
                    <Form.Input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                  </Label>
                  <Label>
                    id:
                    <Form.Input type="text" name="color" value={this.state.color}  onChange={this.handleChange}/>
                  </Label>
                  <Button type='submit'>Submit</Button>
                </Form> 
          </Grid>  
                        
      </Container>
      
    );
  }
};

export default NameForm;