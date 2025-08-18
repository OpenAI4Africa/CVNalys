# CVNalys 🚀

<div align="center">

![CVNalys Logo](https://img.shields.io/badge/CVNalys-Professional%20CV%20Analysis-blue?style=for-the-badge&logo=file-text)
![AI Powered](https://img.shields.io/badge/AI%20Powered-OpenAI%20GPT--4-brightgreen?style=for-the-badge&logo=openai)
![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=for-the-badge&logo=apache)

**Professional CV Analysis Tool Powered by AI**

[![Python](https://img.shields.io/badge/Python-3.11+-blue?style=flat-square&logo=python)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-2.0+-lightgrey?style=flat-square&logo=flask)](https://flask.palletsprojects.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=flat-square&logo=openai)](https://openai.com)

</div>

CVNalys is a modern, high-converting web application that helps users analyze their CVs using advanced AI technology. Upload your CV and receive professional insights, skill analysis, and actionable recommendations to make your resume stand out.

## ✨ Features

<div align="center">

| 🚀 **Core Features** | 📱 **User Experience** | 🔒 **Security & Privacy** |
|----------------------|------------------------|---------------------------|
| AI-Powered Analysis | Mobile Responsive Design | No Data Storage |
| Multi-Format Support | Touch Gestures | Secure File Processing |
| Instant Results | Beautiful UI/UX | Privacy First |
| Skill Analysis | No Login Required | CORS Enabled |

</div>

### **Key Capabilities**
- **AI-Powered Analysis**: Advanced machine learning algorithms provide deep insights
- **Multi-Format Support**: PDF, DOCX, DOC, TXT, RTF files supported
- **Instant Results**: Get comprehensive analysis in seconds
- **Privacy First**: Your CV is never stored on our servers
- **No Login Required**: Start analyzing immediately
- **Mobile Responsive**: Beautiful UI that works on all devices
- **Touch Gestures**: Hammer.js integration for mobile interactions

## 🛠️ Tech Stack

<div align="center">

### 🖥️ **Backend Technologies**
![Python](https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-2.0+-lightgrey?style=for-the-badge&logo=flask)
![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai)

### 🎨 **Frontend Technologies**
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### 📁 **File Processing**
![PDF](https://img.shields.io/badge/PDF-FF0000?style=for-the-badge&logo=adobe-acrobat-reader&logoColor=white)
![DOCX](https://img.shields.io/badge/DOCX-2B579A?style=for-the-badge&logo=microsoft-word&logoColor=white)
![TXT](https://img.shields.io/badge/TXT-000000?style=for-the-badge&logo=text&logoColor=white)

</div>

### **Core Components**

| **Category** | **Technology** | **Purpose** |
|--------------|----------------|-------------|
| **Backend Framework** | Flask | Lightweight web framework for API endpoints |
| **AI Integration** | OpenAI GPT-4 | Advanced CV analysis and rewriting |
| **File Processing** | PyPDF2, python-docx | Multi-format document text extraction |
| **Frontend Styling** | Tailwind CSS | Utility-first CSS framework for modern UI |
| **Touch Support** | Hammer.js | Mobile gesture recognition |
| **Icons** | Font Awesome | Professional icon library |
| **Typography** | Google Fonts (Inter) | Modern, readable font system |

## 🚀 Quick Start

<div align="center">

![Quick Start](https://img.shields.io/badge/Quick%20Start-5%20Minutes-blue?style=for-the-badge&logo=rocket)

</div>

### **Prerequisites**
- Python 3.11 or higher
- pip package manager  
- OpenAI API key (optional, for AI analysis)

### 🛠️ **Installation Steps**

<details>
<summary><b>Step 1: Clone the Repository</b></summary>

```bash
git clone https://github.com/OpenAI4Africa/CVNalys.git
cd cvnalys
```
</details>

<details>
<summary><b>Step 2: Set Up Virtual Environment</b></summary>

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate          # On macOS/Linux
# OR
venv\Scripts\activate             # On Windows
```
</details>

<details>
<summary><b>Step 3: Install Dependencies</b></summary>

```bash
pip install -r requirements.txt
```
</details>

<details>
<summary><b>Step 4: Configure Environment</b></summary>

```bash
# Copy environment template
cp env.example .env

# Edit .env file with your settings
nano .env  # or use your preferred editor
```
</details>

<details>
<summary><b>Step 5: Launch Application</b></summary>

```bash
python run.py
```

**Open your browser and navigate to:** `http://localhost:8000`
</details>

## 🔧 Configuration

<div align="center">

![Configuration](https://img.shields.io/badge/Configuration-Simple%20Setup-green?style=for-the-badge&logo=gear)

</div>

### **Environment Variables**

Create a `.env` file in the root directory with the following configuration:

```env
# 🔑 Required Settings
SECRET_KEY=your-super-secret-key-here

# 🤖 Optional - OpenAI API for AI analysis
OPENAI_API_KEY=your-openai-api-key-here

# 📁 Optional - File upload settings
MAX_FILE_SIZE=16777216  # 16MB in bytes
```

### **OpenAI API Setup (Optional)**

<div align="center">

| **Step** | **Action** | **Result** |
|----------|------------|------------|
| 1️⃣ | Get API key from [OpenAI Platform](https://platform.openai.com/) | Access to GPT-4 models |
| 2️⃣ | Add key to `.env` file | AI analysis automatically enabled |
| 3️⃣ | Restart application | Enhanced CV insights available |

</div>

> 💡 **Pro Tip**: The application works without an OpenAI API key, but AI-powered analysis and CV rewriting features will be limited.

## 📁 Project Structure

<div align="center">

![Project Structure](https://img.shields.io/badge/Project%20Structure-Clean%20Architecture-blue?style=for-the-badge&logo=folder)

</div>

```
cvnalys/
├── 🚀 app/                          # Main application package
│   ├── __init__.py                  # Flask app factory & configuration
│   ├── routes.py                    # API endpoints & request handling
│   ├── 🔧 services/
│   │   └── cv_analyzer.py          # AI-powered CV analysis service
│   ├── 🛠️ utils/
│   │   ├── file_processor.py       # Multi-format file processing
│   │   └── report_generator.py     # PDF/TXT report generation
│   ├── 🎨 static/
│   │   ├── css/
│   │   │   └── style.css           # Professional Tailwind CSS styles
│   │   ├── js/
│   │   │   └── app.js              # Interactive JavaScript application
│   │   └── images/                 # SISU AI branding assets
│   └── 📄 templates/
│       └── index.html              # Main application interface
├── 📁 uploads/                      # Temporary file storage (auto-created)
├── 🐍 venv/                        # Python virtual environment
├── 📦 requirements.txt              # Python dependencies
├── 🚀 run.py                       # Application entry point
├── ⚙️ env.example                  # Environment variables template
├── 📖 README.md                    # This documentation
└── 📄 LICENSE                      # Apache 2.0 License
```

### **Architecture Overview**

| **Layer** | **Purpose** | **Key Files** |
|-----------|-------------|----------------|
| **🌐 Web Interface** | User interaction & file upload | `templates/index.html`, `static/js/app.js` |
| **🔌 API Layer** | Request handling & routing | `routes.py` |
| **🧠 Business Logic** | CV analysis & AI processing | `services/cv_analyzer.py` |
| **📁 Data Processing** | File handling & reports | `utils/file_processor.py`, `utils/report_generator.py` |
| **🎨 Presentation** | Styling & responsive design | `static/css/style.css` |

## 🎯 Usage

<div align="center">

![Usage Guide](https://img.shields.io/badge/Usage%20Guide-Simple%20Steps-green?style=for-the-badge&logo=play)

</div>

### **Basic CV Analysis Workflow**

<div align="center">

| **Step** | **Action** | **Result** |
|----------|------------|------------|
| 1️⃣ | **Upload CV** | Drag & drop or click to select your CV file |
| 2️⃣ | **Automatic Processing** | System extracts text and analyzes content |
| 3️⃣ | **View Results** | Comprehensive analysis with actionable insights |

</div>

### **Analysis Results Include**

- **📊 CV Score (0-100)**: Professional assessment with visual progress indicator
- **📝 Word Count & Structure**: Detailed text analysis and formatting insights
- **🛠️ Skills Identification**: Categorized technical and soft skills detection
- **💡 Actionable Recommendations**: Specific improvement suggestions
- **🤖 AI-Powered Insights**: Advanced analysis using OpenAI GPT-4 (with API key)

### **Supported File Types**

<div align="center">

| **Format** | **Extension** | **Description** | **Best Quality** |
|------------|---------------|-----------------|------------------|
| ![PDF](https://img.shields.io/badge/PDF-FF0000?style=flat-square&logo=adobe-acrobat-reader&logoColor=white) | `.pdf` | Portable Document Format | High-quality scans |
| ![Word](https://img.shields.io/badge/Word-2B579A?style=flat-square&logo=microsoft-word&logoColor=white) | `.docx`, `.doc` | Microsoft Word documents | Modern Word format |
| ![Text](https://img.shields.io/badge/Text-000000?style=flat-square&logo=text&logoColor=white) | `.txt` | Plain text documents | UTF-8 encoding |
| ![RTF](https://img.shields.io/badge/RTF-000000?style=flat-square&logo=text&logoColor=white) | `.rtf` | Rich Text Format | Formatted text |

</div>

### **File Requirements**

- **📏 Maximum Size**: 16MB per file
- **🔤 Encoding**: UTF-8 recommended for text files
- **🎯 Quality**: Higher quality PDFs provide better text extraction
- **🔄 Processing**: Files are processed in memory and never stored

## 🔒 Security & Privacy

<div align="center">

![Security](https://img.shields.io/badge/Security-Privacy%20First-red?style=for-the-badge&logo=shield-check)
![Privacy](https://img.shields.io/badge/Privacy-No%20Data%20Storage-green?style=for-the-badge&logo=lock)

</div>

### **Security Features**

| **Feature** | **Description** | **Benefit** |
|-------------|-----------------|-------------|
| **🔒 No Data Storage** | CVs processed in memory, never saved to disk | Complete privacy protection |
| **✅ Secure Uploads** | File validation, sanitization, and type checking | Protection against malicious files |
| **🌐 CORS Enabled** | Cross-origin resource sharing for API access | Flexible deployment options |
| **🔐 Environment Variables** | Sensitive data stored in secure .env files | Secure configuration management |

### **What We Don't Do**

- ❌ Store your CV files on our servers
- ❌ Track your personal information
- ❌ Share your data with third parties
- ❌ Require account creation or login

### **What We Do**

- ✅ Process files securely in memory
- ✅ Provide immediate analysis results
- ✅ Generate downloadable reports
- ✅ Maintain complete user privacy

## 🧪 Development

<div align="center">

![Development](https://img.shields.io/badge/Development-Open%20Source-blue?style=for-the-badge&logo=github)
![Contributing](https://img.shields.io/badge/Contributing-Welcome-green?style=for-the-badge&logo=heart)

</div>

### **Testing & Quality Assurance**

```bash
# Install development dependencies
pip install pytest black flake8

# 🧪 Run tests
pytest

# 🎨 Code formatting
black app/

# 🔍 Linting
flake8 app/
```

### **Code Style Guidelines**

- **🐍 PEP 8 Compliance**: Follow Python style guide standards
- **🔍 Type Hints**: Use type annotations where appropriate
- **📚 Documentation**: Document all functions and classes
- **⚡ Function Design**: Keep functions small, focused, and efficient

### **Adding New Features**

<div align="center">

| **Step** | **Action** | **Tools** |
|----------|------------|-----------|
| 1️⃣ | Create feature branch | `git checkout -b feature/new-feature` |
| 2️⃣ | Implement functionality | Your preferred editor |
| 3️⃣ | Add tests | `pytest` |
| 4️⃣ | Update documentation | README.md, docstrings |
| 5️⃣ | Submit pull request | GitHub PR workflow |

</div>

### **Development Setup**

```bash
# Clone and setup
git clone https://github.com/OpenAI4Africa/CVNalys.git
cd cvnalys

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install development dependencies
pip install -r requirements.txt
pip install pytest black flake8

# Run development server
python run.py
```

## 🚀 Deployment

<div align="center">

![Deployment](https://img.shields.io/badge/Deployment-Production%20Ready-blue?style=for-the-badge&logo=rocket)
![Cloud Ready](https://img.shields.io/badge/Cloud%20Ready-AWS%20%7C%20GCP%20%7C%20Azure-green?style=for-the-badge&logo=cloud)

</div>

### **Production Considerations**

| **Aspect** | **Requirement** | **Implementation** |
|------------|-----------------|-------------------|
| **🔐 Environment Variables** | Secure SECRET_KEY | Use strong, unique keys |
| **📁 File Upload Limits** | Appropriate size limits | Configure MAX_CONTENT_LENGTH |
| **🌐 CORS Settings** | Domain restrictions | Limit to necessary origins |
| **📊 Error Handling** | Proper logging & monitoring | Implement structured logging |
| **🛡️ Security Headers** | Security middleware | Add security headers |

### **Deployment Options**

<div align="center">

| **Platform** | **Difficulty** | **Best For** | **Setup Time** |
|--------------|----------------|---------------|----------------|
| ![Heroku](https://img.shields.io/badge/Heroku-430098?style=flat-square&logo=heroku&logoColor=white) | Easy | Quick prototypes | 5 minutes |
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | Medium | Scalable deployments | 15 minutes |
| ![AWS](https://img.shields.io/badge/AWS-FF9900?style=flat-square&logo=amazon-aws&logoColor=white) | Advanced | Enterprise solutions | 30 minutes |
| ![VPS](https://img.shields.io/badge/VPS-000000?style=flat-square&logo=server&logoColor=white) | Medium | Full control | 20 minutes |

</div>

### **Quick Deployment Checklist**

- ✅ Environment variables configured
- ✅ Dependencies installed
- ✅ File permissions set correctly
- ✅ CORS settings configured
- ✅ Security headers implemented
- ✅ Error logging enabled
- ✅ Health check endpoint working

## 🤝 Contributing

<div align="center">

![Contributing](https://img.shields.io/badge/Contributing-Welcome%20%F0%9F%92%95-green?style=for-the-badge&logo=github)
![Open Source](https://img.shields.io/badge/Open%20Source-Love%20%F0%9F%92%95-red?style=for-the-badge&logo=heart)

</div>

### **We Welcome Contributions!**

CVNalys is an open-source project and we'd love your help to make it even better. Whether you're a developer, designer, or just passionate about AI and CV analysis, there are many ways to contribute.

### **Contribution Guidelines**

<div align="center">

| **Step** | **Action** | **Details** |
|----------|------------|-------------|
| 1️⃣ | **Fork** the repository | Click the Fork button on GitHub |
| 2️⃣ | **Create** a feature branch | `git checkout -b feature/amazing-feature` |
| 3️⃣ | **Make** your changes | Code, test, and document |
| 4️⃣ | **Add** tests | Ensure your changes work correctly |
| 5️⃣ | **Submit** a pull request | Create a detailed PR description |

</div>

### **Areas We'd Love Help With**

- 🚀 **New Features**: CV templates, industry-specific analysis
- 🐛 **Bug Fixes**: Identify and fix issues
- 📚 **Documentation**: Improve guides and examples
- 🎨 **UI/UX**: Enhance the user interface
- 🌍 **Localization**: Add support for more languages
- 🧪 **Testing**: Improve test coverage

### **Getting Started**

1. **Star** this repository if you find it useful
2. **Fork** the project to your GitHub account
3. **Clone** your fork locally
4. **Create** a new branch for your changes
5. **Make** your improvements
6. **Test** everything works
7. **Submit** a pull request

### **Need Help?**

- 💬 **Discussions**: Start a discussion in GitHub Discussions
- 🐛 **Issues**: Report bugs or request features
- 📧 **Email**: Contact us at hello@openai4africa.org

## 📄 License

<div align="center">

![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=for-the-badge&logo=apache)
![Open Source](https://img.shields.io/badge/Open%20Source-Yes-green?style=for-the-badge&logo=github)

</div>

This project is licensed under the **Apache License, Version 2.0** - see the [LICENSE](LICENSE) file for complete details.

### **License Summary**

- ✅ **Commercial Use**: Allowed
- ✅ **Modification**: Allowed  
- ✅ **Distribution**: Allowed
- ✅ **Patent Use**: Allowed
- ✅ **Private Use**: Allowed

### **License Requirements**

- 📝 **License and Copyright Notice**: Must be included
- ⚠️ **State Changes**: Must be documented
- 📄 **Apache License**: Must be included in any distribution

For the complete license text, please see the [LICENSE](LICENSE) file in this repository.

## 🙏 Acknowledgments

<div align="center">

![Acknowledgments](https://img.shields.io/badge/Acknowledgments-Thank%20You%20%F0%9F%92%95-purple?style=for-the-badge&logo=heart)

</div>

### **Open Source Technologies**

| **Technology** | **Purpose** | **Website** |
|----------------|-------------|-------------|
| ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai) | AI analysis capabilities | [openai.com](https://openai.com) |
| ![Flask](https://img.shields.io/badge/Flask-000000?style=flat-square&logo=flask) | Web framework | [flask.palletsprojects.com](https://flask.palletsprojects.com/) |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css) | Beautiful UI components | [tailwindcss.com](https://tailwindcss.com) |
| ![Font Awesome](https://img.shields.io/badge/Font%20Awesome-339AF0?style=flat-square&logo=font-awesome) | Professional icons | [fontawesome.com](https://fontawesome.com) |
| ![Hammer.js](https://img.shields.io/badge/Hammer.js-000000?style=flat-square&logo=hammer) | Mobile touch support | [hammerjs.github.io](https://hammerjs.github.io/) |

### **Inspiration**

This project was inspired by the need to democratize AI-powered CV analysis and make professional career development tools accessible to everyone, especially in emerging markets.

---

<div align="center">

## 🌟 **Powered By**

![SISU AI](https://img.shields.io/badge/SISU%20AI-Accelerating%20AI%20for%20Emerging%20Markets%20and%20Economies-blue?style=for-the-badge&logo=rocket)
![OpenAI4Africa](https://img.shields.io/badge/OpenAI4Africa-Borderless%20AI%20for%20Africans-green?style=for-the-badge&logo=globe-africa)

**[SISU AI](https://sisuai.com)** & **[OpenAI4Africa](https://openai4africa.org)**

</div>

## 📞 Support

<div align="center">

![Support](https://img.shields.io/badge/Support-We%20Got%20You%20%F0%9F%92%95-blue?style=for-the-badge&logo=question-circle)
![Community](https://img.shields.io/badge/Community-Active%20%F0%9F%92%95-green?style=for-the-badge&logo=users)

</div>

### **Getting Help**

| **Channel** | **Best For** | **Response Time** |
|-------------|--------------|-------------------|
| 🐛 **GitHub Issues** | Bug reports & feature requests | 24-48 hours |
| 💬 **GitHub Discussions** | General questions & community chat | 12-24 hours |
| 📧 **Email Support** | Complex issues & partnerships | 24-72 hours |

### **Contact Information**

#### **OpenAI4Africa Team**
- **🌐 General Inquiries**: [hello@openai4africa.org](mailto:hello@openai4africa.org)
- **🔧 Open Source Support**: [os@openai4africa.org](mailto:os@openai4africa.org)
- **🌍 Website**: [openai4africa.org](https://openai4africa.org)
- **💼 LinkedIn**: [OpenAI4Africa](https://www.linkedin.com/company/openai4africa)

#### **SISU AI Team**
- **🌐 Website**: [sisuai.com](https://sisuai.com)
- **🔧 Development Support**: [dev@sisuai.com](mailto:dev@sisuai.com)
- **🔧 Open Source Support**: [os@sisuai.com](mailto:os@sisuai.com)
- **💼 LinkedIn**: [SISU AI](https://www.linkedin.com/company/sisu-ai)

### **Before You Ask**

1. **📖 Check the documentation** - Your answer might be here
2. **🔍 Search existing issues** - Someone might have asked already
3. **📝 Provide details** - Include error messages, steps to reproduce
4. **💻 Share your environment** - OS, Python version, etc.

### **Community Guidelines**

- ☑️ Be respectful and inclusive
- ☑️ Help others when you can
- ☑️ Share your experiences and use cases
- ☑️ Report bugs and suggest improvements

## 🔮 Roadmap

<div align="center">

![Roadmap](https://img.shields.io/badge/Roadmap-Future%20Plans%20%F0%9F%93%8A-blue?style=for-the-badge&logo=map)
![Coming Soon](https://img.shields.io/badge/Coming%20Soon-Exciting%20Features%20%F0%9F%8E%89-green?style=for-the-badge&logo=rocket)

</div>

### **Planned Features**

<div align="center">

| **Category** | **Feature** | **Status** |
|--------------|-------------|------------|
| 📄 **Templates** | Advanced CV templates | 🔄 Planning |
| 🏭 **Industry** | Industry-specific analysis | 🔄 Planning |
| 📊 **ATS** | ATS optimization scoring | 🔄 Planning |
| 🔍 **Comparison** | Resume comparison tools | 🔄 Planning |
| 📤 **Export** | Export to multiple formats | 🔄 Planning |
| 👥 **Collaboration** | Team collaboration features | 🔄 Planning |

</div>

### **Short Term Goals**

- [x] ✅ Core CV analysis functionality
- [x] ✅ AI-powered insights
- [x] ✅ Multi-format file support
- [x] ✅ Professional UI/UX design
- [ ] 🔄 Performance optimizations
- [ ] 🔄 Enhanced error handling

### **Medium Term Goals**

- [ ] 📄 Advanced CV templates
- [ ] 🏭 Industry-specific analysis
- [ ] 📊 ATS optimization scoring
- [ ] 🔍 Resume comparison tools
- [ ] 📱 Progressive Web App (PWA)
- [ ] 🌍 Multi-language support

### **Long Term Vision**

- [ ] 📤 Export to multiple formats
- [ ] 👥 Team collaboration features
- [ ] 📊 Advanced analytics dashboard
- [ ] 🔗 API for third-party integrations
- [ ] 🎓 Learning management system
- [ ] 🌐 Global deployment optimization

### **Have Ideas?**

We'd love to hear your feature requests! Please:
- 🐛 Create an issue with the `enhancement` label
- 💬 Start a discussion in GitHub Discussions
- 📧 Email us at hello@openai4africa.org

---

<div align="center">

## 🚀 **Ready to Transform Your CV?**

![Get Started](https://img.shields.io/badge/Get%20Started-Upload%20Your%20CV%20Now-blue?style=for-the-badge&logo=rocket)

**Made with ❤️ by the CVNalys Team**

*Transform your CV analysis experience with AI-powered insights!*

---

### 🌟 **Star This Repository**

If CVNalys helps you, please consider giving us a ⭐ star on GitHub!

[![GitHub stars](https://img.shields.io/github/stars/OpenAI4Africa/CVNalys?style=social)](https://github.com/OpenAI4Africa/CVNalys)

</div>
