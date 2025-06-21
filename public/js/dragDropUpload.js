class DragDropUpload {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            maxFiles: options.maxFiles || 1,
            maxSize: options.maxSize || 5 * 1024 * 1024, // 5MB
            allowedTypes: options.allowedTypes || ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
            onFileSelect: options.onFileSelect || null,
            onError: options.onError || null,
            ...options
        };
        
        this.files = [];
        this.init();
    }

    init() {
        this.createHTML();
        this.bindEvents();
    }

    createHTML() {
        this.container.innerHTML = `
            <div class="drag-drop-zone" id="dragZone">
                <div class="drag-drop-content">
                    <div class="drag-drop-icon">
                        <i class="fas fa-cloud-upload-alt"></i>
                    </div>
                    <h4 class="drag-drop-title">Drag & Drop Images Here</h4>
                    <p class="drag-drop-subtitle">or click to browse files</p>
                    <p class="drag-drop-info">
                        <small class="text-muted">
                            Supported: JPG, PNG, WebP (Max: ${this.formatFileSize(this.options.maxSize)})
                        </small>
                    </p>
                </div>
                <input type="file" id="fileInput" multiple accept="image/*" style="display: none;">
            </div>
            
            <div class="image-preview-container" id="previewContainer" style="display: none;">
                <div class="preview-header">
                    <h5>Selected Images</h5>
                    <button type="button" class="btn btn-sm btn-outline-danger" id="clearAll">
                        <i class="fas fa-trash"></i> Clear All
                    </button>
                </div>
                <div class="preview-grid" id="previewGrid"></div>
            </div>
            
            <div class="upload-progress" id="uploadProgress" style="display: none;">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 0%"></div>
                </div>
                <small class="text-muted">Uploading...</small>
            </div>
        `;

        // Add styles
        this.addStyles();
    }

    addStyles() {
        const styleId = 'drag-drop-styles';
        if (document.getElementById(styleId)) return;

        const styles = `
            <style id="${styleId}">
                .drag-drop-zone {
                    border: 3px dashed #dee2e6;
                    border-radius: 12px;
                    padding: 40px 20px;
                    text-align: center;
                    background: #f8f9fa;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }

                .drag-drop-zone:hover {
                    border-color: #D4AF37;
                    background: #fff8e1;
                }

                .drag-drop-zone.dragover {
                    border-color: #D4AF37;
                    background: #fff8e1;
                    transform: scale(1.02);
                }

                .drag-drop-zone.dragover::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(212, 175, 55, 0.1);
                    z-index: 1;
                }

                .drag-drop-content {
                    position: relative;
                    z-index: 2;
                }

                .drag-drop-icon {
                    font-size: 3rem;
                    color: #D4AF37;
                    margin-bottom: 1rem;
                }

                .drag-drop-title {
                    color: #333;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }

                .drag-drop-subtitle {
                    color: #666;
                    margin-bottom: 1rem;
                }

                .image-preview-container {
                    margin-top: 1.5rem;
                    padding: 1.5rem;
                    background: #fff;
                    border-radius: 12px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }

                .preview-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid #eee;
                }

                .preview-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    gap: 1rem;
                }

                .preview-item {
                    position: relative;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    transition: transform 0.2s ease;
                }

                .preview-item:hover {
                    transform: translateY(-2px);
                }

                .preview-item img {
                    width: 100%;
                    height: 120px;
                    object-fit: cover;
                }

                .preview-item-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }

                .preview-item:hover .preview-item-overlay {
                    opacity: 1;
                }

                .preview-item-remove {
                    background: #dc3545;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }

                .preview-item-remove:hover {
                    background: #c82333;
                }

                .preview-item-info {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(0,0,0,0.7);
                    color: white;
                    padding: 0.5rem;
                    font-size: 0.8rem;
                }

                .upload-progress {
                    margin-top: 1rem;
                }

                .error-message {
                    color: #dc3545;
                    background: #f8d7da;
                    border: 1px solid #f5c6cb;
                    border-radius: 4px;
                    padding: 0.5rem;
                    margin-top: 0.5rem;
                    font-size: 0.9rem;
                }

                .success-message {
                    color: #155724;
                    background: #d4edda;
                    border: 1px solid #c3e6cb;
                    border-radius: 4px;
                    padding: 0.5rem;
                    margin-top: 0.5rem;
                    font-size: 0.9rem;
                }

                @media (max-width: 768px) {
                    .preview-grid {
                        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                    }
                    
                    .drag-drop-zone {
                        padding: 30px 15px;
                    }
                    
                    .drag-drop-icon {
                        font-size: 2.5rem;
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    bindEvents() {
        const dragZone = document.getElementById('dragZone');
        const fileInput = document.getElementById('fileInput');
        const clearAllBtn = document.getElementById('clearAll');

        // Click to browse
        dragZone.addEventListener('click', () => fileInput.click());

        // Drag and drop events
        dragZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dragZone.classList.add('dragover');
        });

        dragZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            if (!dragZone.contains(e.relatedTarget)) {
                dragZone.classList.remove('dragover');
            }
        });

        dragZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dragZone.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files);
            this.handleFiles(files);
        });

        // File input change
        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            this.handleFiles(files);
        });

        // Clear all button
        clearAllBtn.addEventListener('click', () => {
            this.clearAll();
        });
    }

    handleFiles(files) {
        const validFiles = [];
        const errors = [];

        files.forEach(file => {
            // Check file type
            if (!this.options.allowedTypes.includes(file.type)) {
                errors.push(`${file.name}: Invalid file type. Only JPG, PNG, and WebP are allowed.`);
                return;
            }

            // Check file size
            if (file.size > this.options.maxSize) {
                errors.push(`${file.name}: File too large. Maximum size is ${this.formatFileSize(this.options.maxSize)}.`);
                return;
            }

            // Check max files
            if (this.files.length + validFiles.length >= this.options.maxFiles) {
                errors.push(`Maximum ${this.options.maxFiles} file(s) allowed.`);
                return;
            }

            validFiles.push(file);
        });

        // Show errors if any
        if (errors.length > 0) {
            this.showError(errors.join('<br>'));
        }

        // Add valid files
        if (validFiles.length > 0) {
            this.addFiles(validFiles);
        }
    }

    addFiles(newFiles) {
        this.files.push(...newFiles);
        this.updatePreview();
        this.showSuccess(`${newFiles.length} file(s) added successfully!`);
        
        if (this.options.onFileSelect) {
            this.options.onFileSelect(this.files);
        }
    }

    removeFile(index) {
        this.files.splice(index, 1);
        this.updatePreview();
        
        if (this.options.onFileSelect) {
            this.options.onFileSelect(this.files);
        }
    }

    clearAll() {
        this.files = [];
        this.updatePreview();
        document.getElementById('fileInput').value = '';
        
        if (this.options.onFileSelect) {
            this.options.onFileSelect(this.files);
        }
    }

    updatePreview() {
        const previewContainer = document.getElementById('previewContainer');
        const previewGrid = document.getElementById('previewGrid');

        if (this.files.length === 0) {
            previewContainer.style.display = 'none';
            return;
        }

        previewContainer.style.display = 'block';
        previewGrid.innerHTML = '';

        this.files.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="${file.name}">
                    <div class="preview-item-overlay">
                        <button type="button" class="preview-item-remove" onclick="dragDropUpload.removeFile(${index})">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="preview-item-info">
                        <div>${file.name}</div>
                        <div>${this.formatFileSize(file.size)}</div>
                    </div>
                `;
                previewGrid.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        });
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = this.container.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
        messageDiv.innerHTML = message;

        this.container.appendChild(messageDiv);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getFiles() {
        return this.files;
    }

    setFiles(files) {
        this.files = files;
        this.updatePreview();
    }
}

// Global instance for form integration
let dragDropUpload; 