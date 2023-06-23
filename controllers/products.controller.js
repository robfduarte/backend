let products = [];

export const getProducts = async () => {
    return products;
};

export const getProductById = async (id) => {
    return products.find((product) => product.id === id);
};

export const createProduct = async (productData) => {
    const newProduct = {
        id: Math.random().toString(),
        ...productData,
    };
    products.push(newProduct);
    return newProduct;
};

export const updateProduct = async (id, productData) => {
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
        const updatedProduct = {
            id,
            ...products[productIndex],
            ...productData,
        };
        products[productIndex] = updatedProduct;
        return updatedProduct;
    }
    return null;
};

export const deleteProduct = async (id) => {
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
        const deletedProduct = products.splice(productIndex, 1)[0];
        return deletedProduct;
    }
    return null;
};
