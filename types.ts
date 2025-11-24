export enum UserRole {
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  AMPA = 'AMPA', // Parent Association with creation rights
  TEACHER = 'TEACHER'
}

export enum ResourceType {
  PDF = 'PDF',
  VIDEO = 'VIDEO',
  LINK = 'LINK',
  DOCUMENT = 'DOCUMENT',
  EVENT = 'EVENT'
}

export enum CategoryId {
  CASTELLANO = 'castellano',
  CATALAN = 'catalan',
  INGLES = 'ingles',
  SOCIAL = 'social',
  CULTURAL = 'cultural',
  EXTRAESCOLAR = 'extraescolar',
  GENERAL = 'general',
  PROFESORES = 'profesores' // Internal only
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  categoryId: CategoryId;
  type: ResourceType;
  url?: string;
  tags: string[];
  dateAdded: string;
  minRole: UserRole; // Minimum role required to view
  isFeatured?: boolean;
  author?: string; // To track who uploaded it
}

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
  iconName: string;
  color: string; // Tailwind color class base (e.g., 'blue')
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
