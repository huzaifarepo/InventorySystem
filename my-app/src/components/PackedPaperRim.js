


// PackedPaperRim.js
import '../componenet_styling/MainScreen.css';
import React, { useState } from 'react';

import { useSavePackedPaperRimMutation, useGetPackedPaperRimsQuery } from '../RTKQuery/Slices/Paked_Paper_Rim_Slice';

function PackedPaperRim() {
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    productName: '',
    size: '',
    gram: '',
    quantity: '',
    customer: '',
    inUse: '',
    remaining: ''
  });

  const [saveProduct, { isLoading: isSaving, isError: saveError, error: saveErrorObj }] = useSavePackedPaperRimMutation();
  const { data: products, isLoading: isFetching, isError: fetchError, refetch } = useGetPackedPaperRimsQuery();

  const handleAddProductClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === 'quantity' || name === 'inUse') {
      const quantity = parseInt(name === 'quantity' ? value : updatedFormData.quantity) || 0;
      const inUse = parseInt(name === 'inUse' ? value : updatedFormData.inUse) || 0;
      updatedFormData.remaining = Math.max(quantity - inUse, 0);
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveProduct(formData).unwrap();
      console.log('Product data submitted:', formData);
      setShowForm(false);
      setFormData({
        productName: '',
        size: '',
        gram: '',
        quantity: '',
        customer: '',
        inUse: '',
        remaining: ''
      });
      refetch();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <h2>Inventory Options</h2>
        <ul className="options-list">
          <li className="highlight">Packed Paper Rims</li>
          <li>Rolled Paper Rim</li>
          <li>Packed Card</li>
          <li>Paper Rim Title Card</li>
          <li>Final Goods</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="header">
          <h1 className="heading-name">Packed Paper Rims</h1>
        </div>

        <div className="info-card">
          <div>
            <h2>Packed Paper Rims</h2>
            <p>Manage your product inventory here.</p>
          </div>
          <div className="buttons">
            <button className="add-btn" onClick={handleAddProductClick}>
              + Add Product
            </button>
          </div>
        </div>

        {/* TABLE START */}
        <div className="table-container">
          {isFetching ? (
            <p>Loading products...</p>
          ) : fetchError ? (
            <p>Error loading products</p>
          ) : (
            <table className="product-table">
              <thead>
                <tr>
                  <th>ID</th> {/* Column for ID */}
                  <th>Product Name</th>
                  <th>Size</th>
                  <th>Gram</th>
                  <th>Quantity</th>
                  <th>Customer</th>
                  <th>In Use</th>
                  <th>Remaining</th>
                  <th>Time</th> {/* Column for Time */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td> {/* Display row number starting from 1 */}
                    <td>{item.productName}</td>
                    <td>{item.size}</td>
                    <td>{item.gram}</td>
                    <td>{item.quantity}</td>
                    <td>{item.customer}</td>
                    <td>{item.inUse}</td>
                    <td>{item.remaining}</td>
                    <td>{new Date(item.EntryTime).toLocaleDateString()}</td>
                    <td>
                      <button  className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* TABLE END */}
      </div>

      {showForm && (
        <div className="overlay">
          <div className="product-card">
            <h3>Add New Product</h3>
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label>Product Name:</label>
                <input type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder="Enter product name" />
              </div>

              <div className="form-group">
                <label>Size:</label>
                <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="Enter size" />
              </div>

              <div className="form-group">
                <label>Gram:</label>
                <input type="text" name="gram" value={formData.gram} onChange={handleChange} placeholder="Enter gram" />
              </div>

              <div className="form-group">
                <label>Quantity:</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Enter quantity" />
              </div>

              <div className="form-group">
                <label>Customer:</label>
                <input type="text" name="customer" value={formData.customer} onChange={handleChange} placeholder="Enter customer name" />
              </div>

              <div className="form-group">
                <label>In Use:</label>
                <input type="number" name="inUse" value={formData.inUse} onChange={handleChange} placeholder="Enter in use" />
              </div>

              <div className="form-group">
                <label>Remaining:</label>
                <input type="number" name="remaining" value={formData.remaining} readOnly placeholder="Auto-calculated remaining" />
              </div>

              <div className="form-buttons">
                <button type="submit" disabled={isSaving}>Save</button>
                <button type="button" onClick={handleCloseForm}>Cancel</button>
              </div>

              {saveError && <p className="error-message">Error: {saveErrorObj?.message}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PackedPaperRim;

