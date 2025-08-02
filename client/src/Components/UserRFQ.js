import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast, Toaster } from "react-hot-toast";
import { AuthContext } from '../AuthContext.js';
import { Table, Badge, Spinner, Form, Button, Alert } from 'react-bootstrap';

export default function UserRFQ() {
  const { id } = useContext(AuthContext);
  const [form, setForm] = useState({
    productName: '',
    description: '',
    quantity: '',
    city: '',
    country: '',
    deliveryPeriod: '',
    targetPrice: '',
    notes: ''
  });
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!id) return;
    setFetching(true);
    axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/rfq/custom/user/${id}`)
      .then(res => {
        setRfqs(res.data);
        setFetching(false);
      })
      .catch(() => {
        setFetching(false);
      });
  }, [id, success]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Show loading toast
    const loadingToast = toast.loading('Submitting your RFQ request...', {
      position: "top-center",
      style: {
        background: '#2196F3',
        color: '#fff',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: '500',
        padding: '16px 20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      },
    });

    try {
      const res = await axios.post(`${process.env.REACT_APP_LOCALHOST_URL}/rfq/custom`, {
        ...form,
        user: id
      });
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show success toast
      toast.success("RFQ submitted successfully! We'll review your request and get back to you soon.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: '#4CAF50',
          color: '#fff',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '500',
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#4CAF50',
        },
      });

      setSuccess('RFQ submitted successfully!');
      setForm({
        productName: '',
        description: '',
        quantity: '',
        city: '',
        country: '',
        deliveryPeriod: '',
        targetPrice: '',
        notes: ''
      });
    } catch (err) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show error toast
      const errorMessage = err.response?.data?.error || 'Failed to submit RFQ';
      toast.error(errorMessage, {
        duration: 4000,
        position: "top-center",
        style: {
          background: '#f44336',
          color: '#fff',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '500',
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#f44336',
        },
      });

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      {/* Toast Container */}
      <Toaster />
      
      <h2>Request for Quotation (Custom Product)</h2>
      <h2>Request for Quotation (Custom Product)</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control name="productName" value={form.productName} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" value={form.description} onChange={handleChange} as="textarea" rows={2} placeholder="Describe your requirements (e.g. mouse with RGB colors)" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control name="quantity" type="number" min={1} value={form.quantity} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control name="city" value={form.city} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control name="country" value={form.country} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Delivery Period</Form.Label>
          <Form.Control name="deliveryPeriod" value={form.deliveryPeriod} onChange={handleChange} required placeholder="e.g. 2 weeks, 2024-08-01 to 2024-08-15" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Target Price (per unit)</Form.Label>
          <Form.Control name="targetPrice" type="number" min={0} value={form.targetPrice} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Additional Notes</Form.Label>
          <Form.Control name="notes" value={form.notes} onChange={handleChange} as="textarea" rows={2} />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit RFQ'}</Button>
      </Form>

      <h3>Your RFQ Requests</h3>
      {fetching ? (
        <Spinner animation="border" />
      ) : rfqs.length === 0 ? (
        <div>No RFQ requests found.</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>City</th>
              <th>Country</th>
              <th>Delivery Period</th>
              <th>Target Price</th>
              <th>Status</th>
              <th>Admin Quote</th>
            </tr>
          </thead>
          <tbody>
            {rfqs.map(rfq => (
              <tr key={rfq._id}>
                <td>{rfq.productName}</td>
                <td>{rfq.description}</td>
                <td>{rfq.quantity}</td>
                <td>{rfq.city}</td>
                <td>{rfq.country}</td>
                <td>{rfq.deliveryPeriod}</td>
                <td>{rfq.targetPrice}</td>
                <td>
                  <Badge bg={
                    rfq.status === 'under review' ? 'secondary' :
                    rfq.status === 'quoted' ? 'info' :
                    rfq.status === 'closed' ? 'dark' : 'light'
                  }>
                    {rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
                  </Badge>
                </td>
                <td>
                  {rfq.adminQuote && rfq.adminQuote.price ? (
                    <div>
                      <div><b>Price:</b> {rfq.adminQuote.price}</div>
                      <div><b>Message:</b> {rfq.adminQuote.message}</div>
                    </div>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}