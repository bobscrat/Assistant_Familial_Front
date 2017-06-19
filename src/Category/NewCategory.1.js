import React, {Component} from 'react';
import { Popup, Button, Modal, Icon, Form, Label, List, Input, Grid, Segment } from 'semantic-ui-react';
import { CirclePicker} from 'react-color';
import ToggleDisplay from 'react-toggle-display';

import '../Home/olga.css';
import axios from 'axios';

class ModalNewCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { }  
  };
  
  state = { 
    open: false,
    categorySelected: 0 
  }

  closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
    this.setState({ closeOnEscape, closeOnRootNodeClick, open: true })
  }
  

  show = (dimmer) => () => this.setState({ dimmer, open: true })

  close = () => this.setState({ open: false,
                                name: '',
                                color: 'black',
                                value: '',
                              } )

   componentWillMount() {
        this.state = {
            categories: [],
            id: '',
            name: '',
            color: 'black',
            value: '',
            family: {
                id: 3,
                name: 'duck'
            },
            show: false,
            showExist: false,
            
        };
        const componentInstance = this;       

        axios.get('http://localhost:8080/api/categories')
        .then( (response) => {
          const categories = response.data;
      const newState = {
        categories: categories
      };
              // ajout des propriétés idName (=0name,1name,2name,etc) à la racine du State
      // pour pouvoir gérer les changements de chaque input "name"
          for (let i = 0; i < categories.length; i++) {
            const idName = categories[i].id + 'name';
            const value = categories[i].name;
            newState[idName] = value;
            }
          // console.log('idName='+idName+', newState[idName]='+newState[idName]);
          componentInstance.setState(newState);
 
            
        })
        .catch( (err => {
            console.log('failed to get categories :::', err);
        }))
    }

  createCategory = (category) => {
        const componentInstance = this;
        console.log('ON ENVOIT LE POST');
        axios.post('http://localhost:8080/api/categories', category).then((response) => {
            componentInstance.setState({category: response.data});
            console.log('APRES LE POST');
            }).catch((err) => {
            console.log('Failed to create Category : ', err);
        })
    }
    // validation formulaire ajout caté
    handleSubmit = (evt) => {
        evt.preventDefault();
        // pour mettre à jour le state avec les toutes dernières valeurs des champs
        const inputName = evt.target.name;
        const inputValue = evt.target.value;
        this.setState({
            [inputName]: inputValue
        });
       this.createCategory({
            name: this.state.name,
            color: this.state.colorName,
            family: this.state.family
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
   
    //changement nom couleur selon clique cercle   
    handleChangeColorCate = (color, event) => {      
      this.setState({ 
          colorName: color.hex
      });
    };

    handleChangeColorCateExist = (color, event, categoryId) => {
      console.log(categoryId);
      this.setState({ 
          colorNameModif : color.hex
      });
    };

    // changement état de l'input ajout catégorie
    handleChange = (e) => {
      const inputName = e.target.name;
      const inputValue = e.target.value;
      this.setState({
          [inputName]: inputValue
      });
    };

    // affichage ou non du colorPicker
    handleClickShowColorPicker() {
      this.setState({
        show: !this.state.show
      });
    }

    handleClickShowColorPickerExist(categoryId) {
      console.log(categoryId);
      this.setState({
        categorySelected: categoryId,
        showExist: !this.state.showExist
      });
    }

    editCategory = (categoryId, categoryName) => {
      this.setState({name: categoryName});
      this.updateCategory({id: categoryId, name: categoryName});
    }

    updateCategory = (category) => {
      const componentInstance = this;
      axios.put('http://localhost:8080/api/categories', category).then((response) => {
        if (null != response.data.msgError) {
          componentInstance.setState({msgError: response.data.msgError, msgSuccess: null});
        } else {
          componentInstance.setState({msgSuccess: "Modification réussie !", msgError: null});
        }
      }).catch((err) => {
        console.log('Failed to update priority : ', err);
      })
    }
  
    //modification de l'input caté existante
    handleChangeCate = (e, id) => {
      let idName = id + 'name';
      let newName = e.target.value;
      // modification de la propriété idName (=0name,1name,2name, etc) du State
      // et reset des messages
      this.setState({[idName]: newName});
    }

  render() {
    const { open, dimmer, closeOnEscape, closeOnRootNodeClick, colorName, colorNameModif } = this.state;

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
                      <Form.Input required name="colorName" placeholder="couleur de la catégorie" value={colorName} onChange={this.handleChange}>
                        <Label circular style={{"backgroundColor" : this.state.colorName, "color" : "white"}} onClick={ () => this.handleClickShowColorPicker() } /> 
                      </Form.Input>
                    
                       <Label 
                        tag 
                        style={{"backgroundColor" : this.state.colorName, "color" : "white"}}
                       > 
                        {this.state.name} 
                      </Label>        
                    </Form.Group>
                </Form.Group>

              <ToggleDisplay show={this.state.show} >
                  <CirclePicker colors= {['#7947BD',' #983A7A', '#AE5A7C', '#BF4258', '#BA4E1D', '#A6645B', '#9A6D00', '#705A00', '#00891D', 
                                      '#32797C', '#007DA6', '#0061C1', '#54584B', '#106326', '#064B2D', '#005D71', '#40497C', '#663865', 
                                      '#713066', '#700C26', '#942A46', '#9A3921', '#AF5800', '#814B00'] }  
                              onChangeComplete={ this.handleChangeColorCate }
                    />
              </ToggleDisplay>

              <List celled >
                <Grid columns={2} padded > 
                  { // en 2 colonnes, espace préservé, Grid.Colomn dans la map 
                    this.state.categories.map(
                        category =>
                        <Grid.Column>
                          <Form.Group inline>
                            <Label 
                              as='a' 
                              style={{"backgroundColor" : category.color, "color" : "#ffffff"}} 
                              tag>
                              ...
                              {/*{category.name}*/}
                            </Label>
                            <Form.Input 
                              required 
                              name={[category.id + 'name']} 
                              value={category.name} 
                              onChange={(e) => this.handleChangeCate(e, category.id)}                          
                            />
                            <Popup trigger={
                                <Label 
                                  circular                   
                                  style={{"backgroundColor" : this.state.colorNameModif, "color" : "white"}}  
                                  onClick={ () => this.handleClickShowColorPickerExist(category.id) } 
                                />
                                 
                              }>
                              <Popup.Header>Modidier la couleur</Popup.Header>
                              <Popup.Content>
                                En cliquant sur ce bouton, vous modifier la couleur de la catégorie.
                              </Popup.Content>
                            </Popup> 
                          </Form.Group>

                          {this.state.categorySelected === category.id && <ToggleDisplay show={this.state.showExist} key={category.id} >
                              <CirclePicker 
                                colors= {['#7947BD',' #983A7A', '#AE5A7C', '#BF4258', '#BA4E1D', '#A6645B', '#9A6D00', '#705A00', '#00891D', 
                                          '#32797C', '#007DA6', '#0061C1', '#54584B', '#106326', '#064B2D', '#005D71', '#40497C', '#663865', 
                                          '#713066', '#700C26', '#942A46', '#9A3921', '#AF5800', '#814B00'] }  
                                onChangeComplete={ this.handleChangeColorCateExist }
                              />
                          </ToggleDisplay>}
                        </Grid.Column>
                      ) //<Form.Button type="button" onClick={()=>this.editCategory(this.props.id, this.props.name)}>Éditer</Form.Button>
                    }
                </Grid>                                     
              </List>                      
              <Form.Group onSubmit={this.handleSubmit}>
                <Button color='orange' onClick={this.close}>Annuler</Button>
                <Button positive type='submit' >Valider</Button>
              </Form.Group>                                      
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default ModalNewCategory

 