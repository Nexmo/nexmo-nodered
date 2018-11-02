const Nexmo = require('nexmo');
const mustache = require("mustache");
const debug = false;


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
        }, {debug: debug}
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
        }, {debug: debug}
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
        }, {debug: debug}
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
        }, {debug: debug}
      );
      nexmo.calls.update(this.calluuid, { action: 'hangup' }, (err, response) => {
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
        }, {debug: debug}
      );
      nexmo.calls.update(this.calluuid, {action: 'transfer', destination: {"type": "ncco", "url": [this.url]}}, (err, response) => {
        if(err) { console.error(err); }
        else {
          msg.payload=response;
          node.send(response)  
        }
      });
    
    
    });  
  }
  
  function createCall(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    this.eventmethod = config.eventmethod;
    this.answermethod = config.answermethod;  
    this.endpoint = config.endpoint;
    this.machinedetection = config.machinedetection 
    var node = this;
    node.on('input', function (msg) {
      this.eventurl = mustache.render(config.eventurl, msg.payload);
      this.answerurl = mustache.render(config.answerurl, msg.payload);    
      this.from = mustache.render(config.from, msg.payload);
      this.ringingtimer = mustache.render(config.ringingtimer, msg.payload);
      this.lengthtimer = mustache.render(config.lengthtimer, msg.payload);
      this.to = mustache.render(config.to, msg.payload);
      const nexmo = new Nexmo({
        apiKey: this.creds.apikey,
        apiSecret: this.creds.apisecret,
        applicationId: this.creds.appid,
        privateKey: this.creds.privatekey
        }, {debug: debug}
      );
      if (this.endpoint == "number"){
        var ep = {}
        ep.type = "phone"
        ep.number = this.to
      } else if (this.endpoint == "sip"){
        var ep = {}
        ep.type = "sip"
        ep.uri = this.to
      }else if (this.endpoint == "websocket"){
        var ep = {}
        ep.type = "websocket"
        ep.uri = this.to
      }
      var request = {
        to: [ep],
        from: { type: 'phone', number: this.from},
        answer_url: [this.answerurl],
        answer_method : this.answermethod,
        event_method : this.eventmethod,
        machine_detection : this.machinedetection,
        length_timer : this.lengthtimer,
        ringing_timer: this.ringingtimer    
      };
      if (this.eventurl != ""){
        request.event_url= [this.eventurl]; 
      }
      clean(request);
      nexmo.calls.create(request, (err, response) => {
        if(err) { console.error(err); }
        else {
          msg.payload=response;
          node.send(response)  
        }
      });  
    });  
  }
  
  function playaudio(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    this.action = config.action
    this.loop = config.loop
    this.level = config.level
    var node = this;
    node.on('input', function (msg) {
      this.calluuid = mustache.render(config.calluuid, msg.payload);
      this.url = mustache.render(config.url, msg.payload);
      
      const nexmo = new Nexmo({
        apiKey: this.creds.apikey,
        apiSecret: this.creds.apisecret,
        applicationId: this.creds.appid,
        privateKey: this.creds.privatekey
        }, {debug: debug}
      );
      if (this.action == 'on'){
        nexmo.calls.stream.start(this.calluuid, { stream_url: [this.url], loop: this.loop, level: this.level},  (err, response) => {
          if(err) { console.error(err); }
          else {
            msg.payload=response;
            node.send(response)  
          }
        });
      } else {
        nexmo.calls.stream.stop(this.calluuid,  (err, response) => {
          if(err) { console.error(err); }
          else {
            msg.payload=response;
            node.send(response)  
          }
        });
      }
  });  
 }
 
 
 function playtts(config){
   RED.nodes.createNode(this, config);
   this.creds = RED.nodes.getNode(config.creds);
   this.action = config.action;
   this.loop = config.loop;
   this.level = config.level;
   this.voicename = config.voicename;
   var node = this;
   node.on('input', function (msg) {
     this.calluuid = mustache.render(config.calluuid, msg.payload);
     this.text = mustache.render(config.text, msg.payload);
     const nexmo = new Nexmo({
       apiKey: this.creds.apikey,
       apiSecret: this.creds.apisecret,
       applicationId: this.creds.appid,
       privateKey: this.creds.privatekey
       }, {debug: debug}
     );
     if (this.action == 'on'){
       nexmo.calls.talk.start(this.calluuid, { text: this.text, voice_name: this.voicename, loop: this.loop, level: this.level },  (err, response) => {
         if(err) { console.error(err); }
         else {
           msg.payload=response;
           node.send(response)  
         }
       });
     } else {
       nexmo.calls.talk.stop(this.calluuid,  (err, res) => {
         if(err) { console.error(err); }
         else {
           msg.payload=response;
           node.send(response)  
         }
       });
     }
 });  
}

function playdtmf(config){
  RED.nodes.createNode(this, config);
  this.creds = RED.nodes.getNode(config.creds);
  var node = this;
  node.on('input', function (msg) {
    this.calluuid = mustache.render(config.calluuid, msg.payload);
    this.digits = mustache.render(config.digits, msg.payload);
    const nexmo = new Nexmo({
      apiKey: this.creds.apikey,
      apiSecret: this.creds.apisecret,
      applicationId: this.creds.appid,
      privateKey: this.creds.privatekey
      }, {debug: debug}
    );
    nexmo.calls.dtmf.send(this.calluuid, { digits: this.digits }, (err, response) => {
       if(err) { 
        console.error(err); 
       } else {
        msg.payload=response;
        node.send(response)  
       }
    });
  });  
}


  
  

  function clean(obj) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
        delete obj[propName];
      }
    }
  }
  
  RED.nodes.registerType("earmuff",earmuff);    
  RED.nodes.registerType("nexmocreds",NexmoCreds);    
  RED.nodes.registerType("getrecording",GetRecording);
  RED.nodes.registerType("mute",mute);    
  RED.nodes.registerType("hangup",hangup);    
  RED.nodes.registerType("transfer",transfer);
  RED.nodes.registerType("createcall",createCall);
  RED.nodes.registerType("playaudio",playaudio);
  RED.nodes.registerType("playtts",playtts);
  RED.nodes.registerType("playdtmf",playdtmf);
  
  
  
      
}