// src/data/mockData.js
import {image1} from "../assets/MockImages/mock-images-image1.png";
import {image2} from "../assets/MockImages/mock-images-image2.png";
import {image3} from "../assets/MockImages/mock-images-image3.png";
import {image4} from "../assets/MockImages/mock-images-image4.png";
import {image5} from "../assets/MockImages/mock-images-image5.png";
import {image6} from "../assets/MockImages/mock-images-image6.png";

export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "123456",
    headline: "Web Developer at SkillLink",
    avatar: "/avatars/user1.pn",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "abcdef",
    headline: "Data Analyst",
    avatar: "/avatars/user2.png",
  },
  {
    id: 3,
    name: "Robert Brown",
    email: "robert@example.com",
    password: "pass789",
    headline: "AI Research Intern",
    avatar: "/avatars/user3.png",
  },
];

export const posts = [
  {
    id: 1,
    authorId: 1,
    content: "Excited to share my new SkillLink project!",
    date: "2025-10-25",
    likes: 12,
  },
  {
    id: 2,
    authorId: 2,
    content: "Loving how the dashboard UI is shaping up!",
    date: "2025-10-26",
    likes: 8,
  },
];

export const comments = [
  { id: 1, postId: 1, userId: 2, content: "That looks awesome!" },
];

export const postLikes = [{ postId: 1, userId: 2 }];

export const connections = [
  { id: 1, requesterId: 1, receiverId: 2, status: "accepted" },
];

export const connectionRequests = [
  { id: 101, requesterId: 2, receiverId: 1, status: "pending" },
];

export const currentUser = null;
