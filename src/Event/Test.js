import React, {Component} from 'react';
import { Popup, Button, Input, Modal, Icon, Label, Form, Divider, Grid } from 'semantic-ui-react';

import'./event.css';

class Test extends Component {

  render() {
    return (
      <div>        
          <Input type='text' value={this.props.myDataProp} placeholder="nom de l'évènement" onChange={this.props.updateStateProp} />                    
      </div>
    )
  }
}

export default Test