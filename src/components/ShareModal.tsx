import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Share2, UserPlus, MessageCircle, MonitorUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  logoUrl?: string;
}

export default function ShareModal({ isOpen, onClose, logoUrl }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  
  const appUrl = import.meta.env.VITE_SHARE_URL || import.meta.env.VITE_PUBLIC_APP_URL || window.location.origin;
  const qrUrl = import.meta.env.VITE_QR_CODE_TARGET_URL || appUrl;
  const shareTitle = import.meta.env.VITE_SHARE_TITLE || 'Consult Services Tecnologia';
  const shareText = import.meta.env.VITE_SHARE_TEXT || 'Cartão Digital';

  useEffect(() => {
    if (navigator.share) {
      setCanShare(true);
    }
  }, []);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: qrUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopy();
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`${shareTitle}\n${shareText}\n${appUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6 mt-4">
          {logoUrl && (
            <img src={logoUrl} alt="Logo" className="h-auto w-full max-w-[160px] object-contain mx-auto mb-4" />
          )}
          <h2 className="text-xl font-semibold text-gray-900">Compartilhe meu cartão digital</h2>
          <p className="text-sm text-gray-500 mt-1">Escaneie o QR Code abaixo ou escolha uma opção.</p>
        </div>

        <div className="flex justify-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm mx-auto w-fit">
          <QRCodeSVG value={qrUrl} size={180} level="H" />
        </div>

        <div className="space-y-3">
          <button
            onClick={handleCopy}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Copy className="h-4 w-4" />
            {copied ? 'Link copiado!' : 'Copiar link'}
          </button>
          
          <button
            onClick={handleShare}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            Compartilhar pelo telefone
          </button>

          <a
            href="/api/vcard"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <UserPlus className="h-4 w-4" />
            Salvar contato
          </a>

          <button
            onClick={handleWhatsApp}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 px-4 text-sm font-medium text-white hover:bg-[#20bd5a] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Enviar pelo WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
