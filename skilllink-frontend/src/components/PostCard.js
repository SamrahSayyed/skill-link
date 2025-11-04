import React, { useState, useEffect } from "react";
import ProfileAvatar from "./ProfileAvatar";
import { AiOutlineLike, AiFillLike, AiOutlineComment } from "react-icons/ai";
import axios from "axios";
import { useUser } from "../context/UserContext";

export default function PostCard({ post }) {
  const { user } = useUser();

  const displayName = post.username || "Unknown";
  const displayAvatar = post.profile_image || "";
  const time = post.created_at ? new Date(post.created_at) : null;

  const [likes, setLikes] = useState(post.post_likes || 0);
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  // Fetch likes and comments
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/post_likes/${post.post_id}`);
        const userLike = res.data.find(like => like.user_id === user.id);
        if (userLike) {
          setLiked(true);
          setLikeId(userLike.id);
        }
        setLikes(res.data.length);
      } catch (err) {
        console.error("Error fetching likes:", err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/comments/${post.post_id}`);
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchLikes();
    fetchComments();
  }, [post.post_id, user.id]);

  const handleLike = async () => {
    try {
      if (!liked) {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/post_likes`, {
          user_id: user.id,
          post_id: post.post_id,
        });
        setLiked(true);
        setLikeId(res.data.id);
        setLikes(prev => prev + 1);
      } else {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/post_likes/${likeId}`);
        setLiked(false);
        setLikeId(null);
        setLikes(prev => prev - 1);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/comments`, {
        post_id: post.post_id,
        user_id: user.id,
        content: newComment,
      });
      // Attach username & profile_image for the new comment
      setComments(prev => [{ ...res.data, username: user.username, profile_image: user.profile_image }, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
      <div className="flex items-start gap-3 mb-3">
        <ProfileAvatar name={displayName} profileImage={displayAvatar} size="w-12 h-12" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{displayName}</div>
              {time && <div className="text-xs text-gray-500">{time.toLocaleString()}</div>}
            </div>
          </div>

          <div className="mt-3 text-gray-800 whitespace-pre-wrap">{post.content}</div>

          {post.image_url && (
            <div className="mt-3 rounded-xl overflow-hidden">
              <img src={post.image_url} alt="Post content" className="w-full h-auto rounded-xl" />
            </div>
          )}

          <div className="flex gap-6 mt-4 text-sm text-gray-600 items-center">
            <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer" onClick={handleLike}>
              {liked ? <AiFillLike size={18} className="text-blue-500" /> : <AiOutlineLike size={18} />}
              <span>{likes}</span>
            </div>

            <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer" onClick={() => setShowComments(prev => !prev)}>
              <AiOutlineComment size={18} />
              <span>{comments.length}</span>
            </div>
          </div>

          {/* Add Comment */}
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              className="border border-gray-300 rounded-xl p-2 flex-1"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="px-3 py-1 bg-blue-500 text-white rounded-xl" onClick={handleAddComment}>
              Post
            </button>
          </div>

          {/* Expandable Comments */}
          {showComments && comments.length > 0 && (
            <div className="mt-4 border-t border-gray-100 pt-3">
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-3 mb-3">
                  <ProfileAvatar name={comment.username || "Unknown"} profileImage={comment.profile_image || ""} size="w-10 h-10" />
                  <div className="bg-gray-100 rounded-xl p-2 flex-1">
                    <div className="font-medium text-sm">{comment.username || "Unknown"}</div>
                    <div className="text-sm text-gray-700">{comment.content}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
