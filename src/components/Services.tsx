import React from 'react';
import { Bus, Clock, Shield, MapPin, Phone, CreditCard } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Bus className="w-8 h-8" />,
      title: "Transport VIP",
      description: "Voyagez dans le confort absolu avec nos bus climatisés et sièges spacieux"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Ponctualité",
      description: "Départs réguliers et respect strict des horaires"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sécurité",
      description: "Votre sécurité est notre priorité avec des chauffeurs expérimentés"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Large Couverture",
      description: "Desservant les principales villes du Cameroun"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Support 24/7",
      description: "Une équipe à votre écoute pour toute assistance"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Paiement Sécurisé",
      description: "Réservez en ligne en toute sécurité"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez pourquoi General Express est le leader du transport VIP au Cameroun depuis plus de 15 ans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-[--primary] mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}