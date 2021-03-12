const Vonage = require('@vonage/server-sdk');
const mustache = require("mustache");
const version = require('./package.json').version


module.exports = function (RED) {
  function createCall(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    this.eventmethod = config.eventmethod;
    this.answertype = config.answertype;  
    this.endpoint = config.endpoint;
    this.machinedetection = config.machinedetection
    this.contenttype = config.contenttype
    var node = this;
    node.on('input', function (msg) {
      var debug = (this.context().global.get('vonageDebug') | false);
      var data = dataobject(this.context(), msg);
      this.to = mustache.render(config.to, data);
      this.wsuri = mustache.render(config.wsuri, data);
      this.sipuri = mustache.render(config.sipuri, data);
      this.extension = mustache.render(config.extension, data);
      this.headers = mustache.render(config.headers, data);
      this.from = mustache.render(config.from, data);
      this.eventurl = mustache.render(config.eventurl, data);
      this.ringingtimer = mustache.render(config.ringingtimer, data);
      this.lengthtimer = mustache.render(config.lengthtimer, data);
      this.dtmfanswer = mustache.render(config.dtmfanswer, data);
      if ( this.answertype == 'url'){
        this.answerurl = mustache.render(config.answer, data);  
      } else if (this.answertype == 'json'){
        this.ncco = JSON.parse(mustache.render(config.answer, data));
      } else if (this.answertype == 'fixed'){
        this.ncco = msg.ncco
      }
      const vonage = new Vonage({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret,
        applicationId: this.creds.credentials.appid,
        privateKey: this.creds.credentials.privatekey
        }, {debug: debug, appendToUserAgent: "vonage-nodered/"+version}
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
      } else if (this.endpoint == "vbc"){
        var ep = {}
        ep.type = "vbc"
        ep.extension = this.extension
      }
      var request = {
        to: [ep],
        from: { type: 'phone', number: this.from},
        event_method : this.eventmethod,
        machine_detection : this.machinedetection,
        length_timer : this.lengthtimer,
        ringing_timer: this.ringingtimer    
      };
      if ( this.answertype == 'url'){
        request.answer_url = [this.answerurl]
      } else {
        request.ncco = this.ncco
      }
      if (this.eventurl != ""){
        request.event_url= [this.eventurl]; 
      }
      clean(request);
      vonage.calls.create(request, (err, response) => {
        if(err) { console.error(err); }
        else {
          msg.payload=response;
          node.send(msg)  
        }
      });  
    });  
  }
        
  function GetRecording(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    var node = this;
    node.on('input', function (msg) {
      var debug = (this.context().global.get('vonageDebug') | false);
      this.filename = mustache.render(config.filename, dataobject(this.context(), msg));
      if (this.filename){
        msg.filename = this.filename;
      }
      const vonage = new Vonage({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret,
        applicationId: this.creds.credentials.appid,
        privateKey: this.creds.credentials.privatekey
        }, {debug: debug, appendToUserAgent: "vonage-nodered/"+version}
      );
      vonage.files.get(msg.payload.recording_url, (error, data) => {
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
      var debug = (this.context().global.get('vonageDebug') | false);
      this.calluuid = mustache.render(config.calluuid, dataobject(this.context(), msg));
      const vonage = new Vonage({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret,
        applicationId: this.creds.credentials.appid,
        privateKey: this.creds.credentials.privatekey
        }, {debug: debug, appendToUserAgent: "vonage-nodered/"+version}
      );
    if (this.state == "on"){
      vonage.calls.update(this.calluuid, { action: 'earmuff' }, (err, res) => {
        if(err) { console.error(err); }
        else {
          msg.payload=res;
          node.send(msg)  
        }
      });
    } else {
      vonage.calls.update(this.calluuid, { action: 'unearmuff' }, (err, res) => {
        if(err) { console.error(err); }
        else {
          msg.payload=res;
          node.send(msg)  
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
      var debug = (this.context().global.get('vonageDebug') | false);
      this.calluuid = mustache.render(config.calluuid, dataobject(this.context(), msg));
      const vonage = new Vonage({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret,
        applicationId: this.creds.credentials.appid,
        privateKey: this.creds.credentials.privatekey
        }, {debug: debug, appendToUserAgent: "vonage-nodered/"+version}
      );
    if (this.state == "on"){
      vonage.calls.update(this.calluuid, { action: 'mute' }, (err, res) => {
        if(err) { console.error(err); }
        else {
          msg.payload=res;
          node.send(msg)  
        }
      });
    } else {
      vonage.calls.update(this.calluuid, { action: 'unmute' }, (err, res) => {
        if(err) { console.error(err); }
        else {
          msg.payload=res;
          node.send(msg)  
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
      var debug = (this.context().global.get('vonageDebug') | false);
      this.calluuid = mustache.render(config.calluuid, dataobject(this.context(), msg));
      const vonage = new Vonage({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret,
        applicationId: this.creds.credentials.appid,
        privateKey: this.creds.credentials.privatekey
        }, {debug: debug, appendToUserAgent: "vonage-nodered/"+version}
      );
      vonage.calls.update(this.calluuid, { action: 'hangup' }, (err, response) => {
        if(err) { console.error(err); }
        else {
          msg.payload=response;
          node.send(msg)  
        }
      });
    
    
    });  
  }

  function transfer(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    this.nccotype = config.nccotype;
    var node = this;
    node.on('input', function (msg) {
      var debug = (this.context().global.get('vonageDebug') | false);
      var data = dataobject(this.context(), msg);
      this.calluuid = mustache.render(config.calluuid, data);
      if ( this.nccotype == 'url'){
        this.url = mustache.render(config.ncco, data);  
      } else if (this.nccotype == 'json'){
        this.ncco = JSON.parse(mustache.render(config.ncco, data));
      } else if (this.nccotype == 'fixed'){
        this.ncco = msg.ncco
      }
      const vonage = new Vonage({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret,
        applicationId: this.creds.credentials.appid,
        privateKey: this.creds.credentials.privatekey
        }, {debug: debug, appendToUserAgent: "vonage-nodered/"+version}
      );
      this.destination = {type:"ncco"};
      if ( this.nccotype == 'url'){
        this.destination.url = [this.url]
      } else {
        this.destination.ncco = this.ncco
      }
      vonage.calls.update(this.calluuid, {action: 'transfer', destination: this.destination}, (err, response) => {
        if(err) { console.error(err); }
        else {
          msg.payload=response;
          node.send(msg)  
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
      var debug = (this.context().global.get('vonageDebug') | false);
      var data = dataobject(this.context(), msg);
      this.calluuid = mustache.render(config.calluuid, data);
      this.url = mustache.render(config.url, data);
      const vonage = new Vonage({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret,
        applicationId: this.creds.credentials.appid,
        privateKey: this.creds.credentials.privatekey
        }, {debug: debug, appendToUserAgent: "vonage-nodered/"+version}
      );
      if (this.action == 'on'){
        vonage.calls.stream.start(this.calluuid, { stream_url: [this.url], loop: this.loop, level: this.level},  (err, response) => {
          if(err) { console.error(err); }
          else {
            msg.payload=response;
            node.send(response)  
          }
        });
      } else {
        vonage.calls.stream.stop(this.calluuid,  (err, response) => {
          if(err) { console.error(err); }
          else {
            msg.payload=response;
            node.send(msg)  
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
     var debug = (this.context().global.get('vonageDebug') | false);
     var data = dataobject(this.context(), msg);
     this.calluuid = mustache.render(config.calluuid, data);
     this.text = mustache.render(config.text, data);
     this.voicename = mustache.render(config.voicename, data);
     const vonage = new Vonage({
       apiKey: this.creds.credentials.apikey,
       apiSecret: this.creds.credentials.apisecret,
       applicationId: this.creds.credentials.appid,
       privateKey: this.creds.credentials.privatekey
       }, {debug: debug, appendToUserAgent: "vonage-nodered/"+version}
     );
     if (this.action == 'on'){
       vonage.calls.talk.start(this.calluuid, { text: this.text, voice_name: this.voicename, loop: this.loop, level: this.level },  (err, response) => {
         if(err) { console.error(err); }
         else {
           msg.payload=response;
           node.send(response)  
         }
       });
     } else {
       vonage.calls.talk.stop(this.calluuid,  (err, res) => {
         if(err) { console.error(err); }
         else {
           msg.payload=res;
           node.send(msg)  
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
    var debug = (this.context().global.get('vonageDebug') | false);
    var data = dataobject(this.context(), msg);
    this.calluuid = mustache.render(config.calluuid, data);
    this.digits = mustache.render(config.digits, data);
    const vonage = new Vonage({
      apiKey: this.creds.credentials.apikey,
      apiSecret: this.creds.credentials.apisecret,
      applicationId: this.creds.credentials.appid,
      privateKey: this.creds.credentials.privatekey
      }, {debug: debug, appendToUserAgent: "vonage-nodered/"+version}
    );
    vonage.calls.dtmf.send(this.calluuid, { digits: this.digits }, (err, response) => {
       if(err) { 
        console.error(err); 
       } else {
        msg.payload=response;
        node.send(msg)  
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
  RED.nodes.registerType("createcall",createCall);
  RED.nodes.registerType("earmuff",earmuff);    
  RED.nodes.registerType("getrecording",GetRecording);
  RED.nodes.registerType("mute",mute);    
  RED.nodes.registerType("hangup",hangup);    
  RED.nodes.registerType("transfer",transfer);
  RED.nodes.registerType("playaudio",playaudio);
  RED.nodes.registerType("playtts",playtts);
  RED.nodes.registerType("playdtmf",playdtmf);
  
  
  function dataobject(context, msg){
    data = {}
    data.msg = msg;
    data.global = {};
    data.flow = {};
    g_keys = context.global.keys();
    f_keys = context.flow.keys();
    for (k in g_keys){
      data.global[g_keys[k]] = context.global.get(g_keys[k]);
    };
    for (k in f_keys){
      data.flow[f_keys[k]] = context.flow.get(f_keys[k]);
    };
    return data
  }
  
  RED.httpAdmin.get('/vonage-auth/numbers', RED.auth.needsPermission('vonage.write'), function(req,res){
    const creds = RED.nodes.getNode(req.query.creds);
    const vonage = new Vonage({
      apiKey: creds.credentials.apikey,
      apiSecret: creds.credentials.apisecret
      }, {debug: false, appendToUserAgent: "vonage-nodered/"+version}
    );
    vonage.number.get({}, 
      (err, response) => {
        if (err) {
          console.error(err)
        } else {
          res.send(response.numbers);
        }
      })    
    
  });
      
}
