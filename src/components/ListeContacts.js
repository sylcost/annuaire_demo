import React from 'react';
import { observer } from 'mobx-react';
import { Table, Button, Glyphicon } from 'react-bootstrap';
import store from '../store//Store';
import {supprimerContact} from '../rest/AppelsRest';
import {ModifContact} from './ModifContact';


// Tableau representant tous les contacts, avec une fenetre modal pour la modification de chaque contact.
export const ListeContacts = observer(() => {

	// On affiche ce composant uniquement si le bouton Liste est clique.
	let style = store.action === 'liste' ?  {display: 'inline'} : {display: 'none'}

	// Chaque ligne du tableau, avec leur fenetre modal
	let lignes = store.contacts.map(contact => {
		return (<tr key={contact.id}>
					<td>{contact.id}</td>
					<td>{contact.nom}</td>
					<td>{contact.prenom}</td>
					<td>{contact.civilite}</td>
					<td>{contact.adresse}</td>
					<td>{contact.naissance}</td>
					<td>{contact.telephone}</td>
					<td>
						<Button onClick={() => supprimerContact(contact)}>
							<Glyphicon glyph="trash" />
						</Button>
						<Button onClick={() => store.popupModifierContact(contact)}>
							<Glyphicon glyph="pencil" />
						</Button>
						<ModifContact contact={contact}/>
					</td>
				</tr>
				);
	});

	// Affichage des noms de colonnes et des lignes
	return (
		<Table striped condensed hover style={style}>
            <thead>
                <tr>
					<th>#</th>
					<th>Nom</th>
					<th>Prenom</th>
					<th>Civilité</th>
					<th>Adresse</th>
					<th>Naissance</th>
					<th>Telephone</th>
					<th>Actions</th>
                </tr>
            </thead>
            <tbody>
				{lignes}
            </tbody>
        </Table>
	);

});