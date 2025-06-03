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

Create a file at `backend/.env` (no surrounding quotes):

```
DATABASE_URL=postgresql://postgres:example@postgres:5432/fileshare
IPFS_API=http://ipfs:5001
HARDHAT_RPC_URL=http://host.docker.internal:8545
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
ACL_CONTRACT_ADDRESS=<to be filled after deployment>
PORT=4000
```

* Use one of the Hardhat node’s private keys for `PRIVATE_KEY`.
* Leave `ACL_CONTRACT_ADDRESS` blank until deployment.

### 3. Spin Up the Hardhat Node

```bash
cd blockchain
npm install
npx hardhat node
```

This starts a local Ethereum node at `http://127.0.0.1:8545` and prints 20 funded test accounts with private keys.

### 4. Deploy the ACL Contract

In a new terminal (still in `blockchain/`):

```bash
npx hardhat ignition deploy ./ignition/modules/ACLRegistry.ts --network localhost
```

Copy the deployed contract address (e.g. `0x5FbD…`) into `backend/.env` as:

```
ACL_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### 5. Run Database Migrations (Inside Docker)

From the project root:

```bash
docker compose up -d postgres backend
```

This starts Postgres and the (exiting) backend. Now enter the backend container:

```bash
docker compose exec backend sh
```

Inside that shell:

```bash
npx prisma migrate dev --name init
exit
```

This creates the `File` table in Postgres via Prisma.

### 6. Launch All Services

```bash
docker compose up --build
```

You should see:

* IPFS daemon ready on ports 5001 (API) and 8080 (gateway)
* Postgres listening on port 5432
* Backend logging `Backend running on port 4000`

### 7. Run the Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). The UI will connect to your backend at `http://localhost:4000`.

---

## License

This project is open-source under the MIT License. Feel free to fork, modify, and build upon it.
