import React, {Component} from 'react';
import { Form, Popup, Input, Message, Icon, Grid } from 'semantic-ui-react';

import'./contact.css';

class Modal2 extends Component {
    state = { 
        open: false
    };        

    show = (dimmer) => () => this.setState({ dimmer, open: true });
    close = () => this.setState({ open: false });        

    render() {
    
        return (
        <div className='heightModal'>        
            <Grid>
                <Grid.Row>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Form>
                        <Form.Group widths='equal' >                              
                            <Form.Field>
                                <label>Téléphone du contact<span className='fieldRequired'> *</span></label>                                                          
                                <Popup
                                    trigger={ <Input 
                                        fluid                                         
                                        name='phoneContact'                                         
                                        value={this.props.myPhoneContact} 
                                        placeholder="téléphone du contact" 
                                        onChange={this.props.updateStatePhoneContactProp} 
                                    />}
                                    header="Téléphone du contact"
                                    content="Vous devez saisir un numéro de téléphone pour ce contact"
                                    on='focus'
                                />  
                                <span style={{display: this.props.aMess1M2, color: 'orange'}}>La saisie est obligatoire</span>                                                                      
                            </Form.Field> 
                            <Form.Field>
                                <label>Email du contact<span className='fieldRequired'> *</span></label>                                                          
                                <Popup
                                    trigger={ <Input 
                                        fluid                                         
                                        name='emailContact'                                    
                                        value={this.props.myEmailContact} 
                                        placeholder="email du contact" 
                                        onChange={this.props.updateStateEmailContactProp} 
                                    />}
                                    header="Email du contact"
                                    content="Vous devez saisir une adresse email pour ce contact"                           on='focus'
                                />       
                                <span style={{display: this.props.aMess2M2, color: 'orange'}}>La saisie est obligatoire</span>                                                                 
                            </Form.Field>                              
                        </Form.Group>
                        <Form.Group widths='equal' >                              
                            <Form.Field>
                                <label>Adresse du contact<span className='fieldRequired'> *</span></label>                                                          
                                <Popup
                                    trigger={ <Input 
                                        fluid                                         
                                        name="addressContact" 
                                        value={this.props.myAddressContact} 
                                        placeholder="Adresse du contact" 
                                        onChange={this.props.updateStateAddressContactProp} 
                                    />}
                                    header="Adresse du contact"
                                    content="Vous devez saisir une adresse pour ce contact"
                                    on='focus'
                                />              
                                <span style={{display: this.props.aMess3M2, color: 'orange'}}>La saisie est obligatoire</span>                                                          
                            </Form.Field> 
                            <Form.Field>
                                <label>Commentaire</label>                                                          
                                <Popup
                                    trigger={ <Input 
                                        fluid                                         
                                        name="commentContact" 
                                        value={this.props.myCommentContact} 
                                        placeholder="saisir un commentaire pour ce contact" 
                                        onChange={this.props.updateStateCommentContactProp} 
                                    />}
                                    header="Commentaire du contact"
                                    content="Vous pouvez saisir un commentaire pour ce contact"
                                    on='focus'
                                />                                                                        
                            </Form.Field>                              
                        </Form.Group>
                    </Form>
                    <Message icon positive hidden={this.props.aMess4M2}>
                        <Icon name='check circle' />
                        <Message.Content>
                            Le contact a bien été enregistré !
                        </Message.Content>
                    </Message>
                </Grid.Column>
                <Grid.Column width={3}>
                </Grid.Column>
                </Grid.Row>
            </Grid>                               
        </div>
        )
    }
}

export default Modal2

 