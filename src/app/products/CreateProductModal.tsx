import React, {  useState } from "react";
import { v4 } from "uuid";

type ProductFormData = {
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

    return (
        <div></div>
    );
};

export default CreateProductModal;