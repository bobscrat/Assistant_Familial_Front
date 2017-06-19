import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment, Image} from 'semantic-ui-react';

import ModalNewMember from './NewUser.js';
import ModalEditMember from './EditUser.js';
import MemberItem from './MemberItem.js';

import './member.css'
import '../Home/olga.css';

class Member extends Component {

  state = {
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
    this.props.select('selectedProjectId', selectedId);
    this.setState({members: newMembers});
  }

  render() {

    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment raised className='member'>
                <Label color='orange' ribbon>Les membres<ModalNewMember/><ModalEditMember/></Label>
                <List verticalAlign='middle' className='listMember' size='big'>
                  {
                    this.props.members.map(
                    (member, i) => 
                      <List.Item key={i}>
                        <List.Content>
                          <Image src={require('../images/avatars/32x32/'+ (member.image))} avatar/>                          
                          <MemberItem 
                            as='a' 
                            basic 
                            size='large'                             
                            index={i} 
                            name={member.firstName} 
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
    )
  }
};

export default Member;