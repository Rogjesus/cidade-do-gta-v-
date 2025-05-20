import * as React from "react";

type CategoryCardProps = {
    name: string;
    imageUrl: string;
    count: number;
    onTap: () => void;
};

export function CategoryCard({ name, imageUrl, count, onTap }: CategoryCardProps) {
    return (
        <gridLayout 
            className="bg-white rounded-lg shadow-sm m-1 h-24"
            rows="*, auto"
            onTap={onTap}
        >
            <image 
                row="0" 
                src={imageUrl} 
                className="rounded-t-lg opacity-80" 
                stretch="aspectFill" 
            />
            <stackLayout row="1" className="p-2 bg-black/50 absolute bottom-0 w-full">
                <label className="text-white font-bold text-center">{name}</label>
                <label className="text-white text-xs text-center">{count} lugares</label>
            </stackLayout>
        </gridLayout>
    );
}