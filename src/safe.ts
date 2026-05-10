import { ethers } from "ethers";
import SafeApiKit from "@safe-global/api-kit";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { MetaTransactionData } from "@safe-global/safe-core-sdk-types";

const TX_SERVICE_URL = "https://safe-transaction-base.safe.global";

export async function getSafeInfo(safeAddress: string, rpcUrl: string) {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const signer = provider.getSigner();
  const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: await signer });
  const safeSdk = await Safe.create({ ethAdapter, safeAddress });

  const [owners, threshold, nonce, balance] = await Promise.all([
    safeSdk.getOwners(),
    safeSdk.getThreshold(),
    safeSdk.getNonce(),
    provider.getBalance(safeAddress),
  ]);

  return { safeAddress, owners, threshold, nonce, balanceEth: ethers.formatEther(balance) };
}

export async function proposeBatchTransaction(
  safeAddress: string, transactions: MetaTransactionData[], signerKey: string, rpcUrl: string
) {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const signer = new ethers.Wallet(signerKey, provider);
  const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer });

  const safeSdk = await Safe.create({ ethAdapter, safeAddress });
  const apiKit = new SafeApiKit({ txServiceUrl: TX_SERVICE_URL, ethAdapter });

  const safeTransaction = await safeSdk.createTransaction({ transactions });
  const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);
  const signature = await safeSdk.signTransactionHash(safeTxHash);

  await apiKit.proposeTransaction({
    safeAddress,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress: signer.address,
    senderSignature: signature.data,
  });

  console.log(`Transaction proposed: ${safeTxHash}`);
  return safeTxHash;
}