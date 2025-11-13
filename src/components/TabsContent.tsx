import Icon from '@/components/ui/icon';

export function SearchTab() {
  return (
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
  );
}

export function TrendsTab() {
  return (
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
  );
}

export function ProfileTab() {
  return (
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
  );
}
