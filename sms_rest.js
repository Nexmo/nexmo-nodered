const Nexmo = require('nexmo');
const mustache = require("mustache");



module.exports = function (RED) {
  
   function sendsms(config){
    RED.nodes.createNode(this, config);
    const debug = (this.context().global.get('nexmoDebug') | false);
    this.creds = RED.nodes.getNode(config.creds);
    this.unicode = config.unicode;
    var node = this;
    
    node.on('input', function (msg) {
      var data = dataobject(this.context(), msg)
      this.to = mustache.render(config.to, data);
      this.fr = mustache.render(config.fr, data);
      this.text = mustache.render(config.text, data);
      console.log(this.text);
      const nexmo = new Nexmo({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret
      }, {debug: true, appendToUserAgent: "nexmo-nodered/3.0.0"}
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