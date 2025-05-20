import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { dishes } from "../../data/dishes";
import { DishCard } from "../dish/DishCard";
import { DishPreview } from "../dish/DishPreview";

type RestaurantScreenProps = {
    route: RouteProp<MainStackParamList, "Restaurant">,
    navigation: FrameNavigationProp<MainStackParamList, "Restaurant">,
};

export function RestaurantScreen({ route, navigation }: RestaurantScreenProps) {
    const [selectedDish, setSelectedDish] = React.useState<typeof dishes[0] | null>(null);
    const restaurantDishes = dishes.filter(dish => dish.restaurantId === route.params.id);

    return (
        <gridLayout rows="auto, *">
            <stackLayout row="0">
                <image src={route.params.imageUrl} className="w-full h-40" stretch="aspectFill" />
                <stackLayout className="p-4">
                    <label className="text-2xl font-bold">{route.params.name}</label>
                    <label className="text-gray-600">{route.params.cuisine}</label>
                    <label className="text-gray-600">{route.params.rating} ⭐ ({route.params.reviews} avaliações)</label>
                </stackLayout>
            </stackLayout>
            
            <scrollView row="1">
                <stackLayout className="p-4">
                    <label className="text-xl font-semibold mb-2">Cardápio</label>
                    <gridLayout columns="*, *">
                        {restaurantDishes.map(dish => (
                            <DishCard 
                                key={dish.id}
                                {...dish}
                                onPreview={() => setSelectedDish(dish)}
                            />
                        ))}
                    </gridLayout>
                </stackLayout>
            </scrollView>

            {selectedDish && (
                <DishPreview 
                    {...selectedDish}
                    onClose={() => setSelectedDish(null)}
                />
            )}
        </gridLayout>
    );
}