# CipherShare

A decentralized, encrypted file-sharing application using IPFS for storage, PostgreSQL via Prisma for metadata, and an on-chain ACL smart contract deployed on a local Hardhat network.

---

## Features

* **Client-Side Encryption**: Files are encrypted in the browser before upload; backend never sees plaintext.
* **IPFS Storage**: Encrypted blobs are stored on IPFS; backend saves returned CIDs.
* **On-Chain ACL**: A Solidity contract (ACLRegistry) records which Ethereum addresses can access which files.
* **Dockerized Backend**: Node.js/Express API, Postgres, and IPFS run in Docker containers.
* **Prisma ORM**: PostgreSQL metadata (filename, CID, uploader, encryption info) managed via Prisma.
* **Hardhat Local Blockchain**: Develop and test the ACL contract on a local Hardhat node.
* **Next.js Frontend**: React-based UI for uploading, granting access, and downloading/decrypting files.

---

## Tech Stack

* **Frontend**: Next.js (TypeScript), Tailwind CSS, Ethers.js
* **Backend**: Node.js (TypeScript) with Express, Ethers.js, Multer, `ipfs-http-client`, Prisma (PostgreSQL)
* **Blockchain**: Solidity (ACLRegistry), Hardhat + Ignition, TypeChain
* **Database**: PostgreSQL (Docker) via Prisma
* **Storage**: IPFS (go-ipfs, Docker)
* **Containerization**: Docker Compose

---

## Prerequisites

* Node.js (v18 or higher) and npm
* Docker & Docker Compose
* (Optional) Git to clone the repository

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/matteogisler/CipherShare.git
cd CipherShare
```

### 2. Backend Environment Variables

Create a file at `backend/.env`:

```
DATABASE_URL=postgresql://postgres:example@postgres:5432/fileshare
IPFS_API=http://ipfs:5001
HARDHAT_RPC_URL=http://host.docker.internal:8545
PRIVATE_KEY=0x<Hardhat Account #0 Private Key>
ACL_CONTRACT_ADDRESS=<deployed address>
PORT=4000
```
