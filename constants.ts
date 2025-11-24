import { Category, CategoryId, Resource, ResourceType, UserRole } from './types';
import { 
  BookOpen, 
  Globe, 
  Languages, 
  Palette, 
  Users, 
  Music, 
  FileText, 
  GraduationCap 
} from 'lucide-react';

export const CATEGORIES: Category[] = [
  {
    id: CategoryId.CASTELLANO,
    label: 'Lengua Castellana',
    description: 'Gramática, literatura y comprensión lectora.',
    iconName: 'BookOpen',
    color: 'red',
  },
  {
    id: CategoryId.CATALAN,
    label: 'Llengua Catalana',
    description: 'Recursos de gramàtica i literatura catalana.',
    iconName: 'Languages',
    color: 'yellow',
  },
  {
    id: CategoryId.INGLES,
    label: 'English & Foreign Lang',
    description: 'Vocabulary, listening and reading skills.',
    iconName: 'Globe',
    color: 'blue',
  },
  {
    id: CategoryId.SOCIAL,
    label: 'Medio Social y Natural',
    description: 'Historia, geografía y ciencias naturales.',
    iconName: 'Users',
    color: 'green',
  },
  {
    id: CategoryId.CULTURAL,
    label: 'Actividades Culturales',
    description: 'Teatro, museos y salidas escolares.',
    iconName: 'Palette',
    color: 'purple',
  },
  {
    id: CategoryId.EXTRAESCOLAR,
    label: 'Extraescolares',
    description: 'Deportes, música y clubes de tarde.',
    iconName: 'Music',
    color: 'orange',
  },
  {
    id: CategoryId.PROFESORES,
    label: 'Sala de Profesores',
    description: 'Programaciones y recursos internos.',
    iconName: 'GraduationCap',
    color: 'slate',
  }
];

// The "Mock Database" of resources
export const RESOURCES: Resource[] = [
  // Castellano
  {
    id: '1',
    title: 'Guía de Sintaxis Básica',
    description: 'Resumen visual para el análisis sintáctico de oraciones simples.',
    categoryId: CategoryId.CASTELLANO,
    type: ResourceType.PDF,
    tags: ['gramática', 'ESO', 'repaso'],
    dateAdded: '2023-10-15',
    minRole: UserRole.STUDENT,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Lista de Lecturas Recomendadas 2024',
    description: 'Libros seleccionados por el departamento para 1º y 2º de Primaria.',
    categoryId: CategoryId.CASTELLANO,
    type: ResourceType.DOCUMENT,
    tags: ['lectura', 'primaria'],
    dateAdded: '2023-09-01',
    minRole: UserRole.PARENT
  },
  // Catalan
  {
    id: '3',
    title: 'Exercicis de Pronoms Febles',
    description: 'Activitats interactives per practicar els pronoms.',
    categoryId: CategoryId.CATALAN,
    type: ResourceType.LINK,
    tags: ['gramàtica', 'batxillerat'],
    dateAdded: '2023-11-10',
    minRole: UserRole.STUDENT
  },
  // English (Specific examples for Search indexing demo)
  {
    id: '4',
    title: 'Present Simple vs Present Continuous',
    description: 'Video explainer covering the main differences and usage rules.',
    categoryId: CategoryId.INGLES,
    type: ResourceType.VIDEO,
    tags: ['grammar', 'present simple', 'verbs'],
    dateAdded: '2023-12-05',
    minRole: UserRole.STUDENT,
    isFeatured: true
  },
  {
    id: '4b',
    title: 'Present Simple Worksheets',
    description: 'Downloadable PDF exercises to practice Present Simple structure in positive, negative and questions.',
    categoryId: CategoryId.INGLES,
    type: ResourceType.PDF,
    tags: ['grammar', 'present simple', 'exercises'],
    dateAdded: '2024-01-15',
    minRole: UserRole.STUDENT
  },
  {
    id: '4c',
    title: 'Daily Routines Vocabulary',
    description: 'Flashcards for daily routines, perfect for practicing Present Simple sentences.',
    categoryId: CategoryId.INGLES,
    type: ResourceType.LINK,
    tags: ['vocabulary', 'present simple', 'speaking'],
    dateAdded: '2024-01-20',
    minRole: UserRole.STUDENT
  },
  // Social
  {
    id: '5',
    title: 'Mapa Interactivo de Europa',
    description: 'Herramienta para aprender las capitales y ríos principales.',
    categoryId: CategoryId.SOCIAL,
    type: ResourceType.LINK,
    tags: ['geografía', 'interactivo'],
    dateAdded: '2023-10-20',
    minRole: UserRole.STUDENT
  },
  // Extraescolares
  {
    id: '6',
    title: 'Horarios de Fútbol Sala y Baloncesto',
    description: 'Calendario trimestral de partidos y entrenamientos.',
    categoryId: CategoryId.EXTRAESCOLAR,
    type: ResourceType.PDF,
    tags: ['deportes', 'horario'],
    dateAdded: '2024-01-10',
    minRole: UserRole.PARENT
  },
  // Teachers Only
  {
    id: '7',
    title: 'Programación Didáctica - Curso 23/24',
    description: 'Documento oficial con los objetivos anuales por ciclo.',
    categoryId: CategoryId.PROFESORES,
    type: ResourceType.DOCUMENT,
    tags: ['interno', 'planificación'],
    dateAdded: '2023-09-01',
    minRole: UserRole.TEACHER
  },
  {
    id: '8',
    title: 'Actas de Evaluación - 1er Trimestre',
    description: 'Plantillas para rellenar las notas de evaluación.',
    categoryId: CategoryId.PROFESORES,
    type: ResourceType.DOCUMENT,
    tags: ['evaluación', 'administrativo'],
    dateAdded: '2023-12-15',
    minRole: UserRole.TEACHER
  }
];
