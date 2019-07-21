/*
SPDX-License-Identifier: Apache-2.0
*/

/*
 * This application has 6 basic steps:
 * 1. Select an identity from a wallet
 * 2. Connect to network gateway
 * 3. Access PaperNet network
 * 4. Construct request to issue commercial paper
 * 5. Submit transaction
 * 6. Process response
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
var net = require('net');
const { FileSystemWallet, Gateway } = require('fabric-network');

// A wallet stores a collection of identities for use
const wallet = new FileSystemWallet('../../../.fabric-vscode/wallets/local_fabric_wallet');
console.log(`${wallet}`);

// Main program function
async function main() {

  var net = require('net');

  var server = net.createServer(function(socket) {
    socket.write('Echo server\r\n');
    socket.pipe(socket);
  });

  console.log(`${wallet}`);
  // A gateway defines the peers used to access Fabric networks
  const gateway = new Gateway();
  console.log('what');
  const ccpFile = fs.readFileSync('../../../.fabric-vscode/basic_network/connection.json');
  const ccp = JSON.parse(ccpFile.toString());
  await gateway.connect(ccp, {
    identity: 'admin',
    wallet: wallet
  });

  server.listen(8000, '172.29.0.1');
  server.on('connection', function(socket) { while(true){//This is a standard net.Socket
    socket = new JsonSocket(socket); //Now we've decorated the net.Socket to be a JsonSocket
    socket.on('message', function(message) {
        console.log("message")
        var identification = message.id;
        var first_name = message.first_name;
        var last_name = message.last_name;
        var time_stamp = message.time_stamp;
        var latitude = message.latitude;
        var longitude = message.longitude;

        if (first_name == " "){
          if(!(await contract.submitTransaction('rescueeExists', identification)))
            const buyResponse = await contract.submitTransaction('createRescuee', identification);
          else{
            const buyResponse = await contract.submitTransaction('updateRescuee', identification, id, first_name, last_name, time_stamp, latitude, longitude);
          }
        }
        else{
          const buyResponse = await contract.submitTransaction('updateRescuee', identification, id, first_name, last_name, time_stamp, latitude, longitude);
        }
    });
  }
});

  const network = await gateway.getNetwork('mychannel');
  const contract = await network.getContract('Hopeful','org.rescueecontract');
  const buesponse = await contract.submitTransaction('updateRescuee', '1111','John','Doe','now','here','really here');

  const readResponse = await contract.submitTransaction('readRescuee', '1111');
  console.log(`${readResponse}`);
  gateway.disconnect();
}
main().then(() => {

  console.log('Buy program complete.');

}).catch((e) => {

  console.log('Buy program exception.');
  console.log(e);
  console.log(e.stack);
  process.exit(-1);

})
