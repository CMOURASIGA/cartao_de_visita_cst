import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao enviar mensagem');
      }

      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Não foi possível enviar sua mensagem agora. Tente novamente ou fale pelo WhatsApp.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto w-full">
      {/* Honeypot field - invisible to users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Nome <span className="text-red-500">*</span></label>
          <input
            required
            type="text"
            id="name"
            name="name"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#003B73] focus:outline-none focus:ring-1 focus:ring-[#003B73] transition-colors"
            placeholder="Seu nome"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail <span className="text-red-500">*</span></label>
          <input
            required
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#003B73] focus:outline-none focus:ring-1 focus:ring-[#003B73] transition-colors"
            placeholder="seu@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">Telefone / WhatsApp</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#003B73] focus:outline-none focus:ring-1 focus:ring-[#003B73] transition-colors"
            placeholder="(00) 00000-0000"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="company" className="text-sm font-medium text-gray-700">Empresa</label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#003B73] focus:outline-none focus:ring-1 focus:ring-[#003B73] transition-colors"
            placeholder="Sua empresa"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="interest" className="text-sm font-medium text-gray-700">Tipo de interesse</label>
        <select
          id="interest"
          name="interest"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white focus:border-[#003B73] focus:outline-none focus:ring-1 focus:ring-[#003B73] transition-colors"
        >
          <option value="Gestão de projetos e processos">Gestão de projetos e processos</option>
          <option value="Implantação de sistemas">Implantação de sistemas</option>
          <option value="Integrações e automações">Integrações e automações</option>
          <option value="Webapp sob medida">Webapp sob medida</option>
          <option value="Inteligência artificial aplicada">Inteligência artificial aplicada</option>
          <option value="Outro assunto">Outro assunto</option>
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">Mensagem <span className="text-red-500">*</span></label>
        <textarea
          required
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#003B73] focus:outline-none focus:ring-1 focus:ring-[#003B73] transition-colors resize-y"
          placeholder="Como podemos ajudar?"
        />
      </div>

      {status === 'success' && (
        <div className="p-4 rounded-lg bg-green-50 text-green-800 border border-green-200 text-sm">
          Mensagem enviada com sucesso. Em breve entrarei em contato.
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 rounded-lg bg-red-50 text-red-800 border border-red-200 text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#003B73] px-6 py-3 text-white font-medium hover:bg-[#002a52] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <Send className="h-5 w-5" />
            Enviar mensagem
          </>
        )}
      </button>
    </form>
  );
}
