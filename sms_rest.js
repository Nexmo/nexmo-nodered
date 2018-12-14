const Nexmo = require('nexmo');
const mustache = require("mustache");



module.exports = function (RED) {
  
   function sendsms(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    this.unicode = config.unicode;
    var node = this;
    
    node.on('input', function (msg) {
      this.to = mustache.render(config.to, msg.payload);
      this.fr = mustache.render(config.fr, msg.payload);
      this.text = mustache.render(config.text, msg.payload);
      const nexmo = new Nexmo({
        apiKey: this.creds.apikey,
        apiSecret: this.creds.apisecret,
        applicationId: this.creds.appid,
        privateKey: this.creds.privatekey
      }, {debug: false, appendToUserAgent: "nexmo-nodered/3.0.0"}
      );
      const opts = {}
      if (this.unicode == true){
        opts.type = "unicode";
      } else{
        opts.type = "text";
      }
      nexmo.message.sendSms(this.fr, this.to, this.text, opts, function(err, response){
        if(err) { console.error(err); }
        else {
          msg.payload=response;
          node.send(response)  
        }
      })
    });  
  }
  
 
  RED.nodes.registerType("sendsms",sendsms);    
    
}