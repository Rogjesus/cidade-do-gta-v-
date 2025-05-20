import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, MessageCircle, Share2, Download, Filter, TrendingUp, Star } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  author: string;
  vehicle: {
    brand: string;
    name: string;
    year: number;
  };
  image: string;
  likes: number;
  comments: number;
  downloads: number;
  tags: string[];
  createdAt: string;
}

interface CommunityGalleryProps {
  onClose: () => void;
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'JDM Killer',
    author: 'TunerPro',
    vehicle: {
      brand: 'Toyota',
      name: 'Supra',
      year: 2023
    },
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    likes: 1234,
    comments: 89,
    downloads: 567,
    tags: ['jdm', 'drift', 'widebody'],
    createdAt: '2024-03-15'
  },
  {
    id: '2',
    title: 'Electric Beast',
    author: 'TeslaFan',
    vehicle: {
      brand: 'Tesla',
      name: 'Model S',
      year: 2023
    },
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    likes: 856,
    comments: 45,
    downloads: 234,
    tags: ['electric', 'futuristic', 'performance'],
    createdAt: '2024-03-14'
  },
  {
    id: '3',
    title: 'Muscle Power',
    author: 'V8Lover',
    vehicle: {
      brand: 'Ford',
      name: 'Mustang GT',
      year: 2023
    },
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    likes: 987,
    comments: 67,
    downloads: 345,
    tags: ['muscle', 'drag', 'v8'],
    createdAt: '2024-03-13'
  }
];

export function CommunityGallery({ onClose }: CommunityGalleryProps) {
  const [selectedFilter, setSelectedFilter] = useState<'trending' | 'recent' | 'popular'>('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(new Set(galleryItems.flatMap(item => item.tags)));

  const filteredItems = galleryItems
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => item.tags.includes(tag));
      return matchesSearch && matchesTags;
    })
    .sort((a, b) => {
      switch (selectedFilter) {
        case 'trending':
          return b.likes - a.likes;
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'popular':
          return b.downloads - a.downloads;
        default:
          return 0;
      }
    });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <div className="bg-gray-900 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Galeria da Comunidade</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as typeof selectedFilter)}
              className="bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="trending">Em Alta</option>
              <option value="recent">Recentes</option>
              <option value="popular">Populares</option>
            </select>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTags(prev =>
                    prev.includes(tag)
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <div className="aspect-video relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-sm">
                    {item.vehicle.year}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-gray-400">
                        {item.vehicle.brand} {item.vehicle.name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                        <MessageCircle className="w-4 h-4" />
                        <span>{item.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                        <Download className="w-4 h-4" />
                        <span>{item.downloads}</span>
                      </button>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 