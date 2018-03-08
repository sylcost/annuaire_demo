import store from '../store/Store';
import { toast } from 'react-toastify';
import {creerContact, modifierContact} from '../rest/appelsRest';

// Valide (vite fait) les champs naissance, telephone et nom, declenche un toaster si un champ n'est pas valide
function validerFormulaire(nom, naissance, telephone) {
    if (!valideDate(naissance)) {
        toast.error('La date de naissance doit etre au format JJ/MM/AAAA', { // Toast
            position: toast.POSITION.BOTTOM_CENTER
        });
        return false;
    } else if (!valideTelephone(telephone)) {
        toast.error('Le numero de telephone doit etre constitue de 10 chiffres', { // Toast
            position: toast.POSITION.BOTTOM_CENTER
        });
        return false;
    } else if (!nom || nom.length === 0) {
        toast.error('Le nom est obligatoire', { // Toast
            position: toast.POSITION.BOTTOM_CENTER
        });
        return false;
    }
    // Valid OK
    return true;
    
}

export function validerFormulaireModif(contact) {
    
    if (validerFormulaire(contact.nom, store.modifContact.naissance, store.modifContact.telephone)) {
        modifierContact(contact);
    }
}

export function validerFormulaireCreation(nom) {
    
    if (validerFormulaire(nom, store.nouveauContact.naissance, store.nouveauContact.telephone)) {
        creerContact();
    }
}

function valideDate(date) {
    return !date || date.length === 0 || (date.length === 10 && date.match('[0-9]{2}/[0-9]{2}/[0-9]{4}'));
}

function valideTelephone(telephone) {
    return !telephone || telephone.length === 0 || (telephone.length === 10 && telephone.match('[0-9]{10}'));
}