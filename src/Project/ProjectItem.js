// Olga
import React, {Component} from 'react';
import {Label, Icon} from 'semantic-ui-react';

class ProjectItem extends Component {

  render() {
    return (
      <Label as='a' basic size='large' color={this.props.color} active={this.props.activeFilter} onClick={() => this.props.click(this.props.index, this.props.active, this.props.id)} >
        <Icon name="folder" color={this.props.catcolor} />{this.props.name}
      </Label>
    )
  }

}
export default ProjectItem;
