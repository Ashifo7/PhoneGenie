import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Phone } from '../types/phone';

export const generateComparisonPDF = (phone1: Phone, phone2: Phone) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('Phone Comparison Report', 14, 15);
  doc.setFontSize(12);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 25);

  // Prepare comparison data
  const comparisonData = [
    ['Feature', phone1.name, phone2.name],
    ['Company', phone1.company, phone2.company],
    ['Price', `₹${phone1.price.toLocaleString()}`, `₹${phone2.price.toLocaleString()}`],
    ['Camera', `${phone1.specs.cameraMP}MP`, `${phone2.specs.cameraMP}MP`],
    ['Storage', `${phone1.specs.storageGB}GB`, `${phone2.specs.storageGB}GB`],
    ['RAM', `${phone1.specs.ram}GB`, `${phone2.specs.ram}GB`],
    ['Processor', `${phone1.specs.processorGHz}GHz`, `${phone2.specs.processorGHz}GHz`],
    ['Battery', `${phone1.specs.batteryMAh}mAh`, `${phone2.specs.batteryMAh}mAh`],
    ['Display Size', `${phone1.specs.display.size}"`, `${phone2.specs.display.size}"`],
    ['Display Type', phone1.specs.display.type, phone2.specs.display.type],
    ['Resolution', phone1.specs.display.resolution, phone2.specs.display.resolution],
  ];

  // Add comparison table
  autoTable(doc, {
    head: [['Feature', phone1.name, phone2.name]],
    body: comparisonData.slice(1),
    startY: 35,
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [102, 16, 242],
      textColor: 255,
      fontSize: 11,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
  });

  // Add price comparison section
  const currentY = (doc as any).lastAutoTable.finalY + 20;
  doc.setFontSize(14);
  doc.text('Price Difference Analysis', 14, currentY);
  
  const priceDiff = Math.abs(phone1.price - phone2.price);
  const priceDiffPercentage = (priceDiff / Math.max(phone1.price, phone2.price) * 100).toFixed(1);
  
  doc.setFontSize(11);
  doc.text([
    `Price Difference: ₹${priceDiff.toLocaleString()}`,
    `Percentage Difference: ${priceDiffPercentage}%`,
    `${phone1.price > phone2.price ? phone1.name : phone2.name} is more expensive`
  ], 14, currentY + 10);

  // Add shopping links
  doc.setFontSize(14);
  doc.text('Shopping Links', 14, currentY + 40);
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 255);
  
  // Phone 1 links
  doc.text(`${phone1.name}:`, 14, currentY + 50);
  doc.textWithLink('Amazon', 30, currentY + 60, { url: phone1.shopLinks.amazon });
  doc.textWithLink('Flipkart', 30, currentY + 70, { url: phone1.shopLinks.flipkart });
  
  // Phone 2 links
  doc.text(`${phone2.name}:`, 14, currentY + 85);
  doc.textWithLink('Amazon', 30, currentY + 95, { url: phone2.shopLinks.amazon });
  doc.textWithLink('Flipkart', 30, currentY + 105, { url: phone2.shopLinks.flipkart });

  // Add footer
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.text(
    `Generated by PhoneGini - ${new Date().toLocaleString()}`,
    doc.internal.pageSize.width / 2,
    doc.internal.pageSize.height - 10,
    { align: 'center' }
  );

  // Save the PDF
  doc.save(`comparison-${phone1.name}-vs-${phone2.name}.pdf`);
};