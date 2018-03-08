import { applySnapshot } from "mobx-state-tree";
import store from '../store/Store';
import { toast } from 'react-toastify';

var header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export function supprimerContact(contact) {
    fetch('http://127.0.0.1:5000/supprimerContact/'+contact.id,{
        headers: header,
        method: 'DELETE',
        body: JSON.stringify(contact)
    })
    .then(response => response.json())
    .then(data=> {
        initListeContacts();
        if (!!data.message) {
            toast.success(data.message, { // Toast
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } else {
            toast.error('Erreur: '+data.erreur, { // Toast
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    })
    .catch((ex) => {
        console.log('error supprimerContact():' + ex);
        console.log(ex.stack);
        toast.error('Error supprimerContact():' + ex, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
    });
}

export function initListeContacts() {
    fetch('http://127.0.0.1:5000/liste',{
        headers: header,
        method: 'GET'
    })
    .then(response => {
        if (!!response) {
            return response.json();
        }
    })
    .then((data) => {
        applySnapshot(store.contacts, data); // remplace le contenu de store.contacts par data
    })
    .catch((ex) => {
        console.log('error initListeContacts():' + ex);
        console.log(ex.stack);
        toast.error('Error initListeContacts():' + ex, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
    });
}

export function modifierContact(contact) {
    let contactModif = {
        id: contact.id,
        nom: contact.nom,
        prenom: store.modifContact.prenom,
        naissance: store.modifContact.naissance,
        telephone: store.modifContact.telephone,
        adresse: store.modifContact.adresse,
        civilite: store.modifContact.civilite
    }
    store.hideModal()

    fetch('http://127.0.0.1:5000/modifierContact/'+contactModif.id,{
        headers: header,
        method: 'PUT',
        body: JSON.stringify(contactModif)
    })
    .then(response => response.json())
    .then(data=> {
        initListeContacts();
        if (!!data.message) {
            toast.success(data.message, { // Toast
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } else {
            toast.error('Erreur: '+data.erreur, { // Toast
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    })
    .catch((ex) => {
        console.log('error modifierContact():' + ex);
        console.log(ex.stack);
        toast.error('Error modifierContact():' + ex, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    });
}

export function creerContact() {
    let contact = store.nouveauContactForm;
    fetch('http://127.0.0.1:5000/creerContact',{
        headers: header,
        method: 'POST',
        //mode: 'no-cors',
        body: JSON.stringify(contact)
    })
    .then(response => response.json())
    .then(data=> {
        store.resetFormulaire();
        if (!!data.message) {
            toast.success(data.message, { // Toast
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } else {
            toast.error('Erreur: '+data.erreur, { // Toast
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    })
    .catch((ex) => {
        console.log('Error creerContact():' + ex);
        console.log(ex.stack);
        toast.error('Error creerContact():' + ex, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    });
}

