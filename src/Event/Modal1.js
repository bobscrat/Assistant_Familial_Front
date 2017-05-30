import React, {Component} from 'react';
import { Input, Icon, Label, Form, Divider, Grid, Message } from 'semantic-ui-react';

import'./event.css';

class Modal1 extends Component {

     constructor(props) {
        super(props);
        this.state = {
            open: false,
            msgSuccessName: null,
            msgErrorName: null    
         }  
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
                <Form.Group>
                    <Label>
                        <Icon name='toggle on' color='green' />
                        Prise de RDV
                    </Label>
                    <Label>
                        <Icon name='toggle off' />
                        RDV ou tâche
                    </Label>
                </Form.Group>
                <Divider hidden />  
                <Form.Group>
                    <Form.Field>
                        <label>Nom de l'évènement</label><span className='fieldRequired'> *</span>
                        <Input fluid name="nameEvent" value={this.props.myNameEvent} placeholder="nom de l'évènement" onChange={this.props.updateStateNameEventProp} />
                    </Form.Field>
                    <Divider hidden />
                    <Form.Field>
                        <label>Date de l'évènement</label><span className='fieldRequired'> *</span>
                        <Input fluid name="dateEvent" value={this.props.myDateEvent} placeholder="date de l'évènement" onChange={this.props.updateStateDateEventProp} />
                    </Form.Field>
                </Form.Group>
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

 