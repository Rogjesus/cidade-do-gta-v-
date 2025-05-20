import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Package, Truck, Zap, X, Building2, Car, Briefcase, DollarSign, Leaf, Sun, Wind } from 'lucide-react';
import useStore from '../store/useStore';

interface StoreProps {
  onClose: () => void;
}

interface StoreItem {
  id: number;
  name: string;
  price: number;
  type: 'resource' | 'vehicle' | 'booster';
  description: string;
  image: string;
}

const storeItems: StoreItem[] = [
  {
    id: 1,
    name: "Parque Solar Comunitário",
    price: 50000,
    type: 'resource',
    description: "Gera energia limpa para 1000 residências e cria empregos locais.",
    image: "https://images.pexels.com/photos/1570264/pexels-photo-1570264.jpeg"
  },
  {
    id: 2,
    name: "Frota de Ônibus Elétricos",
    price: 75000,
    type: 'vehicle',
    description: "Sistema de transporte público zero emissões.",
    image: "https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg"
  },
  {
    id: 3,
    name: "Centro de Reciclagem",
    price: 150000,
    type: 'resource',
    description: "Processa resíduos urbanos e gera materiais reciclados.",
    image: "https://images.pexels.com/photos/2529973/pexels-photo-2529973.jpeg"
  },
  {
    id: 4,
    name: "Smart Grid",
    price: 100000,
    type: 'booster',
    description: "Sistema inteligente de distribuição de energia.",
    image: "https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg"
  }
];

const Store: React.FC<StoreProps> = ({ onClose }) => {
  const { items, player, purchaseItem, addCoins } = useStore();
  const [selectedCategory, setSelectedCategory] = React.useState<'all' | 'resource' | 'vehicle' | 'booster'>('all');
  const [purchaseStatus, setPurchaseStatus] = React.useState<{ show: boolean; success: boolean; message: string }>({
    show: false,
    success: false,
    message: ''
  });

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.type === selectedCategory);

  const getCategoryIcon = (type: string) => {
    switch(type) {
      case 'resource': return <Leaf className="w-6 h-6" />;
      case 'vehicle': return <Truck className="w-6 h-6" />;
      case 'booster': return <Zap className="w-6 h-6" />;
      default: return null;
    }
  };

  const handlePurchase = (item: typeof items[0]) => {
    const success = purchaseItem(item.id);
    setPurchaseStatus({
      show: true,
      success,
      message: success ? `${item.name} adquirido com sucesso!` : 'Recursos insuficientes!'
    });
    setTimeout(() => setPurchaseStatus(prev => ({ ...prev, show: false })), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-blue-500">Loja de Projetos Sustentáveis</h2>
            <motion.div 
              className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Coins className="text-blue-500" />
              <span className="text-xl font-bold">{player.coins.toLocaleString()} RC</span>
            </motion.div>
          </div>

          {/* Categories */}
          <div className="p-4 border-b border-gray-800 flex gap-2 overflow-x-auto">
            {['all', 'resource', 'vehicle', 'booster'].map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category as typeof selectedCategory)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category === 'all' ? 'Todos' : 
                 category === 'resource' ? 'Recursos' :
                 category === 'vehicle' ? 'Transporte' : 'Tecnologia'}
              </motion.button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 px-3 py-1 rounded-full">
                    <div className="flex items-center gap-1">
                      <Coins className="w-4 h-4 text-blue-500" />
                      <span className="font-bold">{item.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(item.type)}
                    <h3 className="text-lg font-bold">{item.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePurchase(item)}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600 transition-colors"
                  >
                    Implementar
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Purchase Status Notification */}
          <AnimatePresence>
            {purchaseStatus.show && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className={`fixed bottom-4 right-4 p-4 rounded-lg ${
                  purchaseStatus.success ? 'bg-green-500' : 'bg-red-500'
                } text-white font-bold shadow-lg`}
              >
                {purchaseStatus.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Debug Controls (Remove in production) */}
          <div className="p-4 border-t border-gray-800">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addCoins(1000)}
              className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full hover:bg-gray-700"
            >
              + 1000 Recursos (Debug)
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Store;