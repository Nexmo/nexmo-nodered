const Nexmo = require('nexmo');
const mustache = require("mustache");



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
  
  function earmuff(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    this.state = config.state;
    var node = this;
    
    node.on('input', function (msg) {
      this.calluuid = mustache.render(config.calluuid, msg.payload);
      const nexmo = new Nexmo({
        apiKey: this.creds.apikey,
        apiSecret: this.creds.apisecret,
        applicationId: this.creds.appid,
        privateKey: this.creds.privatekey
        }, {debug: false}
      );
    if (this.state == "on"){
      nexmo.calls.update(this.calluuid, { action: 'earmuff' }, (err, res) => {
        if(err) { console.error(err); }
        else {
          msg.payload=response;
          node.send(response)  
        }
      });
    } else {
      nexmo.calls.update(this.calluuid, { action: 'unearmuff' }, (err, res) => {
        if(err) { console.error(err); }
        else {
          msg.payload=response;
          node.send(response)  
        }
      });
    }
    
    });  
  }
  
  function mute(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    this.state = config.state;
    var node = this;
    
    node.on('input', function (msg) {
      this.calluuid = mustache.render(config.calluuid, msg.payload);
      const nexmo = new Nexmo({
        apiKey: this.creds.apikey,
        apiSecret: this.creds.apisecret,
        applicationId: this.creds.appid,
        privateKey: this.creds.privatekey
        }, {debug: false}
      );
    if (this.state == "on"){
      nexmo.calls.update(this.calluuid, { action: 'mute' }, (err, res) => {
        if(err) { console.error(err); }
        else {
          msg.payload=response;
          node.send(response)  
        }
      });
    } else {
      nexmo.calls.update(this.calluuid, { action: 'unmute' }, (err, res) => {
        if(err) { console.error(err); }
        else {
          msg.payload=response;
          node.send(response)  
        }
      });
    }
    
    });  
  }
  
  function hangup(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    var node = this;
    
    node.on('input', function (msg) {
      this.calluuid = mustache.render(config.calluuid, msg.payload);
      const nexmo = new Nexmo({
        apiKey: this.creds.apikey,
        apiSecret: this.creds.apisecret,
        applicationId: this.creds.appid,
        privateKey: this.creds.privatekey
        }, {debug: false}
      );
      nexmo.calls.update(this.calluuid, { action: 'hangup' }, (err, res) => {
        if(err) { console.error(err); }
        else {
          msg.payload=response;
          node.send(response)  
        }
      });
    
    
    });  
  }
  function transfer(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    var node = this;
    
    node.on('input', function (msg) {
      this.calluuid = mustache.render(config.calluuid, msg.payload);
      this.url = mustache.render(config.url, msg.payload);
      const nexmo = new Nexmo({
        apiKey: this.creds.apikey,
        apiSecret: this.creds.apisecret,
        applicationId: this.creds.appid,
        privateKey: this.creds.privatekey
        }, {debug: false}
      );
      nexmo.calls.update(this.calluuid, {action: 'transfer', destination: {"type": "ncco", "url": [this.url]}}, (err, res) => {
        if(err) { console.error(err); }
        else {
          msg.payload=response;
          node.send(response)  
        }
      });
    
    
    });  
  }

  
  RED.nodes.registerType("earmuff",earmuff);    
  RED.nodes.registerType("nexmocreds",NexmoCreds);    
  RED.nodes.registerType("getrecording",GetRecording);
  RED.nodes.registerType("mute",mute);    
  RED.nodes.registerType("hangup",hangup);    
  RED.nodes.registerType("transfer",transfer);    
  
  
      
}