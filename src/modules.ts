import { ethers } from "ethers";
const SAFE_ABI = ["function enableModule(address module)", "function disableModule(address prevModule, address module)", "function isModuleEnabled(address module) view returns (bool)", "function getModules() view returns (address[] memory)"];
export async function listSafeModules(safeAddress: string, provider: ethers.JsonRpcProvider): Promise<string[]> {
  const safe = new ethers.Contract(safeAddress, SAFE_ABI, provider);
  return safe.getModules();
}
