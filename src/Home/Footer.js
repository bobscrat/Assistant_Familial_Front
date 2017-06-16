import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import './olga.css';

class Footer extends Component {

    render() {
        
        return(
            <Grid className="headerOlga" verticalAlign='middle'>
               
                <Grid.Row>
                    <Grid.Column width={16} >
                        <h3>La vie de famille a sa douceur pour ceux qui en portent le poids.</h3>
                        <div className="citation">Citation de Henri-Frédéric Amiel ; Journal intime, le 9 octobre 1872.</div>
                    </Grid.Column>                   
                </Grid.Row>
            </Grid>
        )
    }

}
export default Footer;