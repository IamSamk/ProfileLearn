import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const exportToPDF = (data: any, title: string) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text(title, 14, 15);
  
  // Convert data to table format
  const tableData = Object.entries(data).map(([key, value]) => {
    if (typeof value === 'object') {
      return [key, JSON.stringify(value)];
    }
    return [key, value];
  });

  // Add table
  autoTable(doc, {
    head: [['Metric', 'Value']],
    body: tableData,
    startY: 25,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 5,
      overflow: 'linebreak',
      cellWidth: 'auto'
    },
    headStyles: {
      fillColor: [14, 165, 233],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    }
  });

  // Save the PDF
  doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
};

export const exportToExcel = (data: any, title: string) => {
  // Convert data to worksheet format
  const ws = XLSX.utils.json_to_sheet(
    Array.isArray(data) ? data : [data]
  );
  
  // Create workbook and add worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data');
  
  // Save the file
  XLSX.writeFile(wb, `${title.toLowerCase().replace(/\s+/g, '-')}.xlsx`);
};