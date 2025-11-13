import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative animate-fade-in">
        <div className="relative w-64 h-[480px] bg-card rounded-[3rem] border-[8px] border-muted shadow-2xl overflow-hidden animate-scale-in">
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-muted/50 rounded-full" />
          
          <div className="absolute inset-4 top-12 bottom-4 bg-background rounded-[2rem] flex items-center justify-center">
            <div className="text-center space-y-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="relative">
                <div className="absolute inset-0 gradient-neon opacity-30 blur-3xl animate-pulse-glow" />
                <div className="relative w-32 h-32 mx-auto rounded-3xl gradient-neon flex items-center justify-center glow shadow-2xl animate-scale-in" style={{ animationDelay: '0.8s' }}>
                  <span className="text-6xl">📱</span>
                </div>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
                <h1 className="text-4xl font-bold text-gradient glow-text">CVIN-net</h1>
                <p className="text-sm text-muted-foreground mt-2">Vertical Video Social</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-muted/30" />
        </div>
      </div>
    </div>
  );
}
