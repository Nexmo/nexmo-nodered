var mustache = require("mustache");

module.exports = function (RED) {
//Talk
  function talk(config){
    RED.nodes.createNode(this, config);
    this.voicename = config.voicename;
    this.bargein = config.bargein;
    this.loop = config.loop;
    this.level = config.level;
    var node = this;
    node.on('input', function (msg) {
      var data = dataobject(this.context(), msg);
      this.text = mustache.render(config.text, data);
      this.voicename = mustache.render(config.voicename, data);
      if ( 'ncco' in msg){
        var resp = msg.ncco;    
      } else{
        var resp = []; 
      }
      var ncco = {};
      ncco.action="talk";
      ncco.text=this.text;
      ncco.bargeIn=this.bargein;
      ncco.loop=this.loop;
      ncco.level=this.level;
      ncco.voiceName=this.voicename;
      clean(ncco);
      resp.push(ncco);
      msg.ncco = resp;
      node.send(msg);
    });  
  }

//Stream
  function stream(config){
    RED.nodes.createNode(this, config);
    this.bargein = config.bargein;
    this.loop = config.loop;
    this.level = config.level;
    var node = this;
    node.on('input', function (msg) {
      var data = dataobject(this.context(), msg);
      this.streamurl = mustache.render(config.streamurl, data);
      if ( 'ncco' in msg){
        var resp = msg.ncco;    
      }else{
        var resp = []; 
      }
      var ncco = {};
      ncco.action="stream";
      ncco.streamUrl= [this.streamurl];
      ncco.bargeIn=this.bargein;
      ncco.loop=this.loop;
      ncco.level=this.level;
      clean(ncco);
      resp.push(ncco);
      msg.ncco = resp;
      node.send(msg);
    });  
  }

//Input
  function input(config){
    RED.nodes.createNode(this, config);
    this.timeout = config.timeout;
    this.maxdigits = config.maxdigits;
    this.submitonhash = config.submitonhash;
    this.eventmethod = config.eventmethod;  
    var node = this;
    node.on('input', function (msg) {
      var data = dataobject(this.context(), msg);
      this.eventurl = mustache.render(config.eventurl, data);;
      if ( 'ncco' in msg){
        var resp = msg.ncco;    
      }else{
        var resp = []; 
      }
      var ncco = {};
      ncco.action="input";
      if (this.eventurl != ""){
        ncco.eventUrl= [this.eventurl]; 
      }
      ncco.timeOut=this.timeout;
      ncco.maxDigits=this.maxdigits;
      ncco.submitOnHash=this.submitonhash;
      ncco.eventMethod=this.eventmethod;
      clean(ncco);
      resp.push(ncco);
      msg.ncco = resp;
      node.send(msg);
    });
  }

  //Record
  function record(config){
    RED.nodes.createNode(this, config);
    this.eventmethod = config.eventmethod;  
    this.timeout = config.timeout;
    this.format = config.format;
    this.split = config.split;
    this.channel = config.channel;  
    this.endonsilence = config.endonsilence;  
    this.endonkey = config.endonkey;  
    this.beepstart = config.beepstart;  
    var node = this;
    node.on('input', function (msg) {
      var data = dataobject(this.context(), msg);
      this.eventurl = mustache.render(config.eventurl, data);
      if ( 'ncco' in msg){
        var resp = msg.ncco;    
      }else{
        var resp = []; 
      }
      var ncco = {};
      ncco.action="record";
      ncco.format=this.format;
      ncco.split=this.split;
      ncco.channel=this.channel;
      ncco.endOnSilence=this.endonsilence
      ncco.endOnKey=this.endonkey
      ncco.timeOut=this.timeout;
      ncco.beepStart=this.beepstart;
      if (this.eventurl != ""){
        ncco.eventUrl= [this.eventurl]; 
      }
      ncco.eventMethod=this.eventmethod;
      clean(ncco);
      resp.push(ncco);
      msg.ncco = resp;
      node.send(msg);
    });
  }

//Conversaton  
  function conversation(config){
    RED.nodes.createNode(this, config);
    this.eventmethod = config.eventmethod;  
    this.record = config.record;
    this.endonexit = config.endonexit;
    this.startonenter = config.startonenter;
    var node = this;
    node.on('input', function (msg) {
      var data = dataobject(this.context(), msg);
      this.name = mustache.render(config.name, data);
      this.musiconholdurl = mustache.render(config.musiconholdurl, data);
      this.eventurl = mustache.render(config.eventurl, data);
      this.canhear = mustache.render(config.canhear, data);
      this.canspeak = mustache.render(config.canspeak, data);
      if ( 'ncco' in msg){
        var resp = msg.ncco;    
      }else{
        var resp = []; 
      }
      var ncco = {};
      ncco.action="conversation";
      ncco.name=this.name;
      if (this.eventurl != "" ){
        ncco.eventUrl= [this.eventurl]; 
      }
      ncco.eventMethod=this.eventmethod;
      ncco.record=this.record;
      ncco.endOnExit=this.endonexit;
      ncco.startOnEnter=this.startonenter;
      ncco.musicOnHoldUrl=[this.musiconholdurl];
      if (this.canhear != ""){
        ncco.canHear = this.canhear.split(",")
      }
      if (this.canspeak != ""){
        ncco.canSpeak = this.canspeak.split(",")
      }
      clean(ncco);
      resp.push(ncco);
      msg.ncco = resp;
      node.send(msg);
    });
  }

//Connect  
  function connect(config){
    RED.nodes.createNode(this, config);
    this.eventmethod = config.eventmethod;  
    this.timeout = config.timeout;
    this.limit = config.limit;
    this.machinedetection = config.machinedetection;  
    this.eventtype = config.eventtype;  
    this.endpoint = config.endpoint;
    this.contenttype = config.contenttype;
    var node = this;
    node.on('input', function (msg) {
      var data = dataobject(this.context(), msg);
      this.to = mustache.render(config.to, data);
      this.wsuri = mustache.render(config.wsuri, data);
      this.sipuri = mustache.render(config.sipuri, data);
      this.extension = mustache.render(config.extension, data);
      this.headers = mustache.render(config.headers, data);
      this.from = mustache.render(config.from, data);
      this.eventurl = mustache.render(config.eventurl, data);
      this.dtmfanswer = mustache.render(config.dtmfanswer, data);
      this.onanswer = mustache.render(config.onanswer, data);
      
      if ( 'ncco' in msg){
        var resp = msg.ncco;    
      }else{
        var resp = []; 
      }
      var ncco = {};
      ncco.action="connect";
      if (this.eventurl != ""){
        ncco.eventUrl= [this.eventurl]; 
      }
      ncco.eventMethod=this.eventmethod;
      ncco.from=this.from;
      ncco.eventType=this.eventype;
      ncco.timeout=this.timeout;
      ncco.limit=this.limit;
      ncco.machineDetection=this.machinedetection;
      if (this.endpoint == "phone"){
        var ep = {}
        ep.type = "phone"
        ep.number = this.to
        if (this.dtmfanswer != ""){
          ep.dtmfAnswer = this.dtmfanswer
        }
        if (this.onanswer != ""){
          ep.onAnswer = {url: this.onanswer}
        }
        ncco.endpoint= [ep]
      } else if (this.endpoint == "sip"){
        var ep = {}
        ep.type = "sip"
        ep.uri = this.sipuri
        ncco.endpoint= [ep]
      }else if (this.endpoint == "websocket"){
        var ep = {}
        ep.type = "websocket"
        ep.uri = this.wsuri
        ep['content-type'] = this.contenttype
        ep.headers = JSON.parse(this.headers)
        ncco.endpoint= [ep]
      }else if (this.endpoint == "vbc"){
        var ep = {}
        ep.type = "vbc"
        ep.extension = this.extension
        ncco.endpoint= [ep]
      }
      clean(ncco);
      resp.push(ncco);
      msg.ncco = resp;
      node.send(msg);
    });
  }

//Notify  
  function notify(config){
    RED.nodes.createNode(this, config);
    this.eventmethod = config.eventmethod;  
    var node = this;
    node.on('input', function (msg) {
      var data = dataobject(this.context(), msg);
      this.payload = mustache.render(config.payload, data);
      this.eventurl = mustache.render(config.eventurl, data);
      if ( 'ncco' in msg){
        var resp = msg.ncco;    
      }else{
        var resp = []; 
      }
      var ncco = {};
      ncco.action="notify";
      ncco.eventUrl= [this.eventurl]; 
      ncco.eventMethod=this.eventmethod;
      ncco.payload=JSON.parse(this.payload);
      clean(ncco);
      resp.push(ncco);
      msg.ncco = resp;
      node.send(msg);
    });
  }
  
//Helper Functions  
function clean(obj) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
        delete obj[propName];
      }
    }
}
  
RED.nodes.registerType("talk", talk);
RED.nodes.registerType("stream", stream);
RED.nodes.registerType("input", input);
RED.nodes.registerType("record", record);
RED.nodes.registerType("conversation", conversation);
RED.nodes.registerType("connect", connect);
RED.nodes.registerType("notify", notify);
}


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