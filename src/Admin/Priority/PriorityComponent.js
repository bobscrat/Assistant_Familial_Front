import React, {Component} from 'react';
import {Divider, Grid, Header} from 'semantic-ui-react';

import PriorityForm from '../Priority/PriorityForm.js';
import PrioritySearch from '../Priority/PrioritySearch.js';
import PriorityTable from '../Priority/PriorityTable.js';

class PriorityComponent extends Component {
  render() {
    return (
      <Grid columns={2} padded>
        <Grid.Row>
          <Grid.Column>
            <Header as="h4">Modification</Header>
            <PriorityTable/>
          </Grid.Column>
          <Grid.Column>
            <Header as="h4">Recherche</Header>
            <PrioritySearch/>
            <Divider section />
            <Header as="h4">Enregistrement et modification</Header>
            <PriorityForm/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}

export default PriorityComponent;
