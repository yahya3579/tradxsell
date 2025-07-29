import React, { useState } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const FeedbackV2 = () => {
  const [sortBy, setSortBy] = useState('Newest');
  const [searchTerm, setSearchTerm] = useState('');

  const feedbackData = [
    {
      email: 'jane@microsoft.com',
      productId: '01-1392-H',
      feedback: 'feedback will show here...'
    },
    {
      email: 'jane@microsoft.com',
      productId: '01-1392-H',
      feedback: 'feedback will show here...'
    },
    {
      email: 'jane@microsoft.com',
      productId: '01-1392-H',
      feedback: 'feedback will show here...'
    }
  ];

  const styles = {
    container: {
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '24px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#333',
      margin: 0
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    searchContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    searchInput: {
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '8px 12px 8px 36px',
      fontSize: '14px',
      width: '200px',
      outline: 'none',
      transition: 'border-color 0.2s ease'
    },
    searchIcon: {
      position: 'absolute',
      left: '10px',
      color: '#666',
      width: '16px',
      height: '16px'
    },
    sortContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    sortLabel: {
      fontSize: '14px',
      color: '#666',
      fontWeight: '500'
    },
    sortSelect: {
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '8px 32px 8px 12px',
      fontSize: '14px',
      backgroundColor: 'white',
      outline: 'none',
      appearance: 'none',
      cursor: 'pointer',
      minWidth: '100px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '24px'
    },
    tableHeader: {
      borderBottom: '2px solid #f0f0f0',
      padding: '16px 12px',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '600',
      color: '#666',
      backgroundColor: '#fafafa'
    },
    tableCell: {
      padding: '16px 12px',
      borderBottom: '1px solid #f0f0f0',
      fontSize: '14px',
      color: '#333',
      verticalAlign: 'middle'
    },
    tableRow: {
      transition: 'background-color 0.2s ease'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '24px'
    },
    paginationInfo: {
      fontSize: '14px',
      color: '#666'
    },
    paginationControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    paginationButton: {
      border: 'none',
      backgroundColor: 'transparent',
      color: '#666',
      padding: '8px',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    paginationNumber: {
      border: 'none',
      backgroundColor: 'transparent',
      color: '#666',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.2s ease'
    },
    paginationActive: {
      backgroundColor: '#ff4444',
      color: 'white'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Customer Feedback</h1>
          <div style={styles.controls}>
            <div style={styles.searchContainer}>
              <Search style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search"
                style={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div style={styles.sortContainer}>
              <span style={styles.sortLabel}>Sort by:</span>
              <div style={{ position: 'relative' }}>
                <select
                  style={styles.sortSelect}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="Newest">Newest</option>
                  <option value="Oldest">Oldest</option>
                  <option value="Email">Email</option>
                  <option value="Product ID">Product ID</option>
                </select>
                <ChevronDown
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '16px',
                    height: '16px',
                    color: '#666',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Product ID</th>
              <th style={styles.tableHeader}>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((item, index) => (
              <tr 
                key={index} 
                style={styles.tableRow}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <td style={styles.tableCell}>{item.email}</td>
                <td style={styles.tableCell}>{item.productId}</td>
                <td style={styles.tableCell}>{item.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.pagination}>
          <div style={styles.paginationInfo}>
            Showing result 1 to 3 of 2558 entries
          </div>
          <div style={styles.paginationControls}>
            <button 
              style={styles.paginationButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              style={{...styles.paginationNumber, ...styles.paginationActive}}
            >
              1
            </button>
            <button 
              style={styles.paginationNumber}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              2
            </button>
            <button 
              style={styles.paginationNumber}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              3
            </button>
            <button 
              style={styles.paginationNumber}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              4
            </button>
            <span style={styles.paginationNumber}>...</span>
            <button 
              style={styles.paginationNumber}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              40
            </button>
            <button 
              style={styles.paginationButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackV2;