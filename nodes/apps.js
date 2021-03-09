const Vonage = require('@vonage/server-sdk');
const mustache = require("mustache");
const version = require('../package.json').version
mustache.escapeHtml = function (text) { return text; }


module.exports = function (RED) {
   function updateVonageApp(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    var node = this;
    node.on('input', function (msg) {
    if (msg.payload != null){
        var debug = (this.context().global.get('vonageDebug') | false);
      var data = dataobject(this.context(), msg)
      var update = {}
      this.creds.credentials.appid ? update.appid = mustache.render(this.creds.credentials.appid, data) : update.appid = false
      config.answerURL ? update.answerURL = mustache.render(config.answerURL, data) : update.answerURL = false
      config.answerURL ? update.eventURL = mustache.render(config.eventURL, data) : update.answerURL = false
      const vonage = new Vonage({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret
      }, {debug: debug, appendToUserAgent: "vonage-nodered/"+version});
      vonage.applications.get(update.appid, (error, result) => {
        if(error) {
          console.error(error);
        }
        else {
           update.answerURL ? result.capabilities.voice.webhooks.answer_url.address = update.answerURL : null
           update.eventURL ? result.capabilities.voice.webhooks.event_url.address = update.eventURL : null
           vonage.applications.update(update.appid, result, (error, response) => {
            if(error) {
              console.error(error);
            }
            else {
              msg.payload = response;
              node.send(msg);
            }
          });
        }
      }, true);
    }  
    });
  }
  

  RED.nodes.registerType("updateVonageApp",updateVonageApp);    
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
