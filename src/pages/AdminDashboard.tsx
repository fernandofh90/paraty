import React from 'react';
import { Users, Monitor, Video, BarChart2 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Administração</h1>
            <p className="text-gray-500">Explore Paraty - Super Admin</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow text-sm font-bold text-gray-700">
            Admin: Root
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Users className="w-6 h-6" /></div>
              <h3 className="font-bold text-gray-700">Anunciantes</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">24</p>
            <p className="text-xs text-green-600 mt-1">+2 novos esta semana</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Monitor className="w-6 h-6" /></div>
              <h3 className="font-bold text-gray-700">Totens Ativos</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">5</p>
            <p className="text-xs text-gray-500 mt-1">Todos online</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer">
             <div className="flex items-center gap-4 mb-2">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Video className="w-6 h-6" /></div>
              <h3 className="font-bold text-gray-700">Ads Rodapé</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">12</p>
            <p className="text-xs text-gray-500 mt-1">Rotação: 5s</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer">
             <div className="flex items-center gap-4 mb-2">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg"><BarChart2 className="w-6 h-6" /></div>
              <h3 className="font-bold text-gray-700">Receita Mensal</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">R$ 4.2k</p>
            <p className="text-xs text-green-600 mt-1">+15% vs mês anterior</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Últimos Anunciantes Cadastrados</h3>
            <button className="text-blue-600 text-sm font-medium hover:underline">Ver Todos</button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">Nome</th>
                <th className="px-6 py-3">Plano</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-6 py-4">Pousada Recanto</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-bold">Premium</span></td>
                <td className="px-6 py-4"><span className="text-green-600 text-sm font-medium">Aprovado</span></td>
                <td className="px-6 py-4"><button className="text-gray-400 hover:text-blue-600">Editar</button></td>
              </tr>
              <tr>
                <td className="px-6 py-4">Restaurante do João</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-bold">Básico</span></td>
                <td className="px-6 py-4"><span className="text-orange-500 text-sm font-medium">Pendente</span></td>
                <td className="px-6 py-4"><button className="text-blue-600 font-bold text-sm">Aprovar</button></td>
              </tr>
              <tr>
                <td className="px-6 py-4">Passeios Barco Azul</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-bold">Intermed.</span></td>
                <td className="px-6 py-4"><span className="text-green-600 text-sm font-medium">Aprovado</span></td>
                <td className="px-6 py-4"><button className="text-gray-400 hover:text-blue-600">Editar</button></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
