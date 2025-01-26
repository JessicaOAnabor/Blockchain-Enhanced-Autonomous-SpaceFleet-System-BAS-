const { ethers } = require('hardhat');
const connectToPolkadot = require('./polkadotConnection'); // Import the Polkadot connection

async function main() {
  // Connect to Polkadot Test Network (Westend)
  const api = await connectToPolkadot();

  // Query the current block number (latest block on Polkadot network)
  const blockNumber = await api.rpc.chain.getBlock();
  console.log(`Latest block number: ${blockNumber.block.header.number}`);

  // Query the current staking era
  const activeEra = await api.query.staking.activeEra();
  console.log(`Active Staking Era: ${JSON.stringify(activeEra.toHuman())}`); // Convert to human-readable format

  // Query the list of active validators
  const activeValidators = await api.query.staking.validators.entries();
  console.log('Active validators: ');
  activeValidators.forEach(([key, value]) => {
    const validatorId = key.args[0].toString(); // Extract the validator ID
    const validatorInfo = value.toHuman(); // Convert validator info to human-readable
    console.log(`Validator ID: ${validatorId}, Info: ${JSON.stringify(validatorInfo)}`);
  });

  // Query staking information for a specific Polkadot address
  const polkadotAccount = '5DaFCaz13XRT8nRZmmAg73t5LWafbzf6tui64S9A2L8mRHww'; // Replace with your Polkadot address
  const stakingInfo = await api.query.staking.nominators(polkadotAccount);
  console.log(`Staking info for ${polkadotAccount}:`);
  console.log(stakingInfo.isNone ? 'No staking information available.' : stakingInfo.toHuman()); // Check if data exists

  // Example: Get the staking ledger for a specific account (nominator)
  const stakingLedger = await api.query.staking.ledger(polkadotAccount);
  console.log(`Staking ledger for ${polkadotAccount}:`);
  console.log(stakingLedger.isNone ? 'No staking ledger found.' : stakingLedger.toHuman()); // Check if data exists
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
