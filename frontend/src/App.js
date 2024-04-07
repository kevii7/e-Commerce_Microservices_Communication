import React, { useState, useEffect } from 'react';
// import './index.css';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [updateProductId, setUpdateProductId] = useState('');
  const [updateProductName, setUpdateProductName] = useState('');
  const [deleteProductId, setDeleteProductId] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;  // http://localhost:8000

  console.log("From Frontend =", apiUrl);  

  useEffect(() => {
    // fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch products: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newProductName }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to add product: ${response.status} ${response.statusText}`
        );
      }
      console.log('Product added successfully');
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products/${updateProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: updateProductName }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to update product: ${response.status} ${response.statusText}`
        );
      }
      console.log('Product updated successfully');
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products/${deleteProductId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(
          `Failed to delete product: ${response.status} ${response.statusText}`
        );
      }
      console.log('Product deleted successfully');
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const renderProducts = () => {
    return (
      <div className="product-list">
        <h2>Product List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="App">
      <header>
        <h1>Microservices E-commerce</h1>
      </header>
      <main>
        <div className="container">
          <section id="productActions">
            <div className="action">
              <h2 className="red-txt">Product Actions</h2>
              <button onClick={fetchData}>Get Products</button>
            </div>

            <div className="action">
              <h3 className="red-txt">Add New Products</h3>
              <div>
                <input
                  type="text"
                  value={newProductName}
                  onChange={e => setNewProductName(e.target.value)}
                  placeholder="Product name"
                />
                <button onClick={addProduct}>Add Product</button>
              </div>
            </div>

            <div className="action">
              <h3 className="red-txt">Update Products</h3>
              <div className="action">
                <div>
                  <label htmlFor="updateProductId">Product ID:</label>
                  <input
                    type="text"
                    value={updateProductId}
                    onChange={e => setUpdateProductId(e.target.value)}
                    placeholder="Product ID to update"
                  />
                </div>
                <div>
                  <label htmlFor="updateProductName">New Product:</label>
                  <input
                    type="text"
                    value={updateProductName}
                    onChange={e => setUpdateProductName(e.target.value)}
                    placeholder="New product name"
                  />
                </div>
                <button onClick={updateProduct}>Update Product</button>
              </div>
            </div>

            <div className="action">
              <h3 className="red-txt">Delete Products</h3>
              <div>
                <input
                  type="text"
                  value={deleteProductId}
                  onChange={e => setDeleteProductId(e.target.value)}
                  placeholder="Product ID to delete"
                />
                <button onClick={deleteProduct}>Delete Product</button>
              </div>
            </div>
          </section>
          <section id="productList">
            {renderProducts()}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
