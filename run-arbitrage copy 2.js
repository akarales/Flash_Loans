require('dotenv').config()

const infuraUrl = process.env.INFURA_URL;
if (!infuraUrl) {
  console.error('INFURA_URL is not defined in your .env file');
  process.exit(1);
}
const { Web3 } = require("web3");
const web3 = new Web3(new Web3.providers.WebsocketProvider(infuraUrl));
// console.log(web3);

web3.on("block", (blockNumber) => {
    // Emitted on every block change
    console.log('new block', blockNumber)
    });