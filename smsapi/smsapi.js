const Vonage = require('@vonage/server-sdk');
const mustache = require("mustache");
const version = require('./package.json').version

module.exports = function (RED) {
  
   function sendsms(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    this.unicode = config.unicode;
    var node = this;
    
    node.on('input', function (msg) {
      var debug = (this.context().global.get('vonageDebug') | false);
      var data = dataobject(this.context(), msg)
      this.to = mustache.render(config.to, data);
      this.fr = mustache.render(config.fr, data);
      this.text = mustache.render(config.text, data);
      const vonage = new Vonage({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret
      }, {debug: debug, appendToUserAgent: "vonage-nodered/"+version}
      );
      const opts = {}
      if (this.unicode == true){
        opts.type = "unicode";
      } else{
        opts.type = "text";
      }
      vonage.message.sendSms(this.fr, this.to, this.text, opts, function(err, response){
        if(err) { console.error(err); }
        else {
          msg.payload=response;
          node.send(msg)  
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
