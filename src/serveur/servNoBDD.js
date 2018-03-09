var express = require('express');
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

var server = app.listen(5000, function() {
    console.log('Serveur demarre sur le port 5000');
});

// Normalement stoque en BDD, compteur represente l'auto increment id.
var compteur = 0;
var listeContacts = [];


app.get('/liste', function(req, res){
    res.json(listeContacts);
});

app.post('/creerContact', function(req, res){
    listeContacts.push({
        id: compteur,
        nom: req.body.nom,
        prenom: req.body.prenom,
        naissance: req.body.naissance,
        adresse: req.body.adresse,
        civilite: req.body.civilite,
        telephone: req.body.telephone
    });
    let message = 'Le contact '+compteur+' a bien ete cree';
    compteur++;
    res.json({'message': message});
});

app.put('/modifierContact/:id', function(req, res){
    let contact = listeContacts.find(contact => contact.id == req.params.id);
    let reponse = {message: 'Le contact '+req.params.id+' a bien ete modifie'};
    if (!!contact) {
        contact.prenom = req.body.prenom;
        contact.adresse = req.body.adresse;
        contact.naissance = req.body.naissance;
        contact.civilite = req.body.civilite;
        contact.telephone = req.body.telephone;
    } else {
        reponse = {erreur: 'impossible de trouver le contact id='+req.params.id};
    }
    res.json(reponse);
});

app.delete('/supprimerContact/:id', function(req, res){
    let contact = listeContacts.find(contact => contact.id == req.params.id);
    let reponse = {message: 'Le contact '+req.params.id+' a bien ete supprime'};
    if (!!contact) {
        // Suppression
        listeContacts = listeContacts.filter(contact => contact.id != req.params.id);
    } else {
        reponse = {erreur: 'impossible de trouver le contact id='+req.params.id};
    }
   
    res.json(reponse);
});
