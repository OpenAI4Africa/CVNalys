// CVNalys - Professional CV Analysis Application

class CVNalysApp {
    constructor() {
        this.currentFile = null;
        this.isUploading = false;
        this.currentAnalysis = null;
        this.currentFilename = null;
        this.animationObserver = null;
        this.init();
    }

    init() {
        console.log('Initializing CVNalys App...');
        this.initializeApp();
        
        // Ensure About Us is set up after a short delay
        setTimeout(() => {
            console.log('Setting up About Us after initialization...');
            this.setupAboutUsOverlay();
            this.setupAboutUsInteractions();
            this.setupDemoModal();
            this.setupCvRewriteModal();
        }, 200);
    }

    initializeApp() {
        this.setupEventListeners();
        this.setupHammerJS();
        this.setupAnimations();
        this.setupScrollEffects();
        this.setupPerformanceOptimizations();
        this.setupKeyboardNavigation();
        this.setupFormatModal();
        this.setupFooterEnhancements();
        this.setupFooterLinkInteractions();
        this.setupFooterFloatingElements();
        this.setupAboutUsOverlay();
        this.setupAboutUsInteractions();
        this.setupHeroParticles();
        
        // Initialize with fade-in animation
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.8s ease-in-out';
            document.body.style.opacity = '1';
        }, 100);
    }

    // Lightweight background particles for hero
    setupHeroParticles() {
        const canvas = document.getElementById('heroParticles');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const DPR = Math.min(window.devicePixelRatio || 1, 2);
        let width = 0, height = 0, particles = [], rafId;

        const colors = ['#93c5fd', '#bae6fd', '#e0f2fe'];
        const PARTICLE_COUNT = 60; // lightweight

        function resize() {
            const rect = canvas.getBoundingClientRect();
            width = Math.floor(rect.width);
            height = Math.floor(rect.height);
            canvas.width = Math.floor(width * DPR);
            canvas.height = Math.floor(height * DPR);
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        }

        function init() {
            particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
                x: Math.random() * width,
                y: Math.random() * height,
                r: 1.5 + Math.random() * 2.5,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                c: colors[(Math.random() * colors.length) | 0],
                a: 0.25 + Math.random() * 0.3
            }));
        }

        function step() {
            ctx.clearRect(0, 0, width, height);
            // Gentle gradient glow to blend with existing background
            const g = ctx.createRadialGradient(width * 0.7, height * 0.3, 0, width * 0.7, height * 0.3, Math.max(width, height) * 0.8);
            g.addColorStop(0, 'rgba(147, 197, 253, 0.08)');
            g.addColorStop(1, 'rgba(147, 197, 253, 0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);

            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < -20) p.x = width + 20; if (p.x > width + 20) p.x = -20;
                if (p.y < -20) p.y = height + 20; if (p.y > height + 20) p.y = -20;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = hexToRgba(p.c, p.a);
                ctx.fill();
            });

            // Subtle connecting lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i], b = particles[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const dist2 = dx * dx + dy * dy;
                    if (dist2 < 110 * 110) {
                        const alpha = Math.max(0, 0.08 - dist2 / (110 * 110) * 0.08);
                        ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            rafId = requestAnimationFrame(step);
        }

        function hexToRgba(hex, a) {
            const c = hex.replace('#', '');
            const m = c.length === 3 ? c.split('').map(x => x + x) : [c.slice(0,2), c.slice(2,4), c.slice(4,6)];
            const [r,g,b] = m.map(h => parseInt(h, 16));
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        }

        const onResize = () => { resize(); init(); };
        window.addEventListener('resize', onResize);
        onResize();
        step();

        // Pause when tab hidden to save CPU
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) cancelAnimationFrame(rafId);
            else rafId = requestAnimationFrame(step);
        });
    }

    setupEventListeners() {
        // Upload button click with smooth scroll
        const uploadBtn = document.getElementById('uploadBtn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => this.scrollToUpload());
        }

        // File input change
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileSelect(e.target.files[0]));
        }

        // Enhanced drag and drop zone
        const dropZone = document.getElementById('dropZone');
        if (dropZone) {
            dropZone.addEventListener('click', () => fileInput.click());
            dropZone.addEventListener('dragover', (e) => this.handleDragOver(e));
            dropZone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            dropZone.addEventListener('drop', (e) => this.handleDrop(e));
            
            // Add hover effects
            dropZone.addEventListener('mouseenter', () => this.addDropZoneHover());
            dropZone.addEventListener('mouseleave', () => this.removeDropZoneHover());
        }

        // New analysis button
        const newAnalysisBtn = document.getElementById('newAnalysisBtn');
        if (newAnalysisBtn) {
            newAnalysisBtn.addEventListener('click', () => this.resetAnalysis());
        }

        // Download report button
        const downloadReportBtn = document.getElementById('downloadReportBtn');
        if (downloadReportBtn) {
            downloadReportBtn.addEventListener('click', () => this.showFormatModal());
        }

        // Format selection modal
        this.setupFormatModal();

        // Enhanced smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target);
                }
            });
        });

        // Add keyboard navigation
        this.setupKeyboardNavigation();
    }

    setupHammerJS() {
        // Enhanced touch gestures for mobile devices
        const dropZone = document.getElementById('dropZone');
        if (dropZone && typeof Hammer !== 'undefined') {
            const hammer = new Hammer(dropZone);
            
            hammer.on('tap', () => {
                document.getElementById('fileInput').click();
            });

            hammer.on('swipeleft', () => {
                this.showNotification('Swipe left detected!', 'info');
            });

            hammer.on('swiperight', () => {
                this.showNotification('Swipe right detected!', 'info');
            });

            // Add pinch gesture for zoom
            hammer.get('pinch').set({ enable: true });
            hammer.on('pinch', (e) => {
                this.handlePinchGesture(e);
            });
        }
    }

    setupAnimations() {
        // Enhanced intersection observer for scroll animations
        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        this.observeElementsForAnimation();
    }

    setupIntersectionObserver() {
        // Observe all elements that need animation
        const animatedElements = document.querySelectorAll(
            '.card, .floating-element, .skill-tag, .recommendation-item'
        );
        
        animatedElements.forEach(el => {
            this.animationObserver.observe(el);
        });
    }

    observeElementsForAnimation() {
        const elements = document.querySelectorAll('.card, .floating-element');
        elements.forEach(el => {
            this.animationObserver.observe(el);
        });
    }

    animateElement(element) {
        // Add staggered animations based on element type
        if (element.classList.contains('card')) {
            element.classList.add('animate-scale-in');
        } else if (element.classList.contains('floating-element')) {
            element.classList.add('animate-float');
        } else if (element.classList.contains('skill-tag')) {
            element.classList.add('animate-fade-in-up');
        }
    }

    setupScrollEffects() {
        // Enhanced parallax effect for floating elements
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.01}deg)`;
            });
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    setupPerformanceOptimizations() {
        // Debounce scroll events
        const debouncedScroll = this.debounce(() => {
            // Handle scroll-based optimizations
        }, 16); // 60fps

        window.addEventListener('scroll', debouncedScroll, { passive: true });

        // Optimize animations for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
    }

    setupKeyboardNavigation() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + U for upload
            if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
                e.preventDefault();
                this.scrollToUpload();
            }
            
            // Escape to close modal
            if (e.key === 'Escape') {
                this.hideFormatModal();
            }
        });
    }

    scrollToUpload() {
        const uploadSection = document.getElementById('uploadSection');
        if (uploadSection) {
            this.smoothScrollTo(uploadSection);
        }
    }

    smoothScrollTo(target) {
        const targetPosition = target.offsetTop - 80; // Account for fixed header
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    addDropZoneHover() {
        const dropZone = document.getElementById('dropZone');
        if (dropZone) {
            dropZone.classList.add('drop-zone-hover');
        }
    }

    removeDropZoneHover() {
        const dropZone = document.getElementById('dropZone');
        if (dropZone) {
            dropZone.classList.remove('drop-zone-hover');
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        const dropZone = document.getElementById('dropZone');
        dropZone.classList.add('drop-zone-drag-over');
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        const dropZone = document.getElementById('dropZone');
        dropZone.classList.remove('drop-zone-drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const dropZone = document.getElementById('dropZone');
        dropZone.classList.remove('drop-zone-drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.handleFileSelect(files[0]);
        }
    }

    handlePinchGesture(e) {
        // Handle pinch zoom if needed
        console.log('Pinch gesture detected:', e.scale);
    }

    handleFileSelect(file) {
        if (!file) return;

        // Validate file type with enhanced feedback
        const allowedTypes = ['.pdf', '.docx', '.doc', '.txt', '.rtf'];
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        
        if (!allowedTypes.includes(fileExtension)) {
            this.showNotification('File type not supported. Please upload PDF, DOCX, DOC, TXT, or RTF files.', 'error');
            return;
        }

        // Validate file size (16MB max)
        if (file.size > 16 * 1024 * 1024) {
            this.showNotification('File size too large. Please upload files smaller than 16MB.', 'error');
            return;
        }

        this.currentFile = file;
        this.uploadFile(file);
    }

    async uploadFile(file) {
        if (this.isUploading) return;
        
        this.isUploading = true;
        this.showUploadProgress();

        try {
            const formData = new FormData();
            formData.append('cv_file', file);

            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                this.currentAnalysis = result.analysis;
                this.currentFilename = file.name;
                this.showResults(result.analysis, file.name);
                this.showNotification('CV analysis completed successfully!', 'success');
            } else {
                throw new Error(result.error || 'Upload failed');
            }

        } catch (error) {
            console.error('Upload error:', error);
            this.showNotification(`Upload failed: ${error.message}`, 'error');
        } finally {
            this.isUploading = false;
            this.hideUploadProgress();
        }
    }

    showUploadProgress() {
        const progressSection = document.getElementById('uploadProgress');
        const progressBar = document.getElementById('progressBar');
        
        if (progressSection && progressBar) {
            progressSection.classList.remove('hidden');
            progressSection.classList.add('animate-fade-in-up');
            
            // Enhanced progress animation with easing
            let progress = 0;
            const targetProgress = 90;
            const duration = 2000;
            const startTime = Date.now();

            const animateProgress = () => {
                const elapsed = Date.now() - startTime;
                const progressRatio = Math.min(elapsed / duration, 1);
                
                // Use easeOutQuart for smooth deceleration
                progress = targetProgress * this.easeOutQuart(progressRatio);
                progressBar.style.width = progress + '%';
                
                if (progressRatio < 1) {
                    requestAnimationFrame(animateProgress);
                }
            };

            requestAnimationFrame(animateProgress);
        }
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    hideUploadProgress() {
        const progressSection = document.getElementById('uploadProgress');
        if (progressSection) {
            progressSection.classList.add('hidden');
        }
    }

    showResults(analysis, filename) {
        // Hide upload section and show results with smooth transition
        const uploadSection = document.getElementById('uploadSection');
        const resultsSection = document.getElementById('resultsSection');
        
        if (uploadSection && resultsSection) {
            uploadSection.classList.add('hidden');
            resultsSection.classList.remove('hidden');
            resultsSection.classList.add('animate-fade-in-up');
            
            // Scroll to results with smooth animation
            this.smoothScrollTo(resultsSection);
        }

        // Populate results with staggered animations
        setTimeout(() => {
            this.populateResults(analysis);
        }, 300);
    }

    populateResults(analysis) {
        // Update score and stats with enhanced animations
        const cvScore = document.getElementById('cvScore');
        const wordCount = document.getElementById('wordCount');
        const skillCount = document.getElementById('skillCount');
        const scoreProgress = document.getElementById('scoreProgress');
        
        // Update CV score with percentage and animate progress bar
        if (cvScore && scoreProgress) {
            const score = analysis.score || 0;
            
            // Animate score counting up
            this.animateScoreCountUp(cvScore, 0, score, 1500);
            
            // Animate the circular progress bar
            this.animateScoreProgress(score, scoreProgress);
            
            // Update score label
            this.updateScoreLabel(score);
        }
        
        // Animate word count
        if (wordCount) {
            const finalCount = analysis.basic_analysis?.word_count || 0;
            this.animateScoreCountUp(wordCount, 0, finalCount, 1000);
        }
        
        // Calculate and animate total skills
        const totalSkills = Object.values(analysis.basic_analysis?.skills || {}).flat().length;
        if (skillCount) {
            this.animateScoreCountUp(skillCount, 0, totalSkills, 1000);
        }

        // Populate sections with staggered animations
        setTimeout(() => this.populateSkillsAnalysis(analysis.basic_analysis?.skills || {}), 500);
        setTimeout(() => this.populateRecommendations(analysis.recommendations || []), 700);
        setTimeout(() => this.populateAIInsights(analysis.ai_analysis), 900);
    }

    animateScoreCountUp(element, start, end, duration) {
        const startTime = Date.now();
        const difference = end - start;
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Use easeOutQuart for smooth animation
            const current = start + (difference * this.easeOutQuart(progress));
            element.textContent = Math.round(current);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    animateScoreProgress(score, progressElement) {
        // Add animation class
        progressElement.classList.add('animating');
        
        // Calculate the stroke-dashoffset for the progress circle
        // Updated for new circle dimensions (r=42)
        const circumference = 264; // 2 * π * 42
        const progress = (100 - score) / 100; // Invert because we're rotating -90 degrees
        const strokeDashoffset = circumference * progress;
        
        // Animate the progress bar with easing
        const startOffset = 264;
        const endOffset = strokeDashoffset;
        const duration = 1200;
        const startTime = Date.now();
        
        const animateProgress = () => {
            const elapsed = Date.now() - startTime;
            const progressRatio = Math.min(elapsed / duration, 1);
            
            // Use easeOutCubic for smooth deceleration
            const currentOffset = startOffset + (endOffset - startOffset) * this.easeOutCubic(progressRatio, 0, 1, 1);
            progressElement.style.strokeDashoffset = currentOffset;
            
            if (progressRatio < 1) {
                requestAnimationFrame(animateProgress);
            }
        };
        
        requestAnimationFrame(animateProgress);
        
        // Add color variation based on score and CSS classes
        progressElement.classList.remove('score-excellent', 'score-good', 'score-fair', 'score-poor');
        
        if (score >= 80) {
            progressElement.classList.add('score-excellent');
        } else if (score >= 60) {
            progressElement.classList.add('score-good');
        } else if (score >= 40) {
            progressElement.classList.add('score-fair');
        } else {
            progressElement.classList.add('score-poor');
        }
        
        // Remove animation class after animation completes
        setTimeout(() => {
            progressElement.classList.remove('animating');
        }, duration);
    }

    easeOutCubic(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    }

    updateScoreLabel(score) {
        const scoreLabel = document.getElementById('scoreLabel');
        if (!scoreLabel) return;
        
        let label = 'CV Score';
        let labelClass = 'text-primary-800';
        
        if (score >= 80) {
            label = 'Excellent CV!';
            labelClass = 'text-emerald-600';
        } else if (score >= 60) {
            label = 'Good CV';
            labelClass = 'text-primary-600';
        } else if (score >= 40) {
            label = 'Fair CV';
            labelClass = 'text-amber-600';
        } else {
            label = 'Needs Work';
            labelClass = 'text-red-600';
        }
        
        // Animate label change
        scoreLabel.style.opacity = '0';
        setTimeout(() => {
            scoreLabel.textContent = label;
            scoreLabel.className = `font-semibold text-lg ${labelClass}`;
            scoreLabel.style.opacity = '1';
        }, 150);
    }

    populateSkillsAnalysis(skills) {
        const skillsContainer = document.getElementById('skillsAnalysis');
        if (!skillsContainer) return;

        skillsContainer.innerHTML = '';
        
        Object.entries(skills).forEach(([category, skillList], categoryIndex) => {
            if (skillList.length > 0) {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'mb-6 opacity-0';
                categoryDiv.style.animationDelay = `${categoryIndex * 100}ms`;
                
                const categoryTitle = document.createElement('h4');
                categoryTitle.className = 'font-semibold text-slate-800 mb-3 capitalize text-lg';
                categoryTitle.textContent = category.replace('_', ' ');
                
                const skillsDiv = document.createElement('div');
                skillsDiv.className = 'flex flex-wrap gap-3';
                
                skillList.forEach((skill, skillIndex) => {
                    const skillTag = document.createElement('span');
                    skillTag.className = 'skill-tag opacity-0';
                    skillTag.style.animationDelay = `${(categoryIndex * 100) + (skillIndex * 50)}ms`;
                    skillTag.textContent = skill;
                    skillsDiv.appendChild(skillTag);
                });
                
                categoryDiv.appendChild(categoryTitle);
                categoryDiv.appendChild(skillsDiv);
                skillsContainer.appendChild(categoryDiv);
                
                // Trigger animations
                setTimeout(() => {
                    categoryDiv.classList.add('animate-fade-in-up');
                    categoryDiv.style.opacity = '1';
                }, categoryIndex * 100);
                
                // Animate skill tags
                setTimeout(() => {
                    skillList.forEach((_, skillIndex) => {
                        const skillTag = skillsDiv.children[skillIndex];
                        skillTag.classList.add('animate-scale-in');
                        skillTag.style.opacity = '1';
                    });
                }, (categoryIndex * 100) + 200);
            }
        });
    }

    populateRecommendations(recommendations) {
        const recommendationsContainer = document.getElementById('recommendations');
        if (!recommendationsContainer) return;

        recommendationsContainer.innerHTML = '';
        
        recommendations.forEach((recommendation, index) => {
            const recDiv = document.createElement('div');
            recDiv.className = 'recommendation-item opacity-0';
            recDiv.style.animationDelay = `${index * 100}ms`;
            
            const icon = document.createElement('i');
            icon.className = 'fas fa-check-circle text-emerald-500 mr-3 text-lg';
            
            const text = document.createElement('span');
            text.className = 'text-slate-700 leading-relaxed';
            text.textContent = recommendation;
            
            recDiv.appendChild(icon);
            recDiv.appendChild(text);
            recommendationsContainer.appendChild(recDiv);
            
            // Trigger animation
            setTimeout(() => {
                recDiv.classList.add('animate-slide-in-left');
                recDiv.style.opacity = '1';
            }, index * 100);
        });
    }

    populateAIInsights(aiAnalysis) {
        console.log('populateAIInsights called with:', aiAnalysis);
        const aiInsights = document.getElementById('aiInsights');
        console.log('aiInsights element found:', aiInsights);
        
        if (aiInsights) {
            if (aiAnalysis?.ai_insights) {
                console.log('AI insights found:', aiAnalysis.ai_insights);
                // Update AI insights with markdown formatting
                this.updateAIInsights(aiAnalysis.ai_insights);
                aiInsights.classList.remove('hidden');
                aiInsights.classList.add('animate-fade-in-up');
            } else {
                console.log('No AI insights found in analysis');
                aiInsights.classList.add('hidden');
            }
        } else {
            console.log('aiInsights element not found');
        }
    }

    async downloadReport(format = 'txt') {
        if (!this.currentAnalysis || !this.currentFilename) {
            this.showNotification('No analysis data available for report generation.', 'error');
            return;
        }

        // Get download button and show loading state
        const downloadBtn = document.getElementById('downloadReportBtn');
        const originalText = downloadBtn.innerHTML;
        
        if (downloadBtn) {
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i>Generating Report...';
            downloadBtn.disabled = true;
        }

        try {
            this.showNotification('Generating report...', 'info');
            
            const response = await fetch('/download-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    analysis: this.currentAnalysis,
                    filename: this.currentFilename,
                    format: format
                })
            });

            if (response.ok) {
                // Get the filename from the response headers
                const contentDisposition = response.headers.get('content-disposition');
                let filename = 'CV_Analysis_Report.txt';
                
                if (contentDisposition) {
                    const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                    if (filenameMatch) {
                        filename = filenameMatch[1];
                    }
                }

                // Create blob and download
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);

                this.showNotification('Report downloaded successfully!', 'success');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Report generation failed');
            }

        } catch (error) {
            console.error('Report download error:', error);
            this.showNotification(`Report download failed: ${error.message}`, 'error');
        } finally {
            // Restore button state
            if (downloadBtn) {
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
            }
        }
    }

    resetAnalysis() {
        // Reset to upload state with smooth transition
        const uploadSection = document.getElementById('uploadSection');
        const resultsSection = document.getElementById('resultsSection');
        
        if (uploadSection && resultsSection) {
            resultsSection.classList.add('animate-fade-out');
            
            setTimeout(() => {
                resultsSection.classList.add('hidden');
                resultsSection.classList.remove('animate-fade-out');
                uploadSection.classList.remove('hidden');
                uploadSection.classList.add('animate-fade-in-up');
                this.smoothScrollTo(uploadSection);
            }, 300);
        }

        // Reset file input
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.value = '';
        }

        // Reset current file and analysis
        this.currentFile = null;
        this.currentAnalysis = null;
        this.currentFilename = null;
    }

    showNotification(message, type = 'info') {
        // Create notification element with enhanced styling
        const notification = document.createElement('div');
        notification.className = `fixed top-6 right-6 p-4 rounded-2xl shadow-2xl z-50 transform transition-all duration-500 translate-x-full max-w-sm`;
        
        // Set colors based on type with enhanced gradients
        const colors = {
            success: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white',
            error: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
            info: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white',
            warning: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
        };
        
        notification.className += ` ${colors[type] || colors.info}`;
        
        // Add icon with enhanced styling
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-triangle'
        };
        
        notification.innerHTML = `
            <div class="flex items-start space-x-3">
                <i class="${icons[type] || icons.info} text-xl mt-0.5"></i>
                <div class="flex-1">
                    <p class="font-medium">${message}</p>
                </div>
                <button class="text-white/80 hover:text-white transition-colors" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in with enhanced easing
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
            notification.classList.add('animate-bounce');
        }, 100);
        
        // Remove bounce animation
        setTimeout(() => {
            notification.classList.remove('animate-bounce');
        }, 1000);
        
        // Auto remove after 6 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 6000);
    }

    setupFormatModal() {
        const modal = document.getElementById('formatModal');
        const pdfOption = document.getElementById('pdfOption');
        const txtOption = document.getElementById('txtOption');
        const pdfRadio = document.getElementById('pdfRadioSelected');
        const txtRadio = document.getElementById('txtRadioSelected');
        const cancelBtn = document.getElementById('cancelFormat');
        const confirmBtn = document.getElementById('confirmFormat');

        let selectedFormat = 'txt';

        // Enhanced PDF option click
        pdfOption.addEventListener('click', () => {
            selectedFormat = 'pdf';
            this.selectFormatOption(pdfOption, txtOption, pdfRadio, txtRadio);
        });

        // Enhanced TXT option click
        txtOption.addEventListener('click', () => {
            selectedFormat = 'txt';
            this.selectFormatOption(txtOption, pdfOption, txtRadio, pdfRadio);
        });

        // Cancel button
        cancelBtn.addEventListener('click', () => {
            this.hideFormatModal();
        });

        // Confirm button
        confirmBtn.addEventListener('click', () => {
            this.hideFormatModal();
            this.downloadReport(selectedFormat);
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideFormatModal();
            }
        });

        // Add keyboard support
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideFormatModal();
            }
        });
    }

    selectFormatOption(selectedOption, unselectedOption, selectedRadio, unselectedRadio) {
        // Enhanced selection animation
        selectedRadio.classList.remove('hidden');
        unselectedRadio.classList.add('hidden');
        
        selectedOption.classList.add('format-option-selected');
        unselectedOption.classList.remove('format-option-selected');
        
        // Add selection animation
        selectedOption.classList.add('animate-scale-in');
        setTimeout(() => {
            selectedOption.classList.remove('animate-scale-in');
        }, 300);
    }

    showFormatModal() {
        const modal = document.getElementById('formatModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('animate-scale-in');
            
            // Reset to default selection
            document.getElementById('txtRadioSelected').classList.remove('hidden');
            document.getElementById('pdfRadioSelected').classList.add('hidden');
            document.getElementById('txtOption').classList.add('format-option-selected');
            document.getElementById('pdfOption').classList.remove('format-option-selected');
            
            // Focus management for accessibility
            setTimeout(() => {
                document.getElementById('txtOption').focus();
            }, 100);
        }
    }

    hideFormatModal() {
        const modal = document.getElementById('formatModal');
        if (modal) {
            modal.classList.add('animate-fade-out');
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('animate-fade-out', 'animate-scale-in');
            }, 300);
        }
    }

    // Enhanced utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Enhanced Footer Functionality
    setupFooterEnhancements() {
        // Newsletter subscription
        const newsletterForm = document.querySelector('.newsletter-section');
        const emailInput = document.querySelector('input[type="email"]');
        const subscribeBtn = document.querySelector('.newsletter-button');
        
        if (newsletterForm && emailInput && subscribeBtn) {
            // Email validation
            emailInput.addEventListener('input', (e) => {
                const email = e.target.value;
                const isValid = this.validateEmail(email);
                
                if (isValid) {
                    emailInput.classList.remove('border-red-500');
                    emailInput.classList.add('border-green-500');
                } else {
                    emailInput.classList.remove('border-green-500');
                    emailInput.classList.add('border-red-500');
                }
            });
            
            // Newsletter subscription
            subscribeBtn.addEventListener('click', () => {
                const email = emailInput.value;
                if (this.validateEmail(email)) {
                    this.handleNewsletterSubscription(email);
                } else {
                    this.showNotification('Please enter a valid email address', 'error');
                }
            });
        }
        
        // Smooth scrolling for footer links
        const footerLinks = document.querySelectorAll('footer a[href^="#"]');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement.offsetTop - 100, 800);
                }
            });
        });
        
        // Footer animations on scroll
        this.setupFooterAnimations();
        
        // Enhanced social media interactions
        this.setupSocialMediaEnhancements();
    }
    
    // Email validation
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Handle newsletter subscription
    handleNewsletterSubscription(email) {
        // Simulate API call
        const subscribeBtn = document.querySelector('.newsletter-button');
        const originalText = subscribeBtn.textContent;
        
        subscribeBtn.textContent = 'Subscribing...';
        subscribeBtn.disabled = true;
        
        setTimeout(() => {
            this.showNotification('Successfully subscribed to newsletter!', 'success');
            subscribeBtn.textContent = 'Subscribed!';
            subscribeBtn.classList.add('bg-green-600');
            
            setTimeout(() => {
                subscribeBtn.textContent = originalText;
                subscribeBtn.disabled = false;
                subscribeBtn.classList.remove('bg-green-600');
            }, 2000);
        }, 1500);
    }
    
    // Setup footer animations
    setupFooterAnimations() {
        const footerElements = document.querySelectorAll('footer .footer-grid > div, footer .newsletter-section, footer .footer-bottom');
        
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        footerElements.forEach(element => {
            footerObserver.observe(element);
        });
    }
    
    // Setup social media enhancements
    setupSocialMediaEnhancements() {
        const socialIcons = document.querySelectorAll('.social-icon');
        
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'translateY(-4px) scale(1.1)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'translateY(0) scale(1)';
            });
            
            icon.addEventListener('click', () => {
                // Add ripple effect
                this.createRippleEffect(icon);
            });
        });
    }
    
    // Create ripple effect for social icons
    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple-effect');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Enhanced footer link interactions
    setupFooterLinkInteractions() {
        const footerLinks = document.querySelectorAll('footer a:not([href^="#"])');
        
        footerLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateX(4px)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateX(0)';
            });
        });
    }
    
    // Footer floating elements animation
    setupFooterFloatingElements() {
        const floatingElements = document.querySelectorAll('.footer-floating-element');
        
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 2}s`;
            element.style.animationDuration = `${8 + index * 2}s`;
        });
    }

    // About Us Overlay Functionality
    setupAboutUsOverlay() {
        console.log('Setting up About Us overlay...');
        
        const aboutUsLink = document.getElementById('aboutUsLink');
        const aboutUsOverlay = document.getElementById('aboutUsOverlay');
        const aboutUsPanel = document.getElementById('aboutUsPanel');
        const closeAboutUs = document.getElementById('closeAboutUs');
        const closeAboutUsCta = document.getElementById('closeAboutUsCta');
        
        console.log('About Us elements found:', {
            link: aboutUsLink,
            overlay: aboutUsOverlay,
            panel: aboutUsPanel,
            closeBtn: closeAboutUs,
            closeCta: closeAboutUsCta
        });
        
        if (aboutUsLink && aboutUsOverlay && aboutUsPanel) {
            // Open About Us overlay
            aboutUsLink.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('About Us link clicked!');
                this.openAboutUs();
            });
            
            // Close About Us overlay
            if (closeAboutUs) {
                closeAboutUs.addEventListener('click', () => {
                    console.log('Close button clicked!');
                    this.closeAboutUs();
                });
            }
            
            if (closeAboutUsCta) {
                closeAboutUsCta.addEventListener('click', () => {
                    console.log('Close CTA clicked!');
                    this.closeAboutUs();
                });
            }
            
            // Close on overlay click (outside panel)
            aboutUsOverlay.addEventListener('click', (e) => {
                if (e.target === aboutUsOverlay) {
                    console.log('Overlay background clicked!');
                    this.closeAboutUs();
                }
            });
            
            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !aboutUsOverlay.classList.contains('hidden')) {
                    console.log('Escape key pressed!');
                    this.closeAboutUs();
                }
            });
            
            console.log('About Us overlay setup complete!');
        } else {
            console.error('Some About Us elements not found!');
        }
    }
    
    // Open About Us overlay
    openAboutUs() {
        console.log('Opening About Us overlay...');
        const aboutUsOverlay = document.getElementById('aboutUsOverlay');
        const aboutUsPanel = document.getElementById('aboutUsPanel');
        
        if (aboutUsOverlay && aboutUsPanel) {
            console.log('Elements found, proceeding with animation...');
            
            // Show overlay
            aboutUsOverlay.classList.remove('hidden');
            aboutUsOverlay.style.opacity = '0';
            
            // Fade in overlay
            setTimeout(() => {
                aboutUsOverlay.style.transition = 'opacity 0.3s ease-out';
                aboutUsOverlay.style.opacity = '1';
                console.log('Overlay faded in');
            }, 10);
            
            // Slide in panel
            setTimeout(() => {
                aboutUsPanel.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                aboutUsPanel.style.transform = 'translateX(0)';
                console.log('Panel sliding in');
            }, 50);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Add entrance animations to content
            this.animateAboutUsContent();
            
            console.log('About Us overlay opened successfully!');
        } else {
            console.error('Could not find About Us elements for opening!');
        }
    }
    
    // Close About Us overlay
    closeAboutUs() {
        console.log('Closing About Us overlay...');
        const aboutUsOverlay = document.getElementById('aboutUsOverlay');
        const aboutUsPanel = document.getElementById('aboutUsPanel');
        
        if (aboutUsOverlay && aboutUsPanel) {
            console.log('Elements found, proceeding with close animation...');
            
            // Slide out panel
            aboutUsPanel.style.transform = 'translateX(100%)';
            
            // Fade out overlay
            setTimeout(() => {
                aboutUsOverlay.style.opacity = '0';
                console.log('Overlay fading out');
            }, 300);
            
            // Hide overlay
            setTimeout(() => {
                aboutUsOverlay.classList.add('hidden');
                document.body.style.overflow = '';
                console.log('About Us overlay closed and hidden');
            }, 600);
        } else {
            console.error('Could not find About Us elements for closing!');
        }
    }
    
    // Animate About Us content on entrance
    animateAboutUsContent() {
        const contentElements = document.querySelectorAll('#aboutUsPanel > div > div');
        
        contentElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 800 + (index * 150));
        });
    }
    
    // Enhanced About Us interactions
    setupAboutUsInteractions() {
        // Hover effects for service cards
        const serviceCards = document.querySelectorAll('#aboutUsPanel .bg-white.p-6');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
            });
        });
        
        // Technology stack hover effects
        const techCards = document.querySelectorAll('#aboutUsPanel .grid.grid-cols-2.md\\:grid-cols-4 .bg-white');
        techCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
            });
        });
        
        // Mission & Vision cards hover effects
        const missionCards = document.querySelectorAll('#aboutUsPanel .bg-gradient-to-br');
        missionCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.02)';
                card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
            });
        });
    }

    // Convert markdown-like formatting to HTML
    formatMarkdown(text) {
        if (!text) return '';
        
        return text
            // Bold text: **text** or *text*
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
            // Italic text: _text_
            .replace(/_(.*?)_/g, '<em>$1</em>')
            // Bullet points: - item or * item
            .replace(/^[\s]*[-*][\s]+/gm, '<li>')
            .replace(/(<li>.*?)(?=\n|$)/g, '$1</li>')
            // Wrap lists in <ul> tags
            .replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>')
            // Headers: ## Header
            .replace(/^##\s+(.*?)$/gm, '<h4 class="text-lg font-semibold text-slate-800 mb-2">$1</h4>')
            // Line breaks
            .replace(/\n/g, '<br>')
            // Clean up empty list items
            .replace(/<ul><\/ul>/g, '')
            .replace(/<li><\/li>/g, '');
    }

    // Update AI insights with markdown support
    updateAIInsights(insights) {
        console.log('updateAIInsights called with:', insights);
        const aiInsightsElement = document.getElementById('aiInsights');
        console.log('aiInsights element found:', aiInsightsElement);
        
        if (aiInsightsElement && insights) {
            const formattedInsights = this.formatMarkdown(insights);
            console.log('Formatted insights:', formattedInsights);
            aiInsightsElement.innerHTML = formattedInsights;
        } else {
            console.log('Missing element or insights:', { element: aiInsightsElement, insights: insights });
        }
    }

    // Setup demo modal functionality
    setupDemoModal() {
        const watchDemoBtn = document.getElementById('watchDemoBtn');
        const demoModal = document.getElementById('demoModal');
        const demoModalContent = document.getElementById('demoModalContent');
        const closeDemoModal = document.getElementById('closeDemoModal');
        const videoPlaceholder = document.getElementById('videoPlaceholder');

        if (watchDemoBtn && demoModal && demoModalContent && closeDemoModal) {
            // Open modal
            watchDemoBtn.addEventListener('click', () => {
                this.openDemoModal();
            });

            // Close modal
            closeDemoModal.addEventListener('click', () => {
                this.closeDemoModal();
            });

            // Close modal when clicking outside
            demoModal.addEventListener('click', (e) => {
                if (e.target === demoModal) {
                    this.closeDemoModal();
                }
            });

            // Close modal with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !demoModal.classList.contains('hidden')) {
                    this.closeDemoModal();
                }
            });

            // Video placeholder click effect
            if (videoPlaceholder) {
                videoPlaceholder.addEventListener('click', () => {
                    this.handleVideoPlay();
                });
            }
        }
    }

    // Open demo modal with smooth animation
    openDemoModal() {
        const demoModal = document.getElementById('demoModal');
        const demoModalContent = document.getElementById('demoModalContent');

        if (demoModal && demoModalContent) {
            // Show modal
            demoModal.classList.remove('hidden');
            
            // Trigger animation after a brief delay
            setTimeout(() => {
                demoModalContent.style.transform = 'scale(1)';
                demoModalContent.style.opacity = '1';
            }, 10);

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    }

    // Close demo modal with smooth animation
    closeDemoModal() {
        const demoModal = document.getElementById('demoModal');
        const demoModalContent = document.getElementById('demoModalContent');

        if (demoModal && demoModalContent) {
            // Start closing animation
            demoModalContent.style.transform = 'scale(0.95)';
            demoModalContent.style.opacity = '0';

            // Hide modal after animation
            setTimeout(() => {
                demoModal.classList.add('hidden');
                // Reset body scroll
                document.body.style.overflow = '';
            }, 300);
        }
    }

    // Handle video play button click
    handleVideoPlay() {
        const videoPlaceholder = document.getElementById('videoPlaceholder');
        if (videoPlaceholder) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'absolute inset-0 bg-white/30 rounded-full scale-0 animate-ping';
            videoPlaceholder.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 1000);

            // Transform the placeholder to show video playing
            videoPlaceholder.innerHTML = `
                <div class="relative z-10">
                    <div class="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                        <i class="fas fa-play text-white text-3xl ml-2"></i>
                    </div>
                    <div class="mt-4 text-center">
                        <p class="text-slate-700 font-medium">Video Playing...</p>
                        <div class="flex items-center justify-center space-x-1 mt-2">
                            <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                            <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                        </div>
                    </div>
                </div>
            `;

            // Add a subtle video playing animation
            videoPlaceholder.classList.add('video-playing');
            
            // Reset after 5 seconds to show the original state
            setTimeout(() => {
                this.resetVideoPlaceholder();
            }, 5000);
        }
    }

    // Setup CV Rewrite modal and actions
    setupCvRewriteModal() {
        const rewriteBtn = document.getElementById('rewriteCvBtn');
        const modal = document.getElementById('cvRewriteModal');
        const modalContent = document.getElementById('cvRewriteModalContent');
        const closeBtn = document.getElementById('closeCvRewriteModal');
        const generateBtn = document.getElementById('generateRewriteBtn');
        const downloadBtn = document.getElementById('downloadRewrittenCvBtn');
        const copyBtn = document.getElementById('copyToClipboardBtn');

        if (!rewriteBtn || !modal || !modalContent || !closeBtn || !generateBtn) {
            console.warn('Rewrite modal elements not found');
            return;
        }

        const openModal = () => {
            modal.classList.remove('hidden');
            setTimeout(() => {
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';
            }, 10);
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modalContent.style.transform = 'scale(0.95)';
            modalContent.style.opacity = '0';
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 250);
        };

        // Open
        rewriteBtn.addEventListener('click', () => {
            // Build ephemeral draft
            const originalText = this.currentAnalysis?.basic_analysis?.extracted_text || '';
            const aiInsights = this.currentAnalysis?.ai_analysis?.ai_insights || '';
            this.cvRewriteDraft = {
                id: String(Date.now()),
                filename: this.currentFilename || 'cv.txt',
                originalText,
                aiInsights,
                createdAt: new Date().toISOString(),
            };
            try { sessionStorage.setItem('cvnalys_rewrite_draft', JSON.stringify(this.cvRewriteDraft)); } catch (_) {}
            openModal();
        });

        // Close
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal(); });

        // Generate rewrite
        generateBtn.addEventListener('click', async () => {
            const tone = document.getElementById('rewriteTone')?.value || 'professional';
            const targetRole = document.getElementById('rewriteTargetRole')?.value || '';
            const length = document.getElementById('rewriteLength')?.value || 'standard';

            if (!this.cvRewriteDraft || !this.cvRewriteDraft.originalText) {
                this.showNotification('Original CV text not available for rewrite.', 'error');
                return;
            }

            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Rewriting...';
            generateBtn.disabled = true;

            try {
                const resp = await fetch('/rewrite-cv', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        original_text: this.cvRewriteDraft.originalText,
                        ai_insights: this.cvRewriteDraft.aiInsights,
                        options: { tone, target_role: targetRole, length }
                    })
                });
                const data = await resp.json();
                if (!resp.ok || !data.success) throw new Error(data.error || 'Rewrite failed');

                const section = document.getElementById('rewrittenCvSection');
                const preview = document.getElementById('rewrittenCvContent');
                if (section && preview) {
                    const formatted = this.formatRewrittenText(data.rewritten_text || '');
                    preview.innerHTML = formatted;
                    section.classList.remove('hidden');
                    downloadBtn?.classList.remove('hidden');
                    copyBtn?.classList.remove('hidden');
                }
            } catch (err) {
                console.error('Rewrite error:', err);
                this.showNotification(`Rewrite failed: ${err.message}`, 'error');
            } finally {
                generateBtn.innerHTML = '<i class=\"fas fa-wand-magic-sparkles mr-2\"></i>Generate Rewrite';
                generateBtn.disabled = false;
            }
        });

        // Download rewritten
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                const preview = document.getElementById('rewrittenCvContent');
                const content = preview ? (preview.innerText || preview.textContent || '') : '';
                if (!content) return;
                const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `rewritten_${this.currentFilename || 'cv'}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        }

        // Copy rewritten
        if (copyBtn) {
            copyBtn.addEventListener('click', async () => {
                const preview = document.getElementById('rewrittenCvContent');
                const content = preview ? (preview.innerText || preview.textContent || '') : '';
                if (!content) return;
                try { await navigator.clipboard.writeText(content); this.showNotification('Copied to clipboard', 'success'); } catch (_) { this.showNotification('Copy failed', 'error'); }
            });
        }
    }

    // Robust formatter for rewritten CV text → HTML (paragraphs, lists, headers)
    formatRewrittenText(text) {
        if (!text) return '';
        const lines = String(text).replace(/\r\n?|\u2028|\u2029/g, '\n').split('\n');
        let html = '';
        let inUl = false, inOl = false;
        let paraBuffer = [];

        const flushPara = () => {
            if (paraBuffer.length === 0) return;
            const content = this.applyInlineFormatting(this.escapeHtml(paraBuffer.join(' ').trim()));
            html += `<p>${content}</p>`;
            paraBuffer = [];
        };
        const openUl = () => { if (!inUl) { html += '<ul>'; inUl = true; } };
        const closeUl = () => { if (inUl) { html += '</ul>'; inUl = false; } };
        const openOl = () => { if (!inOl) { html += '<ol>'; inOl = true; } };
        const closeOl = () => { if (inOl) { html += '</ol>'; inOl = false; } };

        lines.forEach((raw) => {
            const line = raw.trim();
            if (line === '') { // blank → paragraph/list break
                flushPara(); closeUl(); closeOl();
                return;
            }

            // Markdown-style headers
            const h3 = line.match(/^###\s+(.+)/);
            const h2 = line.match(/^##\s+(.+)/);
            if (h3 || h2) {
                flushPara(); closeUl(); closeOl();
                const levelText = this.applyInlineFormatting(this.escapeHtml((h3?.[1] || h2?.[1]).trim()));
                html += `<h4 class="text-lg font-semibold text-slate-800 mb-2">${levelText}</h4>`;
                return;
            }

            // Bulleted list (supports -, * or •)
            if (/^[-*•]\s+/.test(line)) {
                flushPara(); closeOl(); openUl();
                const item = line.replace(/^[-*•]\s+/, '');
                const content = this.applyInlineFormatting(this.escapeHtml(item));
                html += `<li>${content}</li>`;
                return;
            }

            // Numbered list (1., 1) etc.)
            if (/^\d+[\.)]\s+/.test(line)) {
                flushPara(); closeUl(); openOl();
                const item = line.replace(/^\d+[\.)]\s+/, '');
                const content = this.applyInlineFormatting(this.escapeHtml(item));
                html += `<li>${content}</li>`;
                return;
            }

            // Otherwise accumulate paragraph lines
            paraBuffer.push(line);
        });

        flushPara(); closeUl(); closeOl();
        return html;
    }

    // Escape HTML special characters
    escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Apply simple inline formatting (bold/italic) after escaping
    applyInlineFormatting(s) {
        return s
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/_(.*?)_/g, '<em>$1</em>');
    }

    // Reset video placeholder to original state
    resetVideoPlaceholder() {
        const videoPlaceholder = document.getElementById('videoPlaceholder');
        if (videoPlaceholder) {
            videoPlaceholder.innerHTML = `
                <!-- Background Pattern -->
                <div class="absolute inset-0 opacity-10">
                    <div class="absolute top-0 left-0 w-32 h-32 bg-primary-200 rounded-full transform -translate-x-16 -translate-y-16"></div>
                    <div class="absolute bottom-0 right-0 w-24 h-24 bg-secondary-200 rounded-full transform translate-x-12 translate-y-12"></div>
                    <div class="absolute top-1/2 left-1/2 w-16 h-16 bg-yellow-200 rounded-full transform -translate-x-8 -translate-y-8"></div>
                </div>
                
                <!-- Play Icon -->
                <div class="relative z-10">
                    <div class="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-play text-white text-3xl ml-2"></i>
                    </div>
                </div>
                
                <!-- Hover Effect -->
                <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            `;
            
            videoPlaceholder.classList.remove('video-playing');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const app = new CVNalysApp();
    app.init();
    
    // Ensure About Us functionality is properly initialized
    setTimeout(() => {
        app.setupAboutUsOverlay();
        app.setupAboutUsInteractions();
        app.setupDemoModal();
        app.setupCvRewriteModal();
    }, 100);
});

// Handle page visibility changes with enhanced titles
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'CVNalys - Come back to analyze your CV! 📄';
    } else {
        document.title = 'CVNalys - Professional CV Analysis Tool';
    }
});

// Handle offline/online events with enhanced notifications
window.addEventListener('online', () => {
    if (window.cvnalysApp) {
        window.cvnalysApp.showNotification('You are back online! 🚀', 'success');
    }
});

window.addEventListener('offline', () => {
    if (window.cvnalysApp) {
        window.cvnalysApp.showNotification('You are offline. Please check your connection. 📡', 'warning');
    }
});

// Enhanced Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration);
            })
            .catch(registrationError => {
                console.log('Service Worker registration failed:', registrationError);
            });
    });
}

// Add performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load performance:', {
                loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
                firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime
            });
        }, 0);
    });
}
