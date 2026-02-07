# LoveMap - Dating App Prototype 💕

An interactive mobile dating application prototype that allows users to discover potential matches on an interactive map within a specified search radius.

![Mobile-First Design](https://img.shields.io/badge/Mobile--First-Responsive-blue)
![No Dependencies](https://img.shields.io/badge/Pure-HTML%2FCSS%2FJS-green)
![Status](https://img.shields.io/badge/Status-Prototype-orange)

## 🚀 Features

### Authentication
- **Login Page**: Email/password authentication with clean UI
- **Registration Page**: User registration with name, age, email, password, and bio
- **Face ID Verification**: Animated biometric verification screen with scanning animation

### Main Map Screen
- **Interactive Map**: Powered by Leaflet.js showing user locations as markers
- **Current User Location**: Highlighted with unique styling and pulse animation
- **Search Radius**: Adjustable radius with visual circle overlay (1-10 km)
- **User Markers**: Click on any user marker to view their profile
- **My Location Button**: Quick center on current user location

### User Profiles
- Profile modal with user details (name, age, bio)
- Distance calculation from current user
- Interest tags display
- Like button with heart animation
- Close button for easy dismissal

### Notifications
- List of received likes from other users
- Each notification shows:
  - User's name and avatar (initials)
  - Time of like
  - "View Profile" button
  - "Like Back" button
- Empty state when no notifications

### Match System
- **Match Modal**: Displays when mutual likes occur
- "It's a Match!" celebration with animations
- Shows both user avatars
- Options to continue exploring or start chatting

### My Profile
- Personal profile display with avatar (initials)
- Edit profile functionality (name, age, bio)
- Activity statistics (likes given, matches)
- Settings overview (email, privacy, notifications)
- Logout functionality

### Navigation
- Fixed bottom navigation bar
- Three main sections: Map, Notifications, Profile
- Notification badge showing unread count
- Touch-friendly 44px minimum tap targets

## 📁 File Structure

```
dating-app-prototype/
├── index.html              # Login/Landing page
├── register.html           # User registration
├── face-verification.html  # Biometric verification
├── map.html               # Main map screen
├── notifications.html     # Notifications list
├── profile.html           # User profile & settings
├── css/
│   ├── style.css          # Main styles & auth pages
│   ├── map.css            # Map-specific styles
│   └── components.css     # Modal, cards, and component styles
├── js/
│   ├── app.js             # Core logic, mock data, utilities
│   ├── map.js             # Map functionality & interactions
│   └── notifications.js   # Notifications logic
└── README.md              # This file
```

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, animations, flexbox, grid
- **JavaScript (Vanilla)**: No framework dependencies
- **Leaflet.js 1.9.4**: Interactive map library
- **OpenStreetMap**: Map tiles provider
- **LocalStorage**: Client-side data persistence

## 🎨 Design Highlights

- **Mobile-First**: Optimized for 375px - 414px width devices
- **Color Scheme**: 
  - Primary: Purple gradient (#667eea to #764ba2)
  - Secondary: Pink gradient (#f093fb to #f5576c)
  - Accent: #ff6b9d
- **Typography**: System fonts for optimal performance
- **Animations**: 
  - Fade in page transitions
  - Pulse animations for active markers
  - Heart beat effect for likes
  - Scanning animation for face verification
  - Bounce effect for match celebration
- **Smooth Transitions**: 0.3s ease transitions throughout
- **Touch-Friendly**: 44px minimum button sizes

## 📱 Mock Data

The prototype includes 8 sample users with realistic data:
- Names, ages (24-31)
- Diverse bios and interests
- Location coordinates around Central Park, NYC area
- Interest tags (Hiking, Coffee, Travel, Fitness, etc.)

Sample notifications included:
- 3 mock notifications with different timestamps
- Read/unread status tracking

## 🚦 How to Run

### Option 1: Simple HTTP Server (Recommended)

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open: `http://localhost:8000`

### Option 2: Direct File Access

Simply open `index.html` in your web browser. However, some browsers may restrict certain features when opening files directly.

### Option 3: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📖 User Flow

1. **Landing** → Open `index.html`, enter credentials, click "Login"
2. **Registration** → Click "Register here", fill form, click "Register"
3. **Face Verification** → Automated scanning animation, click "Continue to App"
4. **Map Screen** → View users on map, adjust radius, click markers
5. **Profile Modal** → View user details, click "Like" button
6. **Match** → If mutual like, see "It's a Match!" modal
7. **Notifications** → View likes received, click "Like Back" or "View Profile"
8. **My Profile** → Edit profile, view stats, logout

## 🔧 Key Features Implementation

### Distance Calculation
Uses Haversine formula to calculate accurate distance between two GPS coordinates.

### Radius Control
Dynamic slider (1-10 km) that filters visible users and updates the map circle overlay in real-time.

### Like System
- Likes stored in localStorage
- Checks for mutual likes to trigger match modal
- Persistent across page refreshes

### Responsive Design
- Breakpoints for mobile devices
- Touch-friendly interactions
- Optimized for portrait orientation

### Data Persistence
Uses localStorage for:
- User session management
- Profile data
- Likes and matches
- Authentication state

## 🎯 Future Enhancement Ideas

### Core Features
- [ ] Real-time chat messaging system
- [ ] Photo upload and profile pictures
- [ ] Video chat integration
- [ ] Advanced filters (age range, interests, distance)
- [ ] Swipe gestures for liking/passing
- [ ] "Super Like" feature

### Social Features
- [ ] Match expiration (24 hours to message)
- [ ] Icebreaker questions
- [ ] Profile verification badges
- [ ] Activity status (online/offline)
- [ ] Block and report functionality

### Map Enhancements
- [ ] Clustering for many users
- [ ] Heatmap of popular areas
- [ ] Location history/favorite spots
- [ ] Events and meetups on map

### Technical Improvements
- [ ] Backend API integration
- [ ] Real database (Firebase, MongoDB)
- [ ] Push notifications
- [ ] Progressive Web App (PWA)
- [ ] OAuth login (Google, Facebook)
- [ ] Image optimization and CDN
- [ ] WebSocket for real-time updates
- [ ] Geolocation API for actual user location
- [ ] Service Worker for offline functionality

### UI/UX
- [ ] Dark mode toggle
- [ ] Onboarding tutorial
- [ ] Profile completion percentage
- [ ] Advanced animations
- [ ] Multiple language support
- [ ] Accessibility improvements (ARIA labels)

### Analytics & Safety
- [ ] User behavior tracking
- [ ] Safety features and guidelines
- [ ] Profile moderation
- [ ] Report abuse functionality
- [ ] Background checks integration

## 🔐 Privacy & Security Notes

This is a **prototype** with mock data for demonstration purposes only. In a production environment, you would need:

- Secure authentication (JWT, OAuth)
- HTTPS encryption
- Backend API for data storage
- Database security
- Input validation and sanitization
- Rate limiting
- GDPR compliance
- User data encryption
- Secure password hashing
- Session management
- CSRF protection

## 🤝 Contributing

This is a prototype project. Feel free to fork and extend with your own features!

## 📄 License

This project is for educational and demonstration purposes.

## 👨‍💻 Development Notes

- **No Build Process**: Pure HTML/CSS/JS, no compilation needed
- **No npm packages**: Only Leaflet.js loaded via CDN
- **Cross-browser Compatible**: Works on modern browsers
- **Mobile Optimized**: Best viewed on mobile devices or DevTools mobile view
- **Lightweight**: Fast loading times

## 🎓 Learning Outcomes

This prototype demonstrates:
- Mobile-first responsive design
- CSS custom properties and animations
- Vanilla JavaScript DOM manipulation
- Map API integration (Leaflet.js)
- LocalStorage for state management
- Modal/popup patterns
- Form handling and validation
- Distance calculations with GPS coordinates
- User flow and navigation patterns

---

**Built with ❤️ for the dating app community**

For issues or questions, please open an issue on the repository.