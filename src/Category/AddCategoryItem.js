// Didier
import React, {Component} from 'react';
import {Label, Form, Popup} from 'semantic-ui-react';
import { CirclePicker} from 'react-color';
import ToggleDisplay from 'react-toggle-display';

class AddCategoryItem extends Component {   

    state = { 
        name: '',
        colorCate: '',
        colorLabel: '',
        colorPaletteShow: this.props.colorPaletteShow
    }

    handleChangeColorCate = (color) => {
      this.setState({ 
        colorLabel: color.hex
      });
      this.props.changeColor(this.state.name, this.state.colorLabel);
    }; 

    handleClickSelect = (value, color) => {
        this.setState({
            colorPaletteShow: !value
        });
    }
    // changement état de l'input ajout catégorie
    handleChange = (e) => {
      const inputName = e.target.name;
      const inputValue = e.target.value;
      this.setState({
          [inputName]: inputValue,
      });
      this.props.changeInput(e, this.state.colorLabel);
      this.props.resetMsg();
    };


  render() {
    return (
        <div >
            <Form.Group inline>
                <Label 
                    style={{"backgroundColor" : this.state.colorLabel, "color" : "#ffffff"}}
                    tag
                    onChange={this.handleChange.bind(this)}
                >
                {this.state.name}
                </Label>        

                <Form.Input 
                    name="name" 
                    placeholder="nom de la nouvelle catégorie" 
                    value={this.state.name}                    
                    onChange={this.handleChange.bind(this)}                                            
                />                  

                <Popup trigger={
                    <Label
                        as='a'
                        size='large' 
                        circular                   
                        style={{"backgroundColor" : this.state.colorLabel, "color" : "white"}}  
                        onClick={ () => this.handleClickSelect(this.state.colorPaletteShow) }
                        value={this.state.colorLabel}              
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
                    onChangeComplete={ this.handleChangeColorCate.bind(this) }
                     
                />
            </ToggleDisplay> 
        </div>
    )
  }
}

export default AddCategoryItem;