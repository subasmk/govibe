import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SavedContext = createContext();
const demoModeEnabled = import.meta.env.VITE_ENABLE_DEMO_MODE === 'true';

export const SavedProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.id || 'guest';

  const [savedPlaces, setSavedPlaces] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  // Load user-specific saved items when currentUser changes
  useEffect(() => {
    if (!currentUser) {
      setSavedPlaces([]);
      setSavedPosts([]);
      return;
    }

    const storageKeyPlaces = `govibe_saved_places_${currentUser.id}`;
    const storageKeyPosts = `govibe_saved_posts_${currentUser.id}`;

    const savedP = localStorage.getItem(storageKeyPlaces);
    const savedPost = localStorage.getItem(storageKeyPosts);

    if (savedP !== null) {
      setSavedPlaces(JSON.parse(savedP));
    } else if (demoModeEnabled && currentUser.id === 'user_1') {
      setSavedPlaces(["place_ooty_1", "place_ooty_3"]);
    } else {
      setSavedPlaces([]);
    }

    if (savedPost !== null) {
      setSavedPosts(JSON.parse(savedPost));
    } else if (demoModeEnabled && currentUser.id === 'user_1') {
      setSavedPosts(["post_1"]);
    } else {
      setSavedPosts([]);
    }
  }, [currentUser?.id]);

  // Persist user-specific saved places
  useEffect(() => {
    if (currentUser?.id) {
      localStorage.setItem(`govibe_saved_places_${currentUser.id}`, JSON.stringify(savedPlaces));
    }
  }, [savedPlaces, currentUser?.id]);

  // Persist user-specific saved posts
  useEffect(() => {
    if (currentUser?.id) {
      localStorage.setItem(`govibe_saved_posts_${currentUser.id}`, JSON.stringify(savedPosts));
    }
  }, [savedPosts, currentUser?.id]);

  const toggleSavePlace = (placeId) => {
    setSavedPlaces((prev) =>
      prev.includes(placeId) ? prev.filter((id) => id !== placeId) : [...prev, placeId]
    );
  };

  const isPlaceSaved = (placeId) => savedPlaces.includes(placeId);

  const toggleSavePost = (postId) => {
    setSavedPosts((prev) =>
      prev.filter((id) => id !== postId).length < prev.length
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const isPostSaved = (postId) => savedPosts.includes(postId);

  return (
    <SavedContext.Provider
      value={{
        savedPlaces,
        savedPosts,
        toggleSavePlace,
        isPlaceSaved,
        toggleSavePost,
        isPostSaved
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => useContext(SavedContext);

