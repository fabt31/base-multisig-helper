# base-multisig-helper

> Gnosis Safe Multisig Helper for Base L2

Utilities and scripts for managing Gnosis Safe multisig wallets on Base. Batch transactions, schedule operations, manage modules, and interact with Safe from CLI.

## Features
- 📦 Batch multiple transactions into one Safe tx
- 🔐 Generate and collect Safe signatures off-chain
- 📅 Schedule delayed executions (Safe Guard)
- 🔌 Safe Module management (add/remove)
- 🤖 CLI for common Safe operations
- 🔗 Integrates with Safe Transaction Service API

## Installation
```bash
git clone https://github.com/fabt31/base-multisig-helper
npm install
```

## CLI Usage
```bash
# Check Safe info
npm run safe:info -- --safe 0xYourSafe

# Propose a batch transaction
npm run safe:batch -- --safe 0xSafe --file transactions.json

# Sign pending transaction
npm run safe:sign -- --safe 0xSafe --nonce 42

# Execute when threshold reached
npm run safe:execute -- --safe 0xSafe --nonce 42
```

## Batch Transaction Format (transactions.json)
```json
[
  { "to": "0xToken", "value": "0", "data": "0xa9059cbb..." },
  { "to": "0xContract", "value": "0", "data": "0x..." }
]
```

## Safe Addresses on Base
- Safe Singleton: `0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552`
- Safe Factory: `0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2`

## License
MIT