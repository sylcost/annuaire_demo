import React from 'react';
import { observer } from 'mobx-react';
import { FormControl, FormGroup, ControlLabel, Button, Alert } from 'react-bootstrap';
import store from '../store/Store';
import {creerContact} from '../rest/AppelsRest';

// Formulaire de saisie d'un nouveau contact
export const NouveauContact = observer(() => {

    // On affiche ce composant uniquement si le bouton Nouveau est clique.
    let style = store.action === 'nouveau' ?  {display: 'inline'} : {display: 'none'};

    let styleAlert = store.restRetour !== '' ?  {} : {display: 'none'}

    return (<div style={style}>
                <FormGroup validationState={store.nomManquant}>
                    <ControlLabel>Nom</ControlLabel>
                    <FormControl 
                        id="inputNom"
                        type="text"
                        label="Text"
                        placeholder="Enter text"
                        value={store.nouveauContact.nom} 
                        onChange={(e) => store.changeNomNouveau(e)}/>
                </FormGroup>
                <FormGroup >
                    <ControlLabel>Prenom</ControlLabel>
                    <FormControl 
                        id="inputPrenom"
                        type="text"
                        label="Text"
                        placeholder="Enter text"
                        value={store.nouveauContact.prenom} 
                        onChange={(e) => store.changePrenomNouveau(e)} />
                </FormGroup>
                <FormGroup >
                    <ControlLabel>Civilité</ControlLabel>
                    <FormControl componentClass="select" placeholder="bobbby" id="inputCivilite" value={store.nouveauContact.civilite} onChange={(e) => store.changeCiviliteNouveau(e)}>
                        <option ></option>
                        <option >H</option>
                        <option >F</option>
                    </FormControl>
                </FormGroup>
                <FormGroup >
                    <ControlLabel>Adresse</ControlLabel>
                    <FormControl 
                        id="inputAdresse"
                        type="text"
                        label="Text"
                        placeholder="Enter text"
                        value={store.nouveauContact.adresse} 
                        onChange={(e) => store.changeAdresseNouveau(e)} />
                </FormGroup>
                <FormGroup >
                    <ControlLabel>Telephone</ControlLabel>
                    <FormControl 
                        id="inputTelephone"
                        type="text"
                        label="Text"
                        placeholder="Enter text"
                        value={store.nouveauContact.telephone}
                        onChange={(e) => store.changeTelephoneNouveau(e)} />
                </FormGroup>
                <FormGroup >
                    <ControlLabel>Naissance</ControlLabel>
                    <FormControl 
                        id="inputNaissance"
                        type="text"
                        label="Text"
                        placeholder="Enter text"
                        value={store.nouveauContact.naissance}
                        onChange={(e) => store.changeNaissanceNouveau(e)} />
                </FormGroup>
                <Button className='btn btn-primary' onClick={() => ajouterContact()} >Ajouter</Button>
                <Alert bsStyle="warning" style={styleAlert}>
                    {store.restRetour}
                </Alert>
            </div>
    );

    function ajouterContact() {
        // Si le nom n'est pas renseigne on ne fait rien
        if (store.nouveauContact.nom != null && store.nouveauContact.nom !== '') {
            creerContact();
        }
    }

});
