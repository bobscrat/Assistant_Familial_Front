import React, {Component} from 'react';

export default class Priority extends Component {

  transferEdit = () => {
    this.props.edit(this.props.id, this.props.name);
  }

  transferSuppr = () => {
    this.props.suppr(this.props.id);
  }


  render() {
    return(
      <div className="priority">
        {this.props.id} - {this.props.name} -
        <button type="button" onClick={this.transferEdit}>Edit</button>
        <button type="button" onClick={this.transferSuppr}>Suppr</button>
      </div>
    )
  }

}
