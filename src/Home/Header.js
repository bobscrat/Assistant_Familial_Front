import React, { Component } from 'react';
import { Grid, Icon, Button, Image, Popup } from 'semantic-ui-react';

import './olga.css';
import logo from './logo_olga_white.png';
import EditProfil from '../Profil/EditProfil.js';

class Header extends Component {

    render() {
        
        let now = new Date().toLocaleString("fr", {weekday: "long", year: "numeric", month: "long", day: "numeric"})
        return(
            <Grid className="headerOlga" verticalAlign='middle'>
               
                <Grid.Row>
                    <Grid.Column only='computer' width={4} className="headerLeft" >
                    </Grid.Column>
                    <Grid.Column only='computer' width={8} className="headerTitle">
                      <Image src={logo} className='logo' centered/>
                    </Grid.Column>
                    <Grid.Column only='computer' width={4} className="headerRight" >
                        <Popup trigger={<Icon link className='connexion' name='shutdown' size='big' onClick={this.props.logoutUser}/>}>
                            <Popup.Header>Déconnexion</Popup.Header>
                            <Popup.Content>
                                En cliquant sur ce bouton, vous vous déconnectez de l'application.
                            </Popup.Content>
                        </Popup>
                    </Grid.Column>

                     <Grid.Column only='tablet' width={10} className="headerTitle">
                        <Image src={logo} className='logo' centered/>
                    </Grid.Column>
                     <Grid.Column only='tablet' width={6} className="headerRight" >                        
                        <Popup trigger={<Icon link className='connexion' name='shutdown' size='big' onClick={this.props.logoutUser}/>}>
                            <Popup.Header>Déconnexion</Popup.Header>
                            <Popup.Content>
                                En cliquant sur ce bouton, vous vous déconnectez de l'application.
                            </Popup.Content>
                        </Popup>
                    </Grid.Column>

                    <Grid.Column only='mobile' width={10} className="headerTitle">
                        <Image src={logo} className='logo-icone' centered/>
                    </Grid.Column>                                       
                    <Grid.Column only='mobile' width={6} className="headerRight" >
                        <Popup trigger={<Icon link className='connexion' name='shutdown' size='big' onClick={this.props.logoutUser}/>}>
                            <Popup.Header>Déconnexion</Popup.Header>
                            <Popup.Content>
                                En cliquant sur ce bouton, vous vous déconnectez de l'application.
                            </Popup.Content>
                        </Popup>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column only='computer' width={4} className="headerLeft">
                        Bonjour {this.props.user.firstName}
                    </Grid.Column>
                     <Grid.Column only='computer' width={8} className="headerCenter">
                        {now}
                    </Grid.Column>
                    <Grid.Column only='computer' width={4} className="headerRight" >                        
                        <EditProfil myProfil={this.props.user}/>
                    </Grid.Column>

                    <Grid.Column only='tablet' width={10} className="headerCenter">
                        {now}
                    </Grid.Column>
                     <Grid.Column only='tablet' width={6} className="headerRight">
                        <Popup trigger={
                            <Button as='a' basic className='profil' >
                                <Icon name='pencil' />
                                mon profil
                            </Button>
                            }>
                            <Popup.Header>Modifier mes données personnelles</Popup.Header>
                            <Popup.Content>
                                En cliquant sur ce bouton, vous pouvez modifier vos données personnelles.
                            </Popup.Content>
                        </Popup>
                    </Grid.Column>

                     <Grid.Column only='mobile' width={10} className="headerCenter">
                        {now}
                    </Grid.Column>
                   <Grid.Column only='mobile' width={6} className="headerRight">
                        <Popup trigger={
                                <Button as='a' basic className='profil' >
                                    <Icon name='pencil' />
                                    mon profil
                                </Button>
                            }>
                            <Popup.Header>Modifier ses données personnelles</Popup.Header>
                            <Popup.Content>
                                En cliquant sur ce bouton, vous pouvez modifier vos données personnelles.
                            </Popup.Content>
                        </Popup>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}
export default Header;