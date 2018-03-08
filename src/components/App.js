import React from 'react';
import { observer } from 'mobx-react';
import { Grid, Navbar, Jumbotron, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import {ListeContacts}  from './ListeContacts';
import {NouveauContact}  from './NouveauContact';
import store from '../store/Store';
import {initListeContacts} from '../rest/appelsRest';
import { ToastContainer } from 'react-toastify';

export const App = observer(() => {

    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">React App</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Jumbotron>
          <Grid>
            <h1>ANNUAIRE</h1>
          </Grid>
        </Jumbotron>
        <div className='container'>
          <ToggleButtonGroup name='action' bsSize="large"  defaultValue={store.action} onChange={(a) => changeAction(a)} justified >
            <ToggleButton bsStyle="primary" bsSize="large" value='nouveau' >Nouveau</ToggleButton>
            <ToggleButton bsStyle="primary" bsSize="large" value='liste' >Liste</ToggleButton>
          </ToggleButtonGroup >
          <div className='container'>
            <ListeContacts />
            <NouveauContact />
            <ToastContainer />
          </div>
        </div>
      </div>
    );

    // Clic sur un bouton
  function changeAction(a) {
    store.changeAction(a);
    if (a === 'liste') {
      initListeContacts();
    }
  }

});