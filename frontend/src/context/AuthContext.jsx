import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../services/api';
import { sampleUsers } from '../data/sampleData';

const AuthContext = createContext();
const demoModeEnabled = import.meta.env.VITE_ENABLE_DEMO_MODE === 'true';

export const AVATAR_OPTIONS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('govibe_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        localStorage.removeItem('govibe_user');
      }
    }
    return demoModeEnabled ? sampleUsers[0] : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('govibe_user');
    return Boolean(saved) || demoModeEnabled;
  });
  const [isDemoMode, setIsDemoMode] = useState(demoModeEnabled);
  const [showWelcomeOnboarding, setShowWelcomeOnboarding] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('govibe_user', JSON.stringify(currentUser));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('govibe_user');
      setIsAuthenticated(false);
    }
  }, [currentUser]);

  const loginWithDemoUser = (userIndex = 0) => {
    const selected = sampleUsers[userIndex] || sampleUsers[0];
    setCurrentUser(selected);
    setIsAuthenticated(true);
    setIsDemoMode(true);
    setShowWelcomeOnboarding(false);
  };

  const loginWithCredentials = async (email, password) => {
    const payload = { email, password };
    const serverUser = await apiClient.post('/auth/login', payload);

    if (serverUser && serverUser.id) {
      const normalizedUser = {
        ...serverUser,
        avatar: serverUser.avatar || null,
        joinedDate: "Joined recently",
        points: serverUser.points || 100,
        helpfulVotes: serverUser.helpfulVotes || 0,
        placesVisited: serverUser.placesVisited || 0,
        badge: serverUser.badge || 'Explorer'
      };
      setCurrentUser(normalizedUser);
      setIsAuthenticated(true);
      setIsDemoMode(false);
      return normalizedUser;
    }

    const fallbackUser = {
      id: "user_custom_" + Date.now(),
      name: email.split('@')[0] || "Explorer",
      handle: "@" + (email.split('@')[0] || "user").toLowerCase(),
      avatar: null,
      bio: "Travel lover exploring South India.",
      badge: "Explorer",
      points: 100,
      helpfulVotes: 0,
      placesVisited: 0,
      joinedDate: "Today"
    };
    setCurrentUser(fallbackUser);
    setIsAuthenticated(true);
    setIsDemoMode(false);
    return fallbackUser;
  };

  const registerUser = async (name, email, password, chosenAvatar = null) => {
    const payload = {
      name,
      email,
      password,
      avatar: chosenAvatar || null
    };
    const serverUser = await apiClient.post('/auth/register', payload);

    if (serverUser && serverUser.id) {
      const normalizedUser = {
        ...serverUser,
        avatar: serverUser.avatar || chosenAvatar || null,
        joinedDate: "Joined Today",
        points: serverUser.points || 50,
        helpfulVotes: serverUser.helpfulVotes || 0,
        placesVisited: serverUser.placesVisited || 0,
        badge: serverUser.badge || 'Explorer'
      };
      setCurrentUser(normalizedUser);
      setIsAuthenticated(true);
      setIsDemoMode(false);
      setShowWelcomeOnboarding(true);
      return normalizedUser;
    }

    const fallbackUser = {
      id: "user_" + Date.now(),
      name: name.trim() || "New Explorer",
      handle: "@" + (name.trim().toLowerCase().replace(/\s+/g, '_') || "explorer"),
      email: email.trim(),
      avatar: chosenAvatar || null,
      bio: "New traveller excited to explore and share real community logs on GoVIBE!",
      badge: "Explorer",
      points: 50,
      helpfulVotes: 0,
      placesVisited: 0,
      joinedDate: "Joined Today"
    };
    setCurrentUser(fallbackUser);
    setIsAuthenticated(true);
    setIsDemoMode(false);
    setShowWelcomeOnboarding(true);
    return fallbackUser;
  };

  const updateUserAvatar = (newAvatarUrl) => {
    if (!currentUser) return;
    const updated = { ...currentUser, avatar: newAvatarUrl };
    setCurrentUser(updated);
  };

  const dismissWelcomeOnboarding = () => {
    setShowWelcomeOnboarding(false);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setShowWelcomeOnboarding(false);
    setIsDemoMode(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isDemoMode,
        showWelcomeOnboarding,
        loginWithDemoUser,
        loginWithCredentials,
        registerUser,
        updateUserAvatar,
        dismissWelcomeOnboarding,
        logout,
        availableDemoUsers: sampleUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
