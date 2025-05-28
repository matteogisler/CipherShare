import { Router, RequestHandler } from "express";
import { grantAccess, checkAccess } from "../services/acl";

const router = Router();

// POST /acl/grant-access
const grantAccessHandler: RequestHandler = async (req, res) => { 
  const { fileId, grantee } = req.body;
  if (!fileId || !grantee) {
    res.status(400).json({ error: "Missing fileId or grantee" });
    return;
  }
  try {
    await grantAccess(fileId, grantee);
    res.json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to grant access", details: err.message });
  }
};

// GET /acl/check-access
const checkAccessHandler: RequestHandler = async (req, res) => {
  const fileId = req.query.fileId as string;
  const user = req.query.user as string; 
  if (!fileId || !user) {
    res.status(400).json({ error: "Missing fileId or user" });
    return;
  }
  try {
    const access = await checkAccess(fileId, user);
    res.json({ access });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to check access", details: err.message });
  }
};

router.post("/grant-access", grantAccessHandler);
router.get("/check-access", checkAccessHandler);

export default router;
