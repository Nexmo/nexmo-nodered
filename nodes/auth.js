const Vonage = require('@vonage/server-sdk');
const version = require('../package.json').version


module.exports = function(RED) {
  function vonagevoiceapp(n){
   RED.nodes.createNode(this, n);
   this.apikey = n.apikey;
   this.apisecret = n.apisecret;
   this.name = n.name;
   this.answerurl = n.answerurl;
   this.eventurl = n.eventurl;
   this.appid = n.appid;
   this.privatekey = n.privatekey;
 }

  RED.nodes.registerType("vonagevoiceapp",vonagevoiceapp,{
    credentials: {
      apikey: {type:"text"},
      apisecret: {type:"text"},
      privatekey: {type:"text"},
      appid: {type:"text"}  
   }
  });  
  
 function vonagebasic(n){
   RED.nodes.createNode(this, n);
   this.apikey = n.apikey;
   this.apisecret = n.apisecret;
 }
 RED.nodes.registerType("vonagebasic",vonagebasic,{
   credentials: {
     apikey: {type:"text"},
     apisecret: {type:"text"}
   }
 });    
 RED.httpAdmin.post('/vonage-auth/new-voice-app', RED.auth.needsPermission('vonage.write'), function(req,res){
   const vonage = new Vonage({
     apiKey: req.body.api_key,
     apiSecret: req.body.api_secret
   }, {debug: false, appendToUserAgent: "vonage-nodered/"+version}
   );
   const options = {};
   vonage.app.create(req.body.name, 'voice', req.body.answer_url, req.body.event_url, options, function(error, response){
     res.send(response);
   });
 });   
}