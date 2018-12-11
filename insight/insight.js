const Nexmo = require('nexmo');
const mustache = require("mustache");

module.exports = function (RED) {
  
   function numberinsight(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    this.type = config.type;
    var node = this;
    
    node.on('input', function (msg) {
      this.number = mustache.render(config.number, msg.payload);
      this.url = mustache.render(config.url, msg.payload);
      
      const nexmo = new Nexmo({
        apiKey: this.creds.apikey,
        apiSecret: this.creds.apisecret,
        applicationId: this.creds.appid,
        privateKey: this.creds.privatekey
        }, {debug: false}
      );
      nexmo.numberInsight.get({level: this.type, number: this.number, callback: this.url}, (error, response) => {
        if(error) {
          console.error(error);
        }
        else {
          msg.payload=response;
          node.send(response) 
        }
      });
    });  
  }
  
 
  RED.nodes.registerType("numberinsight",numberinsight);  
    
}