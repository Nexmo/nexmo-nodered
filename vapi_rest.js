const Nexmo = require('nexmo');



module.exports = function (RED) {
  
  function NexmoCreds(n) {
    RED.nodes.createNode(this,n);
    this.name = n.name;
    this.apikey = n.apikey;
    this.apisecret = n.apisecret;
    this.appid = n.appid;
    this.privatekey = n.privatekey;
  }
        
  function GetRecording(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    var node = this;
    
    node.on('input', function (msg) {
      const nexmo = new Nexmo({
        apiKey: this.creds.apikey,
        apiSecret: this.creds.apisecret,
        applicationId: this.creds.appid,
        privateKey: this.creds.privatekey
        }, {debug: false}
      );
      nexmo.files.get(msg.payload.recording_url, (error, data) => {
            if (error) {
              console.log(error, null);
            } else {
              console.log(data.length);
              msg.payload = data;
              node.send(msg);
            }
      });
      
    });  
  }
  
  
  RED.nodes.registerType("nexmocreds",NexmoCreds);    
  RED.nodes.registerType("getrecording",GetRecording);    
}