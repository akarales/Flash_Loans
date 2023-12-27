require('dotenv').config();
const { Web3 } = require("web3");

const infuraUrl = process.env.INFURA_URL;
if (!infuraUrl) {
  console.error('INFURA_URL is not defined in your .env file');
  process.exit(1);
}

const web3 = new Web3(new Web3.providers.WebsocketProvider(infuraUrl));

var subscription = web3.eth.subscribe('newBlockHeaders', function(error, result){
    if (!error) {
        console.log(result);
        return;
    }
    console.error(error);
})
.on("connected", function(subscriptionId){
    console.log(subscriptionId);
})
.on("data", function(blockHeader){
    console.log(blockHeader);
})
.on("error", console.error);

// To unsubscribe, you'll typically want to do this in response to some event
// or condition, not immediately after subscribing.
subscription.unsubscribe(function(error, success){
    if (success) {
        console.log('Successfully unsubscribed!');
    }
});
