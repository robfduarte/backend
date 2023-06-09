import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getProductById(productId) {
        const products = await this.getProducts();
        const product = products.find((p) => p.id === productId);

        if (!product) {
            throw new Error(`Product with ID ${productId} not found`);
        }

        return product;
    }

    async saveProducts(products) {
        await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8');
    }
}

export default ProductManager;
