// src/data/mockData.js

// ✅ Import local mock profile images
import image1 from "../assets/MockImages/mock-images-image5.png";
import image2 from "../assets/MockImages/mock-images-image1.png";
import image3 from "../assets/MockImages/mock-images-image3.png";
import image4 from "../assets/MockImages/mock-images-image6.png";
import image5 from "../assets/MockImages/mock-images-image4.png";
import image6 from "../assets/MockImages/mock-images-image2.png";

// ✅ Mock user data (used across Login, Profile, Dashboard, and Connections)
export const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "123456",
    profileImage: image1,
    bio: "Software Engineer passionate about open source and startups.",
    location: "San Francisco, USA",
    role: "Software Engineer",
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    name: "Emily Carter",
    email: "emily@example.com",
    password: "emily@123",
    profileImage: image2,
    bio: "UI/UX designer who loves pastel colors and clean typography.",
    location: "New York, USA",
    role: "UI/UX Designer",
    skills: ["Figma", "TailwindCSS", "Design Systems"],
  },
  {
    id: 3,
    name: "Michael Singh",
    email: "michael@example.com",
    password: "michaelsingh",
    profileImage: image3,
    bio: "Data Scientist focused on NLP and Machine Learning.",
    location: "Toronto, Canada",
    role: "Data Scientist",
    skills: ["Python", "TensorFlow", "NLP"],
  },
  {
    id: 4,
    name: "Sophia Lopez",
    email: "sophia@example.com",
    password: "sophia@la",
    profileImage: image4,
    bio: "Frontend developer exploring React and TailwindCSS.",
    location: "Los Angeles, USA",
    role: "Frontend Developer",
    skills: ["React", "GSAP", "TailwindCSS"],
  },
  {
    id: 5,
    name: "Rachel Mehta",
    email: "rachel@example.com",
    password: "bangalore@embedded",
    profileImage: image5,
    bio: "IoT enthusiast and embedded systems hobbyist.",
    location: "Bangalore, India",
    role: "Embedded Systems Engineer",
    skills: ["ESP32", "STM32", "C/C++"],
  },
  {
    id: 6,
    name: "Layla Ahmed",
    email: "layla@example.com",
    password: "layla@dubai",
    profileImage: image6,
    bio: "Cloud Engineer working on scalable web architectures.",
    location: "Dubai, UAE",
    role: "Cloud Engineer",
    skills: ["AWS", "Docker", "Kubernetes"],
  },
];

// ✅ Mock post data (used in Dashboard)
export const mockPosts = [
  {
    id: 1,
    userId: 1,
    content: "Exploring the new features in React 19. Hooks just got smarter!",
    timestamp: "2025-10-25T10:30:00Z",
  },
  {
    id: 2,
    userId: 2,
    content: "Designing minimal dashboards with TailwindCSS is so refreshing ✨",
    timestamp: "2025-10-26T09:15:00Z",
  },
  {
    id: 3,
    userId: 3,
    content: "Training an NLP model for sentiment analysis — loving the results so far!",
    timestamp: "2025-10-27T14:00:00Z",
  },
  {
    id: 4,
    userId: 4,
    content: "Experimenting with GSAP animations for smooth UI transitions 🚀",
    timestamp: "2025-10-28T12:45:00Z",
  },
  {
    id: 5,
    userId: 5,
    content: "Just finished building my ESP32 + Firebase project 🔥",
    timestamp: "2025-10-28T17:10:00Z",
  },
  {
    id: 6,
    userId: 6,
    content: "Deploying a cloud-native CI/CD pipeline — automation at its best 💡",
    timestamp: "2025-10-29T09:00:00Z",
  },
];

// ✅ Mock connections (used in Connections page)
export const mockConnections = [
  // Accepted connections
  { id: 1, userId: 1, connections: [2, 3], status: "accepted", connectedAt: "2025-10-24T11:30:00Z" },
  { id: 2, userId: 2, connections: [1, 4], status: "accepted", connectedAt: "2025-10-25T14:20:00Z" },
  { id: 3, userId: 3, connections: [1, 5], status: "accepted", connectedAt: "2025-10-26T09:10:00Z" },
  { id: 4, userId: 4, connections: [2, 6], status: "accepted", connectedAt: "2025-10-27T08:50:00Z" },
  { id: 5, userId: 5, connections: [3, 6], status: "accepted", connectedAt: "2025-10-28T13:05:00Z" },
  { id: 6, userId: 6, connections: [4, 5], status: "accepted", connectedAt: "2025-10-29T10:15:00Z" },

  // Pending requests
  { id: 7, userId: 1, connections: [4], status: "pending", connectedAt: "2025-10-29T12:00:00Z" },
  { id: 8, userId: 2, connections: [5], status: "pending", connectedAt: "2025-10-29T13:30:00Z" },
];
