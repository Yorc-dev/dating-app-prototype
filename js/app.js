// LoveMap - Main Application Logic

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 26,
    bio: 'Love hiking, coffee, and good conversations. Looking for someone who enjoys outdoor adventures!',
    interests: ['Hiking', 'Coffee', 'Travel', 'Photography'],
    lat: 40.7589,
    lng: -73.9851,
    initials: 'SJ'
  },
  {
    id: 2,
    name: 'Michael Chen',
    age: 28,
    bio: 'Software engineer by day, chef by night. Always up for trying new restaurants.',
    interests: ['Cooking', 'Tech', 'Music', 'Fitness'],
    lat: 40.7614,
    lng: -73.9776,
    initials: 'MC'
  },
  {
    id: 3,
    name: 'Emma Davis',
    age: 24,
    bio: 'Artist and yoga instructor. Seeking creative souls who appreciate art and mindfulness.',
    interests: ['Yoga', 'Art', 'Reading', 'Nature'],
    lat: 40.7580,
    lng: -73.9855,
    initials: 'ED'
  },
  {
    id: 4,
    name: 'James Wilson',
    age: 30,
    bio: 'Marketing professional with a passion for travel. Been to 35 countries and counting!',
    interests: ['Travel', 'Photography', 'Food', 'Languages'],
    lat: 40.7560,
    lng: -73.9800,
    initials: 'JW'
  },
  {
    id: 5,
    name: 'Olivia Martinez',
    age: 27,
    bio: 'Fitness enthusiast and dog lover. Looking for someone to join me on morning runs!',
    interests: ['Fitness', 'Dogs', 'Health', 'Running'],
    lat: 40.7620,
    lng: -73.9820,
    initials: 'OM'
  },
  {
    id: 6,
    name: 'Daniel Brown',
    age: 29,
    bio: 'Music producer and coffee addict. Love live music and late-night jam sessions.',
    interests: ['Music', 'Coffee', 'Concerts', 'Guitar'],
    lat: 40.7595,
    lng: -73.9790,
    initials: 'DB'
  },
  {
    id: 7,
    name: 'Sophia Lee',
    age: 25,
    bio: 'Teacher who loves books and baking. Looking for someone kind and thoughtful.',
    interests: ['Reading', 'Baking', 'Teaching', 'Movies'],
    lat: 40.7605,
    lng: -73.9870,
    initials: 'SL'
  },
  {
    id: 8,
    name: 'Ryan Taylor',
    age: 31,
    bio: 'Entrepreneur and adventure seeker. Life is too short to not take risks!',
    interests: ['Business', 'Adventure', 'Sports', 'Innovation'],
    lat: 40.7575,
    lng: -73.9765,
    initials: 'RT'
  }
];

// Helper function to get initials from name
function getInitials(name) {
  if (!name || typeof name !== 'string') return 'YU';
  const parts = name.trim().split(/\s+/).filter(part => part.length > 0);
  if (parts.length === 0) return 'YU';
  return parts.map(n => n[0]).join('').toUpperCase().substring(0, 2);
}

// Current user mock data
const currentUser = {
  id: 0,
  name: localStorage.getItem('userName') || 'You',
  age: localStorage.getItem('userAge') || 25,
  bio: localStorage.getItem('userBio') || 'Welcome to LoveMap!',
  lat: 40.7589,
  lng: -73.9851,
  initials: getInitials(localStorage.getItem('userName') || 'You')
};

// Mock notifications
const mockNotifications = [
  {
    id: 1,
    userId: 3,
    name: 'Emma Davis',
    time: '5 minutes ago',
    initials: 'ED',
    viewed: false
  },
  {
    id: 2,
    userId: 5,
    name: 'Olivia Martinez',
    time: '2 hours ago',
    initials: 'OM',
    viewed: false
  },
  {
    id: 3,
    userId: 7,
    name: 'Sophia Lee',
    time: '1 day ago',
    initials: 'SL',
    viewed: true
  }
];

// Helper function to calculate distance between two points (in km)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

// Format distance for display
function formatDistance(km) {
  if (km < 1) {
    return `${Math.round(km * 1000)}m away`;
  }
  return `${km.toFixed(1)}km away`;
}

// Check authentication
function checkAuth() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const path = window.location.pathname;
  const isAuthPage = path.includes('index.html') || path.includes('register.html') || path === '/' || path.endsWith('/');
  
  if (!isLoggedIn && !isAuthPage) {
    window.location.href = 'index.html';
  }
}

// Initialize likes storage
if (!localStorage.getItem('likes')) {
  localStorage.setItem('likes', JSON.stringify([]));
}

// Initialize matches storage
if (!localStorage.getItem('matches')) {
  localStorage.setItem('matches', JSON.stringify([]));
}

// Add a like
function addLike(userId) {
  const likes = JSON.parse(localStorage.getItem('likes') || '[]');
  if (!likes.includes(userId)) {
    likes.push(userId);
    localStorage.setItem('likes', JSON.stringify(likes));
  }
}

// Check if user is liked
function isLiked(userId) {
  const likes = JSON.parse(localStorage.getItem('likes') || '[]');
  return likes.includes(userId);
}

// Add a match
function addMatch(userId) {
  const matches = JSON.parse(localStorage.getItem('matches') || '[]');
  if (!matches.includes(userId)) {
    matches.push(userId);
    localStorage.setItem('matches', JSON.stringify(matches));
  }
}

// Get unread notifications count
function getUnreadNotificationsCount() {
  return mockNotifications.filter(n => !n.viewed).length;
}

// Logout function
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userName');
  localStorage.removeItem('userAge');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userBio');
  localStorage.removeItem('likes');
  localStorage.removeItem('matches');
  window.location.href = 'index.html';
}

// Export functions and data for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    mockUsers,
    currentUser,
    mockNotifications,
    calculateDistance,
    formatDistance,
    checkAuth,
    addLike,
    isLiked,
    addMatch,
    getUnreadNotificationsCount,
    logout
  };
}
