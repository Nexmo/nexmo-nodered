const Nexmo = require('nexmo');

module.exports = function (RED) {
  
  function nexmovoiceapp(n){
   RED.nodes.createNode(this, n);
   this.apikey = n.apikey;
   this.apisecret = n.apisecret;
   this.name = n.name;
   this.appid = n.appid;
   this.privatekey = n.privatekey;
 }

  RED.nodes.registerType("nexmovoiceapp",nexmovoiceapp);  
  
  function nexmobasic(n){
   RED.nodes.createNode(this, n);
   this.apikey = n.apikey;
   this.apisecret = n.apisecret;
 }
 RED.nodes.registerType("nexmobasic",nexmobasic);    
}