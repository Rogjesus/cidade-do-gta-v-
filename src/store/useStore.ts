import { create } from 'zustand';

interface StoreItem {
  id: number;
  name: string;
  price: number;
  type: 'resource' | 'vehicle' | 'booster';
  description: string;
  image: string;
}

interface Player {
  coins: number;
  inventory: number[];
}

interface StoreState {
  items: StoreItem[];
  player: Player;
  purchaseItem: (itemId: number) => boolean;
  addCoins: (amount: number) => void;
}

const initialItems: StoreItem[] = [
  {
    id: 1,
    name: "Pequena Loja",
    price: 50000,
    type: 'resource',
    description: "Uma pequena loja de conveniência que gera renda passiva.",
    image: "https://images.pexels.com/photos/1570264/pexels-photo-1570264.jpeg"
  },
  {
    id: 2,
    name: "Veículo de Entrega",
    price: 75000,
    type: 'vehicle',
    description: "Veículo especializado para missões de entrega.",
    image: "https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg"
  },
  {
    id: 3,
    name: "Escritório",
    price: 150000,
    type: 'resource',
    description: "Escritório para gerenciar seus negócios.",
    image: "https://images.pexels.com/photos/2529973/pexels-photo-2529973.jpeg"
  },
  {
    id: 4,
    name: "Investimento Inicial",
    price: 100000,
    type: 'booster',
    description: "Pacote de investimentos para iniciar sua jornada.",
    image: "https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg"
  }
];

const useStore = create<StoreState>((set) => ({
  items: initialItems,
  player: {
    coins: 1000,
    inventory: []
  },
  purchaseItem: (itemId) => {
    let success = false;
    set((state) => {
      const item = state.items.find(i => i.id === itemId);
      if (item && state.player.coins >= item.price) {
        success = true;
        return {
          player: {
            coins: state.player.coins - item.price,
            inventory: [...state.player.inventory, itemId]
          }
        };
      }
      return state;
    });
    return success;
  },
  addCoins: (amount) => {
    set((state) => ({
      player: {
        ...state.player,
        coins: state.player.coins + amount
      }
    }));
  }
}));

export default useStore;