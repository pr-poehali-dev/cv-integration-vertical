import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import SplashScreen from '@/components/SplashScreen';

interface Video {
  id: number;
  username: string;
  avatar: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  videoUrl: string;
  isLiked: boolean;
}

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
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

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

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        handleNextVideo();
      } else {
        handlePrevVideo();
      }
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
          <div className="relative h-full w-full max-w-md mx-auto">
            <div 
              className="absolute inset-0 gradient-neon opacity-20 rounded-3xl blur-3xl animate-pulse-glow"
              style={{ transform: 'scale(0.9)' }}
            />
            
            <div 
              className="relative h-full bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-border/50 shadow-2xl animate-fade-in"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="text-center space-y-4 p-8">
                  <div className="text-8xl">{currentVideo.avatar}</div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gradient">{currentVideo.username}</h2>
                    <p className="text-muted-foreground">{currentVideo.description}</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-24 left-6 right-20 z-10 space-y-3 animate-slide-up">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-neon flex items-center justify-center text-2xl glow">
                    {currentVideo.avatar}
                  </div>
                  <span className="font-semibold text-lg">{currentVideo.username}</span>
                  <button className="ml-2 px-4 py-1 gradient-neon rounded-full text-sm font-semibold glow hover:scale-105 transition-transform">
                    Подписаться
                  </button>
                </div>
                <p className="text-sm">{currentVideo.description}</p>
              </div>

              <div className="absolute bottom-24 right-4 z-10 space-y-6 animate-slide-up">
                <button 
                  onClick={handleLike}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className={`p-3 rounded-full transition-all ${
                    currentVideo.isLiked 
                      ? 'bg-neon-pink glow' 
                      : 'bg-muted/80 hover:bg-muted group-hover:scale-110'
                  }`}>
                    <Icon 
                      name="Heart" 
                      size={28} 
                      className={currentVideo.isLiked ? 'fill-white' : ''}
                    />
                  </div>
                  <span className="text-xs font-semibold">{formatNumber(currentVideo.likes)}</span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                  <div className="p-3 rounded-full bg-muted/80 hover:bg-muted transition-all group-hover:scale-110">
                    <Icon name="MessageCircle" size={28} />
                  </div>
                  <span className="text-xs font-semibold">{formatNumber(currentVideo.comments)}</span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                  <div className="p-3 rounded-full bg-muted/80 hover:bg-muted transition-all group-hover:scale-110">
                    <Icon name="Share2" size={28} />
                  </div>
                  <span className="text-xs font-semibold">{formatNumber(currentVideo.shares)}</span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                  <div className="p-3 rounded-full bg-muted/80 hover:bg-muted transition-all group-hover:scale-110">
                    <Icon name="Bookmark" size={28} />
                  </div>
                </button>
              </div>

              {currentVideoIndex > 0 && (
                <button 
                  onClick={handlePrevVideo}
                  className="absolute top-1/2 left-4 -translate-y-1/2 p-3 rounded-full bg-muted/80 hover:bg-muted backdrop-blur-sm transition-all hover:scale-110 z-10"
                >
                  <Icon name="ChevronUp" size={32} />
                </button>
              )}

              {currentVideoIndex < videos.length - 1 && (
                <button 
                  onClick={handleNextVideo}
                  className="absolute top-1/2 right-4 -translate-y-1/2 p-3 rounded-full bg-muted/80 hover:bg-muted backdrop-blur-sm transition-all hover:scale-110 z-10"
                >
                  <Icon name="ChevronDown" size={32} />
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="max-w-2xl mx-auto px-6 animate-fade-in">
            <div className="relative mb-8">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Поиск видео, пользователей..."
                className="w-full pl-12 pr-4 py-4 bg-card rounded-2xl border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Популярные теги</h3>
              <div className="flex flex-wrap gap-2">
                {['#dance', '#comedy', '#music', '#food', '#travel', '#fashion', '#gaming', '#art'].map(tag => (
                  <button 
                    key={tag}
                    className="px-4 py-2 bg-card rounded-full border border-border hover:border-primary transition-all hover:scale-105"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="max-w-md mx-auto px-6 animate-fade-in">
            {!showUploadPreview ? (
              <div className="bg-card rounded-3xl p-8 border border-border space-y-6">
                <h2 className="text-2xl font-bold text-center text-gradient">Загрузить видео</h2>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div 
                  onClick={handleUploadClick}
                  className="border-2 border-dashed border-border rounded-2xl p-12 text-center space-y-4 hover:border-primary transition-all cursor-pointer"
                >
                  <div className="mx-auto w-20 h-20 rounded-full gradient-neon flex items-center justify-center glow">
                    <Icon name="Upload" size={40} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Нажмите для загрузки</p>
                    <p className="text-sm text-muted-foreground">MP4, MOV до 100MB</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-3xl p-6 border border-border space-y-6">
                <h2 className="text-2xl font-bold text-center text-gradient">Предпросмотр</h2>
                
                <div className="relative w-full aspect-[9/16] bg-background rounded-2xl overflow-hidden">
                  <video 
                    src={uploadedVideo || ''}
                    className="w-full h-full object-cover"
                    controls
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Описание</label>
                    <textarea
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                      placeholder="Добавьте описание и хэштеги..."
                      className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleCancelUpload}
                      className="flex-1 px-6 py-3 bg-muted rounded-xl font-semibold hover:bg-muted/80 transition-all"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handlePublishVideo}
                      className="flex-1 px-6 py-3 gradient-neon rounded-xl font-semibold glow hover:scale-105 transition-all"
                    >
                      Опубликовать
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="max-w-2xl mx-auto px-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-gradient">🔥 Тренды</h2>
            <div className="space-y-4">
              {[
                { rank: 1, tag: '#summervibes', views: '45.2M' },
                { rank: 2, tag: '#newchallenge', views: '38.7M' },
                { rank: 3, tag: '#comedy', views: '32.1M' },
                { rank: 4, tag: '#dance2024', views: '28.9M' }
              ].map(trend => (
                <div 
                  key={trend.rank}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-gradient group-hover:scale-110 transition-transform">
                      #{trend.rank}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{trend.tag}</h3>
                      <p className="text-sm text-muted-foreground">{trend.views} просмотров</p>
                    </div>
                    <Icon name="TrendingUp" size={24} className="text-neon-pink" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-md mx-auto px-6 animate-fade-in">
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full gradient-neon flex items-center justify-center text-6xl glow mx-auto">
                  👤
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-primary rounded-full glow">
                  <Icon name="Camera" size={20} />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gradient mb-2">@my_profile</h2>
                <p className="text-muted-foreground">Редактировать профиль</p>
              </div>
              <div className="grid grid-cols-3 gap-4 py-6">
                <div>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-sm text-muted-foreground">Видео</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1.2K</div>
                  <div className="text-sm text-muted-foreground">Подписчики</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">345</div>
                  <div className="text-sm text-muted-foreground">Подписки</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
        <div className="max-w-2xl mx-auto px-6 py-3">
          <div className="flex items-center justify-around">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 p-2 transition-all ${
                activeTab === 'home' ? 'text-primary scale-110' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Home" size={26} />
              <span className="text-xs font-medium">Главная</span>
            </button>

            <button 
              onClick={() => setActiveTab('search')}
              className={`flex flex-col items-center gap-1 p-2 transition-all ${
                activeTab === 'search' ? 'text-primary scale-110' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Search" size={26} />
              <span className="text-xs font-medium">Поиск</span>
            </button>

            <button 
              onClick={() => setActiveTab('upload')}
              className="relative -mt-6"
            >
              <div className="w-14 h-14 rounded-2xl gradient-neon flex items-center justify-center glow shadow-2xl hover:scale-110 transition-transform">
                <Icon name="Plus" size={32} />
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('trends')}
              className={`flex flex-col items-center gap-1 p-2 transition-all ${
                activeTab === 'trends' ? 'text-primary scale-110' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="TrendingUp" size={26} />
              <span className="text-xs font-medium">Тренды</span>
            </button>

            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 p-2 transition-all ${
                activeTab === 'profile' ? 'text-primary scale-110' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="User" size={26} />
              <span className="text-xs font-medium">Профиль</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}