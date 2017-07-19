import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment, Image, Icon, Modal, Button} from 'semantic-ui-react';

// import ModalNewMember from './ModalNewMember.js';
import ModalEditMember from './ModalEditMember.js';
import MemberItem from './MemberItem.js';

import './member.css'
import '../Home/olga.css';

class MemberMobile extends Component{
    state = {
        open: false,
        members: [],
        family: {}
    };

     // select/unselect a member
  handleClickSelect = (index, bool, id) => {
    const newMembers = this.props.members;
    let selectedId;
    // invert this member.activeFilter and unselect others
    for (let i = 0; i < newMembers.length; i++) {
      if (i === index) {
        newMembers[i].activeFilter = !bool;
      } else {
        newMembers[i].activeFilter = false;
      }
    }
    // if member wasn't selected before click, it is now
    if (!bool) {selectedId = id;}
    else {selectedId = 0;}
    // export selectedId to Home's State
    this.props.select('selectedMemberId', selectedId);
    this.setState({members: newMembers});
  }

  validate = () => {
    // export selectedId to Home's State
    this.props.select('selectedCategoryId', this.state.selectedId);
    this.close();
  }

  show = () => () => {
    this.setState({
        open: true,
        members: this.props.members,
        selectedId: this.props.selectedId
      });
  }

  close = () => {
    this.setState({open: false});
  }

 render() {
    const {open} = this.state;
    return (
      <div>
        < Icon link color='orange' size='huge' name='users' onClick={this.show(true)} />

        <Modal dimmer open={open} onClose={this.close}>
          <Modal.Content>
          <Container>
            <Grid>
              <Grid.Row >
                <Grid.Column width={16}>
                  <Segment raised >
                    <Label color='orange' ribbon>
                      <ModalEditMember family={this.props.family} rload={this.props.rload} rloadEvents={this.props.rloadEvents}/>
                    </Label>
                    <List className='listMember' size='big'>
                  {
                    this.props.members.map(
                    (member, i) =>
                      <List.Item key={i}>
                          <Image src={require('../images/avatars/32x32/'+ (member.image))}/>
                        <List.Content>
                          <MemberItem
                            as='a'
                            basic
                            size='large'
                            index={i}
                            name={member.firstName}
                            id={member.id}
                            activeFilter={member.activeFilter}
                            click={this.handleClickSelect}
                            color={(member.activeFilter)?'orange':'grey'}
                          />
                        </List.Content>
                      </List.Item>
                    )
                  }
                </List>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
          </Modal.Content>

          <Modal.Actions>
            <Button color='orange' content='Quitter' onClick={this.close} />
            <Button positive content='Valider' onClick={this.validate} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default MemberMobile;
