import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUser(req, res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                {_id : {$ne : currentUserId}},          //exclude current user
                {_id : {$nin : currentUser.friends}},   //excludes current friends's friends
                {isOnboarded: true},
            ],
        });
        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.log("Error in getRecommendedUsers contoller", error.message);
        res.send(500).json({message : "Internal Server Error"});        
    }
}

export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id).select("friends").populate("friends", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(user.friends);
    } catch (error) {
        console.log("Error in geMyFriends controller",error.message);
        res.status(500).json({message : "Internal Server Error"});
    }
}

export async function sendFriendRequest(req, res){
    try {
        const myId = req.user.id;
        const {id:recipientId} = req.params;

        //Preventing sending req to yourself
        if(myId===recipientId){
            return res.status(400).json({message:"you can't send friend request to yourself"});
        }

        const recipient = await User.findById(recipientId);
        if(!recipient){
            return res.status(400).json({message : "Recipient not found"});
        }

        //Checks user is already a friends
        if(recipient.friends.includes(myId)){
            return res.status(400).json({message: "You are already friends with this user"});
        }

        const existingRequest = await FriendRequest.findOne({
            $or : [
                {sender:myId, recipient:recipientId},
                {sender:recipientId, recipient:myId}
            ],
        });
        if(existingRequest){
            return res.status(400).json({message: "A friend request already exists between you and this user"});
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });
        res.status(201).json(friendRequest);
    } catch (error) {
        console.log("Error in sendFriendRequest Controller",error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function acceptFriendRequest(req, res){ 
    try {
        const {id:requestId} = req.params;
        const friendRequest = await FriendRequest.findById(requestId);

        if(!friendRequest){
            return res.status(404).json({message: "Friend Request not found"});
        }

        if(friendRequest.recipient.toString() !== req.user.id){
            return res.status(403).json({message: "You are not authorized to accept this request"});
        }
        friendRequest.status = "accepted";
        await friendRequest.save();

        await User.findByIdAndUpdate(friendRequest.sender,{
            $addToSet : {friends: friendRequest.recipient},
        });
        await User.findByIdAndUpdate(friendRequest.recipient,{
            $addToSet : {friends: friendRequest.sender},
        });

        res.status(200).json({message: "Friend Request Accepted"});
    } catch (error) {
        console.log("Error in acceptFriendRequest controller");
        res.status(500).json({message: "Internal Server Error"})
    }
}

export async function getFriendRequests(req, res) {
    try {
        const incomingReqs = await FriendRequest.find({
            recipient: req.user.id,
            status : "pending",
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

        const acceptedReqs = await FriendRequest.find({
            sender : req.user.id,
            status: "accepted"
        }).populate("recipient","fullName profilePic");

        res.status(200).json({ incomingReqs, acceptedReqs});
    } catch (error) {
        console.log("Error in getFriendRequest Controller",error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function getOngoingFriendReqs(req, res) {
    try {
        const ongoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status: "pending"
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(ongoingRequests);
    } catch (error) {
        console.log("Error in getOngoingFriendReqs",error.message);
        res.status(500).json({message: "Internal Server Error"});
    }    
}