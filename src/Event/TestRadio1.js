import React from 'react';

class CheckAndUncheck extends React.Component {

  constructor(props) {
    super(props);
    this.checkIt = this.checkIt.bind(this);
    this.unCheckIt = this.unCheckIt.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checked1:true,
      checked2:false
    };
  }

  checkIt() {
    this.setState({
      checked:true
    });
  }

  unCheckIt() {
    this.setState({
      checked:false
    });
  }

  handleChange(evt) {
      console.log(evt.target.checked);
      console.log(evt.target.value);
      switch (evt.target.value) {
          case '1':
            if (this.state.checked1 === true) {
                this.setState({
                    checked1: false,
                    checked2: true
                })
            }else{
                this.setState({
                    checked1: true,
                    checked2: false
                })
            }
          break;
          case '2':
            if (this.state.checked2 === true) {
                this.setState({
                    checked2: false,
                    checked1: true
                })
            }else{
                this.setState({
                    checked2: true,
                    checked1: false
                })
            }
          break;
      }
      if (evt.target.value === '1') {
        this.setState({
            checked1:evt.target.checked
        });
      }else{
        this.setState({
            checked2:evt.target.checked
        });
      }
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.checkIt}>Check</button> &nbsp;&nbsp;&nbsp; <button onClick={this.unCheckIt}>Uncheck</button>
        </div>
        <br/>
        <div>
          Checkbox 1:: <input type="radio" value='RDV' checked={this.state.checked1} onChange={this.handleChange}/>
        </div>
        <br/>
        <div>
          Radio button 2:: <input type="radio" value='Prise de RDV' checked={this.state.checked2} onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}



export default CheckAndUncheck;
