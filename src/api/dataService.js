// src/api/dataService.js

import {
  users,
  posts,
  comments,
  connections,
  postLikes,
  connectionRequests,
} from "../data/mockData";

// 🧠 Mock functions (will later connect to backend APIs)

// Basic Getters
export const getUsers = async () => users;

export const getCurrentUser = () => {
  const saved = localStorage.getItem("currentUser");
  return saved ? JSON.parse(saved) : null;
};

export const getPosts = async () => posts;
export const getComments = async () => comments;
export const getConnections = async () => connections;
export const getConnectionRequests = async () => connectionRequests;
export const getPostLikes = async () => postLikes;

// Create Post (mock)
export const createPost = async (newPost) => {
  newPost.id = posts.length + 1;
  posts.push(newPost);
  return newPost;
};

// Connection Requests (mock)
export const acceptConnection = async (requestId) => {
  const request = connectionRequests.find((r) => r.id === requestId);
  if (request) {
    request.status = "accepted";
    connections.push({
      id: connections.length + 1,
      requesterId: request.requesterId,
      receiverId: request.receiverId,
      status: "accepted",
    });
  }
  return request;
};

export const rejectConnection = async (requestId) => {
  const index = connectionRequests.findIndex((r) => r.id === requestId);
  if (index !== -1) connectionRequests.splice(index, 1);
  return true;
};

// 🔐 User Auth (mock)
export async function createUser(form) {
  const newUser = {
    id: Date.now(),
    name: form.username,
    email: form.email,
    password: form.password,
    avatar: "/avatars/default.png",
    headline: "New SkillLink Member",
  };
  users.push(newUser);
  localStorage.setItem("currentUser", JSON.stringify(newUser));
  return newUser;
}

export async function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );
      if (!user) {
        reject(new Error("Invalid email or password"));
      } else {
        localStorage.setItem("currentUser", JSON.stringify(user));
        resolve(user);
      }
    }, 500);
  });
}
