
import { types } from "mobx-state-tree";

const Contact = types.model("Contact", {
    id: types.optional(types.number, 0),
    nom: types.optional(types.string, ''),
    prenom: types.optional(types.string, ''),
    civilite: types.optional(types.string, ''),
    adresse: types.optional(types.string, ''),
    telephone: types.optional(types.string, ''),
    naissance: types.optional(types.string, '')
});


const Store = types.model("Store", {
  contacts: types.array(Contact),
  nouveauContact: types.optional(Contact, {}), // Form creation
  modifContact: types.optional(Contact, {}), // Form modif
  action: types.optional(types.string, ''), // ajout/visu en fonction du bouton selectionne
  modalId: types.optional(types.number, -1), // id de la popup modif a ouvrir
  restRetour: types.optional(types.string, '') // affichage du retour REST de creation de contact
}).actions((self) => ({
    
    // Methodes pour le form nouveau contact
    changeNomNouveau(e) {
        self.nouveauContact.nom = e.target.value;
    },
    changePrenomNouveau(e) {
        self.nouveauContact.prenom = e.target.value;
    },
    changeAdresseNouveau(e) {
        self.nouveauContact.adresse = e.target.value;
    },
    changeCiviliteNouveau(e) {
        self.nouveauContact.civilite = e.target.value;
    },
    changeTelephoneNouveau(e) {
        self.nouveauContact.telephone = e.target.value;
    },
    changeNaissanceNouveau(e) {
        self.nouveauContact.naissance = e.target.value;
    },
    // Methodes pour le form modif contact
    changePrenomModif(e) {
        self.modifContact.prenom = e.target.value;
    },
    changeAdresseModif(e) {
        self.modifContact.adresse = e.target.value;
    },
    changeCiviliteModif(e) {
        self.modifContact.civilite = e.target.value;
    },
    changeTelephoneModif(e) {
        self.modifContact.telephone = e.target.value;
    },
    changeNaissanceModif(e) {
        self.modifContact.naissance = e.target.value;
    },
    // Clic sur un bouton Nouveau / Liste
    changeAction(action) {
        self.action = action;
        // On supprime le message de retour de l'appel rest de creation
        self.restRetour = '';
    },
    // Validation du nouveau contact
    ajouterContact() {
        let contact = Contact.create({
            id: 0,
            nom: self.nouveauContact.nom,
            prenom: self.nouveauContact.prenom,
            naissance: self.nouveauContact.naissance,
            adresse: self.nouveauContact.adresse,
            civilite: self.nouveauContact.civilite,
            telephone: self.nouveauContact.telephone
        });
        self.contacts.push(contact);
        self.resetFormulaire();
    },
    // Reset le form du nouveau contact
    resetFormulaire() {
        self.nouveauContact.nom = '';
        self.nouveauContact.prenom = '';
        self.nouveauContact.naissance = '';
        self.nouveauContact.telephone = '';
        self.nouveauContact.adresse = '';
        self.nouveauContact.civilite = '';
        self.restRetour = '';
    },
    // Ouvre la popup de modif, alimente le form avec les info du contact selectionne. "Nom" non modifiable.
    popupModifierContact(contact) {
        self.modalId = contact.id;
        self.modifContact.prenom = contact.prenom;
        self.modifContact.naissance = contact.naissance;
        self.modifContact.telephone = contact.telephone;
        self.modifContact.adresse = contact.adresse;
        self.modifContact.civilite = contact.civilite;
    },
    hideModal() {
        self.modalId = -1;
    },
    setRestRetour(message) {
        self.restRetour = message;
    }

})).views((self) => ({
    get nomManquant() {
        return self.nouveauContact.nom !== '' ? null : 'error'; // pour le validation state du champ Nom.
    },
    get nouveauContactForm() {
        return Contact.create( {
            id: 0,
            nom: self.nouveauContact.nom,
            prenom: self.nouveauContact.prenom,
            naissance: self.nouveauContact.naissance,
            adresse: self.nouveauContact.adresse,
            civilite: self.nouveauContact.civilite,
            telephone: self.nouveauContact.telephone
        });
    },
    // Affiche la bonne modal en fonction de la ligne cliquee
    afficheModal(contact) {
        return contact.id === self.modalId;
    }
}));

const store = Store.create({
    contacts: []
});

export default store;
