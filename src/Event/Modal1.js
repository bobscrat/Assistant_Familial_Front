import React, {Component} from 'react';
import { Input, Form, Divider, Grid, Button, Popup } from 'semantic-ui-react';

import'./event.css';

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

    componentWillMount() {
        // par défaut RDV est choisi
        if(this.props.myPrefixe === 'RDV_') {
            this.state.activeRDV = true;
            this.state.activePriseRDV = false;
        }else{
            this.state.activePriseRDV = true;
            this.state.activeRDV = false;
        }
    }
    

    show = (dimmer) => () => this.setState({ dimmer, open: true });
    close = () => this.setState({ open: false });

    handleClick = (evt) => {
        // vérif si le clic change RDV en prise de RDV ou inversement
        if (evt.target.name !== this.props.myPrefixe) {
            if (evt.target.name === 'PRV_') {
                this.state.prefixe = 'PRV_';
            }else{
                this.state.prefixe = '';
            }
            this.setState({ 
                activeRDV: !this.state.activeRDV,
                activePriseRDV: !this.state.activePriseRDV
            })
            this.props.addPrefixeProp(this.state.prefixe);
        }  
        this.focus()
    }

    handleRef = c => {
      this.inputRef = c
    }

    focus = () => {
        this.inputRef.focus()
    }

    render() {
        const { activeRDV, activePriseRDV  } = this.state

        return (
            <div className='heightModal'>        
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3} />
                        
                        <Grid.Column width={10}>
                            <Button.Group >
                                <Button toggle name='RDV_' active={activeRDV} onClick={this.handleClick}>RDV</Button>
                                <Button.Or text='ou' />
                                <Button toggle name='PRV_' active={activePriseRDV} onClick={this.handleClick}>Prise de RDV</Button>
                            </Button.Group>
                            <Divider hidden />  
                            <Form.Group>
                                <Form.Field>
                                    <label>Nom de l'évènement</label>
                                    <span className='fieldRequired'> *</span>
                                    <Popup
                                        trigger={ <Input 
                                            ref={this.handleRef}
                                            fluid                                         
                                            name="nameEvent" 
                                            value={this.props.myNameEvent} 
                                            placeholder="nom de l'évènement" 
                                            onChange={this.props.updateStateNameEventProp} 
                                        />}
                                        header="Nom de l'événement"
                                        content='Vous devez saisir entre 2 et 45 caractères'
                                        on='focus'
                                    />                                    
                                </Form.Field>
                                <Divider hidden />
                                <Form.Field>
                                    <label>Date de l'évènement</label>
                                    <span className='fieldRequired'> *</span>
                                    <Popup
                                        trigger={ <Input 
                                            fluid 
                                        name="dateEvent" 
                                        value={this.props.myDateEvent} 
                                        placeholder="date de l'évènement" 
                                        onChange={this.props.updateStateDateEventProp}  
                                        />}
                                        header="Date de l'événement"
                                        content='Vous devez saisir une date'
                                        on='focus'
                                        position='bottom left'
                                    />                                    
                                </Form.Field>                        
                            </Form.Group>
                        </Grid.Column>
                        <Grid.Column width={3} />
                    </Grid.Row>
                </Grid>                               
            </div>
        )
    }
}

export default Modal1