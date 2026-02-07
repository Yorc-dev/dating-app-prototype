// Map functionality for LoveMap

// Constants
const MATCH_PROBABILITY = 0.2; // 20% chance of mutual match for demo

// Check authentication
checkAuth();

// Initialize map
const map = L.map('map').setView([currentUser.lat, currentUser.lng], 14);

// Add tile layer (using OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);

// Search radius in km
let searchRadius = 5;
let radiusCircle = null;

// Create custom icon for current user
const currentUserIcon = L.divIcon({
  className: 'user-marker current-user-marker',
  html: currentUser.initials,
  iconSize: [44, 44]
});

// Add current user marker
const currentUserMarker = L.marker([currentUser.lat, currentUser.lng], {
  icon: currentUserIcon
}).addTo(map);

currentUserMarker.bindPopup(`<strong>You are here</strong>`);

// Draw radius circle
function drawRadiusCircle() {
  if (radiusCircle) {
    map.removeLayer(radiusCircle);
  }
  
  radiusCircle = L.circle([currentUser.lat, currentUser.lng], {
    radius: searchRadius * 1000, // Convert km to meters
    className: 'radius-circle',
    fillColor: '#667eea',
    fillOpacity: 0.1,
    color: '#667eea',
    weight: 2
  }).addTo(map);
}

drawRadiusCircle();

// Add other users as markers
mockUsers.forEach(user => {
  const distance = calculateDistance(
    currentUser.lat,
    currentUser.lng,
    user.lat,
    user.lng
  );
  
  // Only show users within radius
  if (distance <= searchRadius) {
    const userIcon = L.divIcon({
      className: 'user-marker other-user-marker',
      html: user.initials,
      iconSize: [44, 44]
    });
    
    const marker = L.marker([user.lat, user.lng], {
      icon: userIcon
    }).addTo(map);
    
    // Click handler to show user profile
    marker.on('click', function() {
      showUserProfile(user);
    });
  }
});

// Radius slider functionality
const radiusSlider = document.getElementById('radiusSlider');
const radiusValue = document.getElementById('radiusValue');

radiusSlider.addEventListener('input', function() {
  searchRadius = parseFloat(this.value);
  radiusValue.textContent = searchRadius;
  
  // Redraw circle and update markers
  drawRadiusCircle();
  updateMarkersInRadius();
});

// Update markers based on radius
function updateMarkersInRadius() {
  // Clear all markers except current user
  map.eachLayer(function(layer) {
    if (layer instanceof L.Marker && layer !== currentUserMarker) {
      map.removeLayer(layer);
    }
  });
  
  // Re-add markers within radius
  mockUsers.forEach(user => {
    const distance = calculateDistance(
      currentUser.lat,
      currentUser.lng,
      user.lat,
      user.lng
    );
    
    if (distance <= searchRadius) {
      const userIcon = L.divIcon({
        className: 'user-marker other-user-marker',
        html: user.initials,
        iconSize: [44, 44]
      });
      
      const marker = L.marker([user.lat, user.lng], {
        icon: userIcon
      }).addTo(map);
      
      marker.on('click', function() {
        showUserProfile(user);
      });
    }
  });
}

// Locate button - center map on user
document.getElementById('locateBtn').addEventListener('click', function() {
  map.setView([currentUser.lat, currentUser.lng], 14);
  this.style.transform = 'scale(1.2)';
  setTimeout(() => {
    this.style.transform = 'scale(1)';
  }, 200);
});

// Show user profile modal
function showUserProfile(user) {
  const modal = document.getElementById('userModal');
  const profileCard = document.getElementById('profileCard');
  
  const distance = calculateDistance(
    currentUser.lat,
    currentUser.lng,
    user.lat,
    user.lng
  );
  
  const liked = isLiked(user.id);
  
  profileCard.innerHTML = `
    <div class="profile-avatar">${user.initials}</div>
    <div class="profile-name">${user.name}, ${user.age}</div>
    <div class="profile-distance">${formatDistance(distance)}</div>
    <div class="profile-bio">${user.bio}</div>
    <div class="profile-interests">
      ${user.interests.map(interest => `
        <span class="interest-tag">${interest}</span>
      `).join('')}
    </div>
    <div style="margin-top: 24px;">
      <button 
        class="btn-like ${liked ? 'liked' : ''}" 
        onclick="handleLike(${user.id}, '${user.name}', '${user.initials}')"
        id="likeBtn-${user.id}"
      >
        ${liked ? '❤️ Liked' : '🤍 Like'}
      </button>
    </div>
  `;
  
  modal.classList.add('active');
}

// Close user modal
function closeUserModal() {
  const modal = document.getElementById('userModal');
  modal.classList.remove('active');
}

// Close modal when clicking outside
document.getElementById('userModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeUserModal();
  }
});

// Handle like button
function handleLike(userId, userName, initials) {
  const likeBtn = document.getElementById(`likeBtn-${userId}`);
  
  if (!isLiked(userId)) {
    // Add like
    addLike(userId);
    likeBtn.classList.add('liked');
    likeBtn.innerHTML = '❤️ Liked';
    
    // Simulate mutual match (configurable probability for demo purposes)
    if (Math.random() < MATCH_PROBABILITY) {
      setTimeout(() => {
        showMatchModal(userName, initials);
        addMatch(userId);
      }, 500);
    }
  }
}

// Show match modal
function showMatchModal(matchName, matchInitials) {
  const matchModal = document.getElementById('matchModal');
  document.getElementById('matchName').textContent = matchName;
  document.getElementById('matchAvatar1').textContent = currentUser.initials;
  document.getElementById('matchAvatar2').textContent = matchInitials;
  
  closeUserModal();
  matchModal.classList.add('active');
}

// Close match modal
function closeMatchModal() {
  const matchModal = document.getElementById('matchModal');
  matchModal.classList.remove('active');
}

// Update notification badge
function updateNotificationBadge() {
  const badge = document.getElementById('notificationBadge');
  const count = getUnreadNotificationsCount();
  
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = 'block';
  } else {
    badge.style.display = 'none';
  }
}

updateNotificationBadge();
