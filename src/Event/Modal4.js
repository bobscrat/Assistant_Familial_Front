import React, {Component} from 'react';
import { Form, Divider, Grid, Checkbox } from 'semantic-ui-react';
import'./event.css';
import * as utils from '../Utils/utils.js';

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
        utils.loadContacts(this); // =this.setState({categories: categories})  
    };

    handleChangeContact = (e, { value }) => {
        this.props.updateStateContactEventProp(value);
    }

    render() {

        return (
        <div className='heightModal'>        
            <Grid>
                <Grid.Row>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={10}>
                    Les contacts
                    <Divider hidden />  
                    <Form size='large'>
                        { 
                            this.state.contacts.map(
                                contact => 
                                    <Form.Field key={contact.id}>
                                        <Checkbox
                                            radio
                                            label={contact.name}
                                            name='checkboxRadioGroupContact'
                                            value={contact.id}
                                            checked={contact.id === (this.props.myContactEvent)}
                                            onChange={this.handleChangeContact}
                                        />
                                    </Form.Field>                             
                            )
                        }
                    </Form>
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

 