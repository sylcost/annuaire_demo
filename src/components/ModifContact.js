import React from 'react';
import { observer } from 'mobx-react';
import { FormControl, FormGroup, ControlLabel, Button, Modal } from 'react-bootstrap';
import store from '../store/Store';
import {modifierContact} from '../rest/AppelsRest';

// Fenetre modal pour la modification d'un contact
export const ModifContact = observer(({contact}) => {
    console.log('contact:'+JSON.stringify(contact));

    return (<Modal show={store.afficheModal(contact)} onHide={() => store.hideModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Modification d'un contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <ControlLabel>Prenom</ControlLabel>
                        <FormControl 
                            id="inputPrenom"
                            type="text"
                            label="Text"
                            placeholder="Enter text"
                            value={store.modifContact.prenom} 
                            onChange={(e) => store.changePrenomModif(e)} />
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Civilité</ControlLabel>
                        <FormControl componentClass="select" placeholder="bobbby" id="inputCivilite" value={store.modifContact.civilite} onChange={(e) => store.changeCiviliteModif(e)}>
                            <option ></option>
                            <option >H</option>
                            <option >F</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Adresse</ControlLabel>
                        <FormControl 
                            id="inputAdresse"
                            type="text"
                            label="Text"
                            placeholder="Enter text"
                            value={store.modifContact.adresse} 
                            onChange={(e) => store.changeAdresseModif(e)} />
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Telephone</ControlLabel>
                        <FormControl 
                            id="inputTelephone"
                            type="text"
                            label="Text"
                            placeholder="Enter text"
                            value={store.modifContact.telephone}
                            onChange={(e) => store.changeTelephoneModif(e)} />
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Naissance</ControlLabel>
                        <FormControl 
                            id="inputNaissance"
                            type="text"
                            label="Text"
                            placeholder="Enter text"
                            value={store.modifContact.naissance}
                            onChange={(e) => store.changeNaissanceModif(e)} />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-danger' onClick={() => store.hideModal()}>Annuler</Button>
                    <Button className='btn btn-success' onClick={() => modifierContact(contact)}>Modifier</Button>
                </Modal.Footer>
            </Modal>
    );

});
