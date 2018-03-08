var express = require('express');
var bodyParser = require('body-parser')


var app = express();
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
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
    let message = 'Le contact '+req.params.id+' a bien ete modifie';
    if (!!contact) {
        contact.prenom = req.body.prenom;
        contact.adresse = req.body.adresse;
        contact.naissance = req.body.naissance;
        contact.civilite = req.body.civilite;
        contact.telephone = req.body.telephone;
    } else {
        message = 'impossible de trouver le contact id='+req.params.id;
    }
    res.json({'message': message});
});

app.delete('/supprimerContact/:id', function(req, res){
    let contact = listeContacts.find(contact => contact.id == req.params.id);
    let message = 'Le contact '+req.params.id+' a bien ete supprime';
    if (!!contact) {
        // Suppression
        listeContacts = listeContacts.filter(contact => contact.id != req.params.id);
    } else {
        message = 'impossible de trouver le contact id='+req.params.id;
    }
   
    res.json({'message': message});
});


var server = app.listen(5000, function() {
    console.log('Express server listening on port ' + 5000);
});