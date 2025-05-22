import { Router, RequestHandler, Request, Response } from "express";
import { db } from "../services/db";

const router = Router();

// Defined upload handler as a RequestHandler
const uploadHandler: RequestHandler = async (req, res) => {
  try {
    const {
      filename,
      cid,
      uploader,
      nonce,
      sealedKey,
    } = req.body as {
      filename: string;
      cid: string;
      uploader: string;
      nonce: string;
      sealedKey: string;
    };

    if (!filename || !cid || !uploader || !nonce || !sealedKey) {
      res.status(400).json({ error: "Missing required upload fields" });
      return;
    }

    const newRecord = await db.file.create({
      data: {
        filename,
        cid,
        uploader,
        nonce,
        sealedKey,
      },
    });

    res.json({ success: true, file: newRecord });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Database error", details: err.message });
  }
};

// Mount it on the router
router.post("/upload", uploadHandler);

export default router;
