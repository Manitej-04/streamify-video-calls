import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecommendedUser, getMyFriends, sendFriendRequest, acceptFriendRequest, getFriendRequests, getOngoingFriendReqs } from "../controllers/user.controller.js";

const router = express.Router();

//apply to all routes
router.use(protectRoute);

router.get("/", getRecommendedUser);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests",getOngoingFriendReqs);

export default router;