import * as React from "react";
import { StyleSheet } from "react-nativescript";

type RestaurantCardProps = {
    name: string;
    cuisine: string;
    rating: number;
    reviews: number;
    imageUrl: string;
    onTap: () => void;
};

export function RestaurantCard({ name, cuisine, rating, reviews, imageUrl, onTap }: RestaurantCardProps) {
    return (
        <gridLayout 
            className="bg-white rounded-lg shadow-sm m-1"
            rows="120, auto"
            onTap={onTap}
        >
            <image row="0" src={imageUrl} className="rounded-t-lg" stretch="aspectFill" />
            <stackLayout row="1" className="p-2">
                <label className="font-bold">{name}</label>
                <label className="text-gray-600 text-sm">{cuisine}</label>
                <label className="text-gray-600 text-sm">{rating} ⭐ ({reviews})</label>
            </stackLayout>
        </gridLayout>
    );
}