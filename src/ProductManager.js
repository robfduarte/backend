const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      id: this.generateUniqueId(products),
      ...product
    };
    products.push(newProduct);
    this.saveProducts(products);
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    const product = products.find(product => product.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found.`);
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updatedFields };
      this.saveProducts(products);
    }
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    this.saveProducts(updatedProducts);
  }

  generateUniqueId(products) {
    let id = 1;
    while (products.some(product => product.id === id)) {
      id++;
    }
    return id;
  }

  saveProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products), 'utf-8');
  }
}

module.exports = ProductManager;

// Ejemplo de uso
const productManager = new ProductManager('products.json');

// Obtener productos (debe devolver un arreglo vacío)
console.log(productManager.getProducts()); // []

// Agregar un producto
productManager.addProduct({
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25
});

// Obtener productos (ahora debe aparecer el producto recién agregado)
console.log(productManager.getProducts());

// Obtener producto por ID
const productId = 1; // ID del producto agregado
console.log(productManager.getProductById(productId));

// Actualizar producto
const updatedFields = { price: 250, stock: 30 };
productManager.updateProduct(productId, updatedFields);
console.log(productManager.getProductById(productId));

// Eliminar producto
productManager.deleteProduct(productId);
console.log(productManager.getProducts());



