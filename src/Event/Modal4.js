import React, {Component} from 'react';
import { Form, Grid } from 'semantic-ui-react';
import'./event.css';
import NewContact from '../Contact/NewContact.js';

const optionsContacts = [];

class Modal4 extends Component {

    state = {
        open: false,
        contacts: []
    };

    show = (dimmer) => () => this.setState({ dimmer, open: true });
    close = () => this.setState({ open: false });

    componentWillMount() {
        optionsContacts.length = 0;
        for (var i=0; i < this.props.theContacts.length; i++) {
            var aContact = {};
            aContact.key = this.props.theContacts[i].id;
            var profession = '';
            if (null !== this.props.theContacts[i].profession) {
                profession = ' (' + this.props.theContacts[i].profession + ')';
            }
            aContact.name = this.props.theContacts[i].name.toUpperCase() + ' '
                + this.props.theContacts[i].first_name +  profession;
            optionsContacts.push(<option key={aContact.key} value={aContact.name} >{aContact.name}</option>);
        }
    };

    componentWillReceiveProps(newProps) {
      this.setState({
        contacts: newProps.contacts
      })
      //console.log('receive props ' + this.state.contacts.length);
    }

    componentWillUpdate() {
        optionsContacts.length = 0;
        console.log('passe dans le willUpdate modal 4 ' + this.props.theContacts.length);
        for (var i=0; i < this.props.theContacts.length; i++) {
            var aContact = {};
            aContact.key = this.props.theContacts[i].id;
            var profession = '';
            if (null !== this.props.theContacts[i].profession) {
                profession = ' (' + this.props.theContacts[i].profession + ')';
            }
            aContact.name = this.props.theContacts[i].name.toUpperCase() + ' '
                + this.props.theContacts[i].first_name +  profession;
            optionsContacts.push(<option key={aContact.key} value={aContact.name} >{aContact.name}</option>);
        }
    };

    render() {

        return (
        <div  className='heightModal'>
            <Grid>
                <Grid.Row>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Form>
                        <Form.Field>
                            <label>Choix du contact</label>
                            <select
                                name='contactChoice'
                                size='10'
                                value={this.props.myContactEvent}
                                onChange={this.props.updateStateContactEventProp}
                            >
                                {optionsContacts}
                            </select>
                        </Form.Field>
                    </Form>

                </Grid.Column>
                 <Grid.Column  width={2}>
                    <NewContact
                        family={this.props.family}
                        rload={this.props.reloadContacts}
                    />
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
