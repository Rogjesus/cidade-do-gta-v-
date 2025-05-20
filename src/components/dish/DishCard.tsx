import * as React from "react";

type DishCardProps = {
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    onPreview: () => void;
};

export function DishCard({ name, imageUrl, price, description, onPreview }: DishCardProps) {
    return (
        <gridLayout 
            className="bg-white rounded-lg shadow-sm m-2"
            rows="120, auto"
            onTap={onPreview}
        >
            <image 
                row="0" 
                src={imageUrl} 
                className="rounded-t-lg" 
                stretch="aspectFill" 
            />
            <stackLayout row="1" className="p-3">
                <label className="font-bold">{name}</label>
                <label className="text-gray-600 text-sm">{description}</label>
                <label className="text-green-600 font-bold">R$ {price.toFixed(2)}</label>
            </stackLayout>
        </gridLayout>
    );
}