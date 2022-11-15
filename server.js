require('dotenv').config()
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  return res.status(200).send({
    message: 'Not much here. Maybe you are looking for /api/v1?'
  })
});

// root endpoint
app.get('/api/v1/', function(req, res) {
    return res.status(200).send({
        message: 'Welcome to the beginning of nothingness.'
     });
});

// send webhook to discord via http
app.get('/api/v1/webhook', function(req, res) {
    var contents = req.query.content;
    var authentication = req.query.token;

    var request = require('request');
    var options = {
        uri: 'https://discord.com/api/webhooks/954220209621835837/7aQiuoJaA0LO-rnuL1253JegvxaMdvdWI_IXrl89DpPg1cUfkgHarAxaEVmhrvbQr-Uy',
        method: 'POST',
        json: {
            "content": '```'+ contents + '```'
        }
    };

    if (authentication === "thisEndpointDoesNotWork") {
        // request(options);
        return res.status(500).send({
            response: 'This endpoint has been disabled..',
        });
    }
    else {
        return res.status(401).send({
            message: 'Unauthorized.'
            });
    }
});

// productmanager registration check
app.get('/api/v1/productmanager/activation', function(req, res) {
    var request = require('request');
    var key = req.query.key;

// CONFIDENTIAL ZONE - AUTH KEYS

// ind.srm.ph : ind.ph.interim_octopus_1950

    var validkeys = JSON.parse('["ind.ph.interim_octopus_1950"]')

// CONFIDENTIAL ZONE - AUTH KEYS

    if (validkeys.includes(key)) {
        return res.status(200).send({
            message: 'ProductManager is activated.'
        });
    }
    else {
        return res.status(401).send({
            message: 'Authentication key is invalid or has been revoked. Delete your key.txt file and reactivate ProductManager with a valid key.'
        });
    }
});

// handle non existent endpoints
app.get('*', function(req, res) {
    res.status(404).send({
       message: 'Endpoint does not exist.'
    })
});

app.listen(6080);
console.log('Server is running on port 8080.');
