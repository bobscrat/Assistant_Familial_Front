import React, {Component} from 'react';
import { Input, Form, Divider, Grid, Button, Popup } from 'semantic-ui-react';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import'./event.css';

const optionsHours = [];
const optionsMinutes = [];

class Modal1 extends Component {

     constructor(props) {
        super(props);
        this.state = {
            open: false,
            startDate: ''
         }  
         moment.locale('fr'); 
    }

    closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
        this.setState({ closeOnEscape, closeOnRootNodeClick, open: true })
    }

    componentWillMount() {
        optionsHours.length = 0;        
        optionsHours.push(<option key={'0'} value={'x'}>Choisir une heure</option>);
        for (var i = 0; i < 24; i++) {
            var aHour = {};
            aHour.key = i + 1;
            aHour.name = i;               
            optionsHours.push(<option key={aHour.key} value={aHour.key} >{aHour.name}</option>);  
              
        }
        optionsMinutes.length = 0;        
        optionsMinutes.push(<option key={'0'} value={'x'}>Choisir les minutes</option>);
        for (var j = 0; j < 12; j++) {
            var aMinute = {};
            aMinute.key = j + 1;
            aMinute.name = j * 5;               
            optionsMinutes.push(<option key={aMinute.key} value={aMinute.key} >{aMinute.name}</option>);  
              
        }
        // RDV selected by default
        if (this.props.myPrefixe === 'PRV_') {
            this.setState({
                activeRDV : false,
                activePriseRDV : true
            })
        }else{
            this.setState({
                activeRDV : true,
                activePriseRDV : false
            })
        } 

        var theDate = '';        
        if (null !== this.props.myDateEvent) {
            theDate = this.props.myDateEvent;
        }else{
            theDate = moment().format('YYYY-MM-DD');
        }        
        this.setState({
            startDate: theDate
        })
    }
    
    show = (dimmer) => () => this.setState({ dimmer, open: true });
    close = () => this.setState({ open: false });

    handleClick = (evt) => {
        // verify if clic change RDV in PRV 
        let thePrefixe = '';
        console.log('props prefixe :' + this.props.myPrefixe);
        if (evt.target.name !== this.props.myPrefixe) {
            if (evt.target.name === 'PRV_') {
                thePrefixe = 'PRV_';
            }else{
                thePrefixe = '';
            }
            this.setState({ 
                prefixe: thePrefixe,
                activeRDV: !this.state.activeRDV,
                activePriseRDV: !this.state.activePriseRDV
            })
            this.props.addPrefixeProp(thePrefixe);
        }          
    }

    handleChange = (date) => {
        if (date !== null) {
            this.props.updateStateDateEventProp(date);
        }
        this.setState({
            startDate: date
        });
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
                            <Form>
                                <Divider hidden />  
                                
                                <Form.Field>
                                    <label>Nom de l'événement<span className='fieldRequired'> *   </span><span style={{display: this.props.aMess1M1, color: 'red'}}>Saisir un nom d'événement de 2 à 45 caractères</span></label>                                     
                     
                                    <Popup
                                        trigger={ <Input 
                                            fluid                                         
                                            name="nameEvent" 
                                            value={this.props.myNameEvent} 
                                            placeholder="nom de l'événement" 
                                            onChange={this.props.updateStateNameEventProp} 
                                        />}
                                        header="Nom de l'événement"
                                        content="Vous devez saisir un nom d'événement de 2 à 45 caractères"
                                        on='focus'
                                    />  
                                                                      
                                </Form.Field>                               
                                                                                            
                                <Form.Field>
                                    <label>Date de l'évènement<span className='fieldRequired'> *   </span><span style={{display: this.props.aMess2M1, color: 'red'}}>Saisir une date pour l'événement</span></label>                                                                         
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                        placeholderText="Cliquer pour choisir une date"                                             
                                        showWeekNumbers
                                        withPortal
                                        className='datePicker'
                                        value={this.state.startDate}
                                    />
                                </Form.Field>  
                                                              
                                <Form.Group widths='equal' >
                                    <Form.Field>            
                                        <label>Heure  <span style={{display: this.props.aMess3M1, color: 'red'}}>Sélectionner une heure</span></label>
                                        <select name='hourChoice' value={this.props.myHour} onChange={this.props.updateStateHourEventProp}>
                                            {optionsHours}
                                        </select>
                                    </Form.Field>
                                    <Form.Field>            
                                        <label>Minutes  <span style={{display: this.props.aMess4M1, color: 'red'}}>Sélectionner les minutes</span></label>
                                        <select name='minuteChoice' value={this.props.myMinute} onChange={this.props.updateStateMinuteEventProp}>
                                            {optionsMinutes}
                                        </select>
                                    </Form.Field>                                    
                                </Form.Group>
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