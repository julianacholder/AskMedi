
import { useEffect, useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import "../assets/css/usereport/usereport.css";
import axios from "axios";

const UserReport = () => {
  const [reports, setReports] = useState([]);
  const [expandedReports, setExpandedReports] = useState(new Set());

  useEffect(() => {
    // Get user ID and token from local storage
    const userId = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    if (userId) {
      axios.get(`http://127.0.0.1:8000/users/user-summaries/${userId}/`, {
       
      })
        .then(response => {
          setReports(response.data);
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching user summaries:', error);
        });
    } else {
      console.error('User ID not found in local storage.');
    }
  }, []);

  const handleViewMore = (reportId) => {
    setExpandedReports(prevExpandedReports => {
      const newExpandedReports = new Set(prevExpandedReports);
      if (newExpandedReports.has(reportId)) {
        newExpandedReports.delete(reportId);
      } else {
        newExpandedReports.add(reportId);
      }
      return newExpandedReports;
    });
  };

  const downloadReport = () => {
    const input = document.getElementById('report-content');

    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('user-report.pdf');
    });
  };

  return (
    <div className='user-report'>
      <h1>Home/User Report</h1>
      <div id="report-content"  className="reports">
        {reports.map((report) => (
          <div className="individual-report" key={report.id}>
            <div className="left-report">
              <div className="human-header">
                <div className="human">
                  <i className="fa-solid fa-user"></i>
                </div>
              </div>

              <div className='other'>
                <h1>Reported Symptoms</h1>
                <h3>By: AskMedi</h3>

                <div className="diagosis">
                  <h2>Diagnosis:</h2>
                  <p>{report.diagnosis_content}</p>
                </div>

                {/* Show summary only if the report is expanded */}
                {expandedReports.has(report.id) ? (
                  <div>
                    <p className="summary">{report.summary_content}</p>
                    <p className="bluey" onClick={() => handleViewMore(report.id)}>View Less</p>
                  </div>
                ) : (
                  <p className="bluey"onClick={() => handleViewMore(report.id)}>View More</p>
                )}
              </div>
            </div>
            <div className="right-report">
                  <p>{new Date(report.timestamp).toLocaleDateString()}</p> {/* Format date */}
                </div>
          </div>
        ))}
      </div>
      
      <div className='download'>
        <p onClick={downloadReport} className='download'>Download File</p>
      </div>
    </div>
  );
}

export default UserReport;

