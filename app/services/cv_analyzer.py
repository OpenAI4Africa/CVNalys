import re
import os
from typing import Dict, List, Any
from openai import OpenAI

class CVAnalyzer:
    """Analyzes CV content and provides insights"""
    
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.skills_patterns = {
            'programming': r'\b(python|java|javascript|react|node\.js|sql|html|css|git|docker|kubernetes|aws|azure|gcp)\b',
            'soft_skills': r'\b(leadership|communication|teamwork|problem solving|project management|agile|scrum)\b',
            'languages': r'\b(english|spanish|french|german|chinese|japanese|arabic)\b',
            'certifications': r'\b(certified|certification|aws certified|microsoft certified|google certified)\b'
        }
    
    def analyze_cv(self, cv_text: str) -> Dict[str, Any]:
        """Main method to analyze CV content"""
        try:
            # Basic text analysis
            basic_analysis = self._basic_analysis(cv_text)
            
            # AI-powered analysis if API key is available
            ai_analysis = {}
            if os.getenv('OPENAI_API_KEY'):
                ai_analysis = self._ai_analysis(cv_text)
            
            # Combine results
            return {
                'basic_analysis': basic_analysis,
                'ai_analysis': ai_analysis,
                'recommendations': self._generate_recommendations(basic_analysis, ai_analysis),
                'score': self._calculate_score(basic_analysis, ai_analysis)
            }
            
        except Exception as e:
            print(f"Error in CV analysis: {str(e)}")
            return {
                'error': f'Analysis failed: {str(e)}',
                'basic_analysis': self._basic_analysis(cv_text) if cv_text else {}
            }
    
    def _basic_analysis(self, cv_text: str) -> Dict[str, Any]:
        """Perform basic text analysis without AI"""
        text_lower = cv_text.lower()
        
        # Word count and basic stats
        words = cv_text.split()
        sentences = re.split(r'[.!?]+', cv_text)
        
        # Extract skills and keywords
        skills_found = {}
        for category, pattern in self.skills_patterns.items():
            matches = re.findall(pattern, text_lower)
            skills_found[category] = list(set(matches))
        
        # Look for contact information
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        phone_pattern = r'\b(?:\+?1[-.]?)?\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})\b'
        
        emails = re.findall(email_pattern, cv_text)
        phones = re.findall(phone_pattern, cv_text)
        
        # Look for education and experience indicators
        education_keywords = ['university', 'college', 'degree', 'bachelor', 'master', 'phd', 'graduated']
        experience_keywords = ['experience', 'years', 'worked', 'employed', 'job', 'position', 'role']
        
        education_count = sum(1 for word in words if word.lower() in education_keywords)
        experience_count = sum(1 for word in words if word.lower() in experience_keywords)
        
        return {
            'word_count': len(words),
            'sentence_count': len([s for s in sentences if s.strip()]),
            'skills': skills_found,
            'contact_info': {
                'emails': emails,
                'phones': phones
            },
            'education_indicators': education_count,
            'experience_indicators': experience_count,
            'has_contact_info': bool(emails or phones),
            'has_skills': any(skills_found.values())
        }
    
    def _ai_analysis(self, cv_text: str) -> Dict[str, Any]:
        """Perform AI-powered analysis using OpenAI"""
        try:
            prompt = f"""
            Analyze this CV and provide professional insights. Focus on:
            1. Overall impression and professionalism
            2. Key strengths and areas for improvement
            3. Industry fit and career level assessment
            4. Specific recommendations for enhancement
            
            CV Content:
            {cv_text[:3000]}  # Limit to first 3000 characters
            
            Provide a structured analysis with actionable insights.
            """
            
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a professional CV analyst with expertise in recruitment and career development. Provide constructive, actionable feedback."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.7
            )
            
            return {
                'ai_insights': response.choices[0].message.content,
                'model_used': 'gpt-3.5-turbo'
            }
            
        except Exception as e:
            print(f"AI analysis failed: {str(e)}")
            return {'error': f'AI analysis unavailable: {str(e)}'}

    def rewrite_cv(self, original_text: str, ai_insights: str = "", options: Dict[str, Any] | None = None) -> str:
        """Rewrite a CV using the original text and AI insights as guidance.

        The method intentionally does not persist any data; it only returns the
        rewritten CV text.
        """
        try:
            options = options or {}
            tone = options.get('tone', 'professional')
            target_role = options.get('target_role', '')
            length = options.get('length', 'standard')  # concise | standard | detailed

            length_guidance = {
                'concise': 'Be concise and remove redundancy while keeping impact. Aim for brevity.',
                'standard': 'Keep a balanced level of detail with clear bullet points and impact metrics.',
                'detailed': 'Add more context and quantify achievements while keeping clear structure.'
            }.get(length, 'Keep a balanced level of detail with clear bullet points and impact metrics.')

            role_clause = f"Tailor language and highlights to a target role of '{target_role}'." if target_role else ""

            prompt = (
                "Rewrite the following CV content to be more effective and professional.\n"
                f"Tone/style: {tone}. {length_guidance} {role_clause}\n"
                "Follow rules:\n"
                "- Keep facts truthful; never invent employment or education.\n"
                "- Use strong action verbs, quantify achievements where possible.\n"
                "- Improve clarity, structure and scannability (section headers, bullets).\n"
                "- Maintain first-person implied resume style (no pronouns).\n"
                "- Output plain text suitable for copy into a resume editor.\n\n"
                "Guidance from analysis (use to inform the rewrite):\n"
                f"{(ai_insights or '')[:2500]}\n\n"
                "Original CV content to rewrite:\n"
                f"{original_text[:6000]}"
            )

            # Fallback if no API key
            if not os.getenv('OPENAI_API_KEY'):
                # Return a lightly formatted version without external API
                lines = [l.strip() for l in original_text.split('\n') if l.strip()]
                return '\n'.join(f"• {l}" for l in lines[:400])

            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a senior resume writing assistant."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1200,
                temperature=0.7
            )

            return response.choices[0].message.content
        except Exception as e:
            print(f"CV rewrite failed: {str(e)}")
            # Graceful fallback
            return original_text
    
    def _generate_recommendations(self, basic_analysis: Dict, ai_analysis: Dict) -> List[str]:
        """Generate recommendations based on analysis"""
        recommendations = []
        
        # Basic recommendations
        if not basic_analysis.get('has_contact_info'):
            recommendations.append("Add clear contact information (email and phone)")
        
        if not basic_analysis.get('has_skills'):
            recommendations.append("Include specific technical and soft skills")
        
        if basic_analysis.get('word_count', 0) < 100:
            recommendations.append("Consider adding more detail about your experience and achievements")
        
        if basic_analysis.get('education_indicators', 0) < 2:
            recommendations.append("Highlight your educational background and qualifications")
        
        if basic_analysis.get('experience_indicators', 0) < 3:
            recommendations.append("Provide more details about your work experience and responsibilities")
        
        # Add AI recommendations if available
        if ai_analysis.get('ai_insights'):
            recommendations.append("Review AI-generated insights for personalized recommendations")
        
        return recommendations
    
    def _calculate_score(self, basic_analysis: Dict, ai_analysis: Dict) -> int:
        """Calculate a score from 0-100 based on CV quality"""
        score = 0
        
        # Basic scoring
        if basic_analysis.get('has_contact_info'):
            score += 15
        
        if basic_analysis.get('has_skills'):
            score += 20
        
        if basic_analysis.get('word_count', 0) >= 150:
            score += 15
        elif basic_analysis.get('word_count', 0) >= 100:
            score += 10
        
        if basic_analysis.get('education_indicators', 0) >= 2:
            score += 15
        
        if basic_analysis.get('experience_indicators', 0) >= 3:
            score += 20
        
        if basic_analysis.get('sentence_count', 0) >= 10:
            score += 15
        
        # Bonus for AI analysis
        if ai_analysis.get('ai_insights'):
            score += 10
        
        return min(score, 100)
