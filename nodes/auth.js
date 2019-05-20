const Nexmo = require('nexmo');
const version = require('../package.json').version


module.exports = function(RED) {
  function nexmovoiceapp(n){
   RED.nodes.createNode(this, n);
   this.apikey = n.apikey;
   this.apisecret = n.apisecret;
   this.name = n.name;
   this.answerurl = n.answerurl;
   this.eventurl = n.eventurl;
   this.appid = n.appid;
   this.privatekey = n.privatekey;
 }

  RED.nodes.registerType("nexmovoiceapp",nexmovoiceapp,{
    credentials: {
      apikey: {type:"text"},
      apisecret: {type:"text"},
      privatekey: {type:"text"},
      appid: {type:"text"}  
   }
  });  
  
 function nexmobasic(n){
   RED.nodes.createNode(this, n);
   this.apikey = n.apikey;
   this.apisecret = n.apisecret;
 }
 RED.nodes.registerType("nexmobasic",nexmobasic,{
   credentials: {
     apikey: {type:"text"},
     apisecret: {type:"text"}
   }
 });    
 RED.httpAdmin.post('/nexmo-auth/new-voice-app', RED.auth.needsPermission('nexmo.write'), function(req,res){
   const nexmo = new Nexmo({
     apiKey: req.body.api_key,
     apiSecret: req.body.api_secret
   }, {debug: false, appendToUserAgent: "nexmo-nodered/"+version}
   );
   const options = {};
   nexmo.app.create(req.body.name, 'voice', req.body.answer_url, req.body.event_url, options, function(error, response){
     res.send(response);
   });
 });   
}