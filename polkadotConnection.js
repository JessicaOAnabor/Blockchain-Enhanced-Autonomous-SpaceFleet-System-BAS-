const { ApiPromise, WsProvider } = require('@polkadot/api');

// Connect to Polkadot Test Network (Westend)
const connectToPolkadot = async () => {
  // This is the WebSocket URL for Polkadot's Westend test network
  const provider = new WsProvider('wss://westend-rpc.polkadot.io'); // Public endpoint for Westend

  // Create an API instance
  const api = await ApiPromise.create({ provider });
  
  console.log('Connected to Polkadot test network (Westend)!');
  return api;
};

module.exports = connectToPolkadot;


