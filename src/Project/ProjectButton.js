import React, {Component} from 'react';
import {Label, Icon} from 'semantic-ui-react';

export default class ProjectButton extends Component {

  render() {
    return (
      <Label as='a' basic color={this.props.color} active={this.props.active} onClick={() => this.props.click(this.props.id, this.props.active)} >
        <Icon name="folder" color={this.props.iconcolor} />{this.props.name}
      </Label>
    )
  }

}
