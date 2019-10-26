const Nexmo = require('nexmo');
const mustache = require("mustache");
const version = require('../package.json').version


module.exports = function (RED) {
  
   function numberinsight(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    this.ni_type = config.ni_type;
    var node = this;
    
    node.on('input', function (msg, send, done) {
      send = send || function() { node.send.apply(node,arguments) };
      var debug = (this.context().global.get('nexmoDebug') | false);
      var data = dataobject(this.context(), msg)
      this.number = mustache.render(config.number, data);
      this.url = mustache.render(config.url, data);
      
      const nexmo = new Nexmo({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret
      }, {debug: debug, appendToUserAgent: "nexmo-nodered/"+version}
      );
      nexmo.numberInsight.get({level: this.ni_type, number: this.number, callback: this.url}, (error, response) => {
        if(error) {
          console.error(error);
          done(error);
        }
        else {
          msg.payload=response;
          send(msg);
          if(done) {
            done();
          }
        }
      });
    });  
  }
  
 
  RED.nodes.registerType("numberinsight",numberinsight);  
    
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