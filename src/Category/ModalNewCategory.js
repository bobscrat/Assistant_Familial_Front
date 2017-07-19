import React, {Component} from 'react';
import { Popup, Button, Modal, Icon, Container, Message, Form, Grid, Divider } from 'semantic-ui-react'
import { loadCategories, saveCategory, updateCategory} from './libCategory.js'
import '../Home/olga.css';
import { CirclePicker} from 'react-color';
import ToggleDisplay from 'react-toggle-display';

//import CategoryItem from './CategoryItem.js';
import AddCategoryItem from './AddCategoryItem.js';
import EditCategoryInput from './EditCategoryInput.js';


class ModalNewCategory extends Component {
  state = { open: false ,
            categories : [],
            changes : [],
            addedCategory: {},
            isCategoryAdded: false,
            family: {},
            msgNoProjectHidden: true,
            msgSuccessHidden: true,
            msgSuccess: [],
            msgErrorHidden: true,
            msgError: [],
            colorPaletteShow: false,
            colorCate: '#ffffff'
  }

componentWillMount() {
        this.state = {
            open: false ,
            categories : [],
            changes : [],
            addedCategory: {},
            isCategoryAdded: false,
            family: {},
            colorPaletteShow: false


        };
}

  show = () => () => {
      loadCategories(this.props.family.id, false).then((response)=> {
        console.log('load categories');
        this.setState({
            open: true ,
            colorPaletteShow: false,
            categories : response,
            changes : [],
            addedCategory: {},
            isCategoryAdded: false,
            family: this.props.family,
            msgNoProjectHidden: true,
            msgSuccessHidden: true,
            msgSuccess: [],
            msgErrorHidden: true,
            msgError: []
        });
      }).catch((err) => {
        console.log('failed to load Categories :::', err);
      })
  }

  close = () => {
          this.setState({ open: false });
          this.props.rload();
  }
  //add category
  handleChangeAddInput = (evt, color) => {
    let newCategory = this.state.addedCategory;
    if ( '' !== evt.target.value) {
      newCategory.name = evt.target.value;
      newCategory.color = color;
      newCategory.family= this.props.family;
      this.setState({addedCategory: newCategory, isCategoryAdded: true});
    }
  }
  handleChangeAddColor= (name, color) => {
    let newCategory = this.state.addedCategory;
      newCategory.name = name;
      newCategory.color = color;
      newCategory.family= this.props.family;
      this.setState({addedCategory: newCategory, isCategoryAdded: true});
  }



  //update category
  handleChangeEdit = (evt, index) => {
    let newCategories = this.state.categories;
    let newChanges = this.state.changes;
    newCategories[index].name = evt.target.value;

    // passe à true pour informer la fonction validate
    newChanges[index] = true;
    this.setState({categories: newCategories, changes : newChanges });
  }
  handleChangeEditColor = (name, index, color) => {
    let newCategories = this.state.categories;
    let newChanges = this.state.changes;
    newCategories[index].name = name;
    newCategories[index].color = color;

    // passe à true pour informer la fonction validate
    newChanges[index] = true;
    this.setState({categories: newCategories, changes : newChanges });
  }

  resetMessage = () => {
    this.setState( { msgErrorHidden: true,
                      msgSuccessHidden: true,
                                  colorPaletteShow: false,

    })
  }




  validate = () => {
    let categories = this.state.categories;
    let changes = this.state.changes;
    let newCategory = this.state.addedCategory;
    let isCategoryAdded = this.state.isCategoryAdded;
    let msgSuccess = [];
    let msgSuccessHidden = true;
    let msgErrorHidden = true;
    let msgError= [];
    let role = this.state.role;
    //Category added
    if(isCategoryAdded) {
      saveCategory(newCategory).then((response) => {
        categories.push(response);
        msgSuccess.push(newCategory.name + ' : a été ajouté');
        msgSuccessHidden = false;
        this.setState({categories: categories, msgSuccessHidden: msgSuccessHidden, msgSuccess: msgSuccess, colorPaletteShow: false, role: role});
      }).catch((err) => {
        console.log('Failed to save category' + err);
        msgError.push(newCategory.name + ' : ' + err.response.data.message);
        msgErrorHidden = false;
        this.setState({msgErrorHidden: msgErrorHidden, msgError: msgError});
      })
    }
    //Update category
    for( let i = 0; i < changes.length; i++){
      if(changes[i]){
        updateCategory(categories[i], i).then((response) =>{
          categories[i].name = response.name;
          categories[i].color = response.color;
          msgSuccess.push(categories[i].name + ' : Modification effectuée avec succès');
          msgSuccessHidden = false;
          this.setState({categories: categories, msgSuccessHidden: msgSuccessHidden, msgSuccess: msgSuccess});
        }).catch((err) => {
          console.log('Failed to update category : ', err);
          msgError.push(categories[i] + ' : ' + err.response.data.message);
          msgErrorHidden = false;
          this.setState({msgErrorHidden: msgErrorHidden, msgError: msgError});
        })
      }
    }
    //reload categories in Home
    this.props.rload();
  }
  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    const { open } = this.state;

    return (
      <div className='ribbonOrange'>

        <Popup trigger={<Icon link size='large' name='pencil' onClick={this.show(true)}/>}>
        {/*<Popup trigger={<Button color='orange' onClick={this.show(false)}>None</Button>}>*/}
          <Popup.Header>Modifier les catégories</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous modifiez les catégories de votre famille.
          </Popup.Content>
        </Popup>

        <Modal dimmer open={open} onClose={this.close}>
          <Modal.Header>
            <Icon link name='tag' color='orange' />
            Modifier les catégories
          </Modal.Header>
          <Modal.Content>
            <Form success error>
                <Form.Group>
                  <Container style={{width:'auto',height:'auto', alignItems:'center',flexDirection:'row'}}>
                    <AddCategoryItem  changeInput={(evt, colorCate) => this.handleChangeAddInput(evt, colorCate)}
                                      changeColor={(name, colorCate) => this.handleChangeAddColor(name, colorCate)}
                                      resetMsg={() => this.resetMessage()}
                                      colorPaletteShow={this.state.colorPaletteShow}
                    />
                  </Container>
                </Form.Group>

                <Divider horizontal >Liste modifiable</Divider>

                <Message success hidden={this.state.msgSuccessHidden} list={this.state.msgSuccess}/>
                <Message error hidden={this.state.msgErrorHidden} list={this.state.msgError}/>

                <Grid stackable doubling columns={3}>
                {/* index = project's rank in the array, not his id */}
                {
                  this.state.categories.map(
                    (category, i) =>
                        <EditCategoryInput
                            key={i} index={i} id={category.id}
                            name={category.name}
                            changeInput={this.handleChangeEdit}
                            changeColor={this.handleChangeEditColor}
                            colorPaletteShow={this.state.colorPaletteShow}
                            color={category.color}
                            resetMsg={() => this.resetMessage()}
                        />
                    )
                }
                </Grid>
            </Form>

          </Modal.Content>

          <Modal.Actions>
             <Button content='Quitter' color='orange' onClick={this.close} />
             <Button positive content='Valider' onClick={this.validate} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalNewCategory
