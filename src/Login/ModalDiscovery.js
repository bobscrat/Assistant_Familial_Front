import React, {Component} from 'react';
import { Popup, Button, Modal, Icon, Label} from 'semantic-ui-react';
import Carousel from'./Carousel.js';

class ModalDiscovery extends Component {
    state = {open: false};

    show = (dimmer) => () => this.setState({dimmer, open: true });
    close = () => this.setState({ open: false }); 
    closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
        this.setState({ closeOnEscape, closeOnRootNodeClick, open: true })
    }   
  
  render() {
    const { open, dimmer, closeOnEscape, closeOnRootNodeClick  } = this.state;    

    return (
      <span>
        <Popup trigger={
            <Label as='a' pointing='left' color='green' onClick={this.show(true)}>                
                <Icon name='info circle' size='large'/>
                En savoir plus 
            </Label>
            }>
          <Popup.Header>Découverte OLGA</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous allez découvrir les fonctionnalités d'OLGA.
          </Popup.Content>
        </Popup>
        <Modal 
          dimmer={dimmer}
        closeOnRootNodeClick={closeOnRootNodeClick} 
          closeOnEscape={closeOnEscape} 
          open={open} 
          onClose={this.close} 
          closeIcon='close'
        >          
            <Modal.Header>
              Découvrir OLGA
            </Modal.Header>

            <Modal.Content>            
              <Modal.Description>
                <Carousel />                                
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color='orange' onClick={this.close}>
                Quitter
              </Button>              
            </Modal.Actions>         
        </Modal>        
      </span>
    )
  }
}

export default ModalDiscovery

 