// Didier
import React, {Component} from 'react';
import {Label, Form, Popup} from 'semantic-ui-react';
import { CirclePicker} from 'react-color';
import ToggleDisplay from 'react-toggle-display';

class EditCategoryInput extends Component {  

    state = {
        nameCate: this.props.name, 
        colorLabel: this.props.color,
        showColorPicker: this.props.colorPaletteShow
    }

    // affichage ou non du colorPicker
    handleClickShowColorPicker = () => {
      this.setState({
        showColorPicker: !this.state.showColorPicker
      });
    };

    handleChangeColorCateExist = (color) => {
      this.setState({ 
        colorLabel: color.hex
      });
      this.props.changeColor(this.state.nameCate, this.props.index, this.state.colorLabel);
    };     

     // changement état de l'input ajout catégorie
    handleChange = (e) => {
      const inputName = e.target.name;
      const inputValue = e.target.value;
      this.setState({
          [inputName]: inputValue,
          nameCate: inputValue
      });
      this.props.changeInput(e, this.props.index, this.state.colorLabel);
      this.props.resetMsg();

    };


  render() {
    return (
        <div>
            <Form.Group inline>
                <Label 
                    as='a' 
                    style={{"backgroundColor" : this.state.colorLabel, "color" : "#ffffff"}} 
                    tag
                >
                    ...
                </Label>
                <Form.Input 
                    required
                    name="name" 
                    value={this.props.name} 
                    onChange={this.handleChange.bind(this)}
                    //onChange={(evt) => this.props.changeInput(evt, this.props.index)}                         
                />
                <Popup trigger={
                    <Label
                        as='a'
                        size='large' 
                        circular                   
                        style={{"backgroundColor" : this.state.colorLabel, "color" : "white"}}
                        onClick={this.handleClickShowColorPicker}
                        //onClick={ () => this.props.click(this.props.index,this.props.colorPaletteShow, this.props.id) }                     
                    />                    
                }>
                    <Popup.Header>Modidier la couleur</Popup.Header>
                    <Popup.Content>
                    En cliquant sur ce bouton, vous modifier la couleur de la catégorie.
                    </Popup.Content>
                </Popup> 
            </Form.Group>

            <ToggleDisplay show={this.state.showColorPicker} key={this.props.id} >
                <CirclePicker 
                    colors={['#7947BD',' #983A7A', '#AE5A7C', '#BF4258', '#BA4E1D', '#A6645B', '#9A6D00', '#705A00', '#00891D', 
                            '#32797C', '#007DA6', '#0061C1', '#54584B', '#106326', '#064B2D', '#005D71', '#40497C', '#663865', 
                            '#713066', '#700C26', '#942A46', '#9A3921', '#AF5800', '#814B00'] }  
                    onChangeComplete={this.handleChangeColorCateExist.bind(this)}
                />
            </ToggleDisplay> 
        </div>
    )
  }
}

export default EditCategoryInput;