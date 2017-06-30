import React, {Component} from 'react';
import { Form, Grid, Button, Icon, Popup } from 'semantic-ui-react';
import'./event.css';

const optionsContacts = [];

class Modal4 extends Component {
   
    state = { open: false };

    show = (dimmer) => () => this.setState({ dimmer, open: true });
    close = () => this.setState({ open: false });

    componentWillMount() {
        optionsContacts.length = 0;        
        // optionsContacts.push(<option key={'0'} value={'none'}>Choisir un contact</option>);
        for (var i=0; i < this.props.theContacts.length; i++) {
            var aContact = {};
            aContact.key = this.props.theContacts[i].id;
            var profession = '';
            if (null !== this.props.theContacts[i].profession) {
                profession = ' (' + this.props.theContacts[i].profession + ')';
            }
            aContact.name = this.props.theContacts[i].first_name + ' ' 
                + this.props.theContacts[i].name +  profession;             
            optionsContacts.push(<option key={aContact.key} value={aContact.name} >{aContact.name}</option>);                
        }
    };

    // handleChangeContact = (e, { value }) => {
    //     this.props.updateStateContactEventProp(value);
    // }

    render() {

        return (
        <div>        
            <Grid>
                <Grid.Row>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Form>
                        <Form.Field>                
                            <label>Choix du contact</label>
                            <select name='contactChoice' size='8' value={this.props.myContactEvent} onChange={this.props.updateStateContactEventProp}>
                                {optionsContacts}
                            </select>
                        </Form.Field>                        
                    </Form>
                    
                </Grid.Column>
                 <Grid.Column  width={2}>
                    <Popup trigger={<Button icon><Icon name='add user' color='orange' /></Button>}>
                        <Popup.Header>Créer un contact</Popup.Header>
                        <Popup.Content>
                            En cliquant sur ce bouton, vous créez un nouveau contact.
                        </Popup.Content>
                    </Popup>                     
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

 