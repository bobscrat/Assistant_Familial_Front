// Olga
import React, {Component} from 'react';
import {Label} from 'semantic-ui-react';

class CategoryItem extends Component {

  render() {
    return (
        <Label as='a' tag size={this.props.size} className='nameCategory'
            style={{"backgroundColor" : this.props.color, "color" : "#ffffff"}}
            active={this.props.activeFilter}
            onClick={() => this.props.click(this.props.index, this.props.activeFilter, this.props.id)}
        >
        {this.props.name}
        </Label>
    )
  }

}
export default CategoryItem;
