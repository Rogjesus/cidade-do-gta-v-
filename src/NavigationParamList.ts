export type MainStackParamList = {
    Home: {};
    Restaurant: {
        id: string;
        name: string;
        cuisine: string;
        rating: number;
        reviews: number;
        imageUrl: string;
    };
    Chat: {};
    Cart: {};
    Profile: {};
};