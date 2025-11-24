import React from 'react';
import { Resource, ResourceType, UserRole } from '../types';
import { FileText, Video, Link as LinkIcon, Calendar, Lock } from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
  currentUserRole: UserRole;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, currentUserRole }) => {
  const getIcon = () => {
    switch (resource.type) {
      case ResourceType.PDF: return <FileText className="w-5 h-5 text-red-500" />;
      case ResourceType.VIDEO: return <Video className="w-5 h-5 text-blue-500" />;
      case ResourceType.LINK: return <LinkIcon className="w-5 h-5 text-green-500" />;
      case ResourceType.EVENT: return <Calendar className="w-5 h-5 text-purple-500" />;
      default: return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  const isRestricted = resource.minRole === UserRole.TEACHER && currentUserRole !== UserRole.TEACHER;

  return (
    <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all duration-200 hover:border-blue-300 flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white transition-colors">
          {getIcon()}
        </div>
        {resource.minRole === UserRole.TEACHER && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
            <Lock className="w-3 h-3" /> Solo Prof.
          </span>
        )}
      </div>
      
      <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
        {resource.title}
      </h3>
      
      <p className="text-sm text-slate-500 mb-4 flex-grow line-clamp-2">
        {isRestricted ? "Contenido restringido. Inicia sesión como profesor para ver detalles." : resource.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {resource.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
        <span className="text-xs text-slate-400">{resource.dateAdded}</span>
        <button 
          className="text-sm font-medium text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isRestricted}
        >
          {isRestricted ? 'No accesible' : 'Ver Recurso →'}
        </button>
      </div>
    </div>
  );
};