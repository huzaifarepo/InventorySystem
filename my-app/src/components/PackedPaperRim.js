import React, { useState, useRef } from 'react';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import '../componenet_styling/MainScreen.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useSavePackedPaperRimMutation,
  useGetPackedPaperRimsQuery,
  useUpdatePackedPaperRimMutation,
  useDeletePackedPaperRimMutation,
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
  const [deleteItem] = useDeletePackedPaperRimMutation();
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

  const handleDelete = async (id) => {
    console.log("Deleting item with ID:", id); // Log the ID value

    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      try {
        await deleteItem(id).unwrap();
        toast.success('Deleted successfully');
        refetch();
      }

      catch (error) {
        toast.error('Delete failed');
      }
    }
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
      } else {
        await saveProduct(formData).unwrap();
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
    const date = new Date().toISOString().split('T')[0];
    const doc = new jsPDF('portrait', 'pt', 'a4');

    // Add title
    doc.setFontSize(18);
    doc.text("Packed Paper Rims", 40, 40);

    // Get table reference
    const tableElement = tableRef.current;

    // Get all headers
    const allHeaders = Array.from(tableElement.querySelectorAll("thead th")).map(th => th.textContent.trim());

    // Find index of "Action" column (case-insensitive)
    const actionIndex = allHeaders.findIndex(h => h.toLowerCase() === 'actions');

    // Filter headers (remove "Action")
    const headers = allHeaders.filter((_, i) => i !== actionIndex);

    // Get all rows and remove "Action" cell from each
    const rows = Array.from(tableElement.querySelectorAll("tbody tr"));
    const data = rows.map(row => {
      const cells = Array.from(row.querySelectorAll("td")).map(td => td.textContent.trim());
      return cells.filter((_, i) => i !== actionIndex);
    });

    // Generate table
    autoTable(doc, {
          startY: 60,
          head: [headers],
          body: data,
          styles: {
            fontSize: 10,
            cellPadding: 6,
            halign: 'center',
            lineWidth: 0.5, // Increase to 0.5 or 1 for bolder lines
            lineColor: [22, 160, 133],
          },
          headStyles: {
            fillColor: [22, 160, 133],
            textColor: 255,
            fontStyle: 'bold',
          },
          
          theme: "grid",
        });

    doc.save(`packed-paper-rims-${date}.pdf`);
  };




  return (
    <div className="sidebar-container">
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
                  <th className="no-print">Actions</th>
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
                    <td>{new Date(item.EntryTime).toLocaleDateString('en-CA')}</td>
                    <td className="no-print">
                      <button className="edit-btn" onClick={() => handleEditProductClick(item)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
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
