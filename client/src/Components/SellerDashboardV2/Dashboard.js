// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
// import { TrendingUp, Package, DollarSign } from 'lucide-react';

// const Dashboard = () => {
//   const salesData = [
//     { month: 'Jun', value: 1500 },
//     { month: 'Jul', value: 1800 },
//     { month: 'Aug', value: 1600 },
//     { month: 'Sep', value: 2200 },
//     { month: 'Oct', value: 1900 },
//     { month: 'Nov', value: 2100 },
//     { month: 'Dec', value: 1700 },
//     { month: 'Jan', value: 2000 }
//   ];

//   const styles = {
//     container: {
//       backgroundColor: '#f8f9fa',
//       minHeight: '100vh',
//       fontFamily: 'system-ui, -apple-system, sans-serif',
//       padding: '20px'
//     },
//     header: {
//       padding: '20px 0',
//     },
//     welcomeTitle: {
//       fontSize: '28px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '5px'
//     },
//     subtitle: {
//       fontSize: '14px',
//       color: '#666',
//       marginBottom: '0'
//     },
//     statsCard: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       border: 'none',
//       height: '100%'
//     },
//     totalSalesCard: {
//       background: 'linear-gradient(135deg, #ff6b35 0%, #ff4500 100%)',
//       color: '#ffffff'
//     },
//     statValue: {
//       fontSize: '32px',
//       fontWeight: '700',
//       marginBottom: '8px',
//       lineHeight: '1'
//     },
//     statLabel: {
//       fontSize: '16px',
//       fontWeight: '500',
//       marginBottom: '4px'
//     },
//     statSubtext: {
//       fontSize: '12px',
//       opacity: '0.8'
//     },
//     chartCard: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px'
//     },
//     chartHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '24px'
//     },
//     chartTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '0'
//     },
//     chartControls: {
//       display: 'flex',
//       gap: '12px',
//       alignItems: 'center'
//     },
//     dropdown: {
//       border: '1px solid #e0e0e0',
//       borderRadius: '6px',
//       padding: '6px 12px',
//       fontSize: '14px',
//       backgroundColor: '#ffffff'
//     },
//     menuIcon: {
//       width: '20px',
//       height: '20px',
//       cursor: 'pointer'
//     },
//     productCard: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px'
//     },
//     productHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '20px'
//     },
//     productTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '0'
//     },
//     seeAllLink: {
//       color: '#666',
//       fontSize: '14px',
//       textDecoration: 'none'
//     },
//     productItem: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: '12px 0',
//       borderBottom: '1px solid #f0f0f0'
//     },
//     productImage: {
//       width: '48px',
//       height: '48px',
//       borderRadius: '8px',
//       marginRight: '16px',
//       objectFit: 'cover'
//     },
//     productInfo: {
//       flex: '1'
//     },
//     productName: {
//       fontSize: '14px',
//       fontWeight: '500',
//       color: '#333',
//       marginBottom: '4px'
//     },
//     productCategory: {
//       fontSize: '12px',
//       color: '#666'
//     },
//     productStats: {
//       textAlign: 'right'
//     },
//     productQuantity: {
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '4px'
//     },
//     productStatus: {
//       fontSize: '12px',
//       color: '#666'
//     },
//     ordersTable: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px'
//     },
//     tableTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '20px'
//     },
//     table: {
//       width: '100%',
//       borderCollapse: 'collapse'
//     },
//     tableHeader: {
//       backgroundColor: '#f8f9fa',
//       borderBottom: '1px solid #e0e0e0'
//     },
//     th: {
//       padding: '12px 16px',
//       textAlign: 'left',
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#666'
//     },
//     td: {
//       padding: '16px',
//       borderBottom: '1px solid #f0f0f0',
//       fontSize: '14px',
//       color: '#333'
//     },
//     statusProcessing: {
//       color: '#007bff',
//       fontSize: '12px',
//       fontWeight: '500'
//     },
//     statusCompleted: {
//       color: '#28a745',
//       fontSize: '12px',
//       fontWeight: '500'
//     },
//     iconContainer: {
//       width: '24px',
//       height: '24px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <div className="container">
//           <h1 style={styles.welcomeTitle}>Welcome back, <strong>Seller!</strong></h1>
//           <p style={styles.subtitle}>Here's Your Current Sales Overview</p>
//         </div>
//       </div>

//       <div className="container py-4">
//         {/* Stats Cards */}
//         <div className="row g-4">
//           <div className="col-12 col-md-4">
//             <div style={{...styles.statsCard, ...styles.totalSalesCard}}>
//               <div style={styles.statLabel}>
//                 <span style={styles.iconContainer}>
//                   <TrendingUp size={20} color="#ffffff" />
//                 </span>
//                 Total Sales
//               </div>
//               <div style={styles.statValue}>$2,002,332</div>
//               <div style={styles.statSubtext}>+8.1% From last month</div>
//             </div>
//           </div>
//           <div className="col-12 col-md-4">
//             <div style={styles.statsCard}>
//               <div style={styles.statLabel}>
//                 <span style={styles.iconContainer}>
//                   <Package size={20} color="#666" />
//                 </span>
//                 Total Orders
//               </div>
//               <div style={styles.statValue}>2,107</div>
//               <div style={styles.statSubtext}>+4.6% From last month</div>
//             </div>
//           </div>
//           <div className="col-12 col-md-4">
//             <div style={styles.statsCard}>
//               <div style={styles.statLabel}>
//                 <span style={styles.iconContainer}>
//                   <DollarSign size={20} color="#666" />
//                 </span>
//                 Average Order Value
//               </div>
//               <div style={styles.statValue}>$7,201</div>
//               <div style={styles.statSubtext}>+2.4% From last month</div>
//             </div>
//           </div>
//         </div>

//         <div className="row g-4">
//           {/* Sales Chart */}
//           <div className="col-12 col-lg-6">
//             <div style={styles.chartCard}>
//               <div style={styles.chartHeader}>
//                 <h3 style={styles.chartTitle}>Sales Overtime</h3>
//                 <div style={styles.chartControls}>
//                   <select style={styles.dropdown}>
//                     <option>Revenue</option>
//                   </select>
//                   <select style={styles.dropdown}>
//                     <option>Order</option>
//                   </select>
//                   <div style={styles.menuIcon}>☰</div>
//                 </div>
//               </div>
//               <div style={{height: '250px'}}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={salesData}>
//                     <XAxis 
//                       dataKey="month" 
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{fontSize: 12, fill: '#666'}}
//                     />
//                     <YAxis hide />
//                     <Line 
//                       type="monotone" 
//                       dataKey="value" 
//                       stroke="#ff6b35" 
//                       strokeWidth={3}
//                       dot={{fill: '#ff6b35', strokeWidth: 2, r: 4}}
//                       activeDot={{r: 6, fill: '#ff6b35'}}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Top Selling Products */}
//           <div className="col-12 col-lg-6">
//             <div style={styles.productCard}>
//               <div style={styles.productHeader}>
//                 <h3 style={styles.productTitle}>Top Selling Product</h3>
//                 <a href="#" style={styles.seeAllLink}>See All Product</a>
//               </div>
              
//               <div style={styles.productItem}>
//                 <div style={{...styles.productImage, backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px'}}>
//                   👟
//                 </div>
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Nike Type Sports Shoes for Men</div>
//                   <div style={styles.productCategory}>Men Shoes</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>2 Available</div>
//                   <div style={styles.productStatus}>out of 10 stock Remaining</div>
//                 </div>
//               </div>

//               <div style={styles.productItem}>
//                 <div style={{...styles.productImage, backgroundColor: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px'}}>
//                   📱
//                 </div>
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Samsung F23 5G+ Smartphone</div>
//                   <div style={styles.productCategory}>Electronics</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>15 Available</div>
//                   <div style={styles.productStatus}>In Stock, Ready to ship</div>
//                 </div>
//               </div>

//               <div style={styles.productItem}>
//                 <div style={{...styles.productImage, backgroundColor: '#8B4513', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px'}}>
//                   👕
//                 </div>
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Laptop Fashion Men's Shirt</div>
//                   <div style={styles.productCategory}>Men's Clothing</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>8 Available</div>
//                   <div style={styles.productStatus}>out of 20 stock Remaining</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Latest Orders Table */}
//         <div className="row">
//           <div className="col-12">
//             <div style={styles.ordersTable}>
//               <h3 style={styles.tableTitle}>Latest Orders</h3>
//               <div className="table-responsive">
//                 <table style={styles.table}>
//                   <thead style={styles.tableHeader}>
//                     <tr>
//                       <th style={styles.th}>Order ID</th>
//                       <th style={styles.th}>Product</th>
//                       <th style={styles.th}>Order Date</th>
//                       <th style={styles.th}>Price</th>
//                       <th style={styles.th}>Payment</th>
//                       <th style={styles.th}>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td style={styles.td}>#2861A</td>
//                       <td style={styles.td}>Nike Sportswear</td>
//                       <td style={styles.td}>Jan 12 - 12:23 pm</td>
//                       <td style={styles.td}>$134.00</td>
//                       <td style={styles.td}>COD</td>
//                       <td style={styles.td}>
//                         <span style={styles.statusProcessing}>Processing</span>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={styles.td}>#4330F</td>
//                       <td style={styles.td}>Lamp Stand</td>
//                       <td style={styles.td}>May 01 - 01:13 pm</td>
//                       <td style={styles.td}>$23.00</td>
//                       <td style={styles.td}>Credit Card</td>
//                       <td style={styles.td}>
//                         <span style={styles.statusCompleted}>Completed</span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
// import { TrendingUp, Package, DollarSign } from 'lucide-react';

// const Dashboard = () => {
//   const salesData = [
//     { month: 'Jun', value: 1500 },
//     { month: 'Jul', value: 1800 },
//     { month: 'Aug', value: 1600 },
//     { month: 'Sep', value: 2200 },
//     { month: 'Oct', value: 1900 },
//     { month: 'Nov', value: 2100 },
//     { month: 'Dec', value: 1700 },
//     { month: 'Jan', value: 2000 }
//   ];

//   const styles = {
//     container: {
//       backgroundColor: '#f8f9fa',
//       minHeight: '100vh',
//       fontFamily: 'system-ui, -apple-system, sans-serif',
//       padding: '20px'
//     },
//     header: {
//       padding: '20px 0',
//     },
//     welcomeTitle: {
//       fontSize: '28px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '5px'
//     },
//     subtitle: {
//       fontSize: '14px',
//       color: '#666',
//       marginBottom: '0'
//     },
//     statsCard: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       border: 'none',
//       height: '100%',
//       transition: 'all 0.3s ease',
//       cursor: 'pointer',
//       position: 'relative'
//     },
//     totalSalesCard: {
//       background: 'linear-gradient(135deg, #ff6b35 0%, #ff4500 100%)',
//       color: '#ffffff'
//     },
//     statValue: {
//       fontSize: '32px',
//       fontWeight: '700',
//       marginBottom: '8px',
//       lineHeight: '1',
//       transition: 'color 0.3s ease'
//     },
//     statLabel: {
//       fontSize: '16px',
//       fontWeight: '500',
//       marginBottom: '4px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       transition: 'color 0.3s ease'
//     },
//     statSubtext: {
//       fontSize: '12px',
//       opacity: '0.8',
//       transition: 'opacity 0.3s ease'
//     },
//     chartCard: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px'
//     },
//     chartHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '24px'
//     },
//     chartTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '0'
//     },
//     chartControls: {
//       display: 'flex',
//       gap: '12px',
//       alignItems: 'center'
//     },
//     dropdown: {
//       border: '1px solid #e0e0e0',
//       borderRadius: '6px',
//       padding: '6px 12px',
//       fontSize: '14px',
//       backgroundColor: '#ffffff'
//     },
//     menuIcon: {
//       width: '20px',
//       height: '20px',
//       cursor: 'pointer'
//     },
//     productCard: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px'
//     },
//     productHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '20px'
//     },
//     productTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '0'
//     },
//     seeAllLink: {
//       color: '#666',
//       fontSize: '14px',
//       textDecoration: 'none'
//     },
//     productItem: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: '12px 0',
//       borderBottom: '1px solid #f0f0f0'
//     },
//     productImage: {
//       width: '48px',
//       height: '48px',
//       borderRadius: '8px',
//       marginRight: '16px',
//       objectFit: 'cover'
//     },
//     productInfo: {
//       flex: '1'
//     },
//     productName: {
//       fontSize: '14px',
//       fontWeight: '500',
//       color: '#333',
//       marginBottom: '4px'
//     },
//     productCategory: {
//       fontSize: '12px',
//       color: '#666'
//     },
//     productStats: {
//       textAlign: 'right'
//     },
//     productQuantity: {
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '4px'
//     },
//     productStatus: {
//       fontSize: '12px',
//       color: '#666'
//     },
//     ordersTable: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px'
//     },
//     tableTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '20px'
//     },
//     table: {
//       width: '100%',
//       borderCollapse: 'collapse'
//     },
//     tableHeader: {
//       backgroundColor: '#f8f9fa',
//       borderBottom: '1px solid #e0e0e0'
//     },
//     th: {
//       padding: '12px 16px',
//       textAlign: 'left',
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#666'
//     },
//     td: {
//       padding: '16px',
//       borderBottom: '1px solid #f0f0f0',
//       fontSize: '14px',
//       color: '#333'
//     },
//     statusProcessing: {
//       color: '#007bff',
//       fontSize: '12px',
//       fontWeight: '500'
//     },
//     statusCompleted: {
//       color: '#28a745',
//       fontSize: '12px',
//       fontWeight: '500'
//     },
//     iconContainer: {
//       width: '24px',
//       height: '24px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }
//   };

//   // Custom component for hoverable stats card
//   const StatsCard = ({ icon, label, value, subtext, isTotal = false }) => {
//     const [isHovered, setIsHovered] = React.useState(false);
    
//     const cardStyle = {
//       ...styles.statsCard,
//       ...(isTotal || isHovered ? styles.totalSalesCard : {})
//     };

//     const iconColor = isTotal || isHovered ? '#ffffff' : '#666';
//     const textColor = isTotal || isHovered ? '#ffffff' : '#333';

//     return (
//       <div 
//         style={cardStyle}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div style={{...styles.statLabel, color: textColor}}>
//           <span style={styles.iconContainer}>
//             {React.cloneElement(icon, { size: 20, color: iconColor })}
//           </span>
//           {label}
//         </div>
//         <div style={{...styles.statValue, color: textColor}}>{value}</div>
//         <div style={{...styles.statSubtext, color: textColor}}>{subtext}</div>
//       </div>
//     );
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <div className="container">
//           <h1 style={styles.welcomeTitle}>Welcome back, <strong>Seller!</strong></h1>
//           <p style={styles.subtitle}>Here's Your Current Sales Overview</p>
//         </div>
//       </div>

//       <div className="container py-4">
//         {/* Stats Cards */}
//         <div className="row g-4">
//           <div className="col-12 col-md-4">
//             <StatsCard 
//               icon={<TrendingUp />}
//               label="Total Sales"
//               value="$2,002,332"
//               subtext="+8.1% From last month"
//             />
//           </div>
//           <div className="col-12 col-md-4">
//             <StatsCard 
//               icon={<Package />}
//               label="Total Orders"
//               value="2,107"
//               subtext="+4.6% From last month"
//             />
//           </div>
//           <div className="col-12 col-md-4">
//             <StatsCard 
//               icon={<DollarSign />}
//               label="Average Order Value"
//               value="$7,201"
//               subtext="+2.4% From last month"
//             />
//           </div>
//         </div>

//         <div className="row g-4">
//           {/* Sales Chart */}
//           <div className="col-12 col-lg-6">
//             <div style={styles.chartCard}>
//               <div style={styles.chartHeader}>
//                 <h3 style={styles.chartTitle}>Sales Overtime</h3>
//                 <div style={styles.chartControls}>
//                   <select style={styles.dropdown}>
//                     <option>Revenue</option>
//                   </select>
//                   <select style={styles.dropdown}>
//                     <option>Order</option>
//                   </select>
//                   <div style={styles.menuIcon}>☰</div>
//                 </div>
//               </div>
//               <div style={{height: '250px'}}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={salesData}>
//                     <XAxis 
//                       dataKey="month" 
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{fontSize: 12, fill: '#666'}}
//                     />
//                     <YAxis hide />
//                     <Line 
//                       type="monotone" 
//                       dataKey="value" 
//                       stroke="#ff6b35" 
//                       strokeWidth={3}
//                       dot={{fill: '#ff6b35', strokeWidth: 2, r: 4}}
//                       activeDot={{r: 6, fill: '#ff6b35'}}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Top Selling Products */}
//           <div className="col-12 col-lg-6">
//             <div style={styles.productCard}>
//               <div style={styles.productHeader}>
//                 <h3 style={styles.productTitle}>Top Selling Product</h3>
//                 <a href="#" style={styles.seeAllLink}>See All Product</a>
//               </div>
              
//               <div style={styles.productItem}>
//                 <div style={{...styles.productImage, backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px'}}>
//                   👟
//                 </div>
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Nike Type Sports Shoes for Men</div>
//                   <div style={styles.productCategory}>Men Shoes</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>2 Available</div>
//                   <div style={styles.productStatus}>out of 10 stock Remaining</div>
//                 </div>
//               </div>

//               <div style={styles.productItem}>
//                 <div style={{...styles.productImage, backgroundColor: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px'}}>
//                   📱
//                 </div>
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Samsung F23 5G+ Smartphone</div>
//                   <div style={styles.productCategory}>Electronics</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>15 Available</div>
//                   <div style={styles.productStatus}>In Stock, Ready to ship</div>
//                 </div>
//               </div>

//               <div style={styles.productItem}>
//                 <div style={{...styles.productImage, backgroundColor: '#8B4513', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px'}}>
//                   👕
//                 </div>
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Laptop Fashion Men's Shirt</div>
//                   <div style={styles.productCategory}>Men's Clothing</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>8 Available</div>
//                   <div style={styles.productStatus}>out of 20 stock Remaining</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Latest Orders Table */}
//         <div className="row">
//           <div className="col-12">
//             <div style={styles.ordersTable}>
//               <h3 style={styles.tableTitle}>Latest Orders</h3>
//               <div className="table-responsive">
//                 <table style={styles.table}>
//                   <thead style={styles.tableHeader}>
//                     <tr>
//                       <th style={styles.th}>Order ID</th>
//                       <th style={styles.th}>Product</th>
//                       <th style={styles.th}>Order Date</th>
//                       <th style={styles.th}>Price</th>
//                       <th style={styles.th}>Payment</th>
//                       <th style={styles.th}>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td style={styles.td}>#2861A</td>
//                       <td style={styles.td}>Nike Sportswear</td>
//                       <td style={styles.td}>Jan 12 - 12:23 pm</td>
//                       <td style={styles.td}>$134.00</td>
//                       <td style={styles.td}>COD</td>
//                       <td style={styles.td}>
//                         <span style={styles.statusProcessing}>Processing</span>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={styles.td}>#4330F</td>
//                       <td style={styles.td}>Lamp Stand</td>
//                       <td style={styles.td}>May 01 - 01:13 pm</td>
//                       <td style={styles.td}>$23.00</td>
//                       <td style={styles.td}>Credit Card</td>
//                       <td style={styles.td}>
//                         <span style={styles.statusCompleted}>Completed</span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;






// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
// import { TrendingUp, Package, DollarSign } from 'lucide-react';

// const Dashboard = () => {
//   const salesData = [
//     { month: 'Jun', value: 1500 },
//     { month: 'Jul', value: 1800 },
//     { month: 'Aug', value: 1600 },
//     { month: 'Sep', value: 2200 },
//     { month: 'Oct', value: 1900 },
//     { month: 'Nov', value: 2100 },
//     { month: 'Dec', value: 1700 },
//     { month: 'Jan', value: 2000 }
//   ];

//   const styles = {
//     container: {
//       backgroundColor: '#f8f9fa',
//       minHeight: '100vh',
//       fontFamily: 'system-ui, -apple-system, sans-serif',
//       padding: '20px'
//     },
//     header: {
//       padding: '20px 0',
//     },
//     welcomeTitle: {
//       fontSize: '28px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '5px'
//     },
//     subtitle: {
//       fontSize: '14px',
//       color: '#666',
//       marginBottom: '0'
//     },
//     statsCard: {
//       backgroundColor: '#ffffff !important',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       border: 'none',
//       height: '100%',
//       transition: 'all 0.3s ease',
//       cursor: 'pointer',
//       position: 'relative',
//       display: 'block'
//     },
//     totalSalesCard: {
//       background: 'linear-gradient(135deg, #ff6b35 0%, #ff4500 100%)',
//       color: '#ffffff'
//     },
//     statValue: {
//       fontSize: '32px',
//       fontWeight: '700',
//       marginBottom: '8px',
//       lineHeight: '1',
//       transition: 'color 0.3s ease'
//     },
//     statLabel: {
//       fontSize: '16px',
//       fontWeight: '500',
//       marginBottom: '4px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       transition: 'color 0.3s ease'
//     },
//     statSubtext: {
//       fontSize: '12px',
//       opacity: '0.8',
//       transition: 'opacity 0.3s ease'
//     },
//     chartCard: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px',
//       width: '100%',
//       display: 'flex',
//       flexDirection: 'column'
//     },
//     chartHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '24px'
//     },
//     chartTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '0'
//     },
//     chartControls: {
//       display: 'flex',
//       gap: '12px',
//       alignItems: 'center'
//     },
//     dropdown: {
//       border: '1px solid #e0e0e0',
//       borderRadius: '6px',
//       padding: '6px 12px',
//       fontSize: '14px',
//       backgroundColor: '#ffffff'
//     },
//     menuIcon: {
//       width: '20px',
//       height: '20px',
//       cursor: 'pointer'
//     },
//     productCard: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px',
//       width: '100%',
//       display: 'flex',
//       flexDirection: 'column'
//     },
//     productHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '20px'
//     },
//     productTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '0'
//     },
//     seeAllLink: {
//       color: '#666',
//       fontSize: '14px',
//       textDecoration: 'none'
//     },
//     productItem: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: '12px 0',
//       borderBottom: '1px solid #f0f0f0'
//     },
//     productImage: {
//       width: '48px',
//       height: '48px',
//       borderRadius: '8px',
//       marginRight: '16px',
//       objectFit: 'cover'
//     },
//     productInfo: {
//       flex: '1'
//     },
//     productName: {
//       fontSize: '14px',
//       fontWeight: '500',
//       color: '#333',
//       marginBottom: '4px'
//     },
//     productCategory: {
//       fontSize: '12px',
//       color: '#666'
//     },
//     productStats: {
//       textAlign: 'right'
//     },
//     productQuantity: {
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '4px'
//     },
//     productStatus: {
//       fontSize: '12px',
//       color: '#666'
//     },
//     ordersTable: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px'
//     },
//     tableTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '20px'
//     },
//     table: {
//       width: '100%',
//       borderCollapse: 'collapse'
//     },
//     tableHeader: {
//       backgroundColor: '#f8f9fa',
//       borderBottom: '1px solid #e0e0e0'
//     },
//     th: {
//       padding: '12px 16px',
//       textAlign: 'left',
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#666'
//     },
//     td: {
//       padding: '16px',
//       borderBottom: '1px solid #f0f0f0',
//       fontSize: '14px',
//       color: '#333'
//     },
//     statusProcessing: {
//       color: '#007bff',
//       fontSize: '12px',
//       fontWeight: '500'
//     },
//     statusCompleted: {
//       color: '#28a745',
//       fontSize: '12px',
//       fontWeight: '500'
//     },
//     iconContainer: {
//       width: '24px',
//       height: '24px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }
//   };

//   // Custom component for hoverable stats card
//   const StatsCard = ({ icon, label, value, subtext, isTotal = false }) => {
//     const [isHovered, setIsHovered] = React.useState(false);
    
//     const cardStyle = {
//       ...styles.statsCard,
//       ...(isTotal || isHovered ? styles.totalSalesCard : {
//         backgroundColor: '#ffffff',
//         color: '#333'
//       })
//     };

//     const iconColor = isTotal || isHovered ? '#ffffff' : '#666';
//     const textColor = isTotal || isHovered ? '#ffffff' : '#333';

//     return (
//       <div 
//         style={cardStyle}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div style={{...styles.statLabel, color: textColor}}>
//           <span style={styles.iconContainer}>
//             {React.cloneElement(icon, { size: 20, color: iconColor })}
//           </span>
//           {label}
//         </div>
//         <div style={{...styles.statValue, color: textColor}}>{value}</div>
//         <div style={{...styles.statSubtext, color: textColor}}>{subtext}</div>
//       </div>
//     );
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <div className="container">
//           <h1 style={styles.welcomeTitle}>Welcome back, <strong>Seller!</strong></h1>
//           <p style={styles.subtitle}>Here's Your Current Sales Overview</p>
//         </div>
//       </div>

//       <div className="container py-4">
//         {/* Stats Cards */}
//         <div className="row g-4">
//           <div className="col-12 col-md-4">
//             <StatsCard 
//               icon={<TrendingUp />}
//               label="Total Sales"
//               value="$2,002,332"
//               subtext="+8.1% From last month"
//             />
//           </div>
//           <div className="col-12 col-md-4">
//             <StatsCard 
//               icon={<Package />}
//               label="Total Orders"
//               value="2,107"
//               subtext="+4.6% From last month"
//             />
//           </div>
//           <div className="col-12 col-md-4">
//             <StatsCard 
//               icon={<DollarSign />}
//               label="Average Order Value"
//               value="$7,201"
//               subtext="+2.4% From last month"
//             />
//           </div>
//         </div>

//         <div className="row g-4" style={{display: 'flex', alignItems: 'stretch'}}>
//           {/* Sales Chart */}
//           <div className="col-12 col-lg-6" style={{display: 'flex'}}>
//             <div style={styles.chartCard}>
//               <div style={styles.chartHeader}>
//                 <h3 style={styles.chartTitle}>Sales Overtime</h3>
//                 <div style={styles.chartControls}>
//                   <select style={styles.dropdown}>
//                     <option>Revenue</option>
//                   </select>
//                   <select style={styles.dropdown}>
//                     <option>Order</option>
//                   </select>
//                   <div style={styles.menuIcon}>☰</div>
//                 </div>
//               </div>
//               <div style={{height: '250px'}}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={salesData}>
//                     <XAxis 
//                       dataKey="month" 
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{fontSize: 12, fill: '#666'}}
//                     />
//                     <YAxis hide />
//                     <Line 
//                       type="monotone" 
//                       dataKey="value" 
//                       stroke="#ff6b35" 
//                       strokeWidth={3}
//                       dot={{fill: '#ff6b35', strokeWidth: 2, r: 4}}
//                       activeDot={{r: 6, fill: '#ff6b35'}}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Top Selling Products */}
//           <div className="col-12 col-lg-6" style={{display: 'flex'}}>
//             <div style={styles.productCard}>
//               <div style={styles.productHeader}>
//                 <h3 style={styles.productTitle}>Top Selling Product</h3>
//                 <a href="#" style={styles.seeAllLink}>See All Product</a>
//               </div>
              
//               <div style={styles.productItem}>
//                 <div style={{...styles.productImage, backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px'}}>
//                   👟
//                 </div>
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Nike Type Sports Shoes for Men</div>
//                   <div style={styles.productCategory}>Men Shoes</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>Available</div>
//                   <div style={styles.productStatus}>135 stocks Remaining</div>
//                 </div>
//               </div>

//               <div style={styles.productItem}>
//                 <div style={{...styles.productImage, backgroundColor: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px'}}>
//                   📱
//                 </div>
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Samsung F23 5G+ Smartphone</div>
//                   <div style={styles.productCategory}>Electronics</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>Available</div>
//                   <div style={styles.productStatus}>76 stocks Remaining</div>
//                 </div>
//               </div>

//               <div style={styles.productItem}>
//                 <div style={{...styles.productImage, backgroundColor: '#8B4513', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px'}}>
//                   👕
//                 </div>
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Laptop Fashion Men's Shirt</div>
//                   <div style={styles.productCategory}>Men's Clothing</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>Available</div>
//                   <div style={styles.productStatus}>465 stocks Remaining</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Latest Orders Table */}
//         <div className="row">
//           <div className="col-12">
//             <div style={styles.ordersTable}>
//               <h3 style={styles.tableTitle}>Latest Orders</h3>
//               <div className="table-responsive">
//                 <table style={styles.table}>
//                   <thead style={styles.tableHeader}>
//                     <tr>
//                       <th style={styles.th}>Order ID</th>
//                       <th style={styles.th}>Product</th>
//                       <th style={styles.th}>Order Date</th>
//                       <th style={styles.th}>Price</th>
//                       <th style={styles.th}>Payment</th>
//                       <th style={styles.th}>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td style={styles.td}>#2861A</td>
//                       <td style={styles.td}>Nike Sportswear</td>
//                       <td style={styles.td}>Jan 12 - 12:23 pm</td>
//                       <td style={styles.td}>$134.00</td>
//                       <td style={styles.td}>COD</td>
//                       <td style={styles.td}>
//                         <span style={styles.statusProcessing}>Processing</span>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={styles.td}>#4330F</td>
//                       <td style={styles.td}>Lamp Stand</td>
//                       <td style={styles.td}>May 01 - 01:13 pm</td>
//                       <td style={styles.td}>$23.00</td>
//                       <td style={styles.td}>Credit Card</td>
//                       <td style={styles.td}>
//                         <span style={styles.statusCompleted}>Completed</span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
// import { TrendingUp, Package, DollarSign } from 'lucide-react';

// const Dashboard = () => {
//   const salesData = [
//     { month: 'Jun', value: 1500 },
//     { month: 'Jul', value: 1800 },
//     { month: 'Aug', value: 1600 },
//     { month: 'Sep', value: 2200 },
//     { month: 'Oct', value: 1900 },
//     { month: 'Nov', value: 2100 },
//     { month: 'Dec', value: 1700 },
//     { month: 'Jan', value: 2000 }
//   ];

//   const styles = {
//     container: {
//       backgroundColor: '#f8f9fa',
//       minHeight: '100vh',
//       fontFamily: 'system-ui, -apple-system, sans-serif',
//     },
//     header: {
//       padding: '20px 0',
//     },
//     welcomeTitle: {
//       fontSize: '28px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '5px'
//     },
//     subtitle: {
//       fontSize: '14px',
//       color: '#666',
//       marginBottom: '0'
//     },
//     statsCard: {
//       backgroundColor: '#ffffff !important',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       border: 'none',
//       height: '100%',
//       transition: 'all 0.3s ease',
//       cursor: 'pointer',
//       position: 'relative',
//       display: 'block'
//     },
//     totalSalesCard: {
//       background: 'linear-gradient(135deg, #ff6b35 0%, #ff4500 100%)',
//       color: '#ffffff'
//     },
//     statValue: {
//       fontSize: '32px',
//       fontWeight: '700',
//       marginBottom: '8px',
//       lineHeight: '1',
//       transition: 'color 0.3s ease'
//     },
//     statLabel: {
//       fontSize: '16px',
//       fontWeight: '500',
//       marginBottom: '4px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       transition: 'color 0.3s ease'
//     },
//     statSubtext: {
//       fontSize: '12px',
//       opacity: '0.8',
//       transition: 'opacity 0.3s ease'
//     },
//     chartCard: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px',
//       width: '100%',
//       display: 'flex',
//       flexDirection: 'column'
//     },
//     chartHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '24px'
//     },
//     chartTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '0'
//     },
//     chartControls: {
//       display: 'flex',
//       gap: '12px',
//       alignItems: 'center'
//     },
//     dropdown: {
//       border: '1px solid #e0e0e0',
//       borderRadius: '6px',
//       padding: '6px 12px',
//       fontSize: '14px',
//       backgroundColor: '#ffffff'
//     },
//     menuIcon: {
//       width: '20px',
//       height: '20px',
//       cursor: 'pointer'
//     },
//     productCard: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px',
//       width: '100%',
//       display: 'flex',
//       flexDirection: 'column'
//     },
//     productHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '20px'
//     },
//     productTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '0'
//     },
//     seeAllLink: {
//       color: '#666',
//       fontSize: '14px',
//       textDecoration: 'none'
//     },
//     productItem: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: '12px 0',
//       borderBottom: '1px solid #f0f0f0'
//     },
//     productImage: {
//       width: '48px',
//       height: '48px',
//       borderRadius: '8px',
//       marginRight: '16px',
//       objectFit: 'cover'
//     },
//     productInfo: {
//       flex: '1'
//     },
//     productName: {
//       fontSize: '14px',
//       fontWeight: '500',
//       color: '#333',
//       marginBottom: '4px'
//     },
//     productCategory: {
//       fontSize: '12px',
//       color: '#666'
//     },
//     productStats: {
//       textAlign: 'right'
//     },
//     productQuantity: {
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '4px'
//     },
//     productStatus: {
//       fontSize: '12px',
//       color: '#666'
//     },
//     ordersTable: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px'
//     },
//     tableTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '20px'
//     },
//     table: {
//       width: '100%',
//       borderCollapse: 'collapse'
//     },
//     tableHeader: {
//       backgroundColor: '#f8f9fa',
//       borderBottom: '1px solid #e0e0e0'
//     },
//     th: {
//       padding: '12px 16px',
//       textAlign: 'left',
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#666'
//     },
//     td: {
//       padding: '16px',
//       borderBottom: '1px solid #f0f0f0',
//       fontSize: '14px',
//       color: '#333'
//     },
//     statusProcessing: {
//       color: '#007bff',
//       fontSize: '12px',
//       fontWeight: '500'
//     },
//     statusCompleted: {
//       color: '#28a745',
//       fontSize: '12px',
//       fontWeight: '500'
//     },
//     iconContainer: {
//       width: '24px',
//       height: '24px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }
//   };

//   // Custom component for hoverable stats card
//   const StatsCard = ({ icon, label, value, subtext, isTotal = false }) => {
//     const [isHovered, setIsHovered] = React.useState(false);
    
//     const cardStyle = {
//       ...styles.statsCard,
//       ...(isTotal || isHovered ? styles.totalSalesCard : {
//         backgroundColor: '#ffffff',
//         color: '#333'
//       })
//     };

//     const iconColor = isTotal || isHovered ? '#ffffff' : '#666';
//     const textColor = isTotal || isHovered ? '#ffffff' : '#333';

//     return (
//       <div 
//         style={cardStyle}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div style={{...styles.statLabel, color: textColor}}>
//           <span style={styles.iconContainer}>
//             {React.cloneElement(icon, { size: 20, color: iconColor })}
//           </span>
//           {label}
//         </div>
//         <div style={{...styles.statValue, color: textColor}}>{value}</div>
//         <div style={{...styles.statSubtext, color: textColor}}>{subtext}</div>
//       </div>
//     );
//   };

//   return (
//     <div style={styles.container} className='p-sm-3'>
//       {/* Header */}
//       <div style={styles.header}>
//         <div className="container">
//           <h1 style={styles.welcomeTitle}>Welcome back, <strong>Seller!</strong></h1>
//           <p style={styles.subtitle}>Here's Your Current Sales Overview</p>
//         </div>
//       </div>

//       <div className="container py-4">
//         {/* Stats Cards */}
//         <div className="row g-4">
//           <div className="col-12 col-md-4">
//             <StatsCard 
//               icon={<TrendingUp />}
//               label="Total Sales"
//               value="$2,002,332"
//               subtext="+8.1% From last month"
//             />
//           </div>
//           <div className="col-12 col-md-4">
//             <StatsCard 
//               icon={<Package />}
//               label="Total Orders"
//               value="2,107"
//               subtext="+4.6% From last month"
//             />
//           </div>
//           <div className="col-12 col-md-4">
//             <StatsCard 
//               icon={<DollarSign />}
//               label="Average Order Value"
//               value="$7,201"
//               subtext="+2.4% From last month"
//             />
//           </div>
//         </div>

//         <div className="row g-4" style={{display: 'flex', alignItems: 'stretch'}}>
//           {/* Sales Chart */}
//           <div className="col-12 col-lg-6" style={{display: 'flex'}}>
//             <div style={styles.chartCard}>
//               <div style={styles.chartHeader}>
//                 <h3 style={styles.chartTitle}>Sales Overtime</h3>
//                 <div style={styles.chartControls}>
//                   <select style={styles.dropdown}>
//                     <option>Revenue</option>
//                   </select>
//                   <select style={styles.dropdown}>
//                     <option>Order</option>
//                   </select>
//                   <div style={styles.menuIcon}>☰</div>
//                 </div>
//               </div>
//               <div style={{height: '250px'}}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={salesData}>
//                     <XAxis 
//                       dataKey="month" 
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{fontSize: 12, fill: '#666'}}
//                     />
//                     <YAxis hide />
//                     <Line 
//                       type="monotone" 
//                       dataKey="value" 
//                       stroke="#ff6b35" 
//                       strokeWidth={3}
//                       dot={{fill: '#ff6b35', strokeWidth: 2, r: 4}}
//                       activeDot={{r: 6, fill: '#ff6b35'}}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Top Selling Products */}
//           <div className="col-12 col-lg-6" style={{display: 'flex'}}>
//             <div style={styles.productCard}>
//               <div style={styles.productHeader}>
//                 <h3 style={styles.productTitle}>Top Selling Product</h3>
//                 <a href="#" style={styles.seeAllLink}>See All Product</a>
//               </div>
              
//               <div style={styles.productItem}>
//                 <img 
//                   src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop&crop=center" 
//                   alt="Nike Sports Shoes" 
//                   style={styles.productImage}
//                 />
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Nike Type Sports Shoes for Men</div>
//                   <div style={styles.productCategory}>Men Shoes</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>Available</div>
//                   <div style={styles.productStatus}>135 stocks Remaining</div>
//                 </div>
//               </div>

//               <div style={styles.productItem}>
//                 <img 
//                   src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop&crop=center" 
//                   alt="Samsung Smartphone" 
//                   style={styles.productImage}
//                 />
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Samsung F23 5G+ Smartphone</div>
//                   <div style={styles.productCategory}>Electronics</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>Available</div>
//                   <div style={styles.productStatus}>76 stocks Remaining</div>
//                 </div>
//               </div>

//               <div style={styles.productItem}>
//                 <img 
//                   src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop&crop=center" 
//                   alt="Men's Shirt" 
//                   style={styles.productImage}
//                 />
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Laptop Fashion Men's Shirt</div>
//                   <div style={styles.productCategory}>Men's Clothing</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>Available</div>
//                   <div style={styles.productStatus}>465 stocks Remaining</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Latest Orders Table */}
//         <div className="row">
//           <div className="col-12">
//             <div style={styles.ordersTable}>
//               <h3 style={styles.tableTitle}>Latest Orders</h3>
//               <div className="table-responsive">
//                 <table style={styles.table}>
//                   <thead style={styles.tableHeader}>
//                     <tr>
//                       <th style={styles.th}>Order ID</th>
//                       <th style={styles.th}>Product</th>
//                       <th style={styles.th}>Order Date</th>
//                       <th style={styles.th}>Price</th>
//                       <th style={styles.th}>Payment</th>
//                       <th style={styles.th}>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td style={styles.td}>#2861A</td>
//                       <td style={styles.td}>Nike Sportswear</td>
//                       <td style={styles.td}>Jan 12 - 12:23 pm</td>
//                       <td style={styles.td}>$134.00</td>
//                       <td style={styles.td}>COD</td>
//                       <td style={styles.td}>
//                         <span style={styles.statusProcessing}>Processing</span>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={styles.td}>#4330F</td>
//                       <td style={styles.td}>Lamp Stand</td>
//                       <td style={styles.td}>May 01 - 01:13 pm</td>
//                       <td style={styles.td}>$23.00</td>
//                       <td style={styles.td}>Credit Card</td>
//                       <td style={styles.td}>
//                         <span style={styles.statusCompleted}>Completed</span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
// import { TrendingUp, Package, DollarSign, CheckCircle, Shield, Star } from 'lucide-react';

// const Dashboard = () => {
//   // This will come from database/API
//   const sellerStatus = 'verified'; // Options: 'registered', 'verified', 'gold'
  
//   const salesData = [
//     { month: 'Jun', value: 1500 },
//     { month: 'Jul', value: 1800 },
//     { month: 'Aug', value: 1600 },
//     { month: 'Sep', value: 2200 },
//     { month: 'Oct', value: 1900 },
//     { month: 'Nov', value: 2100 },
//     { month: 'Dec', value: 1700 },
//     { month: 'Jan', value: 2000 }
//   ];

//   const styles = {
//     container: {
//       backgroundColor: '#f8f9fa',
//       minHeight: '100vh',
//       fontFamily: 'system-ui, -apple-system, sans-serif',
//     },
//     header: {
//       padding: '20px 0',
//     },
//     welcomeTitle: {
//       fontSize: '28px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '5px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '16px',
//       flexWrap: 'wrap'
//     },
//     subtitle: {
//       fontSize: '14px',
//       color: '#666',
//       marginBottom: '0'
//     },
//     badgesContainer: {
//       display: 'flex',
//       gap: '12px',
//       flexWrap: 'wrap',
//       alignItems: 'center'
//     },
//     badge: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '6px',
//       padding: '6px 12px',
//       borderRadius: '20px',
//       fontSize: '12px',
//       fontWeight: '600',
//       boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//       transition: 'all 0.3s ease'
//     },
//     registeredBadge: {
//       backgroundColor: '#e3f2fd',
//       color: '#1976d2',
//       border: '1px solid #bbdefb'
//     },
//     verifiedBadge: {
//       backgroundColor: '#e8f5e8',
//       color: '#2e7d32',
//       border: '1px solid #c8e6c9'
//     },
//     goldBadge: {
//       background: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)',
//       color: '#b8860b',
//       border: '1px solid #daa520',
//       fontWeight: '700'
//     },
//     statsCard: {
//       backgroundColor: '#ffffff !important',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       border: 'none',
//       height: '100%',
//       transition: 'all 0.3s ease',
//       cursor: 'pointer',
//       position: 'relative',
//       display: 'block'
//     },
//     totalSalesCard: {
//       background: 'linear-gradient(135deg, #ff6b35 0%, #ff4500 100%)',
//       color: '#ffffff'
//     },
//     statValue: {
//       fontSize: '32px',
//       fontWeight: '700',
//       marginBottom: '8px',
//       lineHeight: '1',
//       transition: 'color 0.3s ease'
//     },
//     statLabel: {
//       fontSize: '16px',
//       fontWeight: '500',
//       marginBottom: '4px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       transition: 'color 0.3s ease'
//     },
//     statSubtext: {
//       fontSize: '12px',
//       opacity: '0.8',
//       transition: 'opacity 0.3s ease'
//     },
//     chartCard: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px',
//       width: '100%',
//       display: 'flex',
//       flexDirection: 'column'
//     },
//     chartHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '24px'
//     },
//     chartTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '0'
//     },
//     chartControls: {
//       display: 'flex',
//       gap: '12px',
//       alignItems: 'center'
//     },
//     dropdown: {
//       border: '1px solid #e0e0e0',
//       borderRadius: '6px',
//       padding: '6px 12px',
//       fontSize: '14px',
//       backgroundColor: '#ffffff'
//     },
//     menuIcon: {
//       width: '20px',
//       height: '20px',
//       cursor: 'pointer'
//     },
//     productCard: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px',
//       width: '100%',
//       display: 'flex',
//       flexDirection: 'column'
//     },
//     productHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '20px'
//     },
//     productTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '0'
//     },
//     seeAllLink: {
//       color: '#666',
//       fontSize: '14px',
//       textDecoration: 'none'
//     },
//     productItem: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: '12px 0',
//       borderBottom: '1px solid #f0f0f0'
//     },
//     productImage: {
//       width: '48px',
//       height: '48px',
//       borderRadius: '8px',
//       marginRight: '16px',
//       objectFit: 'cover'
//     },
//     productInfo: {
//       flex: '1'
//     },
//     productName: {
//       fontSize: '14px',
//       fontWeight: '500',
//       color: '#333',
//       marginBottom: '4px'
//     },
//     productCategory: {
//       fontSize: '12px',
//       color: '#666'
//     },
//     productStats: {
//       textAlign: 'right'
//     },
//     productQuantity: {
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '4px'
//     },
//     productStatus: {
//       fontSize: '12px',
//       color: '#666'
//     },
//     ordersTable: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px'
//     },
//     tableTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '20px'
//     },
//     table: {
//       width: '100%',
//       borderCollapse: 'collapse'
//     },
//     tableHeader: {
//       backgroundColor: '#f8f9fa',
//       borderBottom: '1px solid #e0e0e0'
//     },
//     th: {
//       padding: '12px 16px',
//       textAlign: 'left',
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#666'
//     },
//     td: {
//       padding: '16px',
//       borderBottom: '1px solid #f0f0f0',
//       fontSize: '14px',
//       color: '#333'
//     },
//     statusProcessing: {
//       color: '#007bff',
//       fontSize: '12px',
//       fontWeight: '500'
//     },
//     statusCompleted: {
//       color: '#28a745',
//       fontSize: '12px',
//       fontWeight: '500'
//     },
//     iconContainer: {
//       width: '24px',
//       height: '24px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }
//   };

//   // Badge Component
//   const SellerBadge = ({ type, icon, label }) => {
//     const getBadgeStyle = () => {
//       switch(type) {
//         case 'registered':
//           return styles.registeredBadge;
//         case 'verified':
//           return styles.verifiedBadge;
//         case 'gold':
//           return styles.goldBadge;
//         default:
//           return styles.registeredBadge;
//       }
//     };

//     return (
//       <div style={{...styles.badge, ...getBadgeStyle()}}>
//         {icon}
//         <span>{label}</span>
//       </div>
//     );
//   };

//   // Function to get current seller badge based on status
//   const getCurrentBadge = (status) => {
//     switch(status) {
//       case 'registered':
//         return <SellerBadge type="registered" icon={<CheckCircle size={14} />} label="Registered" />;
//       case 'verified':
//         return <SellerBadge type="verified" icon={<Shield size={14} />} label="Verified" />;
//       case 'gold':
//         return <SellerBadge type="gold" icon={<Star size={14} />} label="GOLD" />;
//       default:
//         return <SellerBadge type="registered" icon={<CheckCircle size={14} />} label="Registered" />;
//     }
//   };

//   // Custom component for hoverable stats card
//   const StatsCard = ({ icon, label, value, subtext, isTotal = false }) => {
//     const [isHovered, setIsHovered] = React.useState(false);
    
//     const cardStyle = {
//       ...styles.statsCard,
//       ...(isTotal || isHovered ? styles.totalSalesCard : {
//         backgroundColor: '#ffffff',
//         color: '#333'
//       })
//     };

//     const iconColor = isTotal || isHovered ? '#ffffff' : '#666';
//     const textColor = isTotal || isHovered ? '#ffffff' : '#333';

//     return (
//       <div 
//         style={cardStyle}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div style={{...styles.statLabel, color: textColor}}>
//           <span style={styles.iconContainer}>
//             {React.cloneElement(icon, { size: 20, color: iconColor })}
//           </span>
//           {label}
//         </div>
//         <div style={{...styles.statValue, color: textColor}}>{value}</div>
//         <div style={{...styles.statSubtext, color: textColor}}>{subtext}</div>
//       </div>
//     );
//   };

//   return (
//     <div style={styles.container} className='p-sm-3'>
//       {/* Header */}
//       <div style={styles.header}>
//         <div className="container">
//           <h1 style={styles.welcomeTitle}>
//             Welcome back, <strong>Seller!</strong>
//             <div style={styles.badgesContainer}>
//               {getCurrentBadge(sellerStatus)}
//             </div>
//           </h1>
//           <p style={styles.subtitle}>Here's Your Current Sales Overview</p>
//         </div>
//       </div>

//       <div className="container py-4">
//         {/* Stats Cards */}
//         <div className="row g-4">
//           <div className="col-12 col-md-4">
//             <StatsCard 
//               icon={<TrendingUp />}
//               label="Total Sales"
//               value="$2,002,332"
//               subtext="+8.1% From last month"
//             />
//           </div>
//           <div className="col-12 col-md-4">
//             <StatsCard 
//               icon={<Package />}
//               label="Total Orders"
//               value="2,107"
//               subtext="+4.6% From last month"
//             />
//           </div>
//           <div className="col-12 col-md-4">
//             <StatsCard 
//               icon={<DollarSign />}
//               label="Average Order Value"
//               value="$7,201"
//               subtext="+2.4% From last month"
//             />
//           </div>
//         </div>

//         <div className="row g-4" style={{display: 'flex', alignItems: 'stretch'}}>
//           {/* Sales Chart */}
//           <div className="col-12 col-lg-6" style={{display: 'flex'}}>
//             <div style={styles.chartCard}>
//               <div style={styles.chartHeader}>
//                 <h3 style={styles.chartTitle}>Sales Overtime</h3>
//                 <div style={styles.chartControls}>
//                   <select style={styles.dropdown}>
//                     <option>Revenue</option>
//                   </select>
//                   <select style={styles.dropdown}>
//                     <option>Order</option>
//                   </select>
//                   <div style={styles.menuIcon}>☰</div>
//                 </div>
//               </div>
//               <div style={{height: '250px'}}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={salesData}>
//                     <XAxis 
//                       dataKey="month" 
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{fontSize: 12, fill: '#666'}}
//                     />
//                     <YAxis hide />
//                     <Line 
//                       type="monotone" 
//                       dataKey="value" 
//                       stroke="#ff6b35" 
//                       strokeWidth={3}
//                       dot={{fill: '#ff6b35', strokeWidth: 2, r: 4}}
//                       activeDot={{r: 6, fill: '#ff6b35'}}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Top Selling Products */}
//           <div className="col-12 col-lg-6" style={{display: 'flex'}}>
//             <div style={styles.productCard}>
//               <div style={styles.productHeader}>
//                 <h3 style={styles.productTitle}>Top Selling Product</h3>
//                 <a href="#" style={styles.seeAllLink}>See All Product</a>
//               </div>
              
//               <div style={styles.productItem}>
//                 <img 
//                   src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop&crop=center" 
//                   alt="Nike Sports Shoes" 
//                   style={styles.productImage}
//                 />
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Nike Type Sports Shoes for Men</div>
//                   <div style={styles.productCategory}>Men Shoes</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>Available</div>
//                   <div style={styles.productStatus}>135 stocks Remaining</div>
//                 </div>
//               </div>

//               <div style={styles.productItem}>
//                 <img 
//                   src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop&crop=center" 
//                   alt="Samsung Smartphone" 
//                   style={styles.productImage}
//                 />
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Samsung F23 5G+ Smartphone</div>
//                   <div style={styles.productCategory}>Electronics</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>Available</div>
//                   <div style={styles.productStatus}>76 stocks Remaining</div>
//                 </div>
//               </div>

//               <div style={styles.productItem}>
//                 <img 
//                   src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop&crop=center" 
//                   alt="Men's Shirt" 
//                   style={styles.productImage}
//                 />
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Laptop Fashion Men's Shirt</div>
//                   <div style={styles.productCategory}>Men's Clothing</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>Available</div>
//                   <div style={styles.productStatus}>465 stocks Remaining</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Latest Orders Table */}
//         <div className="row">
//           <div className="col-12">
//             <div style={styles.ordersTable}>
//               <div style={styles.productHeader}>
//               <h3 style={styles.tableTitle}>Latest Orders</h3>
//               <a href="#" style={styles.seeAllLink}>See All</a>
//               </div>
//               <div className="table-responsive">
//                 <table style={styles.table}>
//                   <thead style={styles.tableHeader}>
//                     <tr>
//                       <th style={styles.th}>Order ID</th>
//                       <th style={styles.th}>Product</th>
//                       <th style={styles.th}>Order Date</th>
//                       <th style={styles.th}>Price</th>
//                       <th style={styles.th}>Payment</th>
//                       <th style={styles.th}>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td style={styles.td}>#2861A</td>
//                       <td style={styles.td}>Nike Sportswear</td>
//                       <td style={styles.td}>Jan 12 - 12:23 pm</td>
//                       <td style={styles.td}>$134.00</td>
//                       <td style={styles.td}>COD</td>
//                       <td style={styles.td}>
//                         <span style={styles.statusProcessing}>Processing</span>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={styles.td}>#4330F</td>
//                       <td style={styles.td}>Lamp Stand</td>
//                       <td style={styles.td}>May 01 - 01:13 pm</td>
//                       <td style={styles.td}>$23.00</td>
//                       <td style={styles.td}>Credit Card</td>
//                       <td style={styles.td}>
//                         <span style={styles.statusCompleted}>Completed</span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
// import { TrendingUp, Package, DollarSign, CheckCircle, Shield, Star, MoreHorizontal } from 'lucide-react';

// const Dashboard = () => {
//   // This will come from database/API
//   const sellerStatus = 'verified'; // Options: 'registered', 'verified', 'gold'
  
//   const salesData = [
//     { month: 'Jun', value: 1500 },
//     { month: 'Jul', value: 1800 },
//     { month: 'Aug', value: 1600 },
//     { month: 'Sep', value: 2200 },
//     { month: 'Oct', value: 1900 },
//     { month: 'Nov', value: 2100 },
//     { month: 'Dec', value: 1700 },
//     { month: 'Jan', value: 2000 }
//   ];

//   const styles = {
//     container: {
//       backgroundColor: '#f8f9fa',
//       minHeight: '100vh',
//       fontFamily: 'system-ui, -apple-system, sans-serif',
//     },
//     header: {
//       padding: '20px 0',
//     },
//     welcomeTitle: {
//       fontSize: '28px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '5px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '16px',
//       flexWrap: 'wrap'
//     },
//     subtitle: {
//       fontSize: '14px',
//       color: '#666',
//       marginBottom: '0'
//     },
//     badgesContainer: {
//       display: 'flex',
//       gap: '12px',
//       flexWrap: 'wrap',
//       alignItems: 'center'
//     },
//     badge: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '6px',
//       padding: '6px 12px',
//       borderRadius: '20px',
//       fontSize: '12px',
//       fontWeight: '600',
//       boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//       transition: 'all 0.3s ease'
//     },
//     registeredBadge: {
//       backgroundColor: '#e3f2fd',
//       color: '#1976d2',
//       border: '1px solid #bbdefb'
//     },
//     verifiedBadge: {
//       backgroundColor: '#e8f5e8',
//       color: '#2e7d32',
//       border: '1px solid #c8e6c9'
//     },
//     goldBadge: {
//       background: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)',
//       color: '#b8860b',
//       border: '1px solid #daa520',
//       fontWeight: '700'
//     },
//     statsCard: {
//       backgroundColor: '#ffffff !important',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       border: 'none',
//       height: '100%',
//       transition: 'all 0.3s ease',
//       cursor: 'pointer',
//       position: 'relative',
//       display: 'block'
//     },
//     totalSalesCard: {
//       background: 'linear-gradient(135deg, #ff6b35 0%, #ff4500 100%)',
//       color: '#ffffff'
//     },
//     statValue: {
//       fontSize: '32px',
//       fontWeight: '700',
//       marginBottom: '8px',
//       lineHeight: '1',
//       transition: 'color 0.3s ease'
//     },
//     statLabel: {
//       fontSize: '16px',
//       fontWeight: '500',
//       marginBottom: '4px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       transition: 'color 0.3s ease'
//     },
//     statSubtext: {
//       fontSize: '12px',
//       opacity: '0.8',
//       transition: 'opacity 0.3s ease'
//     },
//     chartCard: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '16px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px',
//       width: '100%',
//       display: 'flex',
//       flexDirection: 'column',
//       // Mobile responsive padding
//       '@media (min-width: 768px)': {
//         padding: '24px'
//       }
//     },
//     chartHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'flex-start',
//       marginBottom: '20px',
//       flexDirection: 'column',
//       gap: '12px',
//       // Desktop layout
//       '@media (min-width: 768px)': {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: '0'
//       }
//     },
//     chartTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '0'
//     },
//     chartControls: {
//       display: 'flex',
//       gap: '8px',
//       alignItems: 'center',
//       flexWrap: 'wrap',
//       width: '100%',
//       // Desktop layout
//       '@media (min-width: 768px)': {
//         width: 'auto',
//         gap: '12px'
//       }
//     },
//     dropdown: {
//       border: '1px solid #e0e0e0',
//       borderRadius: '6px',
//       padding: '8px 12px',
//       fontSize: '14px',
//       backgroundColor: '#ffffff',
//       minWidth: '80px',
//       flex: '1',
//       // Desktop layout
//       '@media (min-width: 768px)': {
//         flex: 'none'
//       }
//     },
//     menuIcon: {
//       width: '20px',
//       height: '20px',
//       cursor: 'pointer',
//       color: '#666',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     chartContainer: {
//       height: '200px',
//       width: '100%',
//       // Larger height on desktop
//       '@media (min-width: 768px)': {
//         height: '250px'
//       }
//     },
//     productCard: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '16px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px',
//       width: '100%',
//       display: 'flex',
//       flexDirection: 'column',
//       // Desktop padding
//       '@media (min-width: 768px)': {
//         padding: '24px'
//       }
//     },
//     productHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '20px',
//       flexDirection: 'column',
//       gap: '8px',
//       // Desktop layout
//       '@media (min-width: 768px)': {
//         flexDirection: 'row',
//         gap: '0'
//       }
//     },
//     productTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '0'
//     },
//     seeAllLink: {
//       color: '#666',
//       fontSize: '14px',
//       textDecoration: 'none'
//     },
//     productItem: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: '12px 0',
//       borderBottom: '1px solid #f0f0f0',
//       flexDirection: 'column',
//       gap: '8px',
//       // Desktop layout
//       '@media (min-width: 576px)': {
//         flexDirection: 'row',
//         gap: '0'
//       }
//     },
//     productImage: {
//       width: '48px',
//       height: '48px',
//       borderRadius: '8px',
//       marginRight: '0',
//       objectFit: 'cover',
//       // Desktop margin
//       '@media (min-width: 576px)': {
//         marginRight: '16px'
//       }
//     },
//     productInfo: {
//       flex: '1',
//       textAlign: 'center',
//       // Desktop text alignment
//       '@media (min-width: 576px)': {
//         textAlign: 'left'
//       }
//     },
//     productName: {
//       fontSize: '14px',
//       fontWeight: '500',
//       color: '#333',
//       marginBottom: '4px'
//     },
//     productCategory: {
//       fontSize: '12px',
//       color: '#666'
//     },
//     productStats: {
//       textAlign: 'center',
//       // Desktop text alignment
//       '@media (min-width: 576px)': {
//         textAlign: 'right'
//       }
//     },
//     productQuantity: {
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '4px'
//     },
//     productStatus: {
//       fontSize: '12px',
//       color: '#666'
//     },
//     ordersTable: {
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       padding: '16px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//       marginTop: '24px',
//       // Desktop padding
//       '@media (min-width: 768px)': {
//         padding: '24px'
//       }
//     },
//     tableTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '20px'
//     },
//     table: {
//       width: '100%',
//       borderCollapse: 'collapse'
//     },
//     tableHeader: {
//       backgroundColor: '#f8f9fa',
//       borderBottom: '1px solid #e0e0e0'
//     },
//     th: {
//       padding: '12px 8px',
//       textAlign: 'left',
//       fontSize: '12px',
//       fontWeight: '600',
//       color: '#666',
//       // Desktop padding
//       '@media (min-width: 768px)': {
//         padding: '12px 16px',
//         fontSize: '14px'
//       }
//     },
//     td: {
//       padding: '12px 8px',
//       borderBottom: '1px solid #f0f0f0',
//       fontSize: '12px',
//       color: '#333',
//       // Desktop padding
//       '@media (min-width: 768px)': {
//         padding: '16px',
//         fontSize: '14px'
//       }
//     },
//     statusProcessing: {
//       color: '#007bff',
//       fontSize: '12px',
//       fontWeight: '500'
//     },
//     statusCompleted: {
//       color: '#28a745',
//       fontSize: '12px',
//       fontWeight: '500'
//     },
//     iconContainer: {
//       width: '24px',
//       height: '24px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }
//   };

//   // Badge Component
//   const SellerBadge = ({ type, icon, label }) => {
//     const getBadgeStyle = () => {
//       switch(type) {
//         case 'registered':
//           return styles.registeredBadge;
//         case 'verified':
//           return styles.verifiedBadge;
//         case 'gold':
//           return styles.goldBadge;
//         default:
//           return styles.registeredBadge;
//       }
//     };

//     return (
//       <div style={{...styles.badge, ...getBadgeStyle()}}>
//         {icon}
//         <span>{label}</span>
//       </div>
//     );
//   };

//   // Function to get current seller badge based on status
//   const getCurrentBadge = (status) => {
//     switch(status) {
//       case 'registered':
//         return <SellerBadge type="registered" icon={<CheckCircle size={14} />} label="Registered" />;
//       case 'verified':
//         return <SellerBadge type="verified" icon={<Shield size={14} />} label="Verified" />;
//       case 'gold':
//         return <SellerBadge type="gold" icon={<Star size={14} />} label="GOLD" />;
//       default:
//         return <SellerBadge type="registered" icon={<CheckCircle size={14} />} label="Registered" />;
//     }
//   };

//   // Custom component for hoverable stats card
//   const StatsCard = ({ icon, label, value, subtext, isTotal = false }) => {
//     const [isHovered, setIsHovered] = React.useState(false);
    
//     const cardStyle = {
//       ...styles.statsCard,
//       ...(isTotal || isHovered ? styles.totalSalesCard : {
//         backgroundColor: '#ffffff',
//         color: '#333'
//       })
//     };

//     const iconColor = isTotal || isHovered ? '#ffffff' : '#666';
//     const textColor = isTotal || isHovered ? '#ffffff' : '#333';

//     return (
//       <div 
//         style={cardStyle}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div style={{...styles.statLabel, color: textColor}}>
//           <span style={styles.iconContainer}>
//             {React.cloneElement(icon, { size: 20, color: iconColor })}
//           </span>
//           {label}
//         </div>
//         <div style={{...styles.statValue, color: textColor}}>{value}</div>
//         <div style={{...styles.statSubtext, color: textColor}}>{subtext}</div>
//       </div>
//     );
//   };

//   return (
//     <div style={styles.container} className="p-2 p-md-3">
//       {/* Header */}
//       <div style={styles.header}>
//         <div className="container-fluid">
//           <h1 style={styles.welcomeTitle}>
//             Welcome back, <strong>Seller!</strong>
//             <div style={styles.badgesContainer}>
//               {getCurrentBadge(sellerStatus)}
//             </div>
//           </h1>
//           <p style={styles.subtitle}>Here's Your Current Sales Overview</p>
//         </div>
//       </div>

//       <div className="container-fluid py-4">
//         {/* Stats Cards */}
//         <div className="row g-3 g-md-4">
//           <div className="col-12 col-md-4">
//             <StatsCard 
//               icon={<TrendingUp />}
//               label="Total Sales"
//               value="$2,002,332"
//               subtext="+8.1% From last month"
//             />
//           </div>
//           <div className="col-12 col-md-4">
//             <StatsCard 
//               icon={<Package />}
//               label="Total Orders"
//               value="2,107"
//               subtext="+4.6% From last month"
//             />
//           </div>
//           <div className="col-12 col-md-4">
//             <StatsCard 
//               icon={<DollarSign />}
//               label="Average Order Value"
//               value="$7,201"
//               subtext="+2.4% From last month"
//             />
//           </div>
//         </div>

//         <div className="row g-3 g-md-4">
//           {/* Sales Chart - Enhanced Responsive */}
//           <div className="col-12 col-xl-6">
//             <div style={styles.chartCard}>
//               <div style={styles.chartHeader}>
//                 <h3 style={styles.chartTitle}>Sales Overtime</h3>
//                 <div style={styles.chartControls}>
//                   <select style={styles.dropdown}>
//                     <option>Revenue</option>
//                     <option>Units</option>
//                     <option>Profit</option>
//                   </select>
//                   <select style={styles.dropdown}>
//                     <option>Order</option>
//                     <option>Product</option>
//                     <option>Customer</option>
//                   </select>
//                   <div style={styles.menuIcon}>
//                     <MoreHorizontal size={20} />
//                   </div>
//                 </div>
//               </div>
//               <div style={styles.chartContainer}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={salesData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
//                     <XAxis 
//                       dataKey="month" 
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{fontSize: 12, fill: '#666'}}
//                       interval={0}
//                     />
//                     <YAxis hide />
//                     <Line 
//                       type="monotone" 
//                       dataKey="value" 
//                       stroke="#ff6b35" 
//                       strokeWidth={3}
//                       dot={{fill: '#ff6b35', strokeWidth: 2, r: 3}}
//                       activeDot={{r: 5, fill: '#ff6b35', strokeWidth: 2}}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Top Selling Products */}
//           <div className="col-12 col-xl-6">
//             <div style={styles.productCard}>
//               <div style={styles.productHeader}>
//                 <h3 style={styles.productTitle}>Top Selling Product</h3>
//                 <a href="#" style={styles.seeAllLink}>See All Product</a>
//               </div>
              
//               <div style={styles.productItem}>
//                 <img 
//                   src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop&crop=center" 
//                   alt="Nike Sports Shoes" 
//                   style={styles.productImage}
//                 />
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Nike Type Sports Shoes for Men</div>
//                   <div style={styles.productCategory}>Men Shoes</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>Available</div>
//                   <div style={styles.productStatus}>135 stocks Remaining</div>
//                 </div>
//               </div>

//               <div style={styles.productItem}>
//                 <img 
//                   src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop&crop=center" 
//                   alt="Samsung Smartphone" 
//                   style={styles.productImage}
//                 />
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Samsung F23 5G+ Smartphone</div>
//                   <div style={styles.productCategory}>Electronics</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>Available</div>
//                   <div style={styles.productStatus}>76 stocks Remaining</div>
//                 </div>
//               </div>

//               <div style={styles.productItem}>
//                 <img 
//                   src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop&crop=center" 
//                   alt="Men's Shirt" 
//                   style={styles.productImage}
//                 />
//                 <div style={styles.productInfo}>
//                   <div style={styles.productName}>Laptop Fashion Men's Shirt</div>
//                   <div style={styles.productCategory}>Men's Clothing</div>
//                 </div>
//                 <div style={styles.productStats}>
//                   <div style={styles.productQuantity}>Available</div>
//                   <div style={styles.productStatus}>465 stocks Remaining</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Latest Orders Table */}
//         <div className="row">
//           <div className="col-12">
//             <div style={styles.ordersTable}>
//               <div style={styles.productHeader}>
//                 <h3 style={styles.tableTitle}>Latest Orders</h3>
//                 <a href="#" style={styles.seeAllLink}>See All</a>
//               </div>
//               <div className="table-responsive">
//                 <table style={styles.table}>
//                   <thead style={styles.tableHeader}>
//                     <tr>
//                       <th style={styles.th}>Order ID</th>
//                       <th style={styles.th}>Product</th>
//                       <th style={styles.th}>Date</th>
//                       <th style={styles.th}>Price</th>
//                       <th style={styles.th}>Payment</th>
//                       <th style={styles.th}>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td style={styles.td}>#2861A</td>
//                       <td style={styles.td}>Nike Sportswear</td>
//                       <td style={styles.td}>Jan 12</td>
//                       <td style={styles.td}>$134.00</td>
//                       <td style={styles.td}>COD</td>
//                       <td style={styles.td}>
//                         <span style={styles.statusProcessing}>Processing</span>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={styles.td}>#4330F</td>
//                       <td style={styles.td}>Lamp Stand</td>
//                       <td style={styles.td}>May 01</td>
//                       <td style={styles.td}>$23.00</td>
//                       <td style={styles.td}>Credit Card</td>
//                       <td style={styles.td}>
//                         <span style={styles.statusCompleted}>Completed</span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, DollarSign, CheckCircle, Shield, Star } from 'lucide-react';

const Dashboard = () => {
  // This will come from database/API
  const sellerStatus = 'verified'; // Options: 'registered', 'verified', 'gold'
  
  const salesData = [
    { month: 'Jun', value: 1500 },
    { month: 'Jul', value: 1800 },
    { month: 'Aug', value: 1600 },
    { month: 'Sep', value: 2200 },
    { month: 'Oct', value: 1900 },
    { month: 'Nov', value: 2100 },
    { month: 'Dec', value: 1700 },
    { month: 'Jan', value: 2000 }
  ];

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
        case 'registered':
          return styles.registeredBadge;
        case 'verified':
          return styles.verifiedBadge;
        case 'gold':
          return styles.goldBadge;
        default:
          return styles.registeredBadge;
      }
    };

    return (
      <div style={{...styles.badge, ...getBadgeStyle()}}>
        {icon}
        <span>{label}</span>
      </div>
    );
  };

  // Function to get current seller badge based on status
  const getCurrentBadge = (status) => {
    switch(status) {
      case 'registered':
        return <SellerBadge type="registered" icon={<CheckCircle size={14} />} label="Registered" />;
      case 'verified':
        return <SellerBadge type="verified" icon={<Shield size={14} />} label="Verified" />;
      case 'gold':
        return <SellerBadge type="gold" icon={<Star size={14} />} label="GOLD" />;
      default:
        return <SellerBadge type="registered" icon={<CheckCircle size={14} />} label="Registered" />;
    }
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
      {/* Header */}
      <div style={styles.header}>
        <div className="container">
          <h1 style={styles.welcomeTitle}>
            Welcome back, <strong>Seller!</strong>
            <div style={styles.badgesContainer}>
              {getCurrentBadge(sellerStatus)}
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
              value="$2,002,332"
              subtext="+8.1% From last month"
            />
          </div>
          <div className="col-12 col-md-4">
            <StatsCard 
              icon={<Package />}
              label="Total Orders"
              value="2,107"
              subtext="+4.6% From last month"
            />
          </div>
          <div className="col-12 col-md-4">
            <StatsCard 
              icon={<DollarSign />}
              label="Average Order Value"
              value="$7,201"
              subtext="+2.4% From last month"
            />
          </div>
        </div>

        <div className="row g-4" style={{display: 'flex', alignItems: 'stretch'}}>
          {/* Sales Chart */}
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
              
              <div style={styles.productItem}>
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop&crop=center" 
                  alt="Nike Sports Shoes" 
                  style={styles.productImage}
                />
                <div style={styles.productInfo}>
                  <div style={styles.productName}>Nike Type Sports Shoes for Men</div>
                  <div style={styles.productCategory}>Men Shoes</div>
                </div>
                <div style={styles.productStats}>
                  <div style={styles.productQuantity}>Available</div>
                  <div style={styles.productStatus}>135 stocks Remaining</div>
                </div>
              </div>

              <div style={styles.productItem}>
                <img 
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop&crop=center" 
                  alt="Samsung Smartphone" 
                  style={styles.productImage}
                />
                <div style={styles.productInfo}>
                  <div style={styles.productName}>Samsung F23 5G+ Smartphone</div>
                  <div style={styles.productCategory}>Electronics</div>
                </div>
                <div style={styles.productStats}>
                  <div style={styles.productQuantity}>Available</div>
                  <div style={styles.productStatus}>76 stocks Remaining</div>
                </div>
              </div>

              <div style={styles.productItem}>
                <img 
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop&crop=center" 
                  alt="Men's Shirt" 
                  style={styles.productImage}
                />
                <div style={styles.productInfo}>
                  <div style={styles.productName}>Laptop Fashion Men's Shirt</div>
                  <div style={styles.productCategory}>Men's Clothing</div>
                </div>
                <div style={styles.productStats}>
                  <div style={styles.productQuantity}>Available</div>
                  <div style={styles.productStatus}>465 stocks Remaining</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Orders Table */}
        <div className="row">
          <div className="col-12">
            <div style={styles.ordersTable}>
              <div style={styles.productHeader}>
              <h3 style={styles.tableTitle}>Latest Orders</h3>
              <a href="#" style={styles.seeAllLink}>See All</a>
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
                    <tr>
                      <td style={styles.td}>#2861A</td>
                      <td style={styles.td}>Nike Sportswear</td>
                      <td style={styles.td}>Jan 12 - 12:23 pm</td>
                      <td style={styles.td}>$134.00</td>
                      <td style={styles.td}>COD</td>
                      <td style={styles.td}>
                        <span style={styles.statusProcessing}>Processing</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.td}>#4330F</td>
                      <td style={styles.td}>Lamp Stand</td>
                      <td style={styles.td}>May 01 - 01:13 pm</td>
                      <td style={styles.td}>$23.00</td>
                      <td style={styles.td}>Credit Card</td>
                      <td style={styles.td}>
                        <span style={styles.statusCompleted}>Completed</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;