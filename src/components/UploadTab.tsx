import { useRef } from 'react';
import Icon from '@/components/ui/icon';

interface UploadTabProps {
  showUploadPreview: boolean;
  uploadedVideo: string | null;
  videoDescription: string;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadClick: () => void;
  onDescriptionChange: (value: string) => void;
  onPublish: () => void;
  onCancel: () => void;
}

export default function UploadTab({
  showUploadPreview,
  uploadedVideo,
  videoDescription,
  onFileSelect,
  onUploadClick,
  onDescriptionChange,
  onPublish,
  onCancel
}: UploadTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-md mx-auto px-6 animate-fade-in">
      {!showUploadPreview ? (
        <div className="bg-card rounded-3xl p-8 border border-border space-y-6">
          <h2 className="text-2xl font-bold text-center text-gradient">Загрузить видео</h2>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={onFileSelect}
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
                onChange={(e) => onDescriptionChange(e.target.value)}
                placeholder="Добавьте описание и хэштеги..."
                className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 px-6 py-3 bg-muted rounded-xl font-semibold hover:bg-muted/80 transition-all"
              >
                Отмена
              </button>
              <button
                onClick={onPublish}
                className="flex-1 px-6 py-3 gradient-neon rounded-xl font-semibold glow hover:scale-105 transition-all"
              >
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
