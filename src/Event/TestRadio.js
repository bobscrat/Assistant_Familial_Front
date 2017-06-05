import React, {Component} from 'react';
import { Input, Form, Divider, Grid,Radio } from 'semantic-ui-react';

import'./event.css';

class TestRadio extends Component {

     constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedOption: 'Prise de RDV'
         }  
        // this.handleOptionChange = this.handleOptionChange.bind(this)
        console.log('init : ' + this.state.selectedOption);
    }

    handleOptionChange = (evt) => { 
        console.log(this.state.selectedOption + ' ' + evt.target.checked);
        this.setState({
            selectedOption: evt.target.checked
        });
    }
   
    render() {

        return (
            <div>        
                <Form >
                    <Form.Field>
                        Selected value: <b>{this.state.selectedOption}</b>{this.state.name}
                    </Form.Field>
                    <Form.Field>
                        <Form.Radio
                            label='Prise de RDV'
                            
                            value='Prise de RDV'
                            
                            checked={this.state.selectedOption === 'Prise de RDV'}
                            onChange={this.handleOptionChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Radio
                            label='RDV'
                            
                            value='RDV'
                            
                            checked={this.state.selectedOption === 'RDV'}
                            onChange={this.handleOptionChange}
                        />
                    </Form.Field>
                </Form>                                                               
            </div>
        )
    }
}

export default TestRadio