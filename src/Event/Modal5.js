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
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={10}>
                <Form.Field>
                    <label>Budget prévisionnel</label>
                    <Input fluid name='budget' value={this.props.myBudget} placeholder="budget previsionnel en €" onChange={this.props.updateStateBudgetProp} />
                </Form.Field>
                <Divider hidden />
                <Form.Field>
                    <label>Commentaires</label>
                    <TextArea name='comment' value={this.props.myComment} placeholder='vous pouvez ajouter un commentaire ...' value={this.props.myComment} autoHeight onChange={this.props.updateStateCommentProp}/>
                </Form.Field>
            </Grid.Column>
            
            <Grid.Column width={3}>
            </Grid.Column>
            </Grid.Row>
        </Grid>                               
      </div>
    )
  }
}

export default Modal5

 