import React from 'react';
import { observer } from 'mobx-react';
import { FormControl, FormGroup, ControlLabel, Button, Modal } from 'react-bootstrap';
import store from '../store/Store';
import {validerFormulaireModif} from '../commun/validForm';

// Fenetre modal pour la modification d'un contact
export const ModifContact = observer(({contact}) => {

    return (<Modal show={store.afficheModal(contact)} onHide={() => store.hideModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Modification du contact {contact.nom}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <ControlLabel>Prenom</ControlLabel>
                        <FormControl 
                            id="inputPrenom"
                            type="text"
                            label="Text"
                            placeholder="Prenom"
                            value={store.modifContact.prenom} 
                            onChange={(e) => store.changePrenomModif(e)} />
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Civilité</ControlLabel>
                        <FormControl componentClass="select" id="inputCivilite" value={store.modifContact.civilite} onChange={(e) => store.changeCiviliteModif(e)}>
                            <option ></option>
                            <option >H</option>
                            <option >F</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Adresse</ControlLabel>
                        <FormControl 
                            type="text"
                            placeholder="Adresse"
                            value={store.modifContact.adresse} 
                            onChange={(e) => store.changeAdresseModif(e)} />
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Telephone</ControlLabel>
                        <FormControl 
                            type="text"
                            placeholder="10 Chiffres"
                            value={store.modifContact.telephone}
                            onChange={(e) => store.changeTelephoneModif(e)} />
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Naissance</ControlLabel>
                        <FormControl 
                            type="text"
                            placeholder="Format AAAA-MM-JJ"
                            value={store.modifContact.naissance}
                            onChange={(e) => store.changeNaissanceModif(e)} />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-danger' onClick={() => store.hideModal()}>Annuler</Button>
                    <Button className='btn btn-success' onClick={() => validerFormulaireModif(contact)}>Modifier</Button>
                </Modal.Footer>
            </Modal>
    );

    

});
