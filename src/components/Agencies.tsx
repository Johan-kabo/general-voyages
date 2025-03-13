import React, { useEffect, useRef, useState } from 'react';
import { Phone, Mail, Clock, MapPin, MessageCircle, Star, Quote } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';
import toast from 'react-hot-toast';

interface Agency {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  services: string[];
  image: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const agencies: Agency[] = [
  {
    name: 'General Express - Douala Bonanjo',
    address: 'Rue Joffre, Ancien Dalip, Bonanjo, Douala',
    phone: '+237 233 506 627',
    email: 'contact@generalexpressvoyages.com',
    hours: 'Lundi - Samedi: 6h00 - 18h00',
    services: [
      'Réservation de billets',
      'Service client',
      'Modification de réservation',
      'Informations voyages'
    ],
    image: 'https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?q=80&w=2069',
    location: {
      lat: 4.0429408,
      lng: 9.6849145
    }
  },
  {
    name: 'General Express - Yaoundé',
    address: 'Avenue Kennedy, Face BICEC Centrale, Yaoundé',
    phone: '+237 222 231 234',
    email: 'yaounde@generalexpressvoyages.com',
    hours: 'Lundi - Samedi: 6h00 - 18h00',
    services: [
      'Réservation de billets',
      'Service client',
      'Modification de réservation',
      'Informations voyages'
    ],
    image: 'https://images.unsplash.com/photo-1623088860472-ef9fd5644049?q=80&w=2069',
    location: {
      lat: 3.8666667,
      lng: 11.5166667
    }
  },
  {
    name: 'General Express - Bafoussam',
    address: 'Face Hotel Zingana, Bafoussam',
    phone: '+237 233 445 566',
    email: 'bafoussam@generalexpressvoyages.com',
    hours: 'Lundi - Samedi: 6h00 - 18h00',
    services: [
      'Réservation de billets',
      'Service client',
      'Modification de réservation',
      'Informations voyages'
    ],
    image: 'https://images.unsplash.com/photo-1621955964441-c173e01c135b?q=80&w=2070',
    location: {
      lat: 5.4666667,
      lng: 10.4166667
    }
  }
];

const testimonials: Testimonial[] = [
  {
    name: 'Marie Kouam',
    role: 'Cliente régulière',
    content: 'Le service à l\'agence de Douala est exceptionnel. Le personnel est toujours souriant et professionnel.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2076'
  },
  {
    name: 'Jean Fotso',
    role: 'Voyageur d\'affaires',
    content: 'Je voyage régulièrement avec General Express. La possibilité de modifier mes réservations en agence est un grand plus.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070'
  },
  {
    name: 'Sophie Ndam',
    role: 'Étudiante',
    content: 'Les agents sont très serviables et m\'ont aidée à trouver les meilleurs tarifs pour mes voyages.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070'
  }
];

export default function Agencies() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [message, setMessage] = useState('');
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const loadMap = async () => {
      try {
        setMapError(true);
      } catch (error) {
        console.error('Error loading map:', error);
        setMapError(true);
      }
    };

    loadMap();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Message submitted:', { agency: selectedAgency?.name, message });
    setMessage('');
    setSelectedAgency(null);
  };

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Nos Agences</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            General Express dispose d'un réseau d'agences à travers le Cameroun pour vous offrir un service de proximité.
            Nos équipes sont à votre disposition pour vous accompagner dans tous vos besoins de voyage.
          </p>
        </div>

        {mapError ? (
          <div className="mb-16 rounded-xl overflow-hidden shadow-lg bg-gray-100 p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Nos Emplacements</h2>
            <p className="text-gray-600 mb-4">
              Retrouvez nos agences dans les villes principales du Cameroun:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {agencies.map((agency, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold mb-2">{agency.name}</h3>
                  <p className="text-sm text-gray-600">{agency.address}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-16 rounded-xl overflow-hidden shadow-lg">
            <div ref={mapRef} className="w-full h-[400px]" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {agencies.map((agency, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div 
                className="h-48 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${agency.image})` }}
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{agency.name}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[--primary] mt-1" />
                    <p className="text-gray-600">{agency.address}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[--primary]" />
                    <a href={`tel:${agency.phone}`} className="text-gray-600 hover:text-[--primary]">
                      {agency.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[--primary]" />
                    <a href={`mailto:${agency.email}`} className="text-gray-600 hover:text-[--primary]">
                      {agency.email}
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[--primary] mt-1" />
                    <p className="text-gray-600">{agency.hours}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Services disponibles:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {agency.services.map((service, idx) => (
                      <li key={idx}>{service}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex gap-3">
                  <a 
                    href={`tel:${agency.phone}`}
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Appeler
                  </a>
                  <a 
                    href={`https://wa.me/${agency.phone.replace(/\s+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-secondary flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>

                <button
                  onClick={() => setSelectedAgency(agency)}
                  className="w-full mt-3 text-[--primary] hover:text-[--primary-dark] font-medium"
                >
                  Poser une question
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Avis de nos clients</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="relative">
                  <Quote className="w-8 h-8 text-gray-200 absolute -top-4 -left-4" />
                  <p className="text-gray-600 relative z-10">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Questions Fréquentes</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Peut-on modifier une réservation en agence ?</h3>
              <p className="text-gray-600">
                Oui, vous pouvez modifier votre réservation directement en agence. Présentez-vous avec votre billet ou votre numéro de réservation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Quels documents apporter ?</h3>
              <p className="text-gray-600">
                Pour toute transaction, munissez-vous d'une pièce d'identité valide. Pour les modifications, apportez également votre billet.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Quels moyens de paiement sont acceptés ?</h3>
              <p className="text-gray-600">
                Nous acceptons les paiements en espèces, par carte bancaire, et via les services de mobile money (Orange Money, MTN Mobile Money).
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Faut-il réserver à l'avance ?</h3>
              <p className="text-gray-600">
                Il est recommandé de réserver à l'avance, particulièrement pendant les périodes de forte affluence. Vous pouvez réserver jusqu'à 30 minutes avant le départ, selon les disponibilités.
              </p>
            </div>
          </div>
        </div>

        {selectedAgency && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold mb-4">
                Contacter {selectedAgency.name}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Votre message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-[--primary]"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedAgency(null)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}