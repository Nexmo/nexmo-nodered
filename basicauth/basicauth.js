module.exports = function (RED) {
  function vonagebasic(n) {
    RED.nodes.createNode(this, n);
    this.apikey = n.apikey;
    this.apisecret = n.apisecret;
  }

  RED.nodes.registerType("vonagebasic", vonagebasic, {
    credentials: {
      apikey: {
        type: "text"
      },
      apisecret: {
        type: "text"
      }
    }
  });
}