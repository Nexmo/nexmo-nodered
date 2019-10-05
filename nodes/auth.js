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
 
 
 RED.httpAdmin.post('/nexmo-auth/new-app', RED.auth.needsPermission('nexmo.write'), function(req,res){
   const nexmo = new Nexmo({
     apiKey: req.body.api_key,
     apiSecret: req.body.api_secret
   }, {debug: false, appendToUserAgent: "nexmo-nodered/"+version}
   );
   const options = {};
   const caps = {}
   if (req.body.voice_cap == 'true'){
     caps.voice = {webhooks : {
       answer_url : {},
       event_url: {}
     }}
     caps.voice.webhooks.answer_url.address = req.body.voice_answer_url
     caps.voice.webhooks.answer_url.http_method = req.body.voice_answer_method
     caps.voice.webhooks.event_url.address = req.body.voice_event_url
     caps.voice.webhooks.event_url.http_method = req.body.voice_event_method
   }
   if (req.body.rtc_cap == 'true'){
     caps.rtc = {webhooks : {
       event_url: {}
     }}
     caps.rtc.webhooks.event_url.address = req.body.rtc_event_url
     caps.rtc.webhooks.event_url.http_method = req.body.rtc_event_method
   }
   if (req.body.msg_cap == 'true'){
     caps.messages = { webhooks :{
       inbound_url : {},
       status_url: {}
     }}
     caps.messages.webhooks.inbound_url.address = req.body.msg_inbound_url,
     caps.messages.webhooks.inbound_url.http_method = req.body.msg_inbound_method,
     caps.messages.webhooks.status_url.address = req.body.msg_status_url,
     caps.messages.webhooks.status_url.http_method = req.body.msg_status_method
   }
   if (req.body.vbc_cap = 'true'){
     caps.vbc = {}
   }
   console.log(JSON.stringify(caps))
   nexmo.applications.create({name: req.body.name, capabilities: caps}, function(error, response){
     if (error) {
       console.log(JSON.stringify(error));
     }
     res.send(response);
   });
 });
 
 function nexmotest(config){
   RED.nodes.createNode(this, config);
   this.creds = RED.nodes.getNode(config.creds);
   var node = this;
   node.on('input', function (msg) {
     console.log(this.creds.credentials)
     node.send(this.creds.credentials); 
   });  
 }
 RED.nodes.registerType("nexmotest",nexmotest);
 
  
}