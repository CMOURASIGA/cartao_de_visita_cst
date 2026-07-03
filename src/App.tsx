import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Linkedin, Mail, Share2, UserPlus, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import Section from './components/Section';
import ShareModal from './components/ShareModal';
import ContactForm from './components/ContactForm';
import InstallPrompt from './components/InstallPrompt';
import { services, projects, automations } from './data';

export default function App() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Esconder a tela de abertura após 2.5 segundos
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const env = import.meta.env;
  
  const companyName = env.VITE_COMPANY_NAME || "Consult Services Tecnologia";
  const tagline = env.VITE_COMPANY_TAGLINE || "Tecnologia, processos e integrações para empresas que precisam organizar melhor suas operações.";
  const description = env.VITE_COMPANY_DESCRIPTION || "A Consult Services Tecnologia apoia empresas na estruturação de processos, implantação de sistemas, integrações, automações, webapps e soluções com inteligência artificial aplicada ao negócio.";
  const logoUrl = env.VITE_COMPANY_LOGO_URL || "https://i.imgur.com/gxXnYsA.png";
  const iconUrl = env.VITE_COMPANY_ICON_URL || "https://i.imgur.com/wr0z5Xv.png";

  const personName = env.VITE_PERSON_FULL_NAME || "Christian Moura";
  const personRole = env.VITE_PERSON_ROLE || "Gestor de Projetos, Sistemas e Produtos";
  const personBio = env.VITE_PERSON_BIO || "À frente da Consult Services Tecnologia, atua conectando processos, tecnologia e visão operacional para criar soluções práticas, com foco em clareza, organização e tomada de decisão.";
  const personPhoto = env.VITE_PERSON_PHOTO_URL || "https://placehold.co/400x400/00AEEF/white?text=CM";

  const whatsappNumber = env.VITE_CONTACT_WHATSAPP_NUMBER || "5521999999999";
  const whatsappMessage = env.VITE_CONTACT_WHATSAPP_MESSAGE || "Olá, Christian. Conheci a Consult Services Tecnologia pelo seu cartão digital e gostaria de conversar sobre uma solução para minha empresa.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  
  const linkedinUrl = env.VITE_CONTACT_LINKEDIN_URL || "https://linkedin.com/in/christianmoura";
  const email = env.VITE_CONTACT_EMAIL || "contato@seudominio.com.br";

  const primaryColor = env.VITE_COMPANY_PRIMARY_COLOR || "#003B73";

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className="relative"
            >
              <img
                src={iconUrl}
                alt={companyName}
                className="h-24 md:h-32 object-contain"
              />
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 left-0 h-1 bg-[#003B73] rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-[#00AEEF] selection:text-white">
      {/* Hero Section */}
      <header className="relative bg-white pt-24 pb-16 px-4 md:px-8 border-b border-gray-100 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#00AEEF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-[#003B73]/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <img 
            src={logoUrl} 
            alt={companyName} 
            className="h-auto w-full max-w-[400px] md:max-w-[560px] object-contain mx-auto mb-0"
          />
          
          <p className="text-xl md:text-2xl text-[#003B73] font-medium mb-6 mt-0 md:-mt-4">
            {tagline}
          </p>
          
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:bg-[#20bd5a] transition-all shadow-sm hover:shadow-md"
            >
              <MessageCircle className="h-5 w-5" />
              Falar pelo WhatsApp
            </a>
            
            <a 
              href="#solucoes"
              className="flex items-center gap-2 bg-white text-[#003B73] border border-[#003B73]/20 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
            >
              Ver soluções
              <ArrowRight className="h-4 w-4" />
            </a>

            <a 
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-[#0a66c2] border border-gray-200 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
            >
              <Linkedin className="h-5 w-5" />
              Conectar no LinkedIn
            </a>

            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
            >
              <Share2 className="h-5 w-5" />
              Compartilhar cartão
            </button>
          </div>
        </div>
      </header>

      {/* O que fazemos */}
      <Section id="servicos" title="O que fazemos" bgWhite={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-[#003B73]/5 flex items-center justify-center mb-4">
                <service.icon className="h-6 w-6 text-[#003B73]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Soluções desenvolvidas */}
      <Section id="solucoes" title="Soluções desenvolvidas" subtitle="Projetos principais criados para otimizar operações e gerenciar dados." bgWhite={true}>
        <div className="space-y-8">
          {projects.map((project, idx) => (
            <div key={idx} className="flex flex-col md:flex-row bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
              <div className="p-8 md:w-2/5 flex flex-col justify-center bg-[#003B73]/5 border-b md:border-b-0 md:border-r border-gray-100">
                <div className="inline-block px-3 py-1 rounded-full bg-white text-[#003B73] text-sm font-medium border border-[#003B73]/10 mb-4 w-fit">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.name}</h3>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              </div>
              <div className="p-8 md:w-3/5 bg-white">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Principais Recursos</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#00AEEF] shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Automações e assistentes digitais */}
      <Section id="automacoes" title="Automações e Assistentes Digitais" bgWhite={false}>
        <div className="space-y-8">
          {automations.map((project, idx) => (
            <div key={idx} className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="p-8 md:w-2/5 flex flex-col justify-center bg-gradient-to-br from-[#003B73] to-[#00AEEF] text-white">
                <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4 w-fit backdrop-blur-sm">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
                <p className="text-blue-50 leading-relaxed">{project.description}</p>
              </div>
              <div className="p-8 md:w-3/5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Principais Recursos</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#003B73] shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Quem está à frente */}
      <Section id="perfil" title="Quem está à frente" bgWhite={true}>
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left bg-gray-50 rounded-3xl p-8 border border-gray-100">
          <img 
            src={personPhoto} 
            alt={personName}
            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg shrink-0"
          />
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{personName}</h3>
            <p className="text-lg font-medium text-[#00AEEF] mb-4">{personRole}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{personBio}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <a 
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0a66c2] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#084e96] transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a 
                href={`mailto:${email}`}
                className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                <Mail className="h-4 w-4" />
                E-mail
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Contato */}
      <Section id="contato" title="Vamos conversar sobre sua necessidade?" subtitle="Escolha o melhor canal para falar comigo ou salve este cartão para acessar depois." bgWhite={false}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-2 space-y-4">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200 hover:border-[#25D366] hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#25D366]/10 p-3 rounded-lg text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                  <p className="text-sm text-gray-500">Resposta rápida</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#25D366]" />
            </a>

            <a 
              href={`mailto:${email}`}
              className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200 hover:border-[#003B73] hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#003B73]/10 p-3 rounded-lg text-[#003B73] group-hover:bg-[#003B73] group-hover:text-white transition-colors">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">E-mail</h4>
                  <p className="text-sm text-gray-500">Propostas detalhadas</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#003B73]" />
            </a>

            <a 
              href="/api/vcard"
              className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200 hover:border-gray-900 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-3 rounded-lg text-gray-700 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <UserPlus className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Salvar Contato</h4>
                  <p className="text-sm text-gray-500">Adicionar à agenda</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-900" />
            </a>

            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200 hover:border-[#00AEEF] hover:shadow-md transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#00AEEF]/10 p-3 rounded-lg text-[#00AEEF] group-hover:bg-[#00AEEF] group-hover:text-white transition-colors">
                  <Share2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Compartilhar Cartão</h4>
                  <p className="text-sm text-gray-500">Enviar para alguém</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#00AEEF]" />
            </button>
            
            <p className="text-sm text-gray-500 text-center mt-6">
              Você também pode salvar este cartão nos favoritos do navegador para acessar depois.
            </p>
          </div>

          <div className="lg:col-span-3 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Deixe uma mensagem</h3>
            <ContactForm />
          </div>

        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <img 
            src={logoUrl} 
            alt={companyName} 
            className="h-auto w-full max-w-[200px] object-contain mx-auto mb-6 opacity-80"
          />
          <p className="text-gray-500 font-medium">{companyName} &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>

      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        logoUrl={logoUrl}
      />
      
      <InstallPrompt />
    </div>
    </>
  );
}
