import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { BottomNav } from '../components/common/BottomNav';
import { PostCreatorModal } from '../components/post/PostCreatorModal';
import { AIChatModal } from '../components/ai/AIChatModal';
import { WelcomeOnboardingModal } from '../components/common/WelcomeOnboardingModal';

export const MainLayout = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Sticky Navbar */}
      <Navbar
        onOpenCreatePost={() => setIsCreatePostOpen(true)}
        onOpenAIChat={() => setIsAIChatOpen(true)}
      />

      {/* Body Area */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Dynamic Route Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <Outlet context={{ openCreatePost: () => setIsCreatePostOpen(true), openAIChat: () => setIsAIChatOpen(true) }} />
        </main>
      </div>

      {/* Mobile Bottom Navigation & Floating AI Trigger */}
      <BottomNav onOpenAIChat={() => setIsAIChatOpen(true)} />

      {/* Global Post Creator Modal */}
      <PostCreatorModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />

      {/* Global AI Assistant Chat Modal */}
      <AIChatModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
      />

      {/* Welcome & Community Onboarding Modal for Newly Registered Accounts */}
      <WelcomeOnboardingModal />
    </div>
  );
};

