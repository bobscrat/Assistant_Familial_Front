import React, { Component } from 'react';
import { Grid, Icon, Button } from 'semantic-ui-react';

import './olga.css';

class Header extends Component {

    render() {
        
        let now = new Date().toLocaleString("fr", {weekday: "long", year: "numeric", month: "long", day: "numeric"})
        return(
            <Grid className="headerOlga" verticalAlign='middle'>
               
                <Grid.Row>
                    <Grid.Column only='computer' width={4} className="headerLeft" >
                    </Grid.Column>
                    <Grid.Column only='computer' width={8} className="headerTitle">
                        On Line Gestion Assistant
                    </Grid.Column>
                    <Grid.Column only='computer' width={4} className="headerRight" >
                        <Icon link className='connexion' name='shutdown' size='big' onClick={this.props.logoutUser}/>
                    </Grid.Column>

                     <Grid.Column only='tablet' width={10} className="headerTitle">
                        On Line Gestion Assistant
                    </Grid.Column>
                     <Grid.Column only='tablet' width={6} className="headerRight" >
                        <Icon link className='connexion' name='shutdown' size='big'/>
                    </Grid.Column>

                    <Grid.Column only='mobile' width={10} className="headerTitle">
                        OLGA
                    </Grid.Column>                                       
                    <Grid.Column only='mobile' width={6} className="headerRight" >
                        <Icon link className='connexion' name='shutdown' size='big'/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column only='computer' width={4} className="headerLeft">
                        Bonjour {this.props.user.firstName},
                    </Grid.Column>
                     <Grid.Column only='computer' width={8} className="headerCenter">
                        {now}
                    </Grid.Column>
                    <Grid.Column only='computer' width={4} className="headerRight" >
                        <Button as='a' basic className='profil' >
                            <Icon name='pencil' />
                             mon profil
                        </Button>
                    </Grid.Column>

                    <Grid.Column only='tablet' width={10} className="headerCenter">
                        {now}
                    </Grid.Column>
                     <Grid.Column only='tablet' width={6} className="headerRight">
                        <Button as='a' basic className='profil' >
                            <Icon name='pencil' />
                             mon profil
                        </Button>
                    </Grid.Column>

                     <Grid.Column only='mobile' width={10} className="headerCenter">
                        {now}
                    </Grid.Column>
                   <Grid.Column only='mobile' width={6} className="headerRight">
                        <Button as='a' basic className='profil' >
                            <Icon name='pencil' />
                             mon profil
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}
export default Header;