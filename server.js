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
  
    if (authentication === process.env.API_V1_WEBHOOK_TOKEN) {
        request(options);
        return res.status(200).send({
            response: 'Message sent.',
        });
    }
    else {
        return res.status(401).send({
            message: 'Unauthorized.'
            });
    }
});

app.listen(process.env.PORT);
console.log('Server is running on ' + process.env.PORT);
