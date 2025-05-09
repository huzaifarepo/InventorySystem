import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import '../componenet_styling/MainScreen.css';
import {
  useSavePackedPaperRimMutation,
  useGetPackedPaperRimsQuery,
  useUpdatePackedPaperRimMutation,
} from '../RTKQuery/Slices/Paked_Paper_Rim_Slice';

function PackedPaperRim() {
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const tableRef = useRef();

  const [formData, setFormData] = useState({
    productName: '',
    size: '',
    gram: '',
    quantity: '',
    customer: '',
    inUse: '',
    remaining: '',
  });

  const [saveProduct, { isLoading: isSaving }] = useSavePackedPaperRimMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdatePackedPaperRimMutation();
  const { data: products, isLoading: isFetching, isError: fetchError, refetch } = useGetPackedPaperRimsQuery();

  const handleAddProductClick = () => {
    setIsEditMode(false);
    setFormData({
      productName: '',
      size: '',
      gram: '',
      quantity: '',
      customer: '',
      inUse: '',
      remaining: '',
    });
    setShowForm(true);
  };

  const handleEditProductClick = (product) => {
    setIsEditMode(true);
    setEditingProduct(product);
    setFormData({
      productName: product.productName,
      size: product.size,
      gram: product.gram,
      quantity: product.quantity,
      customer: product.customer,
      inUse: product.inUse,
      remaining: product.remaining,
    });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

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
      if (isEditMode && editingProduct) {
        await updateProduct({ id: editingProduct.id, ...formData }).unwrap();
        console.log('Product updated:', formData);
      } else {
        await saveProduct(formData).unwrap();
        console.log('Product created:', formData);
      }
      setShowForm(false);
      setEditingProduct(null);
      setFormData({
        productName: '',
        size: '',
        gram: '',
        quantity: '',
        customer: '',
        inUse: '',
        remaining: '',
      });
      refetch();
    } catch (err) {
      console.error('Error saving/updating product:', err);
    }
  };

  const handleDownloadPDF = () => {
    const element = tableRef.current;
    const opt = {
      margin: 0.5,
      filename: 'packed-paper-rims.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().from(element).set(opt).save();
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
            <button className="add-btn" onClick={handleAddProductClick}>+ Add Product</button>
            <button className="add-btn" onClick={handleDownloadPDF}>Download PDF</button>
          </div>
        </div>

        {/* TABLE START */}
        <div className="table-container" ref={tableRef}>
          {isFetching ? (
            <p>Loading products...</p>
          ) : fetchError ? (
            <p>Error loading products</p>
          ) : (
            <table className="product-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Size</th>
                  <th>Gram</th>
                  <th>Quantity</th>
                  <th>Customer</th>
                  <th>In Use</th>
                  <th>Remaining</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.productName}</td>
                    <td>{item.size}</td>
                    <td>{item.gram}</td>
                    <td>{item.quantity}</td>
                    <td>{item.customer}</td>
                    <td>{item.inUse}</td>
                    <td>{item.remaining}</td>
                    <td className="entryincrease">
                      {new Date(item.EntryTime).toLocaleDateString('en-CA')}
                    </td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEditProductClick(item)}>Edit</button>
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
            <h3>{isEditMode ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label>Product Name:</label>
                <input type="text" name="productName" value={formData.productName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Size:</label>
                <input type="text" name="size" value={formData.size} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Gram:</label>
                <input type="text" name="gram" value={formData.gram} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Quantity:</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Customer:</label>
                <input type="text" name="customer" value={formData.customer} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>In Use:</label>
                <input type="number" name="inUse" value={formData.inUse} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Remaining:</label>
                <input type="number" name="remaining" value={formData.remaining} readOnly />
              </div>
              <div className="form-buttons">
                <button type="submit" disabled={isSaving || isUpdating}>
                  {isEditMode ? 'Update' : 'Save'}
                </button>
                <button type="button" onClick={handleCloseForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PackedPaperRim;
