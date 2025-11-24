import React from 'react';
import { CATEGORIES } from '../constants';
import { CategoryId, UserRole } from '../types';
import * as Icons from 'lucide-react';

interface SidebarProps {
  activeCategory: CategoryId | 'all';
  onSelectCategory: (id: CategoryId | 'all') => void;
  userRole: UserRole;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeCategory, 
  onSelectCategory, 
  userRole,
  isOpen,
  setIsOpen
}) => {
  
  const availableCategories = CATEGORIES.filter(cat => {
    // Teachers see everything
    if (userRole === UserRole.TEACHER) return true;
    
    // Hide "Sala de Profesores" for non-teachers
    if (cat.id === CategoryId.PROFESORES) return false;
    
    return true;
  });

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-slate-200 w-64 transition-transform duration-300 z-30
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-center border-b border-slate-100">
          <div className="flex items-center gap-2 text-blue-600">
            <Icons.School className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tight text-slate-800">EduNexus</span>
          </div>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-80px)]">
          <button
            onClick={() => { onSelectCategory('all'); setIsOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === 'all' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Icons.LayoutGrid className="w-5 h-5" />
            Vista General
          </button>

          <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Materias y Áreas
          </div>

          {availableCategories.map((cat) => {
            // Dynamically get the icon component
            const IconComponent = (Icons as any)[cat.iconName] || Icons.Folder;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => { onSelectCategory(cat.id); setIsOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? `bg-${cat.color}-50 text-${cat.color}-700` 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <IconComponent className={`w-5 h-5 ${isActive ? `text-${cat.color}-600` : 'text-slate-400'}`} />
                {cat.label}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};
