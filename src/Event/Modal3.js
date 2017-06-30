import React, {Component} from 'react';
import { Form, Divider, Grid, Label, Checkbox, Segment, Input } from 'semantic-ui-react';
import'./event.css';

class Modal3 extends Component {

    state = {
            open: false
        };

    show = (dimmer) => () => this.setState({ dimmer, open: true });
    close = () => this.setState({ open: false });

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
                                    this.props.thePeriodicities.map(
                                        periodicity => 
                                            <Form.Group inline key={periodicity.id}>                                        
                                                <Form.Field >
                                                    <Checkbox
                                                        radio
                                                        label={periodicity.name}
                                                        name='checkboxRadioGroupPeriodicity'
                                                        value={periodicity.name}
                                                        checked={periodicity.name === (this.props.myPeriodicity)}
                                                        onChange={this.handleChangePeriodicity}
                                                    />
                                                </Form.Field> 
                                                {this.props.myPeriodicity !== 'Aucune' && periodicity.name === this.props.myPeriodicity && <Form.Field>
                                                    <Input
                                                        className="valuePeriodicity"
                                                        name="valuePeriodicity" 
                                                        type='number'
                                                        min='0'
                                                        max='365'
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
                                this.props.thePriorities.map(
                                    priority =>                                                                             
                                        <Form.Field key={priority.id}>
                                            <Checkbox
                                                radio
                                                label={priority.name}
                                                name='checkboxRadioGroupPriority'
                                                value={priority.name}
                                                checked={priority.name === (this.props.myPriority)}
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

export default Modal3

 