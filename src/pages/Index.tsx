import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import SplashScreen from '@/components/SplashScreen';
import VideoFeed, { Video } from '@/components/VideoFeed';
import UploadTab from '@/components/UploadTab';
import { SearchTab, TrendsTab, ProfileTab } from '@/components/TabsContent';
import BottomNav from '@/components/BottomNav';

const mockVideos: Video[] = [
  {
    id: 1,
    username: '@anna_style',
    avatar: '👩‍🎤',
    description: 'Новый танец! Кто повторит? 🔥 #dance #trending',
    likes: 45200,
    comments: 892,
    shares: 234,
    videoUrl: 'video1.mp4',
    isLiked: false
  },
  {
    id: 2,
    username: '@maxim_prod',
    avatar: '🎬',
    description: 'Закулисье моего нового проекта ✨',
    likes: 32100,
    comments: 543,
    shares: 178,
    videoUrl: 'video2.mp4',
    isLiked: false
  },
  {
    id: 3,
    username: '@maria_vlogs',
    avatar: '🌟',
    description: 'День из моей жизни в Москве 🏙️',
    likes: 67800,
    comments: 1240,
    shares: 445,
    videoUrl: 'video3.mp4',
    isLiked: false
  }
];

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState(mockVideos);
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'upload' | 'trends' | 'profile'>('home');
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [videoDescription, setVideoDescription] = useState('');
  const [showUploadPreview, setShowUploadPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentVideo = videos[currentVideoIndex];

  const handleLike = () => {
    setVideos(prev => prev.map((video, idx) => 
      idx === currentVideoIndex 
        ? { ...video, isLiked: !video.isLiked, likes: video.isLiked ? video.likes - 1 : video.likes + 1 }
        : video
    ));
  };

  const handleNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    }
  };

  const handlePrevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      const videoUrl = URL.createObjectURL(file);
      setUploadedVideo(videoUrl);
      setShowUploadPreview(true);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handlePublishVideo = () => {
    if (uploadedVideo) {
      const newVideo: Video = {
        id: videos.length + 1,
        username: '@my_profile',
        avatar: '👤',
        description: videoDescription || 'Моё новое видео 🎬',
        likes: 0,
        comments: 0,
        shares: 0,
        videoUrl: uploadedVideo,
        isLiked: false
      };
      setVideos([newVideo, ...videos]);
      setUploadedVideo(null);
      setVideoDescription('');
      setShowUploadPreview(false);
      setActiveTab('home');
      setCurrentVideoIndex(0);
    }
  };

  const handleCancelUpload = () => {
    if (uploadedVideo) {
      URL.revokeObjectURL(uploadedVideo);
    }
    setUploadedVideo(null);
    setVideoDescription('');
    setShowUploadPreview(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="h-screen w-full bg-background overflow-hidden relative">
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gradient glow-text">CVIN-net</h1>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-muted/50 rounded-full transition-colors">
            <Icon name="Bell" size={24} className="text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted/50 rounded-full transition-colors">
            <Icon name="MessageCircle" size={24} className="text-foreground" />
          </button>
        </div>
      </header>

      <main className="h-full pt-16 pb-20">
        {activeTab === 'home' && (
          <VideoFeed
            currentVideo={currentVideo}
            currentVideoIndex={currentVideoIndex}
            videosLength={videos.length}
            onLike={handleLike}
            onNextVideo={handleNextVideo}
            onPrevVideo={handlePrevVideo}
          />
        )}

        {activeTab === 'search' && <SearchTab />}

        {activeTab === 'upload' && (
          <UploadTab
            showUploadPreview={showUploadPreview}
            uploadedVideo={uploadedVideo}
            videoDescription={videoDescription}
            onFileSelect={handleFileSelect}
            onUploadClick={handleUploadClick}
            onDescriptionChange={setVideoDescription}
            onPublish={handlePublishVideo}
            onCancel={handleCancelUpload}
          />
        )}

        {activeTab === 'trends' && <TrendsTab />}

        {activeTab === 'profile' && <ProfileTab />}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
