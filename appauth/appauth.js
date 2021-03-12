const Vonage = require('@vonage/server-sdk');
const version = require('./package.json').version

module.exports = function (RED) {
  function vonageappauth(n) {
    RED.nodes.createNode(this, n);
    this.apikey = n.apikey;
    this.apisecret = n.apisecret;
    this.name = n.name;
    this.answerurl = n.answerurl;
    this.eventurl = n.eventurl;
    this.appid = n.appid;
    this.privatekey = n.privatekey;
  }

  RED.nodes.registerType("vonageappauth", vonageappauth, {
    credentials: {
      apikey: {
        type: "text"
      },
      apisecret: {
        type: "text"
      },
      privatekey: {
        type: "text"
      },
      appid: {
        type: "text"
      }
    }
  });

  RED.httpAdmin.post('/vonage-auth/new-app', RED.auth.needsPermission('vonage.write'), function (req, res) {
    const vonage = new Vonage({
      apiKey: req.body.api_key,
      apiSecret: req.body.api_secret
    }, {
      debug: false,
      appendToUserAgent: "vonage-nodered/" + version
    });

    vonage.applications.create({
      name: req.body.name,
      capabilities: {
        voice: {
          webhooks: {
            answer_url: {
              address: req.body.answer_url,
              http_method: "GET"
            },
            event_url: {
              address: req.body.event_url,
              http_method: "POST"
            }
          }
        }
      }
    }, (error, response) => {
      res.send(response);
    });
  });
}