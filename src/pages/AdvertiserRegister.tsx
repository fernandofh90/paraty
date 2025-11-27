import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, MapPin, Phone, User, ArrowLeft } from 'lucide-react';
import { Category } from '../types';
import { usePlaces } from '../contexts/PlacesContext';

export const AdvertiserRegister: React.FC = () => {
  const navigate = useNavigate();
  const { addPlace } = usePlaces();
  const [formData, setFormData] = useState({
    name: '',
    category: Category.RESTAURANT,
    address: '',
    phone: '',
    description: '',
    whatsapp: '',
    website: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Register the place in context
    addPlace({
      name: formData.name,
      category: formData.category,
      address: formData.address,
      phone: formData.phone,
      description: formData.description || `Bem-vindo ao ${formData.name}. O melhor lugar de Paraty!`,
      whatsapp: formData.whatsapp,
      website: formData.website
    });

    // Navigate to dashboard to finish setup
    navigate('/advertiser/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-white relative">
          <button 
            onClick={() => navigate('/advertiser/login')}
            className="absolute top-6 left-6 text-blue-100 hover:text-white transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-center mt-2">
            <h1 className="text-2xl font-bold font-serif">Cadastre seu Negócio</h1>
            <p className="text-blue-100 text-sm mt-1">Apareça no mapa para milhares de turistas</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Estabelecimento</label>
            <div className="relative">
              <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                required
                type="text" 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex: Restaurante Caiçara"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as Category})}
              >
                {(Object.values(Category) as string[]).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="(24) 9999-9999"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                required
                type="text" 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Rua, Número - Bairro"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-1">O pino será criado automaticamente próximo ao centro.</p>
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg shadow-green-200 flex items-center justify-center gap-2"
          >
            Criar Minha Conta Grátis
          </button>

          <p className="text-xs text-center text-gray-400">
            Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.
          </p>
        </form>
      </div>
    </div>
  );
};