import React, {Component} from 'react';
import { Form, Divider, Grid, Icon, Popup } from 'semantic-ui-react';

import'./event.css';

const optionsMembers = [];
const optionsCategories = [];
const optionsProjects = [];

class Modal2 extends Component {
    state = { 
        open: false
    };    

    componentWillMount() {

        optionsMembers.length = 0;        
        optionsMembers.push(<option key={'0'} value={'none'}>Choisir un membre</option>);
        for (var i=0; i < this.props.theMembers.length; i++) {
            var aMember = {};
            aMember.key = this.props.theMembers[i].id;
            aMember.name = this.props.theMembers[i].firstName;               
            optionsMembers.push(<option key={aMember.key} value={aMember.name} >{aMember.name}</option>);  
              
        }

        optionsCategories.length = 0;
        optionsCategories.push(<option key={'0'} value={'none'}>Choisir une catégorie</option>);
        for (var j=0; j < this.props.theCategories.length; j++) {
            var aCategory = {};
            aCategory.key = this.props.theCategories[j].id;
            aCategory.name = this.props.theCategories[j].name;           
            optionsCategories.push(<option key={aCategory.key} value={aCategory.name}>{aCategory.name}</option>);            
        }

        optionsProjects.length = 0;
        optionsProjects.push(<option key={'0'} value={'none'}>Choisir un projet</option>);
        for (var k=0; k < this.props.theProjects.length; k++) {
            var aProject = {};
            aProject.key = this.props.theProjects[k].id;
            aProject.name = this.props.theProjects[k].name;           
            optionsProjects.push(<option key={aProject.key} value={aProject.name}>{aProject.name}</option>);            
        }
        
    };

    show = (dimmer) => () => this.setState({ dimmer, open: true });
    close = () => this.setState({ open: false });     

    render() {
    
        return (
        <div className='heightModal'>        
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3} />
                    <Grid.Column width={8}>
                        <Form>
                            <Form.Field>                
                                <label>Choix du membre<span className='fieldRequired'> *  </span><span style={{display: this.props.aMess1M2, color: 'red'}}>Sélectionner un membre</span></label>
                                <select name='memberChoice' value={this.props.myNameMember} onChange={this.props.updateStateNameMemberProp}>
                                    {optionsMembers}
                                </select>
                            </Form.Field>                        
                            <Divider hidden />
                            <Form.Field>            
                                <label>Choix de la catégorie<span className='fieldRequired'> *  </span><span style={{display: this.props.aMess2M2, color: 'red'}}>Sélectionner une catégorie</span></label>
                                <select name='categoryChoice' value={this.props.myNameCategory} onChange={this.props.updateStateNameCategoryProp}>
                                    {optionsCategories}
                                </select>
                            </Form.Field>
                            <Divider hidden />
                            <Form.Field>            
                                <label>Choix du project</label>
                                <select name='projectChoice' value={this.props.myNameProject} onChange={this.props.updateStateNameProjectProp}>
                                    {optionsProjects}
                                </select>
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Popup trigger={<Icon link className='margePlusTop' name='plus' size='big' color='orange' />}>
                            <Popup.Header>Ajouter un nouveau membre</Popup.Header>
                            <Popup.Content>En cliquant sur ce bouton vous pouvez créer un nouveau membre</Popup.Content>
                        </Popup>                        
                        <Divider hidden />
                        <Popup trigger={<Icon link className='margePlusCenter' name='plus' size='big' color='orange' />}>
                            <Popup.Header>Ajouter une nouvelle catégorie</Popup.Header>
                            <Popup.Content>En cliquant sur ce bouton vous pouvez créer une nouvelle catégorie</Popup.Content>
                        </Popup>                        
                        <Divider hidden />
                        <Popup trigger={<Icon link className='margePlusBottom' name='plus' size='big' color='orange' />}>
                            <Popup.Header>Ajouter un nouveau projet</Popup.Header>
                            <Popup.Content>En cliquant sur ce bouton vous pouvez créer un nouveau projet</Popup.Content>
                        </Popup>                        
                    </Grid.Column>
                    <Grid.Column width={3} />                    
                </Grid.Row>
            </Grid>                               
        </div>
        )
    }
}

export default Modal2

 