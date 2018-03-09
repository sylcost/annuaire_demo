import React from 'react';
import { observer } from 'mobx-react';
import { Table, Button, Glyphicon, Popover, OverlayTrigger, Label } from 'react-bootstrap';
import store from '../store//Store';
import {supprimerContact} from '../rest/appelsRest';
import {ModifContact} from './ModifContact';


// Tableau representant tous les contacts, avec une fenetre modal pour la modification de chaque contact.
export const ListeContacts = observer(() => {

	// On affiche ce composant uniquement si le bouton Liste est clique.
	let style = store.action === 'liste' ?  {display: 'inline'} : {display: 'none'}

	// Chaque ligne du tableau, avec leur fenetre modal
	let lignes = store.contacts.map(contact => {
		let popover = (
			<Popover id={'popover'+contact.id} title={'Detail du contact '+contact.nom}>
				<div>
					<Label>Nom</Label> {contact.nom}
				</div>
				<div>
					<Label>Prenom</Label> {contact.prenom}
				</div>
				<div>
					<Label>Civilite</Label> {contact.civilite}
				</div>
				<div>
					<Label>Adresse</Label> {contact.adresse}
				</div>
				<div>
					<Label>Telephone</Label> {contact.telephone}
				</div>
				<div>
					<Label>Naissance</Label> {contact.naissance}
				</div>
			</Popover>
		  );
		return (<tr key={contact.id}>
					<td>{contact.id}</td>
					<td>{contact.nom}</td>
					<td>{contact.prenom}</td>
					<td>{contact.civilite}</td>
					<td>{contact.adresse}</td>
					<td>{contact.telephone}</td>
					<td>{contact.formatNaissance}</td>
					<td>
						<Button onClick={() => supprimerContact(contact)}>
							<Glyphicon glyph='trash' />
						</Button>
						<Button onClick={() => store.popupModifierContact(contact)}>
							<Glyphicon glyph='pencil' />
						</Button>
						<OverlayTrigger trigger={['hover', 'focus']} placement='right' overlay={popover}>
							<Button>
								<Glyphicon glyph='eye-open' />
							</Button>
						</OverlayTrigger>
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
					<th>Téléphone</th>
					<th>Naissance</th>
					<th>Actions</th>
                </tr>
            </thead>
            <tbody>
				{lignes}
            </tbody>
        </Table>
	);

});
