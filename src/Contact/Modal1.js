import React, {Component} from 'react';
import { Input, Form, Grid, Divider, Popup } from 'semantic-ui-react';

import'./contact.css';

class Modal1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
         }  
    }

    closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
        this.setState({ closeOnEscape, closeOnRootNodeClick, open: true })
    }    
    
    show = (dimmer) => () => this.setState({ dimmer, open: true });
    close = () => this.setState({ open: false });    

    render() {
        
        return (
            <div className='heightModal'>        
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3} />                        
                        <Grid.Column width={10}>                                                        
                            <Form>  
                                <Form.Group widths='equal' >                              
                                    <Form.Field>
                                        <label>Nom du contact<span className='fieldRequired'> *</span></label>                                                          
                                        <Popup
                                            trigger={ <Input 
                                                fluid                                         
                                                name="nameContact" 
                                                value={this.props.myNameContact} 
                                                placeholder="nom du contact" 
                                                onChange={this.props.updateStateNameContactProp} 
                                            />}
                                            header="Nom du contact"
                                            content="Vous devez saisir un nom pour ce contact"
                                            on='focus'
                                        />       
                                        <span style={{display: this.props.aMess1M1, color: 'red'}}>La saisie est obligatoire</span>                                                                 
                                    </Form.Field> 
                                    <Divider />
                                    <Form.Field>
                                        <label>Prénom du contact<span className='fieldRequired'> *</span></label>                                                          
                                        <Popup
                                            trigger={ <Input 
                                                fluid                                         
                                                name="first_NameContact" 
                                                value={this.props.myFirst_NameContact} 
                                                placeholder="prénom du contact" 
                                                onChange={this.props.updateStateFirst_NameContactProp} 
                                            />}
                                            header="Prénom du contact"
                                            content="Vous devez saisir un prénom pour ce contact"
                                            on='focus'
                                        />    
                                        <span style={{display: this.props.aMess2M1, color: 'red'}}>La saisie est obligatoire</span>                                                                    
                                    </Form.Field>                              
                                </Form.Group>                                                           
                                <Form.Field>
                                    <label>Profession du contact<span className='fieldRequired'> *</span></label>                                                          
                                    <Popup
                                        trigger={ <Input 
                                            fluid                                         
                                            name="professionContact" 
                                            value={this.props.myProfessionContact} 
                                            placeholder="profession du contact" 
                                            onChange={this.props.updateStateProfessionContactProp} 
                                        />}
                                        header="profession du contact"
                                        content="Vous devez saisir une profession pour ce contact"
                                        on='focus'
                                    />     
                                    <span style={{display: this.props.aMess3M1, color: 'red'}}>La saisie est obligatoire</span>                                                                   
                                </Form.Field>                                                                                               
                            </Form>
                        </Grid.Column>                        
                        <Grid.Column width={3} />                   
                    </Grid.Row>
                </Grid>                               
            </div>
        )
    }
}

export default Modal1