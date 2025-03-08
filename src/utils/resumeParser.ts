import pdfParse from 'pdf-parse';
import * as XLSX from 'xlsx';
import { createWorker } from 'tesseract.js';

export interface ParsedResume {
  text: string;
  metadata: {
    fileType: string;
    pageCount?: number;
    author?: string;
    creationDate?: string;
  };
}

export const parseResume = async (file: File): Promise<ParsedResume> => {
  const fileType = file.type;
  
  switch (fileType) {
    case 'application/pdf':
      return parsePDF(file);
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return parseDocx(file);
    case 'image/jpeg':
    case 'image/png':
      return parseImage(file);
    default:
      throw new Error('Unsupported file type');
  }
};

const parsePDF = async (file: File): Promise<ParsedResume> => {
  const buffer = await file.arrayBuffer();
  const data = await pdfParse(buffer);
  
  return {
    text: data.text,
    metadata: {
      fileType: 'pdf',
      pageCount: data.numpages,
      author: data.info?.Author,
      creationDate: data.info?.CreationDate
    }
  };
};

const parseDocx = async (file: File): Promise<ParsedResume> => {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const text = XLSX.utils.sheet_to_txt(worksheet);
  
  return {
    text,
    metadata: {
      fileType: 'docx'
    }
  };
};

const parseImage = async (file: File): Promise<ParsedResume> => {
  const worker = await createWorker();
  const imageUrl = URL.createObjectURL(file);
  
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  
  const { data: { text } } = await worker.recognize(imageUrl);
  await worker.terminate();
  
  URL.revokeObjectURL(imageUrl);
  
  return {
    text,
    metadata: {
      fileType: file.type
    }
  };
};