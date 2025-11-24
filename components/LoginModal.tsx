import React, { useState } from 'react';
import { UserRole } from '../types';
import { X, KeyRound, User } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: UserRole, name: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // NOTE: This is a MOCK authentication system for demonstration purposes only.
    // In a production environment, this should be replaced with a real backend auth service.
    // Do not use these hardcoded credentials in a real application.
    
    const lowerUser = username.toLowerCase();

    // Generic Mock Credentials
    if (lowerUser === 'profesor' && password === 'admin') {
      onLogin(UserRole.TEACHER, 'Profesor Demo');
      onClose();
    } else if (lowerUser === 'ampa' && password === 'ampa') {
      onLogin(UserRole.AMPA, 'Admin AMPA');
      onClose();
    } else if (lowerUser === 'padre' && password === '1234') {
      onLogin(UserRole.PARENT, 'Familia Demo');
      onClose();
    } else if (lowerUser === 'alumno' && password === '1234') {
      onLogin(UserRole.STUDENT, 'Estudiante Demo');
      onClose();
    } else {
      setError('Credenciales demo incorrectas. Prueba: profesor/admin, ampa/ampa, padre/1234');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
            <KeyRound className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Acceso Demo</h2>
          <p className="text-slate-500 mt-1">Introduce las credenciales de prueba.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Usuario</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="ej. profesor, ampa, padre"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-200"
          >
            Iniciar Sesión (Demo)
          </button>
        </form>
      </div>
    </div>
  );
};