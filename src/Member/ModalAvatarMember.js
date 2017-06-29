import React, {Component} from 'react';
import {Grid, Input, Icon, Image, Modal} from 'semantic-ui-react';
import { CirclePicker} from 'react-color';
import ToggleDisplay from 'react-toggle-display';


class ModalAvatarMember extends Component {

constructor(props) {
    super(props);
    this.state = { }  
  };
  
  state = { 
    open: false
  }

  closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
    this.setState({ closeOnEscape, closeOnRootNodeClick, open: true })
  }
  

  show = (dimmer) => () => this.setState({ dimmer, open: true })

  render() {
          const { open, dimmer, closeOnEscape, closeOnRootNodeClick } = this.state;

    return (
        <div>
    
        <Modal 
          dimmer={dimmer} 
          open={open} 
          closeOnEscape={closeOnEscape} 
          closeOnRootNodeClick={closeOnRootNodeClick}
          onClose={this.close}
          >
          
            <Modal.Header>Ajouter une catégorie</Modal.Header>
            <Modal.Content>
                <CirclePicker 
                    colors={['#7947BD',' #983A7A', '#AE5A7C', '#BF4258', '#BA4E1D', '#A6645B', '#9A6D00', '#705A00', '#00891D', 
                            '#32797C', '#007DA6', '#0061C1', '#54584B', '#106326', '#064B2D', '#005D71', '#40497C', '#663865', 
                            '#713066', '#700C26', '#942A46', '#9A3921', '#AF5800', '#814B00'] }  
                />
              
            </Modal.Content>
           
        </Modal>
                </div>
    )
  }
}
export default ModalAvatarMember;
