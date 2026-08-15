import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../services/api';
import {
  sampleDestinations,
  samplePlaces,
  samplePosts,
  sampleSafetyReports,
  sampleQuestions,
  sampleTripGroups
} from '../data/sampleData';

const DestinationContext = createContext();
const demoModeEnabled = import.meta.env.VITE_ENABLE_DEMO_MODE === 'true';

export const DestinationProvider = ({ children }) => {
  const [destinations, setDestinations] = useState(demoModeEnabled ? sampleDestinations : []);
  const [places, setPlaces] = useState(demoModeEnabled ? samplePlaces : []);
  const [posts, setPosts] = useState(demoModeEnabled ? samplePosts : []);
  const [safetyReports, setSafetyReports] = useState(demoModeEnabled ? sampleSafetyReports : []);
  const [questions, setQuestions] = useState(demoModeEnabled ? sampleQuestions : []);
  const [tripGroups, setTripGroups] = useState(demoModeEnabled ? sampleTripGroups : []);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial fetch from FastAPI Backend with instant fallback
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [destData, placesData, postsData, safetyData, qData, groupsData] = await Promise.all([
          apiClient.get('/destinations'),
          apiClient.get('/places'),
          apiClient.get('/posts'),
          apiClient.get('/safety-reports'),
          apiClient.get('/questions'),
          apiClient.get('/trip-groups')
        ]);

        if (destData && destData.length > 0) {
          setDestinations(destData.map(d => ({
            ...d,
            coverImage: d.cover_image || d.coverImage,
            trustScore: d.trust_score || d.trustScore,
            totalRatings: d.total_ratings || d.totalRatings,
            membersCount: d.members_count || d.membersCount,
            activeNow: d.active_now || d.activeNow,
            coordinates: { lat: d.lat || 11.4102, lng: d.lng || 76.6950 }
          })));
        }

        if (placesData && placesData.length > 0) {
          setPlaces(placesData.map(p => ({
            ...p,
            destinationId: p.destination_id || p.destinationId,
            coverImage: p.cover_image || p.coverImage,
            trustScore: p.trust_score || p.trustScore,
            recentRating: p.recent_rating || p.recentRating,
            totalRatings: p.total_ratings || p.totalRatings,
            statusText: p.status_text || p.statusText,
            entryFee: p.entry_fee || p.entryFee,
            currentCrowd: p.current_crowd || p.currentCrowd,
            bestTimeToVisit: p.best_time_to_visit || p.bestTimeToVisit,
            familySuitability: p.family_suitability || p.familySuitability,
            safetyObservations: p.safety_observations || p.safetyObservations,
            recentExperiencesCount: p.recent_experiences_count || p.recentExperiencesCount,
            latestReport: p.latest_report || p.latestReport,
            coordinates: { lat: p.lat, lng: p.lng }
          })));
        }

        if (postsData && postsData.length > 0) {
          setPosts(postsData.map(post => ({
            ...post,
            destinationId: post.destination_id || post.destinationId,
            placeId: post.place_id || post.placeId,
            placeName: post.place_name || post.placeName || "Scenic Spot",
            userName: post.user_name || post.userName || "Traveller",
            userHandle: post.user_handle || post.userHandle || "@traveller",
            userAvatar: post.user_avatar || post.userAvatar,
            userBadge: post.user_badge || post.userBadge || "Explorer",
            visitedTimestamp: post.visited_timestamp || post.visitedTimestamp,
            visitDate: post.visit_date || post.visitDate,
            createdTimestamp: "Recently",
            crowdLevel: post.crowd_level || post.crowdLevel,
            isOutdated: post.is_outdated ?? post.isOutdated ?? false,
            outdatedNotice: post.outdated_notice || post.outdatedNotice,
            commentsCount: post.comments_count || (post.comments ? post.comments.length : 0),
            comments: post.comments || []
          })));
        }

        if (safetyData && safetyData.length > 0) {
          setSafetyReports(safetyData.map(r => ({
            ...r,
            destinationId: r.destination_id || r.destinationId,
            placeName: r.place_name || r.placeName,
            reportedBy: r.reported_by || r.reportedBy,
            reportedTimestamp: r.reported_timestamp || r.reportedTimestamp,
            verifiedCount: r.verified_count || r.verifiedCount,
            userConfirmed: false
          })));
        }

        if (qData && qData.length > 0) {
          setQuestions(qData.map(q => ({
            ...q,
            destinationId: q.destination_id || q.destinationId,
            askedBy: q.asked_by || q.askedBy,
            askedAvatar: q.asked_avatar || q.askedAvatar,
            askedTimestamp: q.asked_timestamp || q.askedTimestamp,
            answersCount: q.answers_count || (q.answers ? q.answers.length : 0),
            answers: q.answers || []
          })));
        }

        if (groupsData && groupsData.length > 0) {
          setTripGroups(groupsData.map(g => ({
            ...g,
            destinationId: g.destination_id || g.destinationId,
            destinationName: g.destination_name || g.destinationName,
            membersCount: g.members_count || g.membersCount,
            maxMembers: g.max_members || g.maxMembers,
            itinerarySummary: g.itinerary_summary || g.itinerarySummary
          })));
        }
      } catch (err) {
        console.warn("[Backend Sync Notice] Live database connection checked:", err.message);
        if (demoModeEnabled) {
          setDestinations(sampleDestinations);
          setPlaces(samplePlaces);
          setPosts(samplePosts);
          setSafetyReports(sampleSafetyReports);
          setQuestions(sampleQuestions);
          setTripGroups(sampleTripGroups);
        }
      }
    };

    fetchBackendData();
  }, []);

  const addPost = async (newPost) => {
    const postWithId = {
      id: "post_" + Date.now(),
      createdTimestamp: "Just now",
      visitedTimestamp: newPost.visitedTimestamp || "Visited recently",
      upvotes: 0,
      downvotes: 0,
      userVoted: null,
      commentsCount: 0,
      comments: [],
      isOutdated: false,
      ...newPost
    };
    setPosts((prev) => [postWithId, ...prev]);

    await apiClient.post('/posts', {
      destination_id: newPost.destinationId,
      place_id: newPost.placeId,
      visited_timestamp: newPost.visitedTimestamp,
      visit_date: newPost.visitDate,
      rating: newPost.rating,
      crowd_level: newPost.crowdLevel,
      content: newPost.content,
      images: newPost.images,
      tags: newPost.tags
    });

    return postWithId;
  };

  const votePost = async (postId, direction) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const currentVote = post.userVoted;
        let upvotes = post.upvotes;
        let downvotes = post.downvotes;
        let newVote = direction;

        if (currentVote === direction) {
          newVote = null;
          if (direction === 'up') upvotes -= 1;
          if (direction === 'down') downvotes -= 1;
        } else {
          if (currentVote === 'up') upvotes -= 1;
          if (currentVote === 'down') downvotes -= 1;
          if (direction === 'up') upvotes += 1;
          if (direction === 'down') downvotes += 1;
        }

        return { ...post, upvotes, downvotes, userVoted: newVote };
      })
    );

    await apiClient.post(`/posts/${postId}/vote`, { direction });
  };

  const addComment = async (postId, user, text) => {
    const comment = {
      id: "c_" + Date.now(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      text,
      timestamp: "Just now",
      upvotes: 0
    };
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [...(p.comments || []), comment]
        };
      })
    );

    await apiClient.post(`/posts/${postId}/comments`, { text });
  };

  const addSafetyReport = async (report) => {
    const newReport = {
      id: "safety_" + Date.now(),
      reportedTimestamp: "Reported just now",
      verifiedCount: 0,
      userConfirmed: false,
      ...report
    };
    setSafetyReports((prev) => [newReport, ...prev]);
    await apiClient.post('/safety-reports', report);
    return newReport;
  };

  return (
    <DestinationContext.Provider
      value={{
        destinations,
        places,
        posts,
        safetyReports,
        questions,
        tripGroups,
        searchQuery,
        setSearchQuery,
        addPost,
        votePost,
        addComment,
        addSafetyReport
      }}
    >
      {children}
    </DestinationContext.Provider>
  );
};

export const useDestinations = () => useContext(DestinationContext);
