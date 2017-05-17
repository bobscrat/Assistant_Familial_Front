import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import './olga.css';

class Header extends Component {

    render() {
        
        let now = new Date().toLocaleString("fr", {weekday: "long", year: "numeric", month: "long", day: "numeric"})
        return(
            <Grid className="headerOlga">
               
                <Grid.Row>
                    <Grid.Column width={16} className="headerTitle">
                        Assistant Familial : On Line Gestion Assistant
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8} className="headerLeft">
                        Bonjour Clément
                    </Grid.Column>
                    <Grid.Column width={8} className="headerRight">
                        {now}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}
export default Header;