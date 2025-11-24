import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { ResourceCard } from './components/ResourceCard';
import { AIChatAssistant } from './components/AIChatAssistant';
import { LoginModal } from './components/LoginModal';
import { AddResourceModal } from './components/AddResourceModal';
import { CategoryId, UserRole, Resource } from './types';
import { CATEGORIES, RESOURCES as INITIAL_RESOURCES } from './constants';
import { Search, Bell, Menu, LogIn, Plus, User as UserIcon, LogOut } from 'lucide-react';

const App: React.FC = () => {
  // Global State
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  
  // Auth State
  const [userRole, setUserRole] = useState<UserRole | null>(null); // Start as guest
  const [userName, setUserName] = useState<string>('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleLogin = (role: UserRole, name: string) => {
    setUserRole(role);
    setUserName(name);
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserName('');
    setActiveCategory('all'); // Reset view
  };

  const handleAddResource = (newResourceData: Omit<Resource, 'id' | 'dateAdded'>) => {
    const newResource: Resource = {
      ...newResourceData,
      id: Math.random().toString(36).substr(2, 9),
      dateAdded: new Date().toISOString().split('T')[0],
      author: userName
    };
    setResources(prev => [newResource, ...prev]);
  };

  // Logic to filter resources (Search Engine)
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      // 1. Security Filter
      // If no user logged in, show only PUBLIC items (assume PARENT/STUDENT minRole is public enough for this demo, 
      // or strictly enforce login. Let's assume Guest can see STUDENT/PARENT content for browsing).
      const effectiveRole = userRole || UserRole.PARENT; 
      
      if (resource.minRole === UserRole.TEACHER && effectiveRole !== UserRole.TEACHER) {
         return false;
      }

      // 2. Category Filter
      if (activeCategory !== 'all' && resource.categoryId !== activeCategory) {
        return false;
      }

      // 3. Search Engine Logic (Title + Description + Tags)
      if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        const matchTitle = resource.title.toLowerCase().includes(lowerTerm);
        const matchDesc = resource.description.toLowerCase().includes(lowerTerm);
        const matchTags = resource.tags.some(tag => tag.toLowerCase().includes(lowerTerm));
        
        return matchTitle || matchDesc || matchTags;
      }

      return true;
    });
  }, [activeCategory, userRole, searchTerm, resources]);

  const activeCategoryData = activeCategory === 'all' 
    ? { label: 'Vista General', description: 'Explora todos los recursos y actividades del colegio.' }
    : CATEGORIES.find(c => c.id === activeCategory);

  const canAddResources = userRole === UserRole.TEACHER || userRole === UserRole.AMPA;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        userRole={userRole || UserRole.PARENT} // Fallback for Guest view
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 transition-all duration-300 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-sm">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button 
              className="lg:hidden text-slate-500 hover:text-slate-700"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="relative flex-1 sm:w-96 group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar: 'Inglés', 'Excursión', 'Matemáticas'..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-xl text-sm transition-all outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            {userRole ? (
              <div className="flex items-center gap-3">
                 {canAddResources && (
                  <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
                  >
                    <Plus className="w-4 h-4" />
                    Nueva Actividad
                  </button>
                )}
                
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                  <div className="text-right hidden md:block">
                    <div className="text-xs font-bold text-slate-800">{userName}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide">{userRole}</div>
                  </div>
                  <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm">
                    {userName.charAt(0)}
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                    title="Cerrar Sesión"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Acceso Profesores / AMPA
              </button>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 lg:p-8 flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                {activeCategoryData?.label}
                {searchTerm && <span className="text-slate-400 font-light text-xl">/ Resultados de búsqueda</span>}
              </h1>
              <p className="text-slate-500 max-w-2xl">
                {searchTerm ? `Mostrando resultados para "${searchTerm}"` : activeCategoryData?.description}
              </p>
            </div>
            
            {/* Mobile Add Button */}
            {canAddResources && (
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="md:hidden w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" />
                Añadir Actividad
              </button>
            )}
          </div>

          {/* Resources Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <ResourceCard 
                  key={resource.id} 
                  resource={resource} 
                  currentUserRole={userRole || UserRole.PARENT}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">No se encontraron recursos</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-6">
                No hay actividades que coincidan con tu búsqueda "{searchTerm}" en esta categoría.
              </p>
              <button 
                onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
                className="text-blue-600 font-medium hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
        
        <footer className="p-6 border-t border-slate-200 text-center text-slate-400 text-sm bg-white">
          <p>© 2024 EduNexus. Plataforma Educativa Integral.</p>
        </footer>
      </main>

      {/* Floating AI Chat */}
      <AIChatAssistant userRole={userRole || UserRole.PARENT} />

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin}
      />
      
      {userRole && (
        <AddResourceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddResource}
          userRole={userRole}
        />
      )}
    </div>
  );
};

export default App;
