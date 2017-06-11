import React, {Component} from 'react';
import { Form, Divider, Grid, Label, Checkbox, Segment, Input } from 'semantic-ui-react';
import axios from 'axios';
import'./event.css';

class Modal1 extends Component {
   constructor(props) {
        super(props);
        this.state = {
            priorities: [],
            periodicities: [],
         } 
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
      return axios.get('http://localhost:8080/api/priorities')
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
      return axios.get('http://localhost:8080/api/periodicities')
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

  handleChangePriority = (e, { value }) => {
      this.props.updateStatePriorityProp(value);
  }
  handleChangePeriodicity = (e, { value }) => {
      this.props.updateStatePeriodicityProp(value);

      if (value > 1) {
          this.focus()
      }
  }

  handleChangeValuePeriodicity = (e, { value }) => {
      if (null !== value && value >= 0) {
        this.props.updateStateValuePeriodicityProp(value);
      }
  }

  handleRef = c => {
      this.inputRef = c
  }

  focus = () => {
      this.inputRef.focus()
  }

  render() {

    return (
      <div className='heightModal'>        
        <Grid>
            <Grid.Row>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Segment>
                        <Label color='orange' ribbon>La périodicité</Label>
                        <Divider hidden />                          
                            <Form size='large'>
                            { 
                                this.state.periodicities.map(
                                    periodicity => 
                                        <Form.Group inline>                                        
                                            <Form.Field key={periodicity.id}>
                                                <Checkbox
                                                    radio
                                                    label={periodicity.name}
                                                    name='checkboxRadioGroupPeriodicity'
                                                    value={periodicity.id}
                                                    checked={periodicity.id === (this.props.myPeriodicity)}
                                                    onChange={this.handleChangePeriodicity}
                                                />
                                            </Form.Field> 
                                            {this.props.myPeriodicity !== 1 && periodicity.id === this.props.myPeriodicity && <Form.Field>
                                                <Input
                                                    className="valuePeriodicity"
                                                    name="valuePeriodicity" 
                                                    ref={this.handleRef}
                                                    value={this.props.myValuePeriodicity} 
                                                    placeholder="nbre" 
                                                    onChange={this.handleChangeValuePeriodicity} 
                                                />
                                            </Form.Field>}                                        
                                        </Form.Group>                            
                                    )
                                }
                            </Form>                            
                    </Segment>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Segment>
                        <Label color='orange' ribbon>La priorité</Label>
                        <Divider hidden />  
                        <Form size='large'>
                        { 
                            this.state.priorities.map(
                                priority =>                                         
                                    
                                        <Form.Field key={priority.id}>
                                            <Checkbox
                                                radio
                                                label={priority.name}
                                                name='checkboxRadioGroupPriority'
                                                value={priority.id}
                                                checked={priority.id === (this.props.myPriority)}
                                                onChange={this.handleChangePriority}
                                            />
                                        </Form.Field>                                          
                            )
                            }
                        </Form>
                    </Segment>
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

 