'use strict';

process.env.GRPC_SSL_CIPHER_SUITES = 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384';

var grpc= require('grpc');
var fs = require("fs");

//  Lnd cert is at ~/.lnd/tls.cert on Linux and
//  ~/Library/Application Support/Lnd/tls.cert on Mac
var lndCert = fs.readFileSync("/home/orbitalturtle/.lnd/tls.cert");
var credentials = grpc.credentials.createSsl(lndCert);
var lnrpcDescriptor = grpc.load("rpc.proto");
var lnrpc = lnrpcDescriptor.lnrpc;
var lightning = new lnrpc.Lightning('localhost:10001', credentials);

var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Song = mongoose.model('Song');

router.get('/', function(req, res) {

  lightning.addInvoice({ 
        value: 1000
  }, function(err, response) {
    console.log('error: ' + err);
    console.log('payment_request= ' + response.payment_request);
  })


});

// Upload the song
router.post('/', function(req, res) {
  Song.create() // TODO: is this the right mongoose method to use?
  .then(function(song) {
     res.json(song);
  })
});
