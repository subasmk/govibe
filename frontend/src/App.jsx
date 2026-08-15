import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { useAuth } from './context/AuthContext';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { DestinationCommunityPage } from './pages/DestinationCommunityPage';
import { CommunityMapPage } from './pages/CommunityMapPage';
import { PlaceDetailsPage } from './pages/PlaceDetailsPage';
import { PostDetailsPage } from './pages/PostDetailsPage';
import { QuestionsPage } from './pages/QuestionsPage';
import { SafetyReportsPage } from './pages/SafetyReportsPage';
import { TripGroupsPage } from './pages/TripGroupsPage';
import { GroupDetailsPage } from './pages/GroupDetailsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { ItineraryGeneratorPage } from './pages/ItineraryGeneratorPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { SavedPlacesPage } from './pages/SavedPlacesPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export function App() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth Layout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* App Main Layout */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/destination/:id" element={<DestinationCommunityPage />} />
        <Route path="/community/:id" element={<DestinationCommunityPage />} />
        <Route path="/community/:id/map" element={<CommunityMapPage />} />
        <Route path="/map" element={<CommunityMapPage />} />
        <Route path="/place/:id" element={<PlaceDetailsPage />} />
        <Route path="/post/:id" element={<PostDetailsPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/safety" element={<SafetyReportsPage />} />
        <Route path="/groups" element={<TripGroupsPage />} />
        <Route path="/groups/:id" element={<GroupDetailsPage />} />
        <Route path="/ai" element={<AIAssistantPage />} />
        <Route path="/itinerary" element={<ItineraryGeneratorPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/saved" element={<SavedPlacesPage />} />
      </Route>

      {/* Fallback Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
