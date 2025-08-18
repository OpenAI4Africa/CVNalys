# CVNalys 🚀

**Professional CV Analysis Tool Powered by AI**

CVNalys is a modern, high-converting web application that helps users analyze their CVs using advanced AI technology. Upload your CV and receive professional insights, skill analysis, and actionable recommendations to make your resume stand out.

## ✨ Features

- **AI-Powered Analysis**: Advanced machine learning algorithms provide deep insights
- **Multi-Format Support**: PDF, DOCX, DOC, TXT, RTF files supported
- **Instant Results**: Get comprehensive analysis in seconds
- **Privacy First**: Your CV is never stored on our servers
- **No Login Required**: Start analyzing immediately
- **Mobile Responsive**: Beautiful UI that works on all devices
- **Touch Gestures**: Hammer.js integration for mobile interactions

## 🛠️ Tech Stack

### Backend
- **Python 3.11+**
- **Flask**: Lightweight web framework
- **OpenAI API**: AI-powered CV analysis
- **File Processing**: Support for multiple document formats

### Frontend
- **Modern HTML5/CSS3**: Semantic markup and responsive design
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript ES6+**: Modern JavaScript with classes and async/await
- **Hammer.js**: Touch gesture support for mobile devices
- **Font Awesome**: Beautiful icons throughout the interface

### File Processing
- **PDF**: PyPDF2 for text extraction
- **DOCX**: python-docx for Word documents
- **TXT/RTF**: Native text processing with encoding support

## 🚀 Quick Start

### Prerequisites
- Python 3.11 or higher
- pip package manager
- OpenAI API key (optional, for AI analysis)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cvnalys
   ```

2. **Activate virtual environment**
   ```bash
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your OpenAI API key (optional)
   ```

5. **Run the application**
   ```bash
   python run.py
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Required
SECRET_KEY=your-secret-key-here

# Optional - OpenAI API for AI analysis
OPENAI_API_KEY=your-openai-api-key-here

# Optional - File upload settings
MAX_FILE_SIZE=16777216  # 16MB in bytes
```

### OpenAI API Setup (Optional)

1. Get an API key from [OpenAI](https://platform.openai.com/)
2. Add it to your `.env` file
3. AI analysis will be automatically enabled

## 📁 Project Structure

```
cvnalys/
├── app/
│   ├── __init__.py          # Flask app factory
│   ├── routes.py            # Main application routes
│   ├── services/
│   │   └── cv_analyzer.py   # CV analysis service
│   ├── utils/
│   │   └── file_processor.py # File processing utilities
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css    # Custom styles
│   │   └── js/
│   │       └── app.js       # Main JavaScript application
│   └── templates/
│       └── index.html       # Main HTML template
├── uploads/                 # Temporary file storage
├── venv/                    # Python virtual environment
├── requirements.txt          # Python dependencies
├── run.py                   # Application entry point
├── env.example              # Environment variables template
└── README.md                # This file
```

## 🎯 Usage

### Basic CV Analysis

1. **Upload CV**: Drag & drop or click to select your CV file
2. **Automatic Processing**: The system extracts text and analyzes content
3. **View Results**: Get comprehensive analysis including:
   - CV Score (0-100)
   - Word count and structure analysis
   - Skills identification
   - Actionable recommendations
   - AI-powered insights (if API key provided)

### Supported File Types

- **PDF** (.pdf): Most common format
- **Word Documents** (.docx, .doc): Microsoft Word files
- **Text Files** (.txt): Plain text documents
- **Rich Text** (.rtf): Formatted text documents

### File Requirements

- **Maximum Size**: 16MB
- **Encoding**: UTF-8 recommended for text files
- **Quality**: Higher quality PDFs provide better text extraction

## 🔒 Security & Privacy

- **No Data Storage**: CVs are processed in memory and never saved
- **Secure Uploads**: File validation and sanitization
- **CORS Enabled**: Cross-origin resource sharing for API access
- **Environment Variables**: Sensitive data stored in .env files

## 🧪 Development

### Running Tests
```bash
# Install development dependencies
pip install pytest black flake8

# Run tests
pytest

# Code formatting
black app/

# Linting
flake8 app/
```

### Code Style
- Follow PEP 8 Python style guide
- Use type hints where appropriate
- Document functions and classes
- Keep functions small and focused

### Adding New Features
1. Create feature branch
2. Implement functionality
3. Add tests
4. Update documentation
5. Submit pull request

## 🚀 Deployment

### Production Considerations

1. **Environment Variables**: Set proper SECRET_KEY
2. **File Upload Limits**: Configure appropriate file size limits
3. **CORS Settings**: Restrict to necessary domains
4. **Error Handling**: Implement proper logging and monitoring
5. **Security Headers**: Add security middleware

### Deployment Options

- **Heroku**: Easy deployment with Procfile
- **Docker**: Containerized deployment
- **VPS**: Traditional server deployment
- **Cloud Platforms**: AWS, Google Cloud, Azure

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenAI**: For AI analysis capabilities
- **Flask**: For the web framework
- **Tailwind CSS**: For the beautiful UI components
- **Font Awesome**: For the icons
- **Hammer.js**: For mobile touch support

---

*Powered by [SISU AI](https://sisuai.com) & [OpenAI4Africa](https://openai4africa.org)*

## 📞 Support

- **Issues**: Report bugs via GitHub issues
- **Discussions**: Join community discussions
- **Email**: Contact the development team
- **OpenAI4Africa Contact**: 
  - General inquiries: hello@openai4africa.org
  - Open source support: os@openai4africa.org

## 🔮 Roadmap

- [ ] Advanced CV templates
- [ ] Industry-specific analysis
- [ ] ATS optimization scoring
- [ ] Resume comparison tools
- [ ] Export to multiple formats
- [ ] Team collaboration features

---

**Made with ❤️ by the CVNalys Team**

*Transform your CV analysis experience with AI-powered insights!*
