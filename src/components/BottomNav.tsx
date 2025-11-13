import Icon from '@/components/ui/icon';

type TabType = 'home' | 'search' | 'upload' | 'trends' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
      <div className="max-w-2xl mx-auto px-6 py-3">
        <div className="flex items-center justify-around">
          <button 
            onClick={() => onTabChange('home')}
            className={`flex flex-col items-center gap-1 p-2 transition-all ${
              activeTab === 'home' ? 'text-primary scale-110' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Home" size={26} />
            <span className="text-xs font-medium">Главная</span>
          </button>

          <button 
            onClick={() => onTabChange('search')}
            className={`flex flex-col items-center gap-1 p-2 transition-all ${
              activeTab === 'search' ? 'text-primary scale-110' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Search" size={26} />
            <span className="text-xs font-medium">Поиск</span>
          </button>

          <button 
            onClick={() => onTabChange('upload')}
            className="relative -mt-6"
          >
            <div className="w-14 h-14 rounded-2xl gradient-neon flex items-center justify-center glow shadow-2xl hover:scale-110 transition-transform">
              <Icon name="Plus" size={32} />
            </div>
          </button>

          <button 
            onClick={() => onTabChange('trends')}
            className={`flex flex-col items-center gap-1 p-2 transition-all ${
              activeTab === 'trends' ? 'text-primary scale-110' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="TrendingUp" size={26} />
            <span className="text-xs font-medium">Тренды</span>
          </button>

          <button 
            onClick={() => onTabChange('profile')}
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
  );
}
