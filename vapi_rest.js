const Nexmo = require('nexmo');
const mustache = require("mustache");
const debug = false;


module.exports = function (RED) {
  
        
  function GetRecording(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    var node = this;
    node.on('input', function (msg) {
      this.filename = mustache.render(config.filename, msg);
      if (this.filename){
        msg.filename = this.filename;
      }
      const nexmo = new Nexmo({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret,
        applicationId: this.creds.credentials.appid,
        privateKey: this.creds.credentials.privatekey
        }, {debug: debug, appendToUserAgent: "nexmo-nodered/3.0.0"}
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
      this.calluuid = mustache.render(config.calluuid, msg);
      const nexmo = new Nexmo({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret,
        applicationId: this.creds.credentials.appid,
        privateKey: this.creds.credentials.privatekey
        }, {debug: debug, appendToUserAgent: "nexmo-nodered/3.0.0"}
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
      this.calluuid = mustache.render(config.calluuid, msg);
      const nexmo = new Nexmo({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret,
        applicationId: this.creds.credentials.appid,
        privateKey: this.creds.credentials.privatekey
        }, {debug: debug, appendToUserAgent: "nexmo-nodered/3.0.0"}
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
      this.calluuid = mustache.render(config.calluuid, msg);
      const nexmo = new Nexmo({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret,
        applicationId: this.creds.credentials.appid,
        privateKey: this.creds.credentials.privatekey
        }, {debug: debug, appendToUserAgent: "nexmo-nodered/3.0.0"}
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
      this.calluuid = mustache.render(config.calluuid, msg);
      this.url = mustache.render(config.url, msg);
      const nexmo = new Nexmo({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret,
        applicationId: this.creds.credentials.appid,
        privateKey: this.creds.credentials.privatekey
        }, {debug: debug, appendToUserAgent: "nexmo-nodered/3.0.0"}
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
    this.contenttype = config.contenttype
    var node = this;
    node.on('input', function (msg) {
      this.to = mustache.render(config.to, msg);
      this.wsuri = mustache.render(config.wsuri, msg);
      this.sipuri = mustache.render(config.sipuri, msg);
      this.headers = mustache.render(config.headers, msg);
      this.from = mustache.render(config.from, msg);
      this.eventurl = mustache.render(config.eventurl, msg);
      this.answerurl = mustache.render(config.answerurl, msg);    
      this.ringingtimer = mustache.render(config.ringingtimer, msg);
      this.lengthtimer = mustache.render(config.lengthtimer, msg);
      this.dtmfanswer = mustache.render(config.dtmfanswer, msg);
      const nexmo = new Nexmo({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret,
        applicationId: this.creds.credentials.appid,
        privateKey: this.creds.credentials.privatekey
        }, {debug: debug, appendToUserAgent: "nexmo-nodered/3.0.0"}
      );
      if (this.endpoint == "phone"){
        var ep = {}
        ep.type = "phone"
        ep.number = this.to
        if (this.dtmfanswer != ""){
          ep.dtmfAnswer = this.dtmfanswer
        }
      } else if (this.endpoint == "sip"){
        var ep = {}
        ep.type = "sip"
        ep.uri = this.sipuri
      }else if (this.endpoint == "websocket"){
        var ep = {}
        ep.type = "websocket"
        ep.uri = this.wsuri
        ep['content-type'] = this.contenttype
        ep.headers = JSON.parse(this.headers)
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
      this.calluuid = mustache.render(config.calluuid, msg);
      this.url = mustache.render(config.url, msg);
      const nexmo = new Nexmo({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret,
        applicationId: this.creds.credentials.appid,
        privateKey: this.creds.credentials.privatekey
        }, {debug: debug, appendToUserAgent: "nexmo-nodered/3.0.0"}
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
     this.calluuid = mustache.render(config.calluuid, msg);
     this.text = mustache.render(config.text, msg);
     const nexmo = new Nexmo({
       apiKey: this.creds.credentials.apikey,
       apiSecret: this.creds.credentials.apisecret,
       applicationId: this.creds.credentials.appid,
       privateKey: this.creds.credentials.privatekey
       }, {debug: debug, appendToUserAgent: "nexmo-nodered/3.0.0"}
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
    this.calluuid = mustache.render(config.calluuid, msg);
    this.digits = mustache.render(config.digits, msg);
    const nexmo = new Nexmo({
      apiKey: this.creds.credentials.apikey,
      apiSecret: this.creds.credentials.apisecret,
      applicationId: this.creds.credentials.appid,
      privateKey: this.creds.credentials.privatekey
      }, {debug: debug, appendToUserAgent: "nexmo-nodered/3.0.0"}
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
  RED.nodes.registerType("getrecording",GetRecording);
  RED.nodes.registerType("mute",mute);    
  RED.nodes.registerType("hangup",hangup);    
  RED.nodes.registerType("transfer",transfer);
  RED.nodes.registerType("createcall",createCall);
  RED.nodes.registerType("playaudio",playaudio);
  RED.nodes.registerType("playtts",playtts);
  RED.nodes.registerType("playdtmf",playdtmf);
  
  
  
      
}