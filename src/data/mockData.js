export const users = [
  { id: 1, username: "Samrah", email: "samrah@example.com", location: "Pune", bio: "Aspiring AI/ML Engineer", profilePic: "" },
  { id: 2, username: "Aarav", email: "aarav@example.com", location: "Mumbai", bio: "Frontend dev", profilePic: "" },
  { id: 3, username: "Riya", email: "riya@example.com", location: "Delhi", bio: "Fullstack dev", profilePic: "" },
  { id: 4, username: "Karan", email: "karan@example.com", location: "Bengaluru", bio: "Backend dev", profilePic: "" }
];

// current logged-in user (mock)
export const currentUser = {
  id: 1,
  username: "Samrah",
  email: "samrah@example.com",
  location: "Pune",
  bio: "Aspiring AI/ML Engineer",
  profilePic: "" // empty => will show fallback avatar
};

// connection requests (people who requested current user)
export const connectionRequests = [
  { id: 2, name: "Aarav", profilePic: "" },
  { id: 3, name: "Riya", profilePic: "" }
];

// connections (accepted)
export const connections = [
  { id: 3, name: "Riya", profilePic: "" },
  { id: 4, name: "Karan", profilePic: "" }
];

// posts (recent posts from connections)
export const posts = [
  {
    id: 101,
    userId: 3,
    username: "Riya",
    userProfilePic: "",
    time: "2025-10-25T09:30:00.000Z",
    content: "Shared a new project: real-time chat app!"
  },
  {
    id: 102,
    userId: 4,
    username: "Karan",
    userProfilePic: "",
    time: "2025-10-24T15:10:00.000Z",
    content: "Wired up database migrations today — felt great!"
  }
];
