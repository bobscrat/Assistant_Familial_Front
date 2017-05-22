import React, {Component} from 'react';
import { Popup, Button, Modal, Icon, Form } from 'semantic-ui-react'
import '../Accueil/olga.css';
import axios from 'axios';

const options = [
  { key: '1', text: 'Rouge', value: 'red' },
  { key: '2', text: 'Orange', value: 'orange' },
  { key: '3', text: 'Jaune', value: 'yellow' },
  { key: '4', text: 'Olive', value: 'olive' },
  { key: '5', text: 'Vert', value: 'green' },
]

class ModalNewCategory1 extends Component {
  constructor(props) {
    super(props);
    this.state = { }  
  };
  
  state = { open: false }
  state = { options }

  closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
    this.setState({ closeOnEscape, closeOnRootNodeClick, open: true })
  }
  

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

   componentWillMount() {
        this.state = {
            categories: [],
            id: '',
            name: '',
            color: '',
            value: '',
            family: {
                id: 13,
                name: 'didi'
            }
            
        };
        const componentInstance = this;

        axios.get('http://localhost:8080/api/categories')
        .then( (response) => {
            componentInstance.setState({
                categories :response.data
            })
            
        })
        .catch( (err => {
            console.log('failed to get categories :::', err);
        }))
    }

  // componentWillUpdate() {
  //       this.state = {
  //           categories: []
  //       };
  //       const componentInstance = this;

  //       axios.get('http://localhost:8080/api/categories')
  //       .then( (response) => {
  //           componentInstance.setState({
  //               categories :response.data
  //           })
  //       })
  //       .catch( (err => {
  //           console.log('failed to get categories :::', err);
  //       }))
  //   }

  createCategory = (category) => {
        const componentInstance = this;
        axios.post('http://localhost:8080/api/category', category).then((response) => {
            componentInstance.setState({category: response.data});
            console.log('post');
            }).catch((err) => {
            console.log('Failed to create category : ', err);
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        // pour mettre à jour le state avec les toutes dernières valeurs des champs
        const inputName = evt.target.name;
        const inputValue = evt.target.value;
        this.setState({
            [inputName]: inputValue
        });
        console.log('Category = { id: ' + this.state.id + ', name: ' + this.state.name + ', color: ' + this.state.colorName + 
             ', family: ' + this.state.family.id + '}');
        if ('' === this.state.name || '' === this.state.colorName || null === this.state.colorName ) {
            console.log('impossible de créer la catégorie sans nom');  
        } else {
            // this.createCategory({name: this.state.name, color: this.state.color, family: this.state.family});  
            console.log('Création de la catégorie ' + this.state.name);          
        }
    }

    handleChange = (evt) => {
      const inputName = evt.target.name;
      const inputValue = evt.target.value;
      // console.log('evt : ' + evt.target.name + ' ' + evt.target.value + ' ' + evt.target.color);
      this.setState({
        [inputName]: inputValue
      });
      // console.log(inputName + ' ' + inputValue +  ' ' + inputColor);
      console.log(evt.target);
    }

    handleDDChange = (e, { value }) => {
      console.log('key= ' + value )
      this.setState({ colorName: value })
    }

  render() {
    const { open, dimmer, closeOnEscape, closeOnRootNodeClick, colorName } = this.state

    return (
      <div className='ribbonOrange'>
        Les catégories
        <Popup trigger={<Icon link size='large' name='plus' onClick={this.show(true)}/>}>
          <Popup.Header>Ajouter une catégorie</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous ajoutez une catégorie.
          </Popup.Content>
        </Popup>

        <Modal 
          dimmer={dimmer} 
          open={open} 
          closeOnEscape={closeOnEscape} 
          closeOnRootNodeClick={closeOnRootNodeClick}
          onClose={this.close}
          >
          
            <Modal.Header>Ajouter une catégorie</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group inline widths='equal'>                  
                    <Form.Group >                      
                      <Form.Input required label="Nom" name="name" placeholder="nom de la catégorie" value={this.state.name} onChange={this.handleChange.bind(this)} />
                      <Form.Select
                        label="Couleur"
                        required
                        options={options}
                        placeholder='couleur de la catégorie'
                        selection
                        value={colorName}
                        name='colorName'
                        onChange={this.handleDDChange}
                      />
                    </Form.Group>   
                    <Form.Group>
                      <Button color='orange' onClick={this.close}>Annuler</Button>
                      <Button positive type='submit' >Valider</Button>
                    </Form.Group>                        
                </Form.Group>              
              </Form>
            </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default ModalNewCategory1

 