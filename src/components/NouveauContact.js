import React from 'react';
import { observer } from 'mobx-react';
import { FormControl, FormGroup, ControlLabel, Button, Fade, Well } from 'react-bootstrap';
import store from '../store/Store';
import {validerFormulaireCreation} from '../commun/validForm';

// Formulaire de saisie d'un nouveau contact
export const NouveauContact = observer(() => {

    return (
        <Fade in={store.action === 'nouveau'}>
            <div>
                <Well>
                    <FormGroup validationState={store.nomManquant}>
                        <ControlLabel>Nom</ControlLabel>
                        <FormControl 
                            type="text"
                            placeholder="Nom"
                            value={store.nouveauContact.nom} 
                            onChange={(e) => store.changeNomNouveau(e)}/>
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Prenom</ControlLabel>
                        <FormControl 
                            type="text"
                            placeholder="Prenom"
                            value={store.nouveauContact.prenom} 
                            onChange={(e) => store.changePrenomNouveau(e)} />
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Civilité</ControlLabel>
                        <FormControl componentClass="select" id="inputCivilite" value={store.nouveauContact.civilite} onChange={(e) => store.changeCiviliteNouveau(e)}>
                            <option ></option>
                            <option >H</option>
                            <option >F</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Adresse</ControlLabel>
                        <FormControl 
                            type="text"
                            placeholder="Adresse"
                            value={store.nouveauContact.adresse} 
                            onChange={(e) => store.changeAdresseNouveau(e)} />
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Telephone</ControlLabel>
                        <FormControl 
                            type="text"
                            placeholder="Telephone"
                            value={store.nouveauContact.telephone}
                            onChange={(e) => store.changeTelephoneNouveau(e)} />
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Naissance</ControlLabel>
                        <FormControl 
                            type="text"
                            placeholder="Format JJ/MM/AAAA"
                            value={store.nouveauContact.naissance}
                            onChange={(e) => store.changeNaissanceNouveau(e)} />
                    </FormGroup>
                    <Button className='btn btn-primary' onClick={() => validerFormulaireCreation(store.nouveauContact.nom)} >Ajouter</Button>
                </Well>
            </div>
        </Fade>
    );

});
