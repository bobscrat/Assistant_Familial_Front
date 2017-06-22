// Didier
import React, {Component} from 'react';
import {Label, Form, Popup} from 'semantic-ui-react';
import { CirclePicker} from 'react-color';
import ToggleDisplay from 'react-toggle-display';

class AddCategoryItem extends Component {   

    state = { 
        name: '',
        colorLabel: '',
        colorPaletteShow: false
    }

    handleChangeColorCate = (color) => {
      this.setState({ 
        colorLabel: color.hex
      });
    }; 

    handleClickSelect = (value) => {
        this.setState({
            colorPaletteShow: !value
        })
    }


  render() {
    return (
        <div>
            <Form.Group inline>
                <Label 
                    style={{"backgroundColor" : this.state.colorLabel, "color" : "#ffffff"}} 
                    tag
                >
                    ...
                </Label>        

                <Form.Input 
                   
                    name="name" 
                    placeholder="nom de la nouvelle catégorie" 
                    value={this.state.name} 
                    onChange={this.props.click.bind(this)} 
                />                  

                <Popup trigger={
                    <Label
                        as='a'
                        size='large' 
                        circular                   
                        style={{"backgroundColor" : this.state.colorLabel, "color" : "white"}}  
                        onClick={ () => this.handleClickSelect(this.state.colorPaletteShow) }                     
                    />                    
                }>
                    <Popup.Header>Modidier la couleur</Popup.Header>
                    <Popup.Content>
                    En cliquant sur ce bouton, vous modifier la couleur de la catégorie.
                    </Popup.Content>
                </Popup> 
            </Form.Group>
            <ToggleDisplay show={this.state.colorPaletteShow}  >
                <CirclePicker 
                    colors={['#7947BD',' #983A7A', '#AE5A7C', '#BF4258', '#BA4E1D', '#A6645B', '#9A6D00', '#705A00', '#00891D', 
                            '#32797C', '#007DA6', '#0061C1', '#54584B', '#106326', '#064B2D', '#005D71', '#40497C', '#663865', 
                            '#713066', '#700C26', '#942A46', '#9A3921', '#AF5800', '#814B00'] }  
                    onChangeComplete={ this.handleChangeColorCate } 
                />
            </ToggleDisplay> 
        </div>
    )
  }
}

export default AddCategoryItem;