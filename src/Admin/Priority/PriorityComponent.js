import React, {Component} from 'react';
import {Divider, Grid} from 'semantic-ui-react';

import PriorityForm from '../Priority/PriorityForm.js';
import PrioritySearch from '../Priority/PrioritySearch.js';
import PriorityTable from '../Priority/PriorityTable.js';

class PriorityComponent extends Component {
  render() {
    return (
      <Grid columns={2} padded>
        <Grid.Row>
          <Grid.Column>
            <PriorityTable/>
          </Grid.Column>
          <Grid.Column>
            <PrioritySearch/>
            <Divider section />
            <PriorityForm/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}

export default PriorityComponent;
