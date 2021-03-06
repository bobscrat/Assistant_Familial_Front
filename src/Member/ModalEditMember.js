import React, {Component} from 'react';
import { Popup, Button, Input, Modal, Icon, Container, Message, Form, Grid, Divider } from 'semantic-ui-react'
import { loadMembers, saveMember, updateMember} from './libMember.js'
import '../Home/olga.css';

import EditMemberInput from './EditMemberInput.js';


class ModalEditMember extends Component {
  state = { open: false ,
            members : [],
            changes : [],
            addedMember: {},
            isMemberAdded: false,
            family: {},
            msgNoProjectHidden: true,
            msgSuccessHidden: true,
            msgSuccess: [],
            msgErrorHidden: true,
            msgError: [],
            role: {
              id:1,
              name:'Admin Familial'
            }, 
            image: '',
            msgClose: false
  }

  show = () => () => {
      loadMembers(this.props.family.id, true).then((response)=> {
        console.log('load members');
        this.setState({
          open: true ,
            members : response,
            changes : [],
            addedMember: {},
            isMemberAdded: false,
            family: this.props.family,
            msgNoProjectHidden: true,
            msgSuccessHidden: true,
            msgSuccess: [],
            msgErrorHidden: true,
            msgError: [],
            msgClose: false, 
            value: ''
        });        
      }).catch((err) => {
        console.log('failed to load Members :::', err);
      })
  }  

  close = () => {
    this.setState({ open: false });
    this.props.rload()
  }
  //add member
  handleChangeAdd = (evt) => {
    let newMember = this.state.addedMember;
    if ( '' !== evt.target.value) {
      newMember.firstName = evt.target.value;
      newMember.role = this.state.role;
      newMember.family= this.props.family;
      this.setState({addedMember: newMember, isMemberAdded: true, value: evt.target.value});
    }
  }
  //update member
  handleChangeEdit = (evt, index) => {
    let newMembers = this.state.members;
    let newChanges = this.state.changes;
    newMembers[index].firstName = evt.target.value;
    //newMembers[index].image = this.state.image;
    // passe à true pour informer la fonction validate
    newChanges[index] = true;
    this.setState({members: newMembers, changes : newChanges });
  }

  changeImage = (newImage, index) => {
    let newMembers = this.state.members;
    let newChanges = this.state.changes;
    newMembers[index].image = newImage;
    console.log("modal Edit Member changeImage = " + newMembers[index])
    newChanges[index] = true;
    
    this.setState({members: newMembers, changes : newChanges, msgClose : false, isMemberAdded: false });
  }

  validate = () => {
    let members = this.state.members;
    let changes = this.state.changes;
    let newMember = this.state.addedMember;
    let isMemberAdded = this.state.isMemberAdded;
    let msgSuccess = [];
    let msgSuccessHidden = true;
    let msgErrorHidden = true;
    let msgError= [];
    let role = this.state.role;    
    //Member added
    if(isMemberAdded) {
      saveMember(newMember).then((response) => {
        members.push(response);
        msgSuccess.push(newMember.firstName + ' : a été ajouté');
        msgSuccessHidden = false;
        this.setState({members: members, msgSuccessHidden: msgSuccessHidden, msgSuccess: msgSuccess, role: role, value: '' });
      }).catch((err) => {
        console.log('Failed to save member' + err);
        msgError.push(newMember.firstName + ' : ' + err.response.data.message);
        msgErrorHidden = false;
        this.setState({msgErrorHidden: msgErrorHidden, msgError: msgError});
      })
    }
    //Update member
    for( let i = 0; i < changes.length; i++){
      if(changes[i]){
        console.log('member i :' + members[i].image.name)
        updateMember(members[i], i).then((response) =>{
          members[i].firstName = response.firstName;
          members[i].image = response.image;
          msgSuccess.push(members[i].firstName +' : Modification effectuée avec succès');
          msgSuccessHidden = false;
          this.setState({members: members, msgSuccessHidden: msgSuccessHidden, msgSuccess: msgSuccess});
        }).catch((err) => {
          console.log('Failed to update member : ', err);
          msgError.push(members[i] + ' : ' + err.response.data.message);
          msgErrorHidden = false;
          this.setState({msgErrorHidden: msgErrorHidden, msgError: msgError});
        })
      }
    }
    //reload members in Home
    this.props.rload();
    this.props.rloadEvents();    
    this.setState({msgClose: true})
    
  }

  render() {
    const { open } = this.state;

    return (
      <div className='ribbonOrange'>
        
        <Popup trigger={<Icon link size='large' name='pencil' onClick={this.show(true)}/>}>
        {/*<Popup trigger={<Button color='orange' onClick={this.show(false)}>None</Button>}>*/}
          <Popup.Header>Ajouter ou modifier un membre</Popup.Header>
          <Popup.Content>
            En cliquant sur ce bouton, vous ajoutez et/ou modifiez les membres de votre famille.
          </Popup.Content>
        </Popup>

        <Modal dimmer open={open} onClose={this.close}>
          <Modal.Header>
            <Icon link name='user' color='orange' />
            Modifier le(s) membre(s)
          </Modal.Header>
          <Modal.Content>
            <Form success error>
                <Form.Group>
                  <Grid>
                    <Grid.Column only='tablet computer' width={12} >
                      <Container textAlign='center'>
                        <Input focus label='Nouveau membre' placeholder='Nom du nouveau membre' value={this.state.value} onChange={(evt) => this.handleChangeAdd(evt)} />
                      </Container>
                    </Grid.Column>
                    <Grid.Column only='mobile' width={12}>
                      <Container textAlign='center'>
                        <Input icon='users' iconPosition='left' placeholder='Nouveau membre' value={this.state.value} onChange={(evt) => this.handleChangeAdd(evt)} />
                      </Container>
                    </Grid.Column>
                  </Grid>
                </Form.Group>
                <Message success hidden={this.state.msgSuccessHidden} list={this.state.msgSuccess}/>
                <Message error hidden={this.state.msgErrorHidden} list={this.state.msgError}/>
                <Divider hidden/>
                <Grid stackable doubling columns={3}>
                {/* index = project's rank in the array, not his id */}
                {
                  this.state.members.map((member, i) => <EditMemberInput key={i} index={i} id={member.id} name={member.firstName} image={member.image} change={this.handleChangeEdit} 
                  imageChange={this.changeImage} />)
                }
                </Grid>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            {this.state.msgClose === true && <Button color='green' onClick={this.close}>Fermer</Button>}
            {this.state.msgClose === false && <Button content='Quitter' color='orange' onClick={this.close} />}
            {this.state.msgClose === false && <Button positive content='Valider' onClick={this.validate} />}
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalEditMember

 