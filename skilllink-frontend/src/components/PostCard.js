import React, { useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import { AiOutlineLike, AiFillLike, AiOutlineComment } from "react-icons/ai";

export default function PostCard({ post }) {
  const displayName = post.displayName || post.user_name || post.user?.name || "Unknown";
  const displayAvatar = post.displayAvatar || post.user_profile_pic || post.user?.profileImage || "";
  const time = post.timestamp ? new Date(post.timestamp) : null;

  // Local state for like and comments
  const [likes, setLikes] = useState(post.post_likes || 0);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Toggle like functionality
  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
      <div className="flex items-start gap-3 mb-3">
        <ProfileAvatar
          name={displayName}
          profileImage={displayAvatar}
          size="w-12 h-12"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{displayName}</div>
              {time && (
                <div className="text-xs text-gray-500">
                  {time.toLocaleString()}
                </div>
              )}
            </div>
          </div>

          {/* Post Content */}
          <div className="mt-3 text-gray-800 whitespace-pre-wrap">
            {post.post_text || post.content}
          </div>

          {/* Post Image (if any) */}
          {post.post_image && (
            <div className="mt-3 rounded-xl overflow-hidden">
              <img
                src={post.post_image}
                alt="Post content"
                className="w-full h-auto rounded-xl"
              />
            </div>
          )}

          {/* Like + Comment Row */}
          <div className="flex gap-6 mt-4 text-sm text-gray-600 items-center">
            <div
              className="flex items-center gap-1 hover:text-blue-500 cursor-pointer"
              onClick={handleLike}
            >
              {liked ? (
                <AiFillLike size={18} className="text-blue-500" />
              ) : (
                <AiOutlineLike size={18} />
              )}
              <span>{likes}</span>
            </div>

            <div
              className="flex items-center gap-1 hover:text-blue-500 cursor-pointer"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <AiOutlineComment size={18} />
              <span>{post.comments?.length || 0}</span>
            </div>
          </div>

          {/* Comment Section */}
          {showComments && post.comments?.length > 0 && (
            <div className="mt-4 border-t border-gray-100 pt-3">
              {post.comments.map((comment, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <ProfileAvatar
                    name={comment.user_name}
                    profileImage={comment.user_profile_pic}
                    size="w-10 h-10"
                  />
                  <div className="bg-gray-100 rounded-xl p-2 flex-1">
                    <div className="font-medium text-sm">
                      {comment.user_name}
                    </div>
                    <div className="text-sm text-gray-700">
                      {comment.comment_text}
                    </div>
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
