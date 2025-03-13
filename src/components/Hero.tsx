import React from 'react';
import { Calendar, MapPin, Search } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-[600px] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl font-bold mb-6">General Express Voyages</h1>
          <p className="text-xl mb-8">Voyagez confortablement et en toute sécurité avec la première agence de transport interurbain VIP au Cameroun. Plus de 15 ans d'expérience à votre service.</p>
        </div>

        {/* Search Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Départ</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-[--primary]">
                  <option>Sélectionnez une ville</option>
                  <option>Douala</option>
                  <option>Yaoundé</option>
                  <option>Bafoussam</option>
                  <option>Dschang</option>
                  <option>Bamenda</option>
                  <option>Foumban</option>
                  <option>Kribi</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-[--primary]">
                  <option>Sélectionnez une ville</option>
                  <option>Douala</option>
                  <option>Yaoundé</option>
                  <option>Bafoussam</option>
                  <option>Dschang</option>
                  <option>Bamenda</option>
                  <option>Foumban</option>
                  <option>Kribi</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date de départ</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="date" 
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-[--primary]"
                />
              </div>
            </div>
          </div>

          <button className="w-full mt-6 btn-secondary flex items-center justify-center gap-2">
            <Search size={20} />
            Rechercher un voyage
          </button>
        </div>
      </div>
    </div>
  );
}