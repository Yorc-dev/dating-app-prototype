// Notifications functionality for LoveMap

// Check authentication
checkAuth();

// Render notifications
function renderNotifications() {
  const notificationList = document.getElementById('notificationList');
  
  if (mockNotifications.length === 0) {
    notificationList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔔</div>
        <p class="empty-state-text">No notifications yet</p>
      </div>
    `;
    return;
  }
  
  notificationList.innerHTML = mockNotifications.map(notification => {
    const user = mockUsers.find(u => u.id === notification.userId);
    
    return `
      <div class="notification-item">
        <div class="notification-avatar">${notification.initials}</div>
        <div class="notification-content">
          <div class="notification-name">${notification.name} liked you!</div>
          <div class="notification-time">${notification.time}</div>
          <div class="notification-actions">
            <button 
              class="btn-small btn-view" 
              onclick="viewProfile(${notification.userId})"
            >
              View Profile
            </button>
            <button 
              class="btn-small btn-like-back" 
              onclick="likeBack(${notification.userId}, '${notification.name}', '${notification.initials}')"
              id="likeBackBtn-${notification.userId}"
            >
              ${isLiked(notification.userId) ? '❤️ Liked' : 'Like Back'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// View user profile
function viewProfile(userId) {
  const user = mockUsers.find(u => u.id === userId);
  if (!user) return;
  
  showUserProfile(user);
}

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

// Handle like button in modal
function handleLike(userId, userName, initials) {
  const likeBtn = document.getElementById(`likeBtn-${userId}`);
  
  if (!isLiked(userId)) {
    addLike(userId);
    likeBtn.classList.add('liked');
    likeBtn.innerHTML = '❤️ Liked';
    
    // Check if this user already liked us (from notifications)
    const notification = mockNotifications.find(n => n.userId === userId);
    if (notification) {
      // It's a match!
      setTimeout(() => {
        showMatchModal(userName, initials);
        addMatch(userId);
      }, 500);
    }
    
    // Update the notification list
    renderNotifications();
  }
}

// Like back from notification
function likeBack(userId, userName, initials) {
  const likeBackBtn = document.getElementById(`likeBackBtn-${userId}`);
  
  if (!isLiked(userId)) {
    addLike(userId);
    likeBackBtn.innerHTML = '❤️ Liked';
    
    // Show match modal
    setTimeout(() => {
      showMatchModal(userName, initials);
      addMatch(userId);
    }, 500);
    
    // Update the notification list
    renderNotifications();
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

// Initialize page
renderNotifications();
