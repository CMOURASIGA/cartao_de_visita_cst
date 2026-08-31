import { LucideIcon, KanbanSquare, Wallet, CalendarDays, Users2, Scale } from 'lucide-react';

export type HubProduct = {
  slug: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  ctaLabel: string;
  /** Nome da variável de ambiente VITE_* que define a URL externa do produto. */
  envUrlKey: string;
  active: boolean;
};

// Estrutura de dados dedicada aos produtos do Solutions Hub, para permitir
// inclusão de novos produtos sem reestruturar a Home (ver docs/specs/solutions-hub-site.md, seção 18).
// Não incluir 7Service, 7Mercado ou componentes internos neste array.
export const hubProducts: HubProduct[] = [
  {
    slug: '7commander',
    name: '7Commander',
    category: 'Gestão de Projetos',
    description:
      'Centraliza projetos, atividades, prioridades, decisões, prazos e indicadores, oferecendo visão operacional e executiva sobre o andamento das iniciativas da empresa.',
    features: ['Projetos', 'Tarefas', 'Prazos', 'Prioridades', 'Indicadores', 'Visão executiva'],
    icon: KanbanSquare,
    ctaLabel: 'Conhecer o 7Commander',
    envUrlKey: 'VITE_7COMMANDER_URL',
    active: true,
  },
  {
    slug: '7finance',
    name: '7Finance',
    category: 'Gestão Financeira',
    description:
      'Organiza receitas, custos, despesas, compromissos e indicadores financeiros para apoiar uma gestão mais clara sobre a situação e os resultados da empresa.',
    features: [
      'Receitas',
      'Custos',
      'Despesas',
      'Previsto x realizado',
      'Indicadores financeiros',
      'Relatórios de apoio à decisão',
    ],
    icon: Wallet,
    ctaLabel: 'Conhecer o 7Finance',
    envUrlKey: 'VITE_7FINANCE_URL',
    active: true,
  },
  {
    slug: '7eventos',
    name: '7Eventos',
    category: 'Gestão de Eventos',
    description:
      'Apoia o planejamento e a execução de eventos, integrando informações de fornecedores, equipes, participantes, inscrições, credenciamento e gestão financeira.',
    features: [
      'Planejamento',
      'Participantes',
      'Inscrições',
      'Credenciamento',
      'Equipes',
      'Fornecedores',
      'Financeiro do evento',
    ],
    icon: CalendarDays,
    ctaLabel: 'Conhecer o 7Eventos',
    envUrlKey: 'VITE_7EVENTOS_URL',
    active: true,
  },
  {
    slug: 'crm-flow',
    name: 'CRM Flow',
    category: 'Gestão Comercial e Relacionamento',
    description:
      'Centraliza leads, oportunidades, histórico de interações e atendimento, apoiando equipes comerciais no acompanhamento do relacionamento com clientes.',
    features: ['Leads', 'Funil comercial', 'Oportunidades', 'Atendimento', 'Histórico de interações', 'Apoio por IA'],
    icon: Users2,
    ctaLabel: 'Conhecer o CRM Flow',
    envUrlKey: 'VITE_CRM_FLOW_URL',
    active: true,
  },
  {
    slug: '7legal',
    name: '7Legal',
    category: 'Portal Jurídico e Consolidação de Informações',
    description:
      'Portal para apresentação organizada de informações jurídicas provenientes dos sistemas internos da empresa, facilitando a consulta de processos, documentos, atualizações e informações relevantes por usuários autorizados.',
    features: [
      'Apresentação de dados jurídicos',
      'Consulta de processos',
      'Documentos',
      'Atualizações e avisos',
      'Visão por cliente',
      'Integração com sistemas jurídicos internos',
      'Controle de acesso',
    ],
    icon: Scale,
    ctaLabel: 'Conhecer o 7Legal',
    envUrlKey: 'VITE_7LEGAL_URL',
    active: true,
  },
];
