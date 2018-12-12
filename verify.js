const Nexmo = require('nexmo');
const mustache = require("mustache");

module.exports = function (RED) {
  
   function sendverify(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    var node = this;
    
    node.on('input', function (msg) {
      this.to = mustache.render(config.to, msg);
      this.brand = mustache.render(config.brand, msg);
      const nexmo = new Nexmo({
        apiKey: this.creds.apikey,
        apiSecret: this.creds.apisecret,
        applicationId: this.creds.appid,
        privateKey: this.creds.privatekey
        }, {debug: false}
      );
      nexmo.verify.request({number: this.to, brand: this.brand}, function(err, response) {
          if(err) { console.error(err); }
        else {
          msg.payload=response;
          node.send(response)  
        }
      })
    });  
  }
  
  function checkverify(config){
   RED.nodes.createNode(this, config);
   this.creds = RED.nodes.getNode(config.creds);
   var node = this;
   
   node.on('input', function (msg) {
     this.verify_id = mustache.render(config.verify_id, msg);
     this.code = mustache.render(config.code, msg);
     const nexmo = new Nexmo({
       apiKey: this.creds.apikey,
       apiSecret: this.creds.apisecret,
       applicationId: this.creds.appid,
       privateKey: this.creds.privatekey
       }, {debug: false}
     );
     nexmo.verify.check({request_id: this.verify_id, code: this.code}, function(err, response) {
         if(err) { console.error(err); }
       else {
         msg.payload=response;
         node.send(response)  
       }
     })
   });  
 }
  
 function cancelverify(config){
  RED.nodes.createNode(this, config);
  this.creds = RED.nodes.getNode(config.creds);
  var node = this;
  
  node.on('input', function (msg) {
    this.verify_id = mustache.render(config.verify_id, msg);
    const nexmo = new Nexmo({
      apiKey: this.creds.apikey,
      apiSecret: this.creds.apisecret,
      applicationId: this.creds.appid,
      privateKey: this.creds.privatekey
      }, {debug: false}
    );
    nexmo.verify.control({request_id: this.verify_id, cmd: 'cancel'}, function(err, response) {
        if(err) { console.error(err); }
      else {
        msg.payload=response;
        node.send(response)  
      }
    })
  });  
}
 function nextverify(config){
  RED.nodes.createNode(this, config);
  this.creds = RED.nodes.getNode(config.creds);
  var node = this;
  
  node.on('input', function (msg) {
    this.verify_id = mustache.render(config.verify_id, msg);
    const nexmo = new Nexmo({
      apiKey: this.creds.apikey,
      apiSecret: this.creds.apisecret,
      applicationId: this.creds.appid,
      privateKey: this.creds.privatekey
      }, {debug: false}
    );
    nexmo.verify.control({request_id: this.verify_id, cmd: 'trigger_next_event'}, function(err, response) {
        if(err) { console.error(err); }
      else {
        msg.payload=response;
        node.send(response)  
      }
    })
  });  
}
  RED.nodes.registerType("sendverify",sendverify);    
  RED.nodes.registerType("checkverify",checkverify);  
  RED.nodes.registerType("cancelverify",cancelverify);  
  RED.nodes.registerType("nextverify",nextverify);  

    
}