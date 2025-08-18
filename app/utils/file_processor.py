import os
import PyPDF2
from docx import Document
from typing import Optional

class FileProcessor:
    """Handles extraction of text from various file formats"""
    
    def __init__(self):
        # Try to use python-magic if available, otherwise fall back to extension-based detection
        try:
            import magic
            self.mime = magic.Magic(mime=True)
            self.use_magic = True
        except ImportError:
            self.use_magic = False
            print("Warning: python-magic not available, using file extension detection")
    
    def extract_text(self, filepath: str) -> Optional[str]:
        """Extract text from file based on its type"""
        try:
            if self.use_magic:
                file_type = self.mime.from_file(filepath)
                return self._extract_by_mime_type(filepath, file_type)
            else:
                return self._extract_by_extension(filepath)
                
        except Exception as e:
            print(f"Error extracting text from {filepath}: {str(e)}")
            return None
    
    def _extract_by_mime_type(self, filepath: str, file_type: str) -> str:
        """Extract text using MIME type detection"""
        if file_type == 'application/pdf':
            return self._extract_from_pdf(filepath)
        elif file_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return self._extract_from_docx(filepath)
        elif file_type == 'application/msword':
            return self._extract_from_doc(filepath)
        elif file_type == 'text/plain':
            return self._extract_from_txt(filepath)
        elif file_type == 'text/rtf':
            return self._extract_from_rtf(filepath)
        else:
            raise ValueError(f"Unsupported file type: {file_type}")
    
    def _extract_by_extension(self, filepath: str) -> str:
        """Extract text using file extension detection"""
        file_extension = os.path.splitext(filepath)[1].lower()
        
        if file_extension == '.pdf':
            return self._extract_from_pdf(filepath)
        elif file_extension == '.docx':
            return self._extract_from_docx(filepath)
        elif file_extension == '.doc':
            return self._extract_from_doc(filepath)
        elif file_extension == '.txt':
            return self._extract_from_txt(filepath)
        elif file_extension == '.rtf':
            return self._extract_from_rtf(filepath)
        else:
            raise ValueError(f"Unsupported file extension: {file_extension}")
    
    def _extract_from_pdf(self, filepath: str) -> str:
        """Extract text from PDF file"""
        text = ""
        try:
            with open(filepath, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"
        except Exception as e:
            print(f"Error reading PDF: {str(e)}")
            raise
        return text.strip()
    
    def _extract_from_docx(self, filepath: str) -> str:
        """Extract text from DOCX file"""
        try:
            doc = Document(filepath)
            text = ""
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            return text.strip()
        except Exception as e:
            print(f"Error reading DOCX: {str(e)}")
            raise
    
    def _extract_from_doc(self, filepath: str) -> str:
        """Extract text from DOC file (basic implementation)"""
        # Note: python-docx doesn't support .doc files
        # This would require additional libraries like antiword or textract
        raise NotImplementedError("DOC file support requires additional libraries")
    
    def _extract_from_txt(self, filepath: str) -> str:
        """Extract text from TXT file"""
        try:
            with open(filepath, 'r', encoding='utf-8') as file:
                return file.read().strip()
        except UnicodeDecodeError:
            # Try with different encoding
            try:
                with open(filepath, 'r', encoding='latin-1') as file:
                    return file.read().strip()
            except Exception as e:
                print(f"Error reading TXT file: {str(e)}")
                raise
        except Exception as e:
            print(f"Error reading TXT file: {str(e)}")
            raise
    
    def _extract_from_rtf(self, filepath: str) -> str:
        """Extract text from RTF file (basic implementation)"""
        # Basic RTF text extraction - removes RTF markup
        try:
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
                # Simple RTF markup removal
                import re
                # Remove RTF control words and symbols
                text = re.sub(r'\\[a-z]+\d*', '', content)
                text = re.sub(r'\{|\}', '', text)
                text = re.sub(r'\\\'[0-9a-f]{2}', '', text)
                return text.strip()
        except Exception as e:
            print(f"Error reading RTF file: {str(e)}")
            raise
