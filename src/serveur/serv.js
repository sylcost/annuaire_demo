const express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser')

var app = express();

// Conf pour les appels REST
app.use(bodyParser.urlencoded({ 
  extended: false
}));
app.use( bodyParser.json() );

// Header
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Conf Sequelize user:annuaire mdp:annuaire schema:sannuaire
var sequelize = new Sequelize('mysql://annuaire:annuaire@localhost:3306/sannuaire');
var Contact = sequelize.define('contact', {
        id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
        nom: {
        type: Sequelize.STRING
        },
        prenom: {
        type: Sequelize.STRING
        },
        adresse: {
        type: Sequelize.STRING
        },
        telephone: {
        type: Sequelize.STRING
        },
        civilite: {
        type: Sequelize.STRING
        },
        naissance: {
        type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // nom table = Contact
    }
);

Contact.sync({force: true}); // Drop et recree la table au demarrage

var server = app.listen(5000, function() {
    console.log('Serveur demarre sur le port 5000');
});

app.get('/liste', function (req, res) {
    Contact.findAll()
    .then(c => res.end( JSON.stringify(c) ))
    .catch(erreur => res.json({'erreur': 'Erreur lors de la recuperation des contacts: '+erreur}));
});

app.post('/creerContact', function (req, res) {
    Contact.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        naissance: req.body.naissance,
        adresse: req.body.adresse,
        civilite: req.body.civilite,
        telephone: req.body.telephone
    }).then(c => res.json({'message': 'Le contact '+c.id+' a bien ete cree'})
    ).catch(erreur => res.json({'erreur': 'Erreur lors de la creation du contact: '+erreur}));
});

app.delete('/supprimerContact/:id', function (req, res) {
    Contact.destroy({  
        where: { id: req.params.id }
    }).then(c => res.json({'message': 'Le contact '+req.params.id+' a bien ete supprime'})
    ).catch(erreur => res.json({'erreur': 'Erreur lors de la suppression du contact '+req.params.id+': '+erreur}));
});

app.put('/modifierContact/:id', function(req, res){
    Contact.update({
        prenom: req.body.prenom,
        naissance: req.body.naissance,
        adresse: req.body.adresse,
        civilite: req.body.civilite,
        telephone: req.body.telephone
    }, {
        where: { id: req.params.id }
    }).then(c => res.json({'message': 'Le contact '+req.params.id+' a bien ete modifie'})
    ).catch(erreur => res.json({'erreur': 'Erreur lors de la mise a jour du contact '+req.params.id+': '+erreur}));
});