import React, {Component} from 'react';
import { Popup, Button, Input, Modal, Icon, Label, Form, Divider, Grid } from 'semantic-ui-react';

import'./event.css';
import Test from './Test.js';

class Parent extends Component {

    constructor(props) {
    super(props);
    this.state = {
        data: 'Initial data...'
    }  
    
    this.updateState = this.updateState.bind(this);
    
};

    updateState(e) {
        this.setState({data: e.target.value});
    }

  render() {
    return (
      <div>        
          <Test myDataProp = {this.state.data} updateStateProp = {this.updateState}></Test>
          <h5>{this.state.data}</h5>
      </div>
    )
  }
}

export default Parent