import { images } from './images';

export const dishes = [
    {
        id: "1",
        name: "Feijoada Completa",
        description: "Feijoada tradicional com arroz, couve e farofa",
        price: 45.90,
        imageUrl: images.restaurants.brazilian,
        restaurantId: "1"
    },
    {
        id: "2",
        name: "Pizza Margherita",
        description: "Molho de tomate, mussarela, manjericão fresco",
        price: 49.90,
        imageUrl: images.categories.pizza,
        restaurantId: "2"
    },
    {
        id: "3",
        name: "Combo Sushi",
        description: "20 peças variadas de sushi e sashimi",
        price: 89.90,
        imageUrl: images.categories.sushi,
        restaurantId: "3"
    }
];