const Vonage = require('@vonage/server-sdk');
const mustache = require("mustache");
const version = require('./package.json').version

module.exports = function (RED) {

  function sendverify(config) {
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    var node = this;

    node.on('input', function (msg) {
      var debug = (this.context().global.get('vonageDebug') | false);
      var data = dataobject(this.context(), msg)
      this.to = mustache.render(config.to, data);
      this.brand = mustache.render(config.brand, data);
      this.workflow_id = mustache.render(config.workflow_id, data);
      const vonage = new Vonage({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret
      }, {
        debug: debug,
        appendToUserAgent: "vonage-nodered/" + version
      });
      vonage.verify.request({
        number: this.to,
        brand: this.brand,
        workflow_id: this.workflow_id
      }, function (err, response) {
        if (err) {
          console.error(err);
        } else {
          msg.payload = response;
          node.send(msg)
        }
      })
    });
  }

  function checkverify(config) {
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    var node = this;

    node.on('input', function (msg) {
      var debug = (this.context().global.get('vonageDebug') | false);
      var data = dataobject(this.context(), msg)
      this.verify_id = mustache.render(config.verify_id, data);
      this.code = mustache.render(config.code, data);
      const vonage = new Vonage({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret
      }, {
        debug: debug,
        appendToUserAgent: "vonage-nodered/" + version
      });
      vonage.verify.check({
        request_id: this.verify_id,
        code: this.code
      }, function (err, response) {
        if (err) {
          console.error(err);
        } else {
          msg.payload = response;
          node.send(msg)
        }
      })
    });
  }

  function cancelverify(config) {
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    var node = this;

    node.on('input', function (msg) {
      var debug = (this.context().global.get('vonageDebug') | false);
      this.verify_id = mustache.render(config.verify_id, dataobject(this.context(), msg));
      const vonage = new Vonage({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret
      }, {
        debug: debug,
        appendToUserAgent: "vonage-nodered/" + version
      });
      vonage.verify.control({
        request_id: this.verify_id,
        cmd: 'cancel'
      }, function (err, response) {
        if (err) {
          console.error(err);
        } else {
          msg.payload = response;
          node.send(msg)
        }
      })
    });
  }

  function nextverify(config) {
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    var node = this;

    node.on('input', function (msg) {
      var debug = (this.context().global.get('vonageDebug') | false);
      this.verify_id = mustache.render(config.verify_id, dataobject(this.context(), msg));
      const vonage = new Vonage({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret
      }, {
        debug: debug,
        appendToUserAgent: "vonage-nodered/" + version
      });
      vonage.verify.control({
        request_id: this.verify_id,
        cmd: 'trigger_next_event'
      }, function (err, response) {
        if (err) {
          console.error(err);
        } else {
          msg.payload = response;
          node.send(msg)
        }
      })
    });
  }

  function searchverify(config) {
    RED.nodes.createNode(this, config);
    this.creds = RED.nodes.getNode(config.creds);
    var node = this;

    node.on('input', function (msg) {
      var debug = (this.context().global.get('vonageDebug') | false);
      this.verify_id = mustache.render(config.verify_id, dataobject(this.context(), msg));
      const vonage = new Vonage({
        apiKey: this.creds.credentials.apikey,
        apiSecret: this.creds.credentials.apisecret
      }, {
        debug: debug,
        appendToUserAgent: "vonage-nodered/" + version
      });
      vonage.verify.search(this.verify_id, function (err, response) {
        if (err) {
          console.error(err);
        } else {
          msg.payload = response;
          node.send(msg)
        }
      });

    })
  }
  RED.nodes.registerType("sendverify", sendverify);
  RED.nodes.registerType("checkverify", checkverify);
  RED.nodes.registerType("cancelverify", cancelverify);
  RED.nodes.registerType("nextverify", nextverify);
  RED.nodes.registerType("searchverify", searchverify);
}

function dataobject(context, msg) {
  data = {};
  data.msg = msg;
  data.global = {};
  data.flow = {};
  g_keys = context.global.keys();
  f_keys = context.flow.keys();
  for (k in g_keys) {
    data.global[g_keys[k]] = context.global.get(g_keys[k]);
  };
  for (k in f_keys) {
    data.flow[f_keys[k]] = context.flow.get(f_keys[k]);
  };
  return data
}