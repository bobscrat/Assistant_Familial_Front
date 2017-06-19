// Didier
import React, {Component} from 'react';
import {Label} from 'semantic-ui-react';

class MemberItem extends Component {

  render() {
    return (
        <Label 
            as='a' 
            basic 
            size='large' 
            className='nameMember' 
            color={this.props.color} 
            active={this.props.activeFilter} 
            onClick={() => this.props.click(this.props.index, this.props.active, this.props.id)} 
        >
            {this.props.name}
        </Label>
    )
  }

}
export default MemberItem;