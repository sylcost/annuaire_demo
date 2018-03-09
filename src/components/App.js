import React from 'react';
import { observer } from 'mobx-react';
import { Grid, Navbar, Jumbotron, ToggleButtonGroup, ToggleButton, Nav, NavItem } from 'react-bootstrap';
import {ListeContacts}  from './ListeContacts';
import {NouveauContact}  from './NouveauContact';
import store from '../store/Store';
import {initListeContacts} from '../rest/appelsRest';
import { ToastContainer } from 'react-toastify';

export const App = observer(() => {

    return (
      <div>
        <Navbar inverse fixedTop>
          <Nav>
            <NavItem onClick={() => changeAction('nouveau')}>Creation</NavItem>
            <NavItem onClick={() => changeAction('liste')}>Visualisation</NavItem>
          </Nav>
        </Navbar>
        <Jumbotron>
          <Grid>
            <h1>ANNUAIRE</h1>
          </Grid>
        </Jumbotron>
        <Grid bsClass='container'>
          <ToggleButtonGroup name='action' bsSize="large"  defaultValue={store.action} onChange={(a) => changeAction(a)} justified >
            <ToggleButton bsStyle="primary" bsSize="large" value='nouveau' >Nouveau</ToggleButton>
            <ToggleButton bsStyle="primary" bsSize="large" value='liste' >Liste</ToggleButton>
          </ToggleButtonGroup >
          <Grid bsClass='container-fluid'>
            <ListeContacts />
            <NouveauContact />
            <ToastContainer />
          </Grid>
        </Grid>
      </div>
    );

    // Clic sur un bouton ou sur le menu
    function changeAction(a) {
      store.changeAction(a);
      if (a === 'liste') {
        initListeContacts();
      }
    }

});