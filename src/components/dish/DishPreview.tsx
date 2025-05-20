import * as React from "react";

type DishPreviewProps = {
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    onClose: () => void;
};

export function DishPreview({ name, imageUrl, price, description, onClose }: DishPreviewProps) {
    return (
        <absoluteLayout className="bg-black/50 w-full h-full">
            <gridLayout 
                className="bg-white rounded-lg m-4 p-4"
                rows="auto, auto, auto, auto"
                verticalAlignment="middle"
            >
                <image 
                    row="0" 
                    src={imageUrl} 
                    className="rounded-lg h-48 w-full mb-4" 
                    stretch="aspectFill" 
                />
                <label row="1" className="text-xl font-bold mb-2">{name}</label>
                <label row="2" className="text-gray-600 mb-4">{description}</label>
                <stackLayout row="3" orientation="horizontal">
                    <label className="text-lg font-bold text-green-600">R$ {price.toFixed(2)}</label>
                    <button 
                        className="bg-red-500 text-white rounded-lg px-4 py-2 ml-auto" 
                        text="Fechar"
                        onTap={onClose} 
                    />
                </stackLayout>
            </gridLayout>
        </absoluteLayout>
    );
}