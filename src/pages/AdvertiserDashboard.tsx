import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CATEGORY_ICONS } from '../constants';
import { Category, PlanType, Place } from '../types';
import { LayoutDashboard, Store, CreditCard, LogOut, Upload, Eye, MousePointer } from 'lucide-react';
import { GeminiDescriber } from '../components/GeminiDescriber';
import { usePlaces } from '../contexts/PlacesContext';

const MOCK_STATS = [
  { name: 'Seg', views: 400 },
  { name: 'Ter', views: 300 },
  { name: 'Qua', views: 550 },
  { name: 'Qui', views: 450 },
  { name: 'Sex', views: 800 },
  { name: 'Sáb', views: 1200 },
  { name: 'Dom', views: 1000 },
];

export const AdvertiserDashboard: React.FC = () => {
  const { places, updatePlace, currentPlaceId, setCurrentPlaceId } = usePlaces();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'edit' | 'finance'>('dashboard');
  
  // If no user is logged in (accessed directly), pick the first place for demo.
  // In a real app, this would redirect to login.
  const initialPlace = places.find(p => p.id === currentPlaceId) || places[0];
  const [editingPlace, setEditingPlace] = useState<Place>(initialPlace);

  useEffect(() => {
    // If the places list updates (e.g. initial load), ensure we have the correct data
    const current = places.find(p => p.id === (currentPlaceId || places[0].id));
    if (current) setEditingPlace(current);
  }, [places, currentPlaceId]);

  const handleLogout = () => {
    setCurrentPlaceId(null);
    window.location.hash = '#/advertiser/login';
  };

  const handleSave = () => {
    updatePlace(editingPlace);
    alert("Alterações salvas e publicadas no mapa com sucesso!");
    setActiveTab('dashboard');
  };

  const handleAIUpdate = (desc: string) => {
    setEditingPlace({...editingPlace, description: desc});
  };

  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-6">
           <h2 className="text-2xl font-serif font-bold text-blue-900">Explore Paraty</h2>
           <span className="text-xs text-gray-500 uppercase tracking-wider">Painel do Parceiro</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('edit')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'edit' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Store className="w-5 h-5" /> Meu Estabelecimento
          </button>
          <button 
            onClick={() => setActiveTab('finance')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'finance' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <CreditCard className="w-5 h-5" /> Financeiro
          </button>
        </nav>

        <div className="p-4 border-t">
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium">
            <LogOut className="w-5 h-5" /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        
        {/* Mobile Header (visible only on small screens) */}
        <div className="md:hidden mb-6 flex justify-between items-center">
           <h1 className="text-xl font-bold">Painel</h1>
           <button onClick={handleLogout} className="text-red-600"><LogOut /></button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-900">Olá, {editingPlace.name}!</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><Eye /></div>
                  <div>
                    <p className="text-sm text-gray-500">Visualizações (30 dias)</p>
                    <p className="text-2xl font-bold text-gray-900">4,700</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 text-green-600 rounded-full"><MousePointer /></div>
                  <div>
                    <p className="text-sm text-gray-500">Cliques no QR Code</p>
                    <p className="text-2xl font-bold text-gray-900">328</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-full"><Store /></div>
                  <div>
                    <p className="text-sm text-gray-500">Plano Atual</p>
                    <p className="text-2xl font-bold text-gray-900">{editingPlace.plan}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-6">Acessos por Dia</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_STATS}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'edit' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-900">Editar Estabelecimento</h1>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Local</label>
                  <input 
                    type="text" 
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={editingPlace.name}
                    onChange={(e) => setEditingPlace({...editingPlace, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                  <select 
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={editingPlace.category}
                    onChange={(e) => setEditingPlace({...editingPlace, category: e.target.value as Category})}
                  >
                    {(Object.values(Category) as string[]).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea 
                  rows={4} 
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editingPlace.description}
                  onChange={(e) => setEditingPlace({...editingPlace, description: e.target.value})}
                />
                <GeminiDescriber 
                  initialName={editingPlace.name} 
                  category={editingPlace.category} 
                  onDescriptionGenerated={handleAIUpdate}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                    <input 
                      type="text" 
                      className="w-full border rounded-lg p-2"
                      value={editingPlace.phone}
                      onChange={(e) => setEditingPlace({...editingPlace, phone: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input 
                      type="text" 
                      className="w-full border rounded-lg p-2"
                      value={editingPlace.website || ''}
                      onChange={(e) => setEditingPlace({...editingPlace, website: e.target.value})}
                    />
                 </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mídias</label>
                <div className="grid grid-cols-3 gap-4">
                  {editingPlace.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img src={img} alt="Preview" className="w-full h-full object-cover" />
                      <button className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs">X</button>
                    </div>
                  ))}
                  <button className="aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition">
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-xs">Adicionar Foto</span>
                  </button>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button 
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-lg"
                >
                  Salvar Alterações
                </button>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="space-y-6 animate-fade-in">
             <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <h3 className="font-bold mb-4">Plano Atual</h3>
               <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div>
                    <h4 className="text-lg font-bold text-blue-900">Plano Premium</h4>
                    <p className="text-sm text-blue-700">R$ 129,00 / mês</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">Ativo</span>
               </div>
               
               <h3 className="font-bold mt-8 mb-4">Histórico de Faturas</h3>
               <table className="w-full text-left">
                  <thead>
                    <tr className="border-b text-gray-500 text-sm">
                      <th className="py-2">Data</th>
                      <th className="py-2">Valor</th>
                      <th className="py-2">Status</th>
                      <th className="py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b">
                      <td className="py-3">01/10/2023</td>
                      <td>R$ 129,00</td>
                      <td><span className="text-green-600 font-medium">Pago</span></td>
                      <td className="text-right"><button className="text-blue-600 text-sm">PDF</button></td>
                    </tr>
                     <tr className="border-b">
                      <td className="py-3">01/09/2023</td>
                      <td>R$ 129,00</td>
                      <td><span className="text-green-600 font-medium">Pago</span></td>
                      <td className="text-right"><button className="text-blue-600 text-sm">PDF</button></td>
                    </tr>
                  </tbody>
               </table>
             </div>
          </div>
        )}

      </main>
    </div>
  );
};