import { Project, Service } from './types';
import { Settings, Target, Zap, Code, Lightbulb, Users, FileCheck, Search, Shield, Brain } from 'lucide-react';
import React from 'react';

export const services: (Service & { icon: React.ElementType })[] = [
  {
    title: "Gestão de Projetos e Processos",
    description: "Organização de escopo, cronograma, prioridades, fluxos, indicadores e acompanhamento operacional.",
    icon: Target
  },
  {
    title: "Implantação de Sistemas",
    description: "Apoio na escolha, configuração e implantação de ferramentas como CRMs, plataformas de atendimento e sistemas de gestão.",
    icon: Settings
  },
  {
    title: "Integrações e Automações",
    description: "Conexão entre sistemas, automação de rotinas e criação de fluxos que reduzem trabalho manual.",
    icon: Zap
  },
  {
    title: "Webapps e Soluções Digitais",
    description: "Desenvolvimento de aplicações sob medida para aprovações, cadastros, painéis, controles e operações internas.",
    icon: Code
  },
  {
    title: "Inteligência Artificial Aplicada",
    description: "Uso prático de IA para atendimento, análise de dados, geração de conteúdo, triagem e apoio à tomada de decisão.",
    icon: Brain
  }
];

// 7Commander, 7Finance e CRM Flow já são apresentados com destaque na seção
// Consult Services Solutions Hub — não duplicados aqui para não parecerem
// ofertas concorrentes ou categorias desconectadas (ver docs/specs/solutions-hub-site.md, seção 9).
export const projects: Project[] = [
  {
    name: "Consult Flow",
    category: "Gestão de conteúdo, aprovação e publicação digital.",
    description: "Webapp para organizar o fluxo de criação, revisão, aprovação e publicação de conteúdos digitais, com visão por cliente, histórico, arquivos, controle de status e integração com redes sociais.",
    features: [
      "Gestão de conteúdos por cliente",
      "Aprovação de posts e vídeos",
      "Organização de arquivos e versões",
      "Controle de status",
      "Histórico de aprovações",
      "Integração com Instagram e Meta",
      "Apoio de IA para criação e revisão de conteúdo"
    ]
  },
  {
    name: "EduQuestAI",
    category: "IA aplicada à educação e geração de provas.",
    description: "Aplicação educacional para criação de provas com inteligência artificial, controle de acesso, planos, créditos e cadastro de alunos, apoiando professores, estudantes e instituições.",
    features: [
      "Geração de provas com IA",
      "Controle de acesso por usuário",
      "Planos e créditos de uso",
      "Acesso gratuito inicial controlado",
      "Cadastro de alunos por conta principal",
      "Registro de consumo",
      "Eventos de conta",
      "Apoio a professores, alunos e instituições"
    ]
  }
];

export const automations: Project[] = [
  {
    name: "Secretária Executiva Digital",
    category: "Automação para rotina executiva e priorização diária.",
    description: "Assistente digital para consolidar agenda, e-mails, tarefas, pendências e recomendações do dia em um resumo executivo objetivo.",
    features: [
      "Resumo diário da agenda",
      "Leitura de e-mails importantes",
      "Acompanhamento de tarefas",
      "Integração com ferramentas de produtividade",
      "Organização de pendências",
      "Recomendações do dia",
      "Apoio à priorização executiva"
    ]
  }
];
