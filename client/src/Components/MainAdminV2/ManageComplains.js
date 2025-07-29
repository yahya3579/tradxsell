import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ManageComplains() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_LOCALHOST_URL}/complaints`);
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div style={{ display: 'flex', backgroundColor: 'rgb(238, 233, 233)', minHeight: '100vh', width: '100%' }}>
      <div style={{ flex: 1, padding: '20px' }}>
        <style>
          {`
            .white-container {
              background-color: white;
              border-radius: 12px;
              padding: 20px;
            }
            
            .table-container {
              overflow-x: auto;
              background-color: white;
              width: 100%;
              display: block; /* Important for scrollbar to show */
            }
            
            @media (max-width: 768px) {
              .white-container {
                width: 100%;
                max-width: 100vw;
                margin-left: 0;
                margin-right: 0;
              }
              
              /* Force scrollbar to show on mobile */
              .table-container::-webkit-scrollbar {
                height: 6px;
                background-color: #F5F5F5;
              }
              
              .table-container::-webkit-scrollbar-thumb {
                background-color: #888;
                border-radius: 3px;
              }
            }
          `}
        </style>
        <div className="white-container">
          <h4 style={{ color: 'black', marginBottom: '20px', fontWeight: 'bold', fontSize:'16.4px' }}>All Complaints</h4>
          <div className="table-container">
            <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'separate', borderSpacing: 0, marginLeft:'0px' }}>
              <thead>
                <tr style={{ backgroundColor: 'white' }}>
                  <th style={tableHeaderStyle}>Email</th>
                  <th style={tableHeaderStyle}>Role</th>
                  <th style={tableHeaderStyle}>Complaint</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint, index) => (
                 <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
                    <td style={tableCellStyle}>{complaint.email}</td>
                    <td style={tableCellStyle}> <span style={roleBadgeStyle}>{complaint.role}</span></td>
                    <td style={tableCellStyle}>{complaint.complaint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const tableHeaderStyle = {
  padding: '16px',
  textAlign: 'left',
  fontWeight: 'bold',
  color: '#B5B7C0',
  borderBottom: '2px solid #EEEEEE',
};

const tableCellStyle = {
  padding: '14px',
  color: '#292D32',
  borderBottom: '1px solid #EEEEEE',
  fontWeight:'500'
};

const roleBadgeStyle = {
  backgroundColor: '#4CAF50', 
  color: 'white',
  padding: '5px 16px',
  borderRadius: '10px',
  fontSize: '0.85rem',
  fontWeight: '600',
  display: 'inline-block',
  textTransform: 'capitalize',
};

export default ManageComplains;