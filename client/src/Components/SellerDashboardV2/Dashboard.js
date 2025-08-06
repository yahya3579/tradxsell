
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, DollarSign, CheckCircle, Shield, Star } from 'lucide-react';
import { AuthContext } from '../../AuthContext';

const Dashboard = () => {
  const { id: userId, email: sellerEmail, loggedIn, role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn || role !== 'seller') {
      navigate('/login', { replace: true });
    }
  }, [loggedIn, role, navigate]);
  const [tags, setTags] = useState([]);
  const [stats, setStats] = useState({ totalSalesAmount: 0, totalOrders: 0, averageOrderValueThisMonth: 0 });
  const [topProducts, setTopProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderIdFilter, setOrderIdFilter] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    const baseUrl = process.env.REACT_APP_LOCALHOST_URL || 'http://localhost:3001';
    fetch(`${baseUrl}/seller/profile?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.seller) {
          const sellerTags = data.seller.tags || [];
          setTags(sellerTags);
          
          // Check if seller has required verification tags
          const hasRequiredTags = sellerTags.some(tag => 
            tag === 'registered' || tag === 'verified' || tag === 'gold'
          );
          
          setIsVerified(hasRequiredTags);
          setVerificationError(hasRequiredTags ? null : 'Your account needs verification to access all features');
        }
      })
      .catch(error => {
        console.error("Error fetching seller profile:", error);
        setVerificationError('Unable to verify seller status');
      });
  }, [userId]);

  useEffect(() => {
    if (!sellerEmail) return;
    const baseUrl = process.env.REACT_APP_LOCALHOST_URL || 'http://localhost:3001';
    // Stats
    fetch(`${baseUrl}/seller/stats?email=${encodeURIComponent(sellerEmail)}`)
      .then(res => res.json())
      .then(data => setStats(data));
    // Top products
    fetch(`${baseUrl}/seller/top-products?email=${encodeURIComponent(sellerEmail)}`)
      .then(res => res.json())
      .then(data => setTopProducts(Array.isArray(data) ? data : []));
    // Orders
    fetch(`${baseUrl}/seller/orders?email=${encodeURIComponent(sellerEmail)}`)
      .then(res => res.json())
      .then(data => {
        setAllOrders(Array.isArray(data) ? data : []);
        setOrders(Array.isArray(data) ? data.slice(0, 10) : []);
      });
  }, [sellerEmail]);

  // Filtered orders for modal
  const filteredAllOrders = orderIdFilter
    ? allOrders.filter(order => order._id.toLowerCase().includes(orderIdFilter.toLowerCase()))
    : allOrders;

  // Compute salesData: number of orders per month
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const salesData = React.useMemo(() => {
    const counts = {};
    allOrders.forEach(order => {
      const date = new Date(order.orderDate || order.createdAt);
      if (isNaN(date)) return;
      const key = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    // Sort by year and month descending (latest first)
    const sortedKeys = Object.keys(counts).sort((a, b) => {
      const [ma, ya] = a.split(' '); const [mb, yb] = b.split(' ');
      const idxA = monthNames.indexOf(ma), idxB = monthNames.indexOf(mb);
      if (ya !== yb) return Number(ya) - Number(yb);
      return idxA - idxB;
    });
    return sortedKeys.map(key => ({ month: key, value: counts[key] }));
  }, [allOrders]);

  const styles = {
    container: {
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    header: {
      padding: '20px 0',
    },
    welcomeTitle: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '5px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap'
    },
    subtitle: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '0'
    },
    badgesContainer: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      alignItems: 'center'
    },
    badge: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease'
    },
    registeredBadge: {
      backgroundColor: '#e3f2fd',
      color: '#1976d2',
      border: '1px solid #bbdefb'
    },
    verifiedBadge: {
      backgroundColor: '#e8f5e8',
      color: '#2e7d32',
      border: '1px solid #c8e6c9'
    },
    goldBadge: {
      background: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)',
      color: '#b8860b',
      border: '1px solid #daa520',
      fontWeight: '700'
    },
    statsCard: {
      backgroundColor: '#ffffff !important',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: 'none',
      height: '100%',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      display: 'block'
    },
    totalSalesCard: {
      background: 'linear-gradient(135deg, #ff6b35 0%, #ff4500 100%)',
      color: '#ffffff'
    },
    statValue: {
      fontSize: '32px',
      fontWeight: '700',
      marginBottom: '8px',
      lineHeight: '1',
      transition: 'color 0.3s ease'
    },
    statLabel: {
      fontSize: '16px',
      fontWeight: '500',
      marginBottom: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'color 0.3s ease'
    },
    statSubtext: {
      fontSize: '12px',
      opacity: '0.8',
      transition: 'opacity 0.3s ease'
    },
    chartCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      marginTop: '24px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    chartHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '24px',
      flexWrap: 'wrap',
      gap: '16px'
    },
    chartTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '0',
      minWidth: 'fit-content'
    },
    chartControls: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    dropdown: {
      border: '1px solid #e0e0e0',
      borderRadius: '6px',
      padding: '6px 12px',
      fontSize: '14px',
      backgroundColor: '#ffffff',
      minWidth: '80px'
    },
    menuIcon: {
      width: '20px',
      height: '20px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    productCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      marginTop: '24px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    productHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    productTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '0'
    },
    seeAllLink: {
      color: '#666',
      fontSize: '14px',
      textDecoration: 'none'
    },
    productItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid #f0f0f0'
    },
    productImage: {
      width: '48px',
      height: '48px',
      borderRadius: '8px',
      marginRight: '16px',
      objectFit: 'cover'
    },
    productInfo: {
      flex: '1'
    },
    productName: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#333',
      marginBottom: '4px'
    },
    productCategory: {
      fontSize: '12px',
      color: '#666'
    },
    productStats: {
      textAlign: 'right'
    },
    productQuantity: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '4px'
    },
    productStatus: {
      fontSize: '12px',
      color: '#666'
    },
    ordersTable: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      marginTop: '24px'
    },
    tableTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '20px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e0e0e0'
    },
    th: {
      padding: '12px 16px',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '600',
      color: '#666'
    },
    td: {
      padding: '16px',
      borderBottom: '1px solid #f0f0f0',
      fontSize: '14px',
      color: '#333'
    },
    statusProcessing: {
      color: '#007bff',
      fontSize: '12px',
      fontWeight: '500'
    },
    statusCompleted: {
      color: '#28a745',
      fontSize: '12px',
      fontWeight: '500'
    },
    iconContainer: {
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  // Badge Component
  const SellerBadge = ({ type, icon, label }) => {
    const getBadgeStyle = () => {
      switch(type) {
        case 'registered': return styles.registeredBadge;
        case 'verified': return styles.verifiedBadge;
        case 'gold': return styles.goldBadge;
        default: return styles.registeredBadge;
      }
    };
    return (
      <div style={{...styles.badge, ...getBadgeStyle()}}>
        {icon}
        <span>{label}</span>
      </div>
    );
  };

  // Map tag to icon/label
  const tagIconLabel = {
    registered: { icon: <CheckCircle size={14} />, label: 'Registered' },
    verified: { icon: <Shield size={14} />, label: 'Verified' },
    gold: { icon: <Star size={14} />, label: 'GOLD' },
  };

  // Custom component for hoverable stats card
  const StatsCard = ({ icon, label, value, subtext, isTotal = false }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const cardStyle = {
      ...styles.statsCard,
      ...(isTotal || isHovered ? styles.totalSalesCard : {
        backgroundColor: '#ffffff',
        color: '#333'
      })
    };
    const iconColor = isTotal || isHovered ? '#ffffff' : '#666';
    const textColor = isTotal || isHovered ? '#ffffff' : '#333';
    return (
      <div 
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{...styles.statLabel, color: textColor}}>
          <span style={styles.iconContainer}>
            {React.cloneElement(icon, { size: 20, color: iconColor })}
          </span>
          {label}
        </div>
        <div style={{...styles.statValue, color: textColor}}>{value}</div>
        <div style={{...styles.statSubtext, color: textColor}}>{subtext}</div>
      </div>
    );
  };

  return (
    <div style={styles.container} className='p-sm-3'>
      {/* Verification Status Banner */}
      {!isVerified && verificationError && (
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px',
          color: '#856404'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div>
              <strong>⚠️ Account Verification Required</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                {verificationError}
              </p>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                Please submit your business documents and wait for admin verification to access all features.
              </p>
            </div>
            <button 
              style={{
                backgroundColor: '#ff6b35',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                padding: '8px 16px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
              onClick={() => window.location.href = '/sellerdashboard/accountsettings'}
            >
              Submit Documents
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <div className="container">
          <h1 style={styles.welcomeTitle}>
            Welcome back, <strong>Seller!</strong>
            <div style={styles.badgesContainer}>
              {tags.length > 0 && tags.map((tag) => (
                <SellerBadge
                  key={tag}
                  type={tag}
                  icon={tagIconLabel[tag]?.icon || <CheckCircle size={14} />}
                  label={tagIconLabel[tag]?.label || tag.charAt(0).toUpperCase() + tag.slice(1)}
                />
              ))}
            </div>
          </h1>
          <p style={styles.subtitle}>Here's Your Current Sales Overview</p>
        </div>
      </div>

      <div className="container py-4">
        {/* Stats Cards */}
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <StatsCard 
              icon={<TrendingUp />}
              label="Total Sales"
              value={`$${stats.totalSalesAmount?.toLocaleString()}`}
              subtext="Total order amount received"
              isTotal
            />
          </div>
          <div className="col-12 col-md-4">
            <StatsCard 
              icon={<Package />}
              label="Total Orders"
              value={stats.totalOrders}
              subtext="Total orders received"
            />
          </div>
          <div className="col-12 col-md-4">
            <StatsCard 
              icon={<DollarSign />}
              label="Average Order Value"
              value={`$${stats.averageOrderValueThisMonth?.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
              subtext="This month"
            />
          </div>
        </div>

        <div className="row g-4" style={{display: 'flex', alignItems: 'stretch'}}>
          {/* Sales Chart (dummy for now) */}
          <div className="col-12 col-lg-6" style={{display: 'flex'}}>
            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h3 style={styles.chartTitle}>Sales Overtime</h3>
                <div style={styles.chartControls}>
                  <select style={styles.dropdown}>
                    <option>Revenue</option>
                  </select>
                  <select style={styles.dropdown}>
                    <option>Order</option>
                  </select>
                  <div style={styles.menuIcon}>☰</div>
                </div>
              </div>
              <div style={{height: '250px'}}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{fontSize: 12, fill: '#666'}}
                    />
                    <YAxis hide />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#ff6b35" 
                      strokeWidth={3}
                      dot={{fill: '#ff6b35', strokeWidth: 2, r: 4}}
                      activeDot={{r: 6, fill: '#ff6b35'}}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="col-12 col-lg-6" style={{display: 'flex'}}>
            <div style={styles.productCard}>
              <div style={styles.productHeader}>
                <h3 style={styles.productTitle}>Top Selling Product</h3>
                <a href="#" style={styles.seeAllLink}>See All Product</a>
              </div>
              {topProducts.length === 0 && <div>No sales yet.</div>}
              {topProducts.map((item, idx) => (
                <div style={styles.productItem} key={item.product?.id || idx}>
                  <img 
                    src={item.product?.imageUrl ? `${process.env.REACT_APP_LOCALHOST_URL}${item.product.imageUrl}` : 'https://via.placeholder.com/48'}
                    alt={item.product?.name || 'Product'} 
                    style={styles.productImage}
                  />
                  <div style={styles.productInfo}>
                    <div style={styles.productName}>{item.product?.name || 'Product'}</div>
                    <div style={styles.productCategory}>{item.product?.category || ''}</div>
                  </div>
                  <div style={styles.productStats}>
                    <div style={styles.productQuantity}>{item.quantity} sold</div>
                    <div style={styles.productStatus}>${item.revenue?.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Orders Table */}
        <div className="row">
          <div className="col-12">
            <div style={styles.ordersTable}>
              <div style={styles.productHeader}>
                <h3 style={styles.tableTitle}>Latest Orders</h3>
                <button style={styles.seeAllLink} onClick={() => setShowModal(true)}>See All</button>
              </div>
              <div className="table-responsive">
                <table style={styles.table}>
                  <thead style={styles.tableHeader}>
                    <tr>
                      <th style={styles.th}>Order ID</th>
                      <th style={styles.th}>Product</th>
                      <th style={styles.th}>Order Date</th>
                      <th style={styles.th}>Price</th>
                      <th style={styles.th}>Payment</th>
                      <th style={styles.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 && (
                      <tr><td colSpan={6} style={styles.td}>No orders yet.</td></tr>
                    )}
                    {orders.map(order => (
                      order.items.map((item, idx) => (
                        <tr key={order._id + '-' + idx}>
                          <td style={styles.td}>{order._id}</td>
                          <td style={styles.td}>{item.name}</td>
                          <td style={styles.td}>{new Date(order.orderDate || order.createdAt).toLocaleString()}</td>
                          <td style={styles.td}>${(item.price * item.quantity).toLocaleString()}</td>
                          <td style={styles.td}>-</td>
                          <td style={styles.td}>{item.status}</td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for all orders */}
        {showModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }} onClick={() => setShowModal(false)}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, maxWidth: 900, width: '100%', maxHeight: '80vh', overflowY: 'auto', position: 'relative' }} onClick={e => e.stopPropagation()}>
              <button style={{ position: 'absolute', top: 12, right: 12, fontSize: 22, background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setShowModal(false)}>&times;</button>
              <h3 style={{ marginBottom: 16 }}>All Orders</h3>
              <input
                type="text"
                placeholder="Filter by Order ID"
                value={orderIdFilter}
                onChange={e => setOrderIdFilter(e.target.value)}
                style={{ marginBottom: 16, padding: 8, borderRadius: 6, border: '1px solid #ccc', width: 250 }}
              />
              <div className="table-responsive">
                <table style={styles.table}>
                  <thead style={styles.tableHeader}>
                    <tr>
                      <th style={styles.th}>Order ID</th>
                      <th style={styles.th}>Product</th>
                      <th style={styles.th}>Order Date</th>
                      <th style={styles.th}>Price</th>
                      <th style={styles.th}>Payment</th>
                      <th style={styles.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAllOrders.length === 0 && (
                      <tr><td colSpan={6} style={styles.td}>No orders found.</td></tr>
                    )}
                    {filteredAllOrders.map(order => (
                      order.items.map((item, idx) => (
                        <tr key={order._id + '-' + idx}>
                          <td style={styles.td}>{order._id}</td>
                          <td style={styles.td}>{item.name}</td>
                          <td style={styles.td}>{new Date(order.orderDate || order.createdAt).toLocaleString()}</td>
                          <td style={styles.td}>${(item.price * item.quantity).toLocaleString()}</td>
                          <td style={styles.td}>-</td>
                          <td style={styles.td}>{item.status}</td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;