var mustache = require("mustache");


module.exports = function (RED) {
    
  function talk(config){
    RED.nodes.createNode(this, config);
    this.voiceName = config.voiceName;
    this.bargein = config.bargein;
    this.loop = config.loop;
    this.level = config.level;
    var node = this;
    node.on('input', function (msg) {
      if (config.template == true){
        this.text = mustache.render(config.text, msg.payload);
      }else{
        this.text = config.text;
      }
      if ( 'ncco' in msg.payload){
        var resp = msg.payload.ncco;    
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
      msg.payload.ncco = resp;
      node.send(msg);
    });  
  }
  function stream(config){
    RED.nodes.createNode(this, config);
    this.streamurl = config.streamurl;
    this.bargein = config.bargein;
    this.loop = config.loop;
    this.level = config.level;
    var node = this;
    node.on('input', function (msg) {
      if ( 'ncco' in msg.payload){
        var resp = msg.payload.ncco;    
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
      msg.payload.ncco = resp;
      node.send(msg);
    });  
  }
  function input(config){
    RED.nodes.createNode(this, config);
    this.eventurl = config.eventurl;
    this.timeout = config.timeout;
    this.maxdigits = config.maxdigits;
    this.submitonhash = config.submitonhash;
    this.eventmethod = config.eventmethod;  
    var node = this;
    node.on('input', function (msg) {
      if ( 'ncco' in msg.payload){
        var resp = msg.payload.ncco;    
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
      msg.payload.ncco = resp;
      node.send(msg);
    });
  }
  
  function record(config){
    RED.nodes.createNode(this, config);
    this.eventurl = config.eventurl;  
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
      if ( 'ncco' in msg.payload){
        var resp = msg.payload.ncco;    
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
      msg.payload.ncco = resp;
      node.send(msg);
    });
  }
  
  function conversation(config){
    RED.nodes.createNode(this, config);
    this.name = config.name;
    this.eventurl = config.eventurl;
    this.eventmethod = config.eventmethod;  
    this.record = config.record;
    this.endonexit = config.endonexit;
    this.startonenter = config.startonenter;
    this.musiconholdurl = config.musiconholdurl;  
    var node = this;
    node.on('input', function (msg) {
      if ( 'ncco' in msg.payload){
        var resp = msg.payload.ncco;    
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
      ncco.musicOnHoldUrl=this.musiconholdurl;
      clean(ncco);
      resp.push(ncco);
      msg.payload.ncco = resp;
      node.send(msg);
    });
  }
  
  
  function connect(config){
    RED.nodes.createNode(this, config);
    this.eventurl = config.eventurl;
    this.eventmethod = config.eventmethod;  
    this.from = config.from;
    this.timeout = config.timeout;
    this.limit = config.limit;
    this.machinedetection = config.machinedetection;  
    this.eventtype = config.eventtype;  
    this.endpoint = config.endpoint;
    this.to = config.to  
    var node = this;
    node.on('input', function (msg) {
      if ( 'ncco' in msg.payload){
        var resp = msg.payload.ncco;    
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
      if (this.endpoint == "number"){
        var ep = {}
        ep.type = "phone"
        ep.number = this.to
        ncco.endpoint= [ep]
      } else if (this.endpoint == "sip"){
        var ep = {}
        ep.type = "sip"
        ep.uri = this.to
        ncco.endpoint= [ep]
      }else if (this.endpoint == "websocket"){
        var ep = {}
        ep.type = "websocket"
        ep.uri = this.to
        ncco.endpoint= [ep]
      }
      clean(ncco);
      resp.push(ncco);
      msg.payload.ncco = resp;
      node.send(msg);
    });
  }
  
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
}
