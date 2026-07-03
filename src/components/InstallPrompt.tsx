import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;
    
    if (isIosDevice && !isStandalone) {
      setIsIOS(true);
      setShowPrompt(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-40 bg-gradient-to-t from-white via-white to-transparent pb-8">
      <div className="max-w-md mx-auto bg-white border border-[#003B73]/10 rounded-2xl shadow-xl p-4 flex gap-4 items-center animate-in slide-in-from-bottom-10 duration-300">
        <div className="bg-[#003B73]/10 p-3 rounded-xl text-[#003B73]">
          <Download className="h-6 w-6" />
        </div>
        
        <div className="flex-1">
          {isIOS ? (
            <p className="text-sm text-gray-700 leading-tight">
              Para salvar este cartão no iPhone, toque no botão de <strong>compartilhar</strong> e escolha <strong>"Adicionar à Tela de Início"</strong>.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-gray-900">Adicionar este cartão à tela inicial</p>
              <button 
                onClick={handleInstallClick}
                className="text-xs bg-[#003B73] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#002a52] transition-colors self-start"
              >
                Instalar App
              </button>
            </div>
          )}
        </div>
        
        <button 
          onClick={() => setShowPrompt(false)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 self-start"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
