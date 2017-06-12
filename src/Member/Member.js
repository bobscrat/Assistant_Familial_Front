import React, {Component} from 'react';
import {Container, Grid, Label, List, Segment, Image} from 'semantic-ui-react';

import ModalNewMember from './NewUser.js';
import ModalEditMember from './EditUser.js';

import './member.css'
import '../Accueil/olga.css';

class Member extends Component {

  state = {
    members: [],
    family: {}
  };

  render() {

    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment raised className='member'>
                <Label color='orange' ribbon>Les membres<ModalNewMember/><ModalEditMember/></Label>
                <List verticalAlign='middle' className='listMember'>
                  {this.props.members.map(
                    (member, i) => <List.Item key={i}>
                    <List.Content>
                      <Image src={require('../images/avatars/32x32/01-32x32.png')} avatar/>
                      <a>{member.firstName}</a>
                    </List.Content>
                  </List.Item>)
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
