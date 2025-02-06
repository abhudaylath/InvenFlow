import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "@/app/(Components)/Header";
import { useAppSelector } from "../redux";

type ProductFormData = {
    productId: string; // Include productId
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
};

type CreateProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({
    isOpen,
    onClose,
    onCreate,
}: CreateProductModalProps) => {
    // Define the initial state
    const initialFormData: ProductFormData = {
        productId: v4(),
        name: "",
        price: 0,
        stockQuantity: 0,
        rating: 0,
    };
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    
    const [formData, setFormData] = useState<ProductFormData>(initialFormData);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:
                name === "price" || name === "stockQuantity" || name === "rating"
                    ? value === "" ? 0 : parseFloat(value) // Handle empty input
                    : value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreate(formData); // Pass the complete formData including productId
        setFormData(initialFormData); // Reset form data to initial values
        onClose();
    };

    const handleCancel = () => {
        setFormData(initialFormData); // Reset form data to initial values
        onClose();
    };

    if (!isOpen) return null;

    const labelCssStyles = `block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`
    const inputCssStyles = `block w-full mb-2 p-2 border-gray-500 border-2 rounded-md ${isDarkMode ? 'text-white' : 'text-gray-700'}`;
    const buttonCssStyles = `mt-4 px-4 py-2 rounded ${isDarkMode ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-500 text-white hover:bg-blue-700'}`;
    const cancelButtonCssStyles = `ml-2 px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-800' : 'bg-gray-500 text-white hover:bg-gray-700'}`;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Create New Product" />
                <form onSubmit={handleSubmit} className="mt-5">
                    {/* PRODUCT NAME */}
                    <label htmlFor="productName" className={labelCssStyles}>
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        value={formData.name}
                        className={inputCssStyles}
                        required
                    />

                    {/* PRICE */}
                    <label htmlFor="productPrice" className={labelCssStyles}>
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        onChange={handleChange}
                        value={formData.price || ""} // Convert to string
                        className={inputCssStyles}
                        required
                    />

                    {/* STOCK QUANTITY */}
                    <label htmlFor="stockQuantity" className={labelCssStyles}>
                        Stock Quantity
                    </label>
                    <input
                        type="number"
                        name="stockQuantity"
                        placeholder="Stock Quantity"
                        onChange={handleChange}
                        value={formData.stockQuantity || ""} // Convert to string
                        className={inputCssStyles}
                        required
                    />

                    {/* RATING */}
                    <label htmlFor="rating" className={labelCssStyles}>
                        Rating
                    </label>
                    <input
                        type="number"
                        name="rating"
                        placeholder="Rating"
                        onChange={handleChange}
                        value={formData.rating || ""} // Convert to string
                        className={inputCssStyles}
                        required
                    />

                    {/* CREATE ACTIONS */}
                    <button
                        type="submit"
                        className={buttonCssStyles}
                    >
                        Create
                    </button>
                    <button
                        onClick={handleCancel} // Use handleCancel for the Cancel button
                        type="button"
                        className={cancelButtonCssStyles}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProductModal;