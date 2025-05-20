import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { restaurants, promotions, categories } from "../../data/mockData";
import { RestaurantCard } from "../RestaurantCard";
import { PromotionCard } from "../PromotionCard";
import { CategoryCard } from "../CategoryCard";

type HomeScreenProps = {
    route: RouteProp<MainStackParamList, "Home">,
    navigation: FrameNavigationProp<MainStackParamList, "Home">,
};

export function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <flexboxLayout style={styles.container}>
            <gridLayout rows="auto, *" className="w-full">
                <stackLayout row="0" className="mb-4">
                    <label className="text-2xl font-bold mb-2">FoodBuddy</label>
                    <searchBar 
                        hint="Buscar restaurantes e pratos..."
                        className="w-full"
                    />
                </stackLayout>

                <scrollView row="1">
                    <stackLayout>
                        <label className="text-xl font-semibold mb-2">Promoções</label>
                        <scrollView orientation="horizontal" className="mb-4">
                            <flexboxLayout className="flex-row">
                                {promotions.map((promotion) => (
                                    <PromotionCard key={promotion.id} {...promotion} />
                                ))}
                            </flexboxLayout>
                        </scrollView>

                        <label className="text-xl font-semibold mb-2">Restaurantes Populares</label>
                        <gridLayout columns="*, *" rows="auto" className="mb-4">
                            {restaurants.map((restaurant) => (
                                <RestaurantCard
                                    key={restaurant.id}
                                    {...restaurant}
                                    onTap={() => navigation.navigate("Restaurant", restaurant)}
                                />
                            ))}
                        </gridLayout>

                        <label className="text-xl font-semibold mb-2">Categorias</label>
                        <gridLayout columns="*, *" rows="auto, auto">
                            {categories.map((category) => (
                                <CategoryCard
                                    key={category.id}
                                    {...category}
                                    onTap={() => navigation.navigate("Restaurant", { 
                                        category: category.name 
                                    })}
                                />
                            ))}
                        </gridLayout>
                    </stackLayout>
                </scrollView>
            </gridLayout>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        padding: 16,
    },
});