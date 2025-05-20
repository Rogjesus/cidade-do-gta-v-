import { images } from './images';

export const restaurants = [
    {
        id: "1",
        name: "Sabor Brasileiro",
        cuisine: "Brasileira",
        rating: 4.8,
        reviews: 342,
        imageUrl: images.restaurants.brazilian,
        description: "A melhor comida brasileira da região"
    },
    {
        id: "2",
        name: "Pizza Express",
        cuisine: "Italiana",
        rating: 4.5,
        reviews: 189,
        imageUrl: images.restaurants.italian,
        description: "Pizzas artesanais com ingredientes importados"
    },
    {
        id: "3",
        name: "Sushi House",
        cuisine: "Japonesa",
        rating: 4.7,
        reviews: 256,
        imageUrl: images.restaurants.japanese,
        description: "O melhor da culinária japonesa"
    }
];

export const promotions = [
    {
        id: "1",
        title: "30% OFF",
        description: "Em todos os pratos japoneses",
        imageUrl: images.promotions.discount,
        validUntil: "2024-03-31"
    },
    {
        id: "2",
        title: "Frete Grátis",
        description: "Em pedidos acima de R$ 50",
        imageUrl: images.promotions.freeDelivery,
        validUntil: "2024-03-31"
    }
];

export const categories = [
    {
        id: "1",
        name: "Pizza",
        imageUrl: images.categories.pizza,
        count: 15
    },
    {
        id: "2",
        name: "Hambúrguer",
        imageUrl: images.categories.burger,
        count: 12
    },
    {
        id: "3",
        name: "Sushi",
        imageUrl: images.categories.sushi,
        count: 8
    },
    {
        id: "4",
        name: "Sobremesas",
        imageUrl: images.categories.dessert,
        count: 10
    }
];