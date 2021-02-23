const Nexmo = require('nexmo');
const mustache = require("mustache");
const version = require('../package.json').version
mustache.escape = function (text) { return text; }


module.exports = function (RED) {
   function updateNumber(config){
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    var node = this;
    node.on('input', function (msg) {
    if (msg.payload != null){
        var debug = (this.context().global.get('nexmoDebug') | false);
      var data = dataobject(this.context(), msg)
      var update = {}
      this.number = mustache.render(config.number, data)
      config.voiceAppid ? update.voiceAppid = mustache.render(config.voiceAppid, data) : update.voiceAppid = false
      config.smsURL ? update.smsURL = mustache.render(config.smsURL, data) : update.smsURL = false
      const nexmo = new Nexmo({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret
      }, {debug: true, appendToUserAgent: "nexmo-nodered/"+version});
      nexmo.number.get({pattern: this.number, search_pattern: 0 }, (error, result) => {
        if(error) {
          console.error(error);
        }
        else {
          let data = {}
          result.numbers[0].voiceCallbackValue ? null : data.voiceCallbackValue = ""
          result.numbers[0].voiceCallbackType ? null : data.voiceCallbackType = ""
          result.numbers[0].moHttpUrl ? null : data.moHttpUrl = ""

          update.voiceAppid ? data.voiceCallbackValue = update.voiceAppid : data.voiceCallbackValue = result.numbers[0].voiceCallbackValue
          update.voiceAppid ? data.voiceCallbackType = 'app' : data.voiceCallbackType = result.numbers[0].voiceCallbackType
          update.smsURL ? data.moHttpUrl = update.smsURL : data.moHttpUrl = result.numbers[0].moHttpUrl
          clean(data)
          nexmo.number.update(result.numbers[0].country, result.numbers[0].msisdn, data, (err, res) => {
              if (err) {
                console.error(err)
              }
              else {
                msg.payload = res
                node.send(msg)
              }
            }
          )
        }
      });
    }  
    });
  }
  RED.nodes.registerType("updateNumber",updateNumber);    
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

function clean(obj) {
  for (var propName in obj) { 
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}