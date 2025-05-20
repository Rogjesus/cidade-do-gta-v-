import * as React from "react";
import { StyleSheet } from "react-nativescript";

type PromotionCardProps = {
    title: string;
    description: string;
    imageUrl: string;
};

export function PromotionCard({ title, description, imageUrl }: PromotionCardProps) {
    return (
        <gridLayout 
            className="bg-white rounded-lg shadow-sm m-1 w-64"
            rows="100, auto"
        >
            <image row="0" src={imageUrl} className="rounded-t-lg" stretch="aspectFill" />
            <stackLayout row="1" className="p-2">
                <label className="font-bold text-lg">{title}</label>
                <label className="text-gray-600">{description}</label>
            </stackLayout>
        </gridLayout>
    );
}