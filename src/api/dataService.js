// src/api/dataService.js
import { mockUsers, mockPosts, mockConnections } from "../data/mockData";

export const getUsers = async () => {
  return mockUsers;
};

export const getUserById = async (id) => {
  return mockUsers.find((user) => user.id === id);
};

export const getPosts = async () => {
  return mockPosts;
};

// Get the current logged-in user (mock)
export const getCurrentUser = () => {
  // You can later replace this logic with actual auth
  return mockUsers[0]; // returns the first mock user as the logged-in user
};


export const getPostById = async (id) => {
  return mockPosts.find((post) => post.id === id);
};

export const getConnections = async () => {
  return mockConnections;
};

export const getConnectionById = async (id) => {
  return mockConnections.find((conn) => conn.id === id);
};

// Simulate adding new post (mock backend)
export const addPost = async (newPost) => {
  mockPosts.push(newPost);
  return newPost;
};

// Simulate adding connection
export const addConnection = async (newConnection) => {
  mockConnections.push(newConnection);
  return newConnection;
};

// Simulate removing a connection
export const removeConnection = async (id) => {
  const index = mockConnections.findIndex((conn) => conn.id === id);
  if (index !== -1) mockConnections.splice(index, 1);
  return true;
};

// Mock implementation of pending requests
export const getConnectionRequests = () => {
  return mockConnections.filter(c => c.status === "pending");
};

// Create a new post
export const createPost = (userId, content) => {
  const newPost = {
    id: mockPosts.length + 1,
    userId,
    content,
    timestamp: new Date().toISOString(),
  };
  mockPosts.unshift(newPost);
  return newPost;
};

// Accept a connection
export const acceptConnection = (connectionId) => {
  const conn = mockConnections.find(c => c.id === connectionId);
  if (conn) conn.status = "accepted";
  return conn;
};

// Reject a connection
export const rejectConnection = (connectionId) => {
  const conn = mockConnections.find(c => c.id === connectionId);
  if (conn) conn.status = "rejected";
  return conn;
};
