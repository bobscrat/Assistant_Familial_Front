import React, {Component} from 'react';
import { Popup, Button, Modal, Icon} from 'semantic-ui-react';
import axios from 'axios';

import'./contact.css';
import Modal1 from './Modal1.js';
import Modal2 from './Modal2.js';

class ModalNewContact extends Component {

    state = {
        events: [],
        open : false,      
        addedContact: {},
        numero: 1,
        nbModal: 2,
        listModal: ['showModal1', 'showModal2'],
        showModal: [true, false],            
        nameContact: '',
        first_NameContact: '',
        professionContact: '',
        phoneContact: '',
        emailContact: '',
        addressContact: '',
        commentContact: '',
        mess1M1: 'none',
        mess2M1: 'none',
        mess3M1: 'none',       
        mess1M2: 'none',
        mess2M2: 'none',
        mess3M2: 'none',
        mess4M2: true,
        messClose: false
    }      

    show = (dimmer) => () => this.setState({ dimmer, open: true });
    close = () => this.setState({ open: false });

    updateStateNameContact = (e) => {        
        if (e.target.value.length > 2 && e.target.value.length <= 45) {
            this.setState({
                mess1M1: 'none'
            });
        }
        this.setState({
            nameContact: e.target.value,
        });
    }

    updateStateFirst_NameContact = (e) => {        
        if (e.target.value.length > 2 && e.target.value.length <= 45) {
            this.setState({
                mess2M1: 'none'
            });
        }
        this.setState({
            first_NameContact: e.target.value,
        });
    }

    updateStateProfessionContact = (e) => {        
        if (e.target.value.length > 2 && e.target.value.length <= 45) {
            this.setState({
                mess3M1: 'none'
            });
        }
        this.setState({
            professionContact: e.target.value,
        });
    }

    updateStatePhoneContact = (e) => {               
        if (e.target.value.length === 10) {
            this.setState({
                mess1M2: 'none'
            });
        }
        this.setState({
            phoneContact: e.target.value,
        });
    }

    updateStateEmailContact = (e) => {        
        if (e.target.value.length > 5) {
            this.setState({
                mess2M2: 'none'
            });
        }
        this.setState({
            emailContact: e.target.value,
        });
    }

    updateStateAddressContact = (e) => {        
        if (e.target.value.length > 10) {
            this.setState({
                mess3M2: 'none'
            });
        }
        this.setState({
            addressContact: e.target.value,
        });
    }

    updateStateCommentContact = (e) => {                
        this.setState({
            commentContact: e.target.value,
        });
    }

    onClickNext(e){
        //Validation
        var valid = false, valid1 = false, valid2 = false, valid3 = false;
        
        if (null != this.state.nameContact && this.state.nameContact.length > 1 && this.state.nameContact.length < 45) {
            valid1 = true;
            this.setState({ 
                mess1M1: 'none'
            });
        }else{
            valid1 = false
            this.setState({ mess1M1: 'inline'});
        }   
        if (null != this.state.first_NameContact && this.state.first_NameContact.length > 1 && this.state.first_NameContact.length < 45) {
            valid2 = true;
            this.setState({ mess2M1: 'none'});
        }else{
            valid2 = false;
            this.setState({ mess2M1: 'inline'});
        }
        if (null != this.state.professionContact && this.state.professionContact.length > 1 && this.state.professionContact.length < 45) {
            valid3 = true;
            this.setState({ mess3M1: 'none'});
        }else{
            valid3 = false;
            this.setState({ mess3M1: 'inline'});
        }
        if (valid1 && valid2 && valid3){
            valid = true;
        }else{
            valid = false;
        }        
        // valid = true;    
        if (valid === true) {                       
            this.setState({
                numero: 2,
                showModal: [false, true]
            });
        }
    };

    onClickPrevious(e){        
        this.setState({
            numero: 1,
            showModal: [true, false]
        })
    }; 

    createContact = () => {
        var valid = false, valid1 = false, valid2 = false, valid3 = false;
        if (null != this.state.phoneContact && this.state.phoneContact.length === 10 ) {
            valid1 = true;
            this.setState({ mess1M2: 'none'});                
        }else{
            valid1 = false
            this.setState({ mess1M2: 'inline'});
        }           
        if (null != this.state.emailContact && this.state.emailContact.length > 5 && this.state.emailContact.length < 45) {
            valid2 = true;
            this.setState({ mess2M2: 'none'});
        }else{
            valid2 = false;
            this.setState({ mess2M2: 'inline'});
        }
        if (null != this.state.addressContact && this.state.addressContact.length > 15) {
            valid3 = true;
            this.setState({ mess3M2: 'none'});
        }else{
            valid3 = false;
            this.setState({ mess3M2: 'inline'});
        }
        if (valid1 && valid2 && valid3){
            valid = true;
        }else{
            valid = false;
        }
        if (valid) {
        
            let newContact = this.state.addedContact;
            
            newContact.name = this.state.nameContact;
            newContact.first_name = this.state.first_NameContact;
            newContact.profession = this.state.professionContact;
            newContact.phone = this.state.phoneContact;
            newContact.email = this.state.emailContact;
            newContact.address = this.state.addressContact;
            newContact.comment = this.state.commentContact;
            newContact.family = this.props.family;
    
            this.setState({
                addedContact: newContact,
                messClose: true
            });
    
            axios.post('/api/contacts', this.state.addedContact)
                .then((response) => {
                    this.setState({ mess4M2: false});
                    this.props.rload();
                })
                .catch((err) => {
                    console.log('Failed to create Contact : ', err);
                })
        }
    }      

    render() {
        const { open, dimmer, closeOnEscape, closeOnRootNodeClick  } = this.state;

        return (
            <div className='newContact'>                
                <Popup 
                    trigger={
                        <Icon 
                            link 
                            name='add user' 
                            color='orange' 
                            size='huge' 
                            onClick={this.show(true)}
                        />
                    }
                >
                    <Popup.Header>Créer un contact</Popup.Header>
                    <Popup.Content>
                        En cliquant sur ce bouton, vous créez un nouveau contact.
                    </Popup.Content>
                </Popup> 
                <Modal 
                    dimmer={dimmer} 
                    closeOnRootNodeClick={closeOnRootNodeClick} 
                    closeOnEscape={closeOnEscape} 
                    open={open} 
                    onClose={this.close} 
                    closeIcon='close'
                >          
                    <Modal.Header>
                    Ajouter un nouveau contact {this.state.numero}/{this.state.nbModal}
                    </Modal.Header>

                    <Modal.Content>            
                        <Modal.Description>
                            {this.state.showModal[0] && < Modal1                            
                                myNameContact={this.state.nameContact} 
                                updateStateNameContactProp={this.updateStateNameContact} 
                                myFirst_NameContact={this.state.first_NameContact} 
                                updateStateFirst_NameContactProp={this.updateStateFirst_NameContact}
                                myProfessionContact={this.state.professionContact}
                                updateStateProfessionContactProp={this.updateStateProfessionContact}
                                aMess1M1={this.state.mess1M1}
                                aMess2M1={this.state.mess2M1}
                                aMess3M1={this.state.mess3M1}                            
                            />}
                            {this.state.showModal[1] && < Modal2 
                                myPhoneContact={this.state.phoneContact}
                                updateStatePhoneContactProp={this.updateStatePhoneContact}
                                myEmailContact={this.state.emailContact}
                                updateStateEmailContactProp={this.updateStateEmailContact}
                                myAddressContact={this.state.addressContact}
                                updateStateAddressContactProp={this.updateStateAddressContact}
                                myCommentContact={this.state.commentContact}
                                updateStateCommentContactProp={this.updateStateCommentContact}   
                                aMess1M2={this.state.mess1M2}
                                aMess2M2={this.state.mess2M2}
                                aMess3M2={this.state.mess3M2}    
                                aMess4M2={this.state.mess4M2}                     
                            />}                                                    
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        {(this.state.numero > 1 && this.state.messClose === false) && <Button content='Précédent' icon='left chevron' labelPosition='left' onClick={this.onClickPrevious.bind(this)} />}
                        {(this.state.numero === 1 && this.state.messClose === false) && <Button disabled content='Précédent' icon='left chevron' labelPosition='left' onClick={this.onClickPrevious.bind(this)} />}
                        {this.state.messClose === false && <Button color='orange' onClick={this.close}>
                            Annuler
                        </Button>}
                        {(this.state.numero < 2 && this.state.messClose === false) && <Button positive icon='right chevron' labelPosition='right' content='Suivant' onClick={this.onClickNext.bind(this)} />}
                        {(this.state.numero === 2 && this.state.messClose === false) && <Button positive icon='checkmark' labelPosition='right' content='Valider' onClick={this.createContact} />}
                        {this.state.messClose === true && <Button color='green' onClick={this.close}>
                            Fermer
                        </Button>}
                    </Modal.Actions>         
                </Modal>        
            </div>
        )
    }
}

export default ModalNewContact