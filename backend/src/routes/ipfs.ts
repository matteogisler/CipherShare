import { create } from "ipfs-http-client";

const ipfsUrl = process.env.IPFS_API!;
const client = create({url: ipfsUrl});

export async function addFile(buffer: Buffer): Promise<string> {
  const {cid} = await client.add(buffer);
  return cid.toString();
}
