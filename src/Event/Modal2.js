import React, {Component} from 'react';
import { Input, Form, Divider, Grid } from 'semantic-ui-react';
import * as utils from '../Utils/utils.js';
import'./event.css';

class Modal2 extends Component {
    state = { 
        open: false,
        categories: [],
        members: [],
        projects: []
    };

    componentWillMount() {
        utils.loadCategories(this); // =this.setState({categories: categories})
        utils.loadMembers(this); // =this.setState({members: members})
        utils.loadProjects(this); // =this.setState({projects: projects})      
    };

    show = (dimmer) => () => this.setState({ dimmer, open: true });
    close = () => this.setState({ open: false });
  
    handleMemberChangePriority = (e, { value }) => {
        console.log('select = ' + value)
    }

  render() {
    
    return (
      <div className='heightModal'>        
        <Grid>
            <Grid.Row>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={10}>
                <Form.Group>
                  <Form.Field>
                      <Form.Select
                        label="Nom du membre"
                        options={this.state.members.map(member => <option key={member.id} >{member.firstName}</option>)}
                        placeholder='Nom du membre'
                        selection
                        value={this.state.members.id}
                        name='member'
                        onChange={this.handleMemberChange}
                      />
                      <label>Nom du membre</label><span className='fieldRequired'> *</span>
                      <Input fluid name="nameUser" value={this.props.myNameUser} placeholder='nom du membre' onChange={this.props.updateStateNameUserProp}/>
                  </Form.Field>
                  <Divider hidden />
                  <Form.Field>
                      <label>Nom de la catégorie</label><span className='fieldRequired'> *</span>
                      <Input fluid name="nameCategory" value={this.props.myNameCategory} placeholder='nom de la catégorie' onChange={this.props.updateStateNameCategoryProp}/>
                  </Form.Field>
                  <Divider hidden />
                  <Form.Field>
                      <label>Nom du projet</label>
                      <Input fluid name="nameProject" value={this.props.myNameProject} placeholder='nom du projet' onChange={this.props.updateStateNameProjectProp}/>
                  </Form.Field>
                </Form.Group>
            </Grid.Column>
            <Grid.Column width={3}>
            </Grid.Column>
            </Grid.Row>
        </Grid>                               
      </div>
    )
  }
}

export default Modal2

 