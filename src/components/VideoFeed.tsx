import { useRef } from 'react';
import Icon from '@/components/ui/icon';

export interface Video {
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

interface VideoFeedProps {
  currentVideo: Video;
  currentVideoIndex: number;
  videosLength: number;
  onLike: () => void;
  onNextVideo: () => void;
  onPrevVideo: () => void;
}

export default function VideoFeed({ 
  currentVideo, 
  currentVideoIndex, 
  videosLength,
  onLike, 
  onNextVideo, 
  onPrevVideo 
}: VideoFeedProps) {
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

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
        onNextVideo();
      } else {
        onPrevVideo();
      }
    }
  };

  return (
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
        {currentVideo.videoUrl.startsWith('blob:') ? (
          <video 
            src={currentVideo.videoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <div className="text-center space-y-4 p-8">
              <div className="text-8xl">{currentVideo.avatar}</div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gradient">{currentVideo.username}</h2>
                <p className="text-muted-foreground">{currentVideo.description}</p>
              </div>
            </div>
          </div>
        )}

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
            onClick={onLike}
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
            onClick={onPrevVideo}
            className="absolute top-1/2 left-4 -translate-y-1/2 p-3 rounded-full bg-muted/80 hover:bg-muted backdrop-blur-sm transition-all hover:scale-110 z-10"
          >
            <Icon name="ChevronUp" size={32} />
          </button>
        )}

        {currentVideoIndex < videosLength - 1 && (
          <button 
            onClick={onNextVideo}
            className="absolute top-1/2 right-4 -translate-y-1/2 p-3 rounded-full bg-muted/80 hover:bg-muted backdrop-blur-sm transition-all hover:scale-110 z-10"
          >
            <Icon name="ChevronDown" size={32} />
          </button>
        )}
      </div>
    </div>
  );
}
