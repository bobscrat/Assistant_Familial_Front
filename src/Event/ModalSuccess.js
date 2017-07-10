import React, {Component} from 'react';
import { Modal, Grid, Label, Icon } from 'semantic-ui-react';


class ModalSuccess extends Component {

     constructor(props) {
        super(props);
        this.state = {
            open: false      
        }           
    }

    closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
        this.setState({ closeOnEscape, closeOnRootNodeClick, open: true })
    }
    
    show = (dimmer) => () => this.setState({ dimmer, open: true });
    close = () => this.setState({ open: false });    

    render() {        
        const { open, dimmer, closeOnEscape, closeOnRootNodeClick  } = this.state;
        return (
            
                
                <Modal 
                    dimmer={dimmer} 
                    closeOnRootNodeClick={closeOnRootNodeClick} 
                    closeOnEscape={closeOnEscape} 
                    open={open} 
                    onClose={this.close} 
                    closeIcon='close'
                    size='small'
                >                                                             
                    <Modal.Content>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={12}>
                                    <Icon name='check circle' color='green' size='large'/>
                                    <span className='msgSuccess'> 
                                        L'événement a bien été enregistré !
                                    </span>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Label as='a' color='green' onClick={this.close}>
                                        Fermer
                                    </Label>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                                                                                            
                </Modal>
            
        )
    }
}

export default ModalSuccess