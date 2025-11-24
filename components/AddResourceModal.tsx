import React, { useState } from 'react';
import { CategoryId, Resource, ResourceType, UserRole } from '../types';
import { CATEGORIES } from '../constants';
import { X, Upload, Check } from 'lucide-react';

interface AddResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (resource: Omit<Resource, 'id' | 'dateAdded'>) => void;
  userRole: UserRole;
}

export const AddResourceModal: React.FC<AddResourceModalProps> = ({ isOpen, onClose, onAdd, userRole }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<CategoryId | ''>('');
  const [type, setType] = useState<ResourceType>(ResourceType.DOCUMENT);
  const [tags, setTags] = useState('');

  if (!isOpen) return null;

  // Logic: AMPA can only add to specific categories
  const allowedCategories = CATEGORIES.filter(cat => {
    if (userRole === UserRole.TEACHER) return true;
    if (userRole === UserRole.AMPA) {
      return [CategoryId.EXTRAESCOLAR, CategoryId.CULTURAL, CategoryId.SOCIAL].includes(cat.id);
    }
    return false;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !categoryId) return;

    onAdd({
      title,
      description,
      categoryId: categoryId as CategoryId,
      type,
      tags: tags.split(',').map(t => t.trim()).filter(t => t.length > 0),
      minRole: userRole === UserRole.TEACHER ? UserRole.STUDENT : UserRole.PARENT, // Default visibility logic
      isFeatured: false,
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategoryId('');
    setTags('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            Nueva Actividad
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto px-1">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Título de la Actividad</label>
            <input
              required
              type="text"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ej: Excursión al Museo de Ciencias"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
            <textarea
              required
              rows={3}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Detalles del recurso o actividad..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Materia / Categoría</label>
              <select
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={categoryId}
                onChange={e => setCategoryId(e.target.value as CategoryId)}
              >
                <option value="">Seleccionar...</option>
                {allowedCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
              {userRole === UserRole.AMPA && (
                <p className="text-xs text-amber-600 mt-1">Categorías limitadas por rol AMPA</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Recurso</label>
              <select
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={type}
                onChange={e => setType(e.target.value as ResourceType)}
              >
                <option value={ResourceType.DOCUMENT}>Documento</option>
                <option value={ResourceType.PDF}>PDF</option>
                <option value={ResourceType.LINK}>Enlace Web</option>
                <option value={ResourceType.VIDEO}>Video</option>
                <option value={ResourceType.EVENT}>Evento / Actividad</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Etiquetas (separadas por comas)</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="Ej: primaria, gratis, obligatorio"
            />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Publicar Actividad
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
