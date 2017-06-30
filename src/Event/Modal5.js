import React, {Component} from 'react';
import { Form, Divider, Grid, Input, TextArea } from 'semantic-ui-react';

import'./event.css';

class Modal5 extends Component {
   constructor(props) {
        super(props);
        this.state = {
            open: false
         }  
    };
  //state = { open: false };

  //show = (dimmer) => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  //handleChange = (e, { value }) => this.setState({ value })

  render() {

    return (
      <div className='heightModal'>        
        <Grid>
            <Grid.Row>
                <Grid.Column width={3} />

                <Grid.Column width={10}>
                    <Form.Field>
                        <label>Budget prévisionnel</label>
                        <Input 
                            fluid 
                            type='number'
                            min='0'
                            name='budget' 
                            value={this.props.myBudgetEvent} 
                            placeholder="budget previsionnel en €" 
                            onChange={this.props.updateStateBudgetEventProp} 
                        />
                    </Form.Field>
                    <Divider hidden />
                    <label>Commentaire</label>
                    <Form.Field>
                        <TextArea
                            className='myTextArea'
                            name='comment' 
                            placeholder='vous pouvez ajouter un commentaire ...' 
                            value={this.props.myCommentEvent} 
                            
                            onChange={this.props.updateStateCommentEventProp}
                        />
                    </Form.Field>
                </Grid.Column>
                
                <Grid.Column width={3} />
            </Grid.Row>
        </Grid>                               
      </div>
    )
  }
}

export default Modal5

 