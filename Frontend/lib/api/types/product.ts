// Define the Product type
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    inStock: boolean;
}

// Example function to get products
export const getProducts = async (): Promise<Product[]> => {
    // Placeholder for fetching products
    return [
        { id: 1, name: 'Product 1', description: 'Description 1', price: 100, inStock: true },
        { id: 2, name: 'Product 2', description: 'Description 2', price: 150, inStock: false },
    ];
}; 