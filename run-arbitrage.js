require('dotenv').config()

const infuraUrl = process.env.INFURA_URL;
const abis = require('./abis')
const { mainnet: addresses } = require('./addresses')
if (!infuraUrl) {
  console.error('INFURA_URL is not defined in your .env file');
  process.exit(1);
}

const {Web3} = require("web3");

// Configure reconnect options for WebsocketProvider
const websocketOptions = {
  clientConfig: {
    reconnect: {
      auto: true, // Automatically attempt to reconnect
      delay: 5000, // Reconnect after 5 seconds
      maxRetries: 10, // Max number of retries
    },
  },
};

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(infuraUrl, websocketOptions)
);

const kyber = new web3.eth.Contract(
    abis.kyber.kyberNetworkProxy,
    addresses.kyber.kyberNetworkProxy
);

// const AMOUNT_ETH = 100;
// const RECENT_ETH_PRICE = 230;
// const AMOUNT_ETH_WEI = web3.utils.toWei(AMOUNT_ETH.toString());
// const AMOUNT_DIA_WEI = web3.utils.toWei((AMOUNT_ETH * RECENT_ETH_PRICE).toString());

async function subscribeToNewBlocks() {
    try {
        // Create a new subscription to the 'newBlockHeaders' event
        const subscription = await web3.eth.subscribe('newBlockHeaders');

        // Attach event listeners to the subscription object
        subscription.on('connected', handleConnected);
        subscription.on('data', handleNewBlock);
        subscription.on('error', handleError);
    } catch (error) {
        console.error(`Error subscribing to new blocks: ${error}`);
    }
}

/* Fallback functions to react to the different events */

// Event listener that logs a message when the subscription is connected
function handleConnected(subscriptionId) {
    console.log(`New subscription: ${subscriptionId}`);
}

// Event listener that logs the received block header data
function handleNewBlock(blockHeader) {
    // console.log(blockHeader);
    console.log(`Block number: ${blockHeader.number}`);
}

// Event listener that logs any errors that occur
function handleError(error) {
    console.error(`Error receiving new blocks: ${error}`);
}

subscribeToNewBlocks();