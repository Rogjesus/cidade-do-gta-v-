import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, Car, Star, TrendingUp } from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  brand: string;
  year: number;
  type: 'sports' | 'muscle' | 'jdm' | 'suv' | 'electric' | 'classic' | 'hatchback';
  basePrice: number;
  image: string;
  modifications: {
    body: string[];
    paint: string[];
    wheels: string[];
    performance: string[];
    lighting: string[];
  };
  currentMods: {
    body?: string;
    paint?: string;
    wheels?: string;
    performance?: string;
    lighting?: string;
  };
}

interface VehicleDatabaseProps {
  onSelect: (vehicle: Vehicle) => void;
  onClose: () => void;
}

const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Bravo T-Jet',
    brand: 'Fiat',
    year: 2012,
    type: 'hatchback',
    basePrice: 45000,
    image: 'https://quatrorodas.abril.com.br/wp-content/uploads/2016/11/qr-677-fiat-bravo-teste-01.jpg',
    modifications: {
      body: [
        'Kit Esportivo Original',
        'Spoiler Traseiro',
        'Saia Lateral',
        'Para-choque Dianteiro Esportivo',
        'Para-choque Traseiro Esportivo'
      ],
      paint: [
        'Vermelho Racing',
        'Preto Perolado',
        'Branco Glacier',
        'Prata Metálico',
        'Azul Racing'
      ],
      wheels: [
        'Rodas 17" Esportivas',
        'Rodas 18" Racing',
        'Rodas 16" Originais',
        'Rodas 17" Multiraio',
        'Rodas 18" Forjadas'
      ],
      performance: [
        'Remap Stage 1',
        'Escape Esportivo',
        'Filtro de Ar Esportivo',
        'Suspensão Esportiva',
        'Freios a Disco Maiores'
      ],
      lighting: [
        'Faróis LED',
        'Luzes de Neón',
        'Lanternas LED',
        'Luzes de Ambiente',
        'Faróis de Neblina LED'
      ]
    },
    currentMods: {}
  },
  {
    id: '2',
    name: 'Supra',
    brand: 'Toyota',
    year: 2023,
    type: 'jdm',
    basePrice: 450000,
    image: 'https://quatrorodas.abril.com.br/wp-content/uploads/2023/03/toyota-supra-2023-1.jpg',
    modifications: {
      body: [
        'Kit Widebody',
        'Spoiler GT',
        'Saia Lateral Racing',
        'Para-choque Dianteiro GT',
        'Para-choque Traseiro GT'
      ],
      paint: [
        'Laranja Racing',
        'Preto Perolado',
        'Branco Glacier',
        'Prata Metálico',
        'Azul Racing'
      ],
      wheels: [
        'Rodas 19" Esportivas',
        'Rodas 20" Racing',
        'Rodas 18" Originais',
        'Rodas 19" Multiraio',
        'Rodas 20" Forjadas'
      ],
      performance: [
        'Remap Stage 2',
        'Escape Esportivo',
        'Turbina Maior',
        'Suspensão Esportiva',
        'Freios a Disco Maiores'
      ],
      lighting: [
        'Faróis LED',
        'Luzes de Neón',
        'Lanternas LED',
        'Luzes de Ambiente',
        'Faróis de Neblina LED'
      ]
    },
    currentMods: {}
  },
  {
    id: '3',
    name: 'Model S',
    brand: 'Tesla',
    year: 2023,
    type: 'electric',
    basePrice: 550000,
    image: 'https://quatrorodas.abril.com.br/wp-content/uploads/2023/03/tesla-model-s-2023-1.jpg',
    modifications: {
      body: [
        'Kit Aerodinâmico',
        'Spoiler Traseiro',
        'Saia Lateral',
        'Para-choque Dianteiro Esportivo',
        'Para-choque Traseiro Esportivo'
      ],
      paint: [
        'Vermelho Racing',
        'Preto Perolado',
        'Branco Glacier',
        'Prata Metálico',
        'Azul Racing'
      ],
      wheels: [
        'Rodas 21" Esportivas',
        'Rodas 22" Racing',
        'Rodas 20" Originais',
        'Rodas 21" Multiraio',
        'Rodas 22" Forjadas'
      ],
      performance: [
        'Software Performance',
        'Suspensão Esportiva',
        'Freios a Disco Maiores',
        'Pneus Slick',
        'Aerodinâmica Aprimorada'
      ],
      lighting: [
        'Faróis LED',
        'Luzes de Neón',
        'Lanternas LED',
        'Luzes de Ambiente',
        'Faróis de Neblina LED'
      ]
    },
    currentMods: {}
  },
  {
    id: '4',
    name: '911 GT3',
    brand: 'Porsche',
    year: 2023,
    type: 'sports',
    basePrice: 850000,
    image: 'https://quatrorodas.abril.com.br/wp-content/uploads/2023/03/porsche-911-gt3-2023-1.jpg',
    modifications: {
      body: [
        'Kit GT3 RS',
        'Spoiler Traseiro GT',
        'Saia Lateral Racing',
        'Para-choque Dianteiro GT',
        'Para-choque Traseiro GT'
      ],
      paint: [
        'Vermelho Racing',
        'Preto Perolado',
        'Branco Glacier',
        'Prata Metálico',
        'Azul Racing'
      ],
      wheels: [
        'Rodas 20" Esportivas',
        'Rodas 21" Racing',
        'Rodas 19" Originais',
        'Rodas 20" Multiraio',
        'Rodas 21" Forjadas'
      ],
      performance: [
        'Remap Stage 3',
        'Escape Esportivo',
        'Suspensão Esportiva',
        'Freios a Disco Maiores',
        'Pneus Slick'
      ],
      lighting: [
        'Faróis LED',
        'Luzes de Neón',
        'Lanternas LED',
        'Luzes de Ambiente',
        'Faróis de Neblina LED'
      ]
    },
    currentMods: {}
  }
];

export function VehicleDatabase({ onSelect, onClose }: VehicleDatabaseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<Vehicle['type'] | 'all'>('all');
  const [sortBy, setSortBy] = useState<'price' | 'year' | 'popularity'>('popularity');

  const filteredVehicles = vehicles
    .filter(vehicle => {
      const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || vehicle.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.basePrice - a.basePrice;
        case 'year':
          return b.year - a.year;
        case 'popularity':
          return Math.random() - 0.5; // Simulated popularity
        default:
          return 0;
      }
    });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-gray-900 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Garagem</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar veículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as Vehicle['type'] | 'all')}
            className="bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os Tipos</option>
            <option value="sports">Esportivos</option>
            <option value="muscle">Muscle Cars</option>
            <option value="jdm">JDM</option>
            <option value="suv">SUV</option>
            <option value="electric">Elétricos</option>
            <option value="classic">Clássicos</option>
            <option value="hatchback">Hatchback</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="popularity">Popularidade</option>
            <option value="price">Preço</option>
            <option value="year">Ano</option>
          </select>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map(vehicle => (
            <motion.div
              key={vehicle.id}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => {
                onSelect(vehicle);
                onClose();
              }}
            >
              <div className="aspect-video relative">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-sm">
                  {vehicle.year}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{vehicle.brand}</h3>
                    <p className="text-gray-400">{vehicle.name}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">4.8</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-500 font-bold">
                    R$ {vehicle.basePrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400">
                    {vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 