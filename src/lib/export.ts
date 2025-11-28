import jsPDF from 'jspdf';

export const exportScansToPdf = (scans: any[], title = 'AI Digital Shield - Scans Report') => {
  const doc = new jsPDF();
  const lineHeight = 8;
  let y = 20;

  doc.setFontSize(16);
  doc.text(title, 14, 14);
  doc.setFontSize(11);

  scans.forEach((s, idx) => {
    const header = `${idx + 1}. ${new Date(s.created_at).toLocaleString()} - Score: ${s.toxicity_score}`;
    doc.text(header, 14, y);
    y += lineHeight;

    const textLines = doc.splitTextToSize(s.original_text || '', 180);
    textLines.forEach(line => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 14, y);
      y += lineHeight;
    });

    y += lineHeight / 2;
  });

  return doc.output('blob');
};

export default exportScansToPdf;
