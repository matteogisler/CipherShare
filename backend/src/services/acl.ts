import { ethers } from "ethers";
import * as dotenv from "dotenv";
import aclAbi from "../contracts/ACLRegistry.abi.json";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.HARDHAT_RPC_URL);

// Signer: uses Hardhat accounts private key
const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

// Contract instance
const contractAddress = process.env.ACL_CONTRACT_ADDRESS!;
const aclContract = new ethers.Contract(contractAddress, aclAbi, signer);

function hashFileId(fileId: string): string {
  return ethers.id(fileId);
}

export async function grantAccess(fileId: string, grantee: string): Promise<void> {
  const hashedId = hashFileId(fileId);
  const tx = await aclContract.grantAccess(hashedId, grantee);
  await tx.wait();
  console.log(`Granted access to ${grantee} for file ${fileId}`);
}

export async function checkAccess(fileId: string, user: string): Promise<boolean> {
  const hashedId = hashFileId(fileId);
  const result: boolean = await aclContract.checkAccess(hashedId, user);
  return result;
}
