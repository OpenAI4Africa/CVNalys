from flask import Blueprint, render_template, request, jsonify, current_app, send_file
import os
from werkzeug.utils import secure_filename
from app.services.cv_analyzer import CVAnalyzer
from app.utils.file_processor import FileProcessor
from app.utils.report_generator import ReportGenerator
import uuid
import io

main_bp = Blueprint('main', __name__)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

@main_bp.route('/')
def index():
    return render_template('index.html')

@main_bp.route('/upload', methods=['POST'])
def upload_cv():
    if 'cv_file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['cv_file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and allowed_file(file.filename):
        # Generate unique filename
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4().hex}_{filename}"
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], unique_filename)
        
        # Save file
        file.save(filepath)
        
        try:
            # Process and analyze the CV
            processor = FileProcessor()
            cv_text = processor.extract_text(filepath)
            
            if not cv_text:
                return jsonify({'error': 'Could not extract text from file'}), 400
            
            # Analyze CV content
            analyzer = CVAnalyzer()
            analysis_result = analyzer.analyze_cv(cv_text)
            # Attach original extracted text for client-side ephemeral rewrite
            try:
                if isinstance(analysis_result, dict):
                    analysis_result.setdefault('basic_analysis', {})['extracted_text'] = cv_text
            except Exception:
                pass
            
            # Clean up uploaded file
            os.remove(filepath)
            
            return jsonify({
                'success': True,
                'analysis': analysis_result,
                'filename': filename
            })
            
        except Exception as e:
            # Clean up on error
            if os.path.exists(filepath):
                os.remove(filepath)
            return jsonify({'error': f'Analysis failed: {str(e)}'}), 500
    
    return jsonify({'error': 'File type not allowed'}), 400

@main_bp.route('/download-report', methods=['POST'])
def download_report():
    """Generate and download a comprehensive CV analysis report"""
    try:
        data = request.get_json()
        if not data or 'analysis' not in data:
            return jsonify({'error': 'No analysis data provided'}), 400
        
        analysis = data['analysis']
        original_filename = data.get('filename', 'CV_Analysis')
        format_type = data.get('format', 'txt').lower()  # Default to txt
        
        # Validate format type
        if format_type not in ['txt', 'pdf']:
            format_type = 'txt'  # Fallback to txt if invalid format
        
        # Generate the report
        report_generator = ReportGenerator()
        report_content = report_generator.generate_report(analysis, original_filename, format_type)
        
        # Create a file-like object in memory
        report_io = io.BytesIO()
        
        # Handle different content types
        if format_type == 'pdf':
            # PDF content is already bytes
            report_io.write(report_content)
            mime_type = 'application/pdf'
            file_extension = '.pdf'
        else:
            # Text content needs to be encoded
            report_io.write(report_content.encode('utf-8'))
            mime_type = 'text/plain; charset=utf-8'
            file_extension = '.txt'
        
        report_io.seek(0)
        
        # Generate filename for the report
        report_filename = f"CV_Analysis_Report_{original_filename.rsplit('.', 1)[0]}{file_extension}"
        
        return send_file(
            report_io,
            as_attachment=True,
            download_name=report_filename,
            mimetype=mime_type
        )
        
    except Exception as e:
        return jsonify({'error': f'Report generation failed: {str(e)}'}), 500

@main_bp.route('/health')
def health():
    return jsonify({'status': 'healthy', 'service': 'CVNalys'})

@main_bp.route('/rewrite-cv', methods=['POST'])
def rewrite_cv():
    """Rewrite a CV based on original text and AI insights.

    The request JSON should contain:
    - original_text: str
    - ai_insights: str (optional)
    - options: dict (tone, target_role, length)
    """
    try:
        data = request.get_json() or {}
        original_text = data.get('original_text', '').strip()
        ai_insights = data.get('ai_insights', '')
        options = data.get('options', {})

        if not original_text:
            return jsonify({'error': 'original_text is required'}), 400

        analyzer = CVAnalyzer()
        rewritten = analyzer.rewrite_cv(original_text, ai_insights, options)
        return jsonify({'success': True, 'rewritten_text': rewritten})
    except Exception as e:
        return jsonify({'error': f'Rewrite failed: {str(e)}'}), 500
