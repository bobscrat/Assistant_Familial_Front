import React, {Component} from 'react';
import {Container, Grid, Icon, Label, Segment, Form, Divider } from 'semantic-ui-react';

import '../Home/olga.css';
import './search.css';

class Search extends Component {
  
    render() {

        return(
            <Container>
                <Grid verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column only='computer'>                            
                            <Segment raised>
                                <Label color='orange' ribbon><Icon size='large' name='search'/>Recherche avancée</Label>
                                <Divider hidden fitted />
                                <Form>      
                                    <Form.Group className='formSearch'>                                                                
                                        <Form.Input size='mini' placeholder='Tâche'/>
                                        <Form.Input size='mini' placeholder='Projet'/>
                                        <Form.Input size='mini' placeholder='Membre'/>
                                        <Form.Input size='mini' placeholder='Catégorie'/>   
                                        <Form.Input size='mini' placeholder='Nom de la tâche'/>   
                                        <Form.Button compact color='orange' icon={<Icon name='search'/>} />   
                                    </Form.Group>                                                                                   
                                </Form>                                                                       
                            </Segment>                                
                        </Grid.Column>
                    </Grid.Row>
                </Grid>                    
            </Container>
        )
    }
};

export default Search;