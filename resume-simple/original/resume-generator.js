// Resume Generator based on resume2.html
document.addEventListener('DOMContentLoaded', function() {
  const ResumeGenerator = {
    init() {
      const app = document.getElementById('app');
      app.className = 'resume-builder';
      app.innerHTML = `
        <div class="builder-container">
          <div class="form-panel" id="form-panel">
            <div class="form-tabs">
              <button class="tab-button active" data-tab="personal">Personal</button>
              <button class="tab-button" data-tab="summary">Summary</button>
              <button class="tab-button" data-tab="experience">Experience</button>
              <button class="tab-button" data-tab="extras">Extras</button>
            </div>
            
            <div class="tab-content active" id="personal-tab">
              <div class="section-header">
                <h3>Personal Information</h3>
              </div>
              <input type="text" id="fullname" placeholder="Full Name">
              <input type="email" id="email" placeholder="Email">
              <input type="text" id="location" placeholder="Location (e.g., Columbus, OH (remote))">
              
              <div class="section-header style-section">
                <h3>Styling Options</h3>
              </div>
              
              <div class="style-options">
                <div class="style-group">
                  <label for="primary-color">Primary Color</label>
                  <div class="color-picker-wrapper">
                    <input type="color" id="primary-color" value="#ff1493">
                    <span class="color-value">#ff1493</span>
                  </div>
                </div>
                
                <div class="style-group">
                  <label for="heading-font">Heading Font</label>
                  <select id="heading-font">
                    <option value="'Atkinson Hyperlegible Mono', monospace">Atkinson Hyperlegible Mono</option>
                    <option value="'Space Mono', monospace">Space Mono</option>
                    <option value="'Courier New', monospace">Courier New</option>
                    <option value="'Roboto Mono', monospace">Roboto Mono</option>
                    <option value="monospace">System Monospace</option>
                  </select>
                </div>
                
                <div class="style-group">
                  <label for="body-font">Body Font</label>
                  <select id="body-font">
                    <option value="'Atkinson Hyperlegible Mono', monospace">Atkinson Hyperlegible Mono</option>
                    <option value="'Space Mono', monospace">Space Mono</option>
                    <option value="'Courier New', monospace">Courier New</option>
                    <option value="'Roboto Mono', monospace">Roboto Mono</option>
                    <option value="monospace">System Monospace</option>
                  </select>
                </div>
                
                <div class="style-group">
                  <label>Border Style</label>
                  <div class="border-options">
                    <label class="border-option">
                      <input type="radio" name="border-style" value="both" checked>
                      <span class="option-display both-borders"></span>
                      <span class="option-label">Both</span>
                    </label>
                    <label class="border-option">
                      <input type="radio" name="border-style" value="left">
                      <span class="option-display left-border"></span>
                      <span class="option-label">Left</span>
                    </label>
                    <label class="border-option">
                      <input type="radio" name="border-style" value="right">
                      <span class="option-display right-border"></span>
                      <span class="option-label">Right</span>
                    </label>
                    <label class="border-option">
                      <input type="radio" name="border-style" value="none">
                      <span class="option-display no-border"></span>
                      <span class="option-label">None</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="tab-content" id="summary-tab">
              <div class="section-header">
                <h3>Professional Summary</h3>
                <label class="toggle-switch"><input type="checkbox" id="toggle-summary" checked><span class="slider round"></span></label>
              </div>
              <textarea id="professional-summary" rows="4" placeholder="A brief overview of your professional background and expertise..."></textarea>
            </div>
            
            <div class="tab-content" id="experience-tab">
              <div class="section-header">
                <h3>Professional Experience</h3>
                <label class="toggle-switch"><input type="checkbox" id="toggle-experience" checked><span class="slider round"></span></label>
              </div>
              <div id="jobs-container"></div>
              <button id="add-job" class="action-button">+ Add Job</button>
            </div>
            
            <div class="tab-content" id="extras-tab">
              <div class="section-header">
                <div class="section-title-controls">
                  <h3 id="education-title" class="editable-title">Education</h3>
                </div>
                <label class="toggle-switch"><input type="checkbox" id="toggle-education" checked><span class="slider round"></span></label>
              </div>
              <div class="education-container" id="education-container">
                <div class="education-form" data-education-id="education-default">
                  <div class="form-section">
                    <input type="text" class="school-input" placeholder="School/University Name">
                    <input type="text" class="degree-input" placeholder="Degree/Certificate">
                    <div class="row">
                      <input type="text" class="field-input" placeholder="Field of Study">
                      <input type="text" class="gpa-input" placeholder="GPA (optional)">
                    </div>
                    <div class="row">
                      <div class="date-picker-wrapper">
                        <input type="text" class="date-picker education-start-date" placeholder="Start Date">
                      </div>
                      <div class="date-picker-wrapper">
                        <input type="text" class="date-picker education-end-date" placeholder="End Date">
                      </div>
                      <label><input type="checkbox" class="education-current"> Current</label>
                    </div>
                    <textarea class="education-description" rows="2" placeholder="Additional details, honors, etc. (optional)"></textarea>
                  </div>
                </div>
              </div>
              
              <div class="section-header">
                <div class="section-title-controls">
                  <h3 id="skills-title" class="editable-title">Technical Skills</h3>
                </div>
                <label class="toggle-switch"><input type="checkbox" id="toggle-skills" checked><span class="slider round"></span></label>
              </div>
              <div class="skill-section">
                <input type="text" id="technical-skills" placeholder="Add technical skills (comma separated)">
                <div id="technical-skills-preview" class="skills-preview"></div>
              </div>
              
              <div class="section-header">
                <div class="section-title-controls">
                  <h3 id="hobbies-title" class="editable-title">Hobbies & Interests</h3>
                </div>
                <label class="toggle-switch"><input type="checkbox" id="toggle-hobbies"><span class="slider round"></span></label>
              </div>
              <div class="skill-section">
                <input type="text" id="hobbies" placeholder="Add hobbies (comma separated)">
                <div id="hobbies-preview" class="skills-preview"></div>
              </div>
            </div>
          </div>
          
          <div class="splitter" id="splitter"></div>
          
          <div class="preview-panel" id="preview-panel">
            <div class="preview-controls">
            <div id="fourth-wall"></div>
              <div class="action-buttons">
              <button id="load-template" class="control-button">Load Template</button>
              <input type="file" id="template-file" accept=".json" style="display: none;">
                <button id="save-template" class="control-button">Save Template</button>
                <button id="print-resume" class="control-button">Print PDF</button>
              </div>
            </div>
            <div id="resume-preview"></div>
          </div>
        </div>
      `;
      
      this.setupEventListeners();
      this.addInitialJob();
      this.updateStyleVisuals('#ff1493');  // Initialize with default color (deep pink)
      this.initDatePickers();  // Initialize date pickers
      this.updatePreview();
      
      return app;
    },
    
    setupEventListeners() {
      // Splitter functionality
      const splitter = document.getElementById('splitter');
      const formPanel = document.getElementById('form-panel');
      const previewPanel = document.getElementById('preview-panel');
      
      let isResizing = false;
      
      splitter.addEventListener('mousedown', (e) => {
        isResizing = true;
        splitter.classList.add('active');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
      });
      
      document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        
        const containerRect = document.querySelector('.builder-container').getBoundingClientRect();
        const formPanelMinWidth = 300;
        const previewPanelMinWidth = 300;
        
        // Calculate available space and constraints
        const availableWidth = containerRect.width;
        const containerLeft = containerRect.left;
        let newFormPanelWidth = e.clientX - containerLeft;
        
        // Apply constraints
        if (newFormPanelWidth < formPanelMinWidth) {
          newFormPanelWidth = formPanelMinWidth;
        }
        
        if (availableWidth - newFormPanelWidth < previewPanelMinWidth) {
          newFormPanelWidth = availableWidth - previewPanelMinWidth;
        }
        
        // Update widths
        formPanel.style.flex = `0 0 ${newFormPanelWidth}px`;
      });
      
      document.addEventListener('mouseup', () => {
        if (isResizing) {
          isResizing = false;
          splitter.classList.remove('active');
          document.body.style.cursor = '';
          document.body.style.userSelect = '';
        }
      });
      
      // Tab navigation
      document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', (e) => {
          // Remove active class from all tabs
          document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
          document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
          
          // Add active class to clicked tab
          e.target.classList.add('active');
          document.getElementById(`${e.target.dataset.tab}-tab`).classList.add('active');
        });
      });
      
      // Add job button
      document.getElementById('add-job').addEventListener('click', () => {
        this.addJob();
      });
      
      // Set up education current checkbox
      const educationCurrentCheckbox = document.querySelector('.education-form .education-current');
      const educationEndDateInput = document.querySelector('.education-form .education-end-date');
      
      educationCurrentCheckbox.addEventListener('change', (e) => {
        educationEndDateInput.disabled = e.target.checked;
        if (e.target.checked) {
          educationEndDateInput.value = '';
        }
        this.updatePreview();
      });
      
      // Print button
      document.getElementById('print-resume').addEventListener('click', () => {
        window.print();
      });
      
      // No export HTML button
      
      // Save Template button
      document.getElementById('save-template').addEventListener('click', () => {
        this.saveTemplate();
      });
      
      // Load Template button
      document.getElementById('load-template').addEventListener('click', () => {
        document.getElementById('template-file').click();
      });
      
      // Template file input
      document.getElementById('template-file').addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          this.loadTemplate(e.target.files[0]);
        }
      });
      
      // Section visibility toggles
      document.querySelectorAll('.visibility-toggle input[type="checkbox"]').forEach(toggle => {
        toggle.addEventListener('change', () => {
          this.updatePreview();
        });
      });
      
      // Primary color picker
      const colorPicker = document.getElementById('primary-color');
      const colorValue = document.querySelector('.color-value');
      
      colorPicker.addEventListener('input', (e) => {
        const color = e.target.value;
        colorValue.textContent = color;
        this.updatePreview();
        this.updateStyleVisuals(color);
        
        // Add pulse animation to the resume preview
        const previewContainer = document.getElementById('resume-preview');
        previewContainer.style.animation = 'none';
        void previewContainer.offsetWidth; // Trigger reflow
        previewContainer.style.animation = 'pulse 0.3s ease-in-out';
        
        // Fourth-wall easter egg with cute jiggle animation
        const fourthWall = document.getElementById('fourth-wall');
        if (fourthWall) {
          fourthWall.innerHTML = 'that tickles';
          
          // Remove any existing animations
          fourthWall.style.animation = 'none';
          void fourthWall.offsetWidth; // Trigger reflow
          
          // Add jiggle animation
          fourthWall.style.animation = 'jiggle 0.5s ease-in-out';
        }
      });
      
      // Add animation keyframes for both jiggle and pulse
      const animationStyle = document.createElement('style');
      animationStyle.textContent = `
        @keyframes jiggle {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes pulse {
          0% { transform: scale(0.995); }
          50% { transform: scale(1.005); }
          100% { transform: scale(1); }
        }
      `;
      document.head.appendChild(animationStyle);
      
      // Font selections
      document.getElementById('heading-font').addEventListener('change', () => {
        this.updatePreview();
      });
      
      document.getElementById('body-font').addEventListener('change', () => {
        this.updatePreview();
      });
      
      // Border style options
      document.querySelectorAll('input[name="border-style"]').forEach(radio => {
        radio.addEventListener('change', () => {
          this.updatePreview();
        });
      });
      
      // Skills input handler with live preview
      document.getElementById('technical-skills').addEventListener('input', (e) => {
        const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
        const preview = document.getElementById('technical-skills-preview');
        
        preview.innerHTML = skills.map(skill => 
          `<span class="skill-chip-preview">${skill}</span>`
        ).join('');
        
        // Update the full resume preview immediately
        this.updatePreview();
      });
      
      // Hobbies input handler with live preview
      document.getElementById('hobbies').addEventListener('input', (e) => {
        const hobbies = e.target.value.split(',').map(hobby => hobby.trim()).filter(hobby => hobby);
        const preview = document.getElementById('hobbies-preview');
        
        preview.innerHTML = hobbies.map(hobby => 
          `<span class="skill-chip-preview">${hobby}</span>`
        ).join('');
        
        // Update the full resume preview immediately
        this.updatePreview();
      });
      
      // Set up double-click editing for section titles
      document.querySelectorAll('.editable-title').forEach(title => {
        // Double-click to edit
        title.addEventListener('dblclick', () => {
          title.contentEditable = true;
          title.focus();
          
          // Create a selection range to place cursor at the end
          const range = document.createRange();
          range.selectNodeContents(title);
          range.collapse(false);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        });
        
        // Save on blur
        title.addEventListener('blur', () => {
          title.contentEditable = false;
          this.updatePreview();
        });
        
        // Save on Enter key
        title.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            title.contentEditable = false;
            this.updatePreview();
          }
        });
        
        // Update preview in real-time as user types
        title.addEventListener('input', () => {
          this.updatePreview();
        });
      });
      
      // Live preview updates on any form change
      document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
          this.updatePreview();
        });
      });
      
      // Delegated event handlers for dynamic elements
      document.addEventListener('click', (e) => {
        // Add promotion button
        if (e.target.classList.contains('add-promotion-btn')) {
          const jobId = e.target.closest('.job-form').dataset.jobId;
          this.addPromotion(jobId);
        }
        
        // Remove job button
        if (e.target.classList.contains('remove-job-btn')) {
          e.target.closest('.job-form').remove();
          this.updatePreview();
        }
        
        // Remove education button
        if (e.target.classList.contains('remove-education-btn')) {
          e.target.closest('.education-form').remove();
          this.updatePreview();
        }
        
        // Remove promotion button
        if (e.target.classList.contains('remove-promotion-btn')) {
          e.target.closest('.promotion-form').remove();
          this.updatePreview();
        }
        
        // Add achievement button
        if (e.target.classList.contains('add-achievement-btn')) {
          const achievementsList = e.target.parentElement.querySelector('.achievements-list');
          this.addAchievement(achievementsList);
        }
        
        // Remove achievement button
        if (e.target.classList.contains('remove-achievement-btn')) {
          e.target.closest('li').remove();
          this.updatePreview();
        }
      });
    },
    
    addInitialJob() {
      this.addJob();
    },
    
    addEducation() {
      const educationContainer = document.getElementById('education-container');
      const educationId = 'education-' + Date.now();
      
      const educationForm = document.createElement('div');
      educationForm.className = 'education-form';
      educationForm.dataset.educationId = educationId;
      
      educationForm.innerHTML = `
        <div class="form-section">
          <input type="text" class="school-input" placeholder="School/University Name">
          <input type="text" class="degree-input" placeholder="Degree/Certificate">
          <div class="row">
            <input type="text" class="field-input" placeholder="Field of Study">
            <input type="text" class="gpa-input" placeholder="GPA (optional)">
          </div>
          <div class="row">
            <input type="month" class="education-start-date">
            <input type="month" class="education-end-date">
            <label><input type="checkbox" class="education-current"> Current</label>
          </div>
          <textarea class="education-description" rows="2" placeholder="Additional details, honors, etc. (optional)"></textarea>
          
          <div class="job-controls">
            <button class="remove-education-btn">Remove</button>
          </div>
        </div>
        <hr>
      `;
      
      // Handle current education checkbox
      const currentCheckbox = educationForm.querySelector('.education-current');
      const endDateInput = educationForm.querySelector('.education-end-date');
      
      currentCheckbox.addEventListener('change', (e) => {
        endDateInput.disabled = e.target.checked;
        if (e.target.checked) {
          endDateInput.value = '';
        }
        this.updatePreview();
      });
      
      educationContainer.appendChild(educationForm);
      this.updatePreview();
    },
    
    addJob() {
      const jobsContainer = document.getElementById('jobs-container');
      const jobId = 'job-' + Date.now();
      
      const jobForm = document.createElement('div');
      jobForm.className = 'job-form';
      jobForm.dataset.jobId = jobId;
      
      jobForm.innerHTML = `
        <div class="form-section">
          <h4>Position Details</h4>
          <input type="text" class="job-title-input" placeholder="Job Title">
          <input type="text" class="company-input" placeholder="Company Name">
          <div class="row">
            <input type="text" class="job-type-input" placeholder="Job Type (Full-time, Contract, etc.)">
            <input type="text" class="job-location-input" placeholder="Location">
          </div>
          <div class="row">
            <div class="date-picker-wrapper">
              <input type="text" class="date-picker job-start-date" placeholder="Start Date">
            </div>
            <div class="date-picker-wrapper">
              <input type="text" class="date-picker job-end-date" placeholder="End Date">
            </div>
            <label><input type="checkbox" class="job-current"> Current</label>
          </div>
          <textarea class="job-description" rows="2" placeholder="Brief job description..."></textarea>
          
          <div class="achievements-section">
            <h4>Key Achievements</h4>
            <ul class="achievements-list"></ul>
            <button class="add-achievement-btn">+ Add Achievement</button>
          </div>
          
          <div class="job-skills-section">
            <h4>Technical Skills for this Role</h4>
            <input type="text" class="job-skills-input" placeholder="Skills used (comma separated)">
            <div class="job-skills-preview skills-preview"></div>
          </div>
          
          <div class="promotions-section">
            <h4>Promotions within Company</h4>
            <div class="promotions-container"></div>
            <button class="add-promotion-btn">+ Add Promotion</button>
          </div>
          
          <div class="job-controls">
            <label><input type="checkbox" class="job-page-break"> Force page break after this job</label>
            <button class="remove-job-btn">Remove Job</button>
          </div>
        </div>
        <hr>
      `;
      
      // Add achievement for the initial job
      const achievementsList = jobForm.querySelector('.achievements-list');
      this.addAchievement(achievementsList);
      
      // Add real-time update event listeners to all input fields
      jobForm.querySelectorAll('input:not([type="checkbox"]), textarea').forEach(input => {
        input.addEventListener('input', () => {
          this.updatePreview();
        });
      });
      
      // Add change listeners for checkboxes
      jobForm.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          this.updatePreview();
        });
      });
      
      // Setup job-specific skills input handler
      const jobSkillsInput = jobForm.querySelector('.job-skills-input');
      const jobSkillsPreview = jobForm.querySelector('.job-skills-preview');
      
      jobSkillsInput.addEventListener('input', (e) => {
        const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
        
        jobSkillsPreview.innerHTML = skills.map(skill => 
          `<span class="skill-chip-preview">${skill}</span>`
        ).join('');
        
        this.updatePreview();
      });
      
      // Handle current job checkbox
      const currentCheckbox = jobForm.querySelector('.job-current');
      const endDateInput = jobForm.querySelector('.job-end-date');
      
      currentCheckbox.addEventListener('change', (e) => {
        endDateInput.disabled = e.target.checked;
        if (e.target.checked) {
          endDateInput.value = '';
        }
        this.updatePreview();
      });
      
      jobsContainer.appendChild(jobForm);
      
      // Initialize date pickers for the new job form
      this.initDatePickersForElement(jobForm);
      
      this.updatePreview();
    },
    
    addPromotion(jobId) {
      const jobForm = document.querySelector(`.job-form[data-job-id="${jobId}"]`);
      const promotionsContainer = jobForm.querySelector('.promotions-container');
      const promotionId = 'promotion-' + Date.now();
      
      const promotionForm = document.createElement('div');
      promotionForm.className = 'promotion-form';
      promotionForm.dataset.promotionId = promotionId;
      
      promotionForm.innerHTML = `
        <div class="form-section promotion">
          <h4>Promotion Details</h4>
          <input type="text" class="promotion-title-input" placeholder="Promotion Title">
          <div class="row">
            <div class="date-picker-wrapper">
              <input type="text" class="date-picker promotion-start-date" placeholder="Start Date">
            </div>
            <div class="date-picker-wrapper">
              <input type="text" class="date-picker promotion-end-date" placeholder="End Date">
            </div>
          </div>
          
          <div class="achievements-section">
            <h4>Key Achievements</h4>
            <ul class="achievements-list"></ul>
            <button class="add-achievement-btn">+ Add Achievement</button>
          </div>
          
          <div class="promotion-skills-section">
            <h4>Technical Skills for this Role</h4>
            <input type="text" class="promotion-skills-input" placeholder="Skills used (comma separated)">
            <div class="promotion-skills-preview skills-preview"></div>
          </div>
          
          <button class="remove-promotion-btn">Remove Promotion</button>
        </div>
      `;
      
      // Add achievement for the initial promotion
      const achievementsList = promotionForm.querySelector('.achievements-list');
      this.addAchievement(achievementsList);
      
      // Add real-time update event listeners to all input fields
      promotionForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
          this.updatePreview();
        });
      });
      
      // Setup promotion-specific skills input handler
      const promotionSkillsInput = promotionForm.querySelector('.promotion-skills-input');
      const promotionSkillsPreview = promotionForm.querySelector('.promotion-skills-preview');
      
      promotionSkillsInput.addEventListener('input', (e) => {
        const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
        
        promotionSkillsPreview.innerHTML = skills.map(skill => 
          `<span class="skill-chip-preview">${skill}</span>`
        ).join('');
        
        this.updatePreview();
      });
      
      promotionsContainer.appendChild(promotionForm);
      
      // Initialize date pickers for the new promotion form
      this.initDatePickersForElement(promotionForm);
      
      this.updatePreview();
    },
    
    addAchievement(achievementsList) {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="text" class="achievement-input" placeholder="Achievement or responsibility...">
        <button class="remove-achievement-btn">×</button>
      `;
      
      // Setup listener for this achievement input
      const input = li.querySelector('.achievement-input');
      input.addEventListener('input', () => {
        this.updatePreview();
      });
      
      achievementsList.appendChild(li);
    },
    
    collectFormData() {
      const data = {
        personal: {
          name: document.getElementById('fullname').value,
          email: document.getElementById('email').value,
          location: document.getElementById('location').value
        },
        summary: document.getElementById('professional-summary').value,
        jobs: [],
        education: [],
        technicalSkills: document.getElementById('technical-skills').value.split(',').map(s => s.trim()).filter(s => s),
        hobbies: document.getElementById('hobbies').value.split(',').map(s => s.trim()).filter(s => s),
        visibility: {
          summary: document.getElementById('toggle-summary').checked,
          experience: document.getElementById('toggle-experience').checked,
          education: document.getElementById('toggle-education').checked,
          skills: document.getElementById('toggle-skills').checked,
          hobbies: document.getElementById('toggle-hobbies').checked
        },
        styling: {
          primaryColor: document.getElementById('primary-color').value,
          primaryLight: `${document.getElementById('primary-color').value}1A`, // 1A is 10% opacity in hex
          headingFont: document.getElementById('heading-font').value,
          bodyFont: document.getElementById('body-font').value,
          borderStyle: document.querySelector('input[name="border-style"]:checked').value
        },
        sectionTitles: {
          education: document.getElementById('education-title').textContent,
          skills: document.getElementById('skills-title').textContent,
          hobbies: document.getElementById('hobbies-title').textContent
        }
      };
      
      // Collect education data
      document.querySelectorAll('.education-form').forEach(educationForm => {
        // Skip empty education entries
        const school = educationForm.querySelector('.school-input').value;
        const degree = educationForm.querySelector('.degree-input').value;
        
        // Only add education if at least school or degree is provided
        if (school.trim() || degree.trim()) {
          const educationData = {
            school: school,
            degree: degree,
            field: educationForm.querySelector('.field-input').value,
            gpa: educationForm.querySelector('.gpa-input').value,
            startDate: educationForm.querySelector('.education-start-date').value,
            endDate: educationForm.querySelector('.education-current').checked ? 'present' : educationForm.querySelector('.education-end-date').value,
            description: educationForm.querySelector('.education-description').value
          };
          
          data.education.push(educationData);
        }
      });
      
      // Collect jobs data
      document.querySelectorAll('.job-form').forEach(jobForm => {
        const jobData = {
          title: jobForm.querySelector('.job-title-input').value,
          company: jobForm.querySelector('.company-input').value,
          type: jobForm.querySelector('.job-type-input').value,
          location: jobForm.querySelector('.job-location-input').value,
          startDate: jobForm.querySelector('.job-start-date').value,
          endDate: jobForm.querySelector('.job-current').checked ? 'present' : jobForm.querySelector('.job-end-date').value,
          description: jobForm.querySelector('.job-description').value,
          achievements: [],
          skills: jobForm.querySelector('.job-skills-input').value.split(',').map(s => s.trim()).filter(s => s),
          promotions: [],
          pageBreak: jobForm.querySelector('.job-page-break').checked
        };
        
        // Collect achievements
        jobForm.querySelectorAll('.achievements-list .achievement-input').forEach(input => {
          if (input.value.trim()) {
            jobData.achievements.push(input.value.trim());
          }
        });
        
        // Collect promotions
        jobForm.querySelectorAll('.promotion-form').forEach(promotionForm => {
          const promotionData = {
            title: promotionForm.querySelector('.promotion-title-input').value,
            startDate: promotionForm.querySelector('.promotion-start-date').value,
            endDate: promotionForm.querySelector('.promotion-end-date').value,
            achievements: [],
            skills: promotionForm.querySelector('.promotion-skills-input').value.split(',').map(s => s.trim()).filter(s => s)
          };
          
          // Collect promotion achievements
          promotionForm.querySelectorAll('.achievements-list .achievement-input').forEach(input => {
            if (input.value.trim()) {
              promotionData.achievements.push(input.value.trim());
            }
          });
          
          jobData.promotions.push(promotionData);
        });
        
        data.jobs.push(jobData);
      });
      
      return data;
    },
    
    updateStyleVisuals(color) {
      // Update the border option previews with the new color
      document.querySelector('.both-borders').style.borderLeftColor = color;
      document.querySelector('.both-borders').style.borderRightColor = color;
      document.querySelector('.left-border').style.borderLeftColor = color;
      document.querySelector('.right-border').style.borderRightColor = color;
      
      // Update checked radio button highlight
      document.querySelectorAll('.border-option input[type="radio"]:checked + .option-display').forEach(el => {
        el.style.boxShadow = `0 0 0 2px ${color}`;
      });
      
      // Update RGB color variable for CSS
      const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
          `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
          '255, 20, 147'; // fallback
      };
      document.documentElement.style.setProperty('--primary-rgb', hexToRgb(color));
      
      // Update primary light color as 10% opacity version of the primary color
      document.documentElement.style.setProperty('--primary-light', `${color}1A`); // 1A is 10% opacity in hex
    },
    
    updatePreview() {
      const data = this.collectFormData();
      const previewContainer = document.getElementById('resume-preview');
      
      // Generate border style CSS based on selection
      let borderStyle = '';
      switch(data.styling.borderStyle) {
        case 'both':
          borderStyle = `border-left: 2px solid ${data.styling.primaryColor}; border-right: 2px solid ${data.styling.primaryColor};`;
          break;
        case 'left':
          borderStyle = `border-left: 2px solid ${data.styling.primaryColor}; border-right: none;`;
          break;
        case 'right':
          borderStyle = `border-right: 2px solid ${data.styling.primaryColor}; border-left: none;`;
          break;
        case 'none':
          borderStyle = `border-left: none; border-right: none;`;
          break;
      }
      
      // Get the app container to apply borders for both display and print
      const appContainer = document.getElementById('app');
      
      // Clear all borders first
      appContainer.style.borderLeft = 'none';
      appContainer.style.borderRight = 'none';
      previewContainer.style.borderLeft = 'none';
      previewContainer.style.borderRight = 'none';
      
      // Apply border styles based on user selections to the app container
      if (data.styling.borderStyle === 'both' || data.styling.borderStyle === 'left') {
        appContainer.style.borderLeft = `2px solid ${data.styling.primaryColor}`;
      }
      
      if (data.styling.borderStyle === 'both' || data.styling.borderStyle === 'right') {
        appContainer.style.borderRight = `2px solid ${data.styling.primaryColor}`;
      }
      
      // Also set CSS variables for any print styles that might need them
      document.documentElement.style.setProperty('--primary-color', data.styling.primaryColor);
      document.documentElement.style.setProperty('--primary-light', `${data.styling.primaryColor}1A`); // 1A is 10% opacity in hex
      document.documentElement.style.setProperty('--border-style', data.styling.borderStyle);
      
      previewContainer.innerHTML = `
        <style>
          /* Only allow borders on the #app element */
          html, body, #resume-preview, .resume-container, .preview-panel {
            border-left: none !important;
            border-right: none !important;
          }
          
          #resume-preview .resume-container {
            min-height: calc(100vh - 40px);
          }
          #resume-preview h1, #resume-preview h2, #resume-preview h3, #resume-preview h4, 
          #resume-preview .header > span, #resume-preview .job-title span:last-child {
            color: ${data.styling.primaryColor};
            font-family: ${data.styling.headingFont};
          }
          #resume-preview p, #resume-preview li, #resume-preview .contact, #resume-preview .job-title span:first-child {
            font-family: ${data.styling.bodyFont};
          }
          #resume-preview .job-title span:last-child, #resume-preview .signature {
            color: ${data.styling.primaryColor};
          }
          #resume-preview h2 {
            border-bottom: 1px dotted ${data.styling.primaryColor};
          }
          #resume-preview .skill-chip {
            background-color: var(--primary-light);
            color: ${data.styling.primaryColor};
            border-radius: 1px;
          }
          #resume-preview .promotion-wrapper {
            border-left: 1px dotted ${data.styling.primaryColor};
          }
          #resume-preview .promotion-wrapper h4::before {
            border: 1px dotted ${data.styling.primaryColor};
          }
          #resume-preview .header {
            border-bottom: 1px solid ${data.styling.primaryColor};
          }
          /* Border is applied directly to the preview container */
        </style>

        <div class="resume-container">
          <div class="header">
            <span>${data.personal.name || 'Your Name'}</span>
            <div class="contact">
              ${data.personal.email || 'your.email@example.com'} | ${data.personal.location || 'Your Location'}
            </div>
          </div>
          
          ${data.visibility.summary ? `
          <h2>Summary</h2>
          <p class="professional-summary">
            ${data.summary || 'Your professional summary will appear here...'}
          </p>
          ` : ''}
          
          ${data.visibility.experience ? `
          <h2>Experience</h2>
          ${this.renderJobsHTML(data.jobs)}
          ` : ''}
          
          ${data.visibility.education && data.education.length > 0 ? `
          <h2>${data.sectionTitles.education}</h2>
          ${this.renderEducationHTML(data.education)}
          ` : ''}
          
          <div class="last">
            ${data.visibility.skills ? `
            <div class="avoid-break left">
              <h2>${data.sectionTitles.skills}</h2>
              <div class="skills-section">
                <div class="skills">
                  ${data.technicalSkills.map(skill => `<span class="skill-chip">${skill}</span>`).join('')}
                </div>
              </div>
            </div>
            ` : ''}
              
            ${data.visibility.hobbies ? `
            <div class="avoid-break right">
              <h2>${data.sectionTitles.hobbies}</h2>
              <div class="skills-section">
                <div class="skills">
                  ${data.hobbies.map(hobby => `<span class="skill-chip">${hobby}</span>`).join('')}
                </div>
              </div>
            </div>
            ` : ''}
          </div>
          
          <!-- This div extends the height to ensure borders go all the way down -->
          <div style="height: 1200px; width: 100%;"></div>
        </div>
      `;
    },
    
    renderJobsHTML(jobs) {
      if (jobs.length === 0) {
        return '<p class="placeholder">Add jobs to see them here...</p>';
      }
      
      return jobs.map(job => {
        // Determine date display format
        const startDate = job.startDate ? this.formatDate(job.startDate) : '';
        const endDate = job.endDate === 'present' ? 'present' : (job.endDate ? this.formatDate(job.endDate) : '');
        const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : '';
        
        // Check if job has promotions
        const hasPromotions = job.promotions && job.promotions.length > 0;
        
        let jobHTML = `
          <div class="${job.pageBreak ? 'page-break-before' : ''}">
            <h3>${job.title || 'Job Title'}</h3>
            ${job.company ? `<div class="job-company">${job.company}</div>` : ''}
            <div class="job-title">
              <span>${job.type ? `${job.type} • ` : ''}${job.location || ''}</span>
              <span>${dateRange}</span>
            </div>
            ${job.description ? `<p>${job.description}</p>` : ''}
            ${this.renderAchievementsList(job.achievements)}
            ${this.renderSkillsSection(job.skills)}
        `;
        
        // Add promotions if they exist
        if (hasPromotions) {
          jobHTML += `
            <div class="promotion-wrapper">
              ${this.renderPromotions(job.promotions)}
            </div>
          `;
        }
        
        jobHTML += '</div>';
        
        return jobHTML;
      }).join('');
    },
    
    renderPromotions(promotions) {
      return promotions.map(promotion => {
        // Format promotion dates
        const startDate = promotion.startDate ? this.formatDate(promotion.startDate) : '';
        const endDate = promotion.endDate ? this.formatDate(promotion.endDate) : '';
        const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : '';
        
        return `
          <h4>${promotion.title || 'Promotion Title'}</h4>
          <div class="job-title"><span>${dateRange}</span></div>
          ${this.renderAchievementsList(promotion.achievements)}
          ${this.renderSkillsSection(promotion.skills)}
        `;
      }).join('');
    },
    
    renderAchievementsList(achievements) {
      if (!achievements || achievements.length === 0) {
        return '';
      }
      
      return `
        <ul>
          ${achievements.map(achievement => `<li>${achievement}</li>`).join('')}
        </ul>
      `;
    },
    
    renderSkillsSection(skills) {
      if (!skills || skills.length === 0) {
        return '';
      }
      
      return `
        <div class="skills"><label for="Skills">Technical Skills:</label><br>
          ${skills.map(skill => `<span class="skill-chip">${skill}</span>`).join('')}
        </div>
      `;
    },
    
    renderEducationHTML(education) {
      if (education.length === 0) {
        return '<p class="placeholder">Add education to see it here...</p>';
      }
      
      return education.map(edu => {
        // Determine date display format
        const startDate = edu.startDate ? this.formatDate(edu.startDate) : '';
        const endDate = edu.endDate === 'present' ? 'present' : (edu.endDate ? this.formatDate(edu.endDate) : '');
        const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : '';
        
        return `
          <div class="education-entry">
            <h3>${edu.school || 'School/University'}</h3>
            <div class="job-title">
              <span>${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</span>
              <span>${dateRange}</span>
            </div>
            ${edu.gpa ? `<div class="education-gpa">GPA: ${edu.gpa}</div>` : ''}
            ${edu.description ? `<p>${edu.description}</p>` : ''}
          </div>
        `;
      }).join('');
    },
    
    initDatePickers() {
      // Initialize all date pickers that exist at load time
      this.initializeFlatpickrs();
    },
    
    initializeFlatpickrs(container = document) {
      // Initialize date pickers with common options
      flatpickr('.date-picker', {
        dateFormat: 'M Y', // Jan 2025 format
        altFormat: 'F Y',
        allowInput: true,
        monthSelectorType: 'static',
        plugins: [],
        onChange: (selectedDates, dateStr, instance) => {
          // Trigger the update preview on change
          this.updatePreview();
        }
      });
    },
    
    // Helper to initialize date pickers for a specific element
    initDatePickersForElement(element) {
      if (!element) return;
      
      const datePickers = element.querySelectorAll('.date-picker');
      datePickers.forEach(picker => {
        flatpickr(picker, {
          dateFormat: 'M Y', // Jan 2025 format
          altFormat: 'F Y',
          allowInput: true,
          monthSelectorType: 'static',
          plugins: [],
          onChange: (selectedDates, dateStr, instance) => {
            // Trigger the update preview on change
            this.updatePreview();
          }
        });
      });
    },
    
    formatDate(dateString) {
      // If it's already in the right format (e.g., "Jan 2025"), return as is
      if (dateString && !dateString.includes('-')) {
        return dateString;
      }
      
      // Convert YYYY-MM to Month YYYY format
      if (!dateString) return '';
      
      try {
        const [year, month] = dateString.split('-');
        const date = new Date(year, month - 1);
        
        // Format as "Month YYYY"
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      } catch (e) {
        return dateString;
      }
    },
    
    showToast(message, type = 'info') {
      const toastContainer = document.querySelector('.toast-container') || (() => {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
      })();
      
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      
      let icon = '';
      switch(type) {
        case 'success': icon = '✓'; break;
        case 'error': icon = '✗'; break;
        case 'info': 
        default: icon = 'ℹ'; break;
      }
      
      toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
        <span class="toast-close">×</span>
      `;
      
      toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      });
      
      toastContainer.appendChild(toast);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        if (toast.parentNode) {
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 300);
        }
      }, 5000);
    },
    
    saveTemplate() {
      const data = this.collectFormData();
      const jsonString = JSON.stringify(data);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume-template.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      this.showToast('Template saved! You can load this template later to continue editing.', 'success');
    },
    
    // Export HTML removed
    
    loadTemplate(file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const templateData = JSON.parse(e.target.result);
          this.applyTemplateData(templateData);
          this.showToast('Template loaded successfully!', 'success');
        } catch (error) {
          console.error('Error loading template:', error);
          this.showToast('Error loading template. Please make sure the file is a valid resume template.', 'error');
        }
      };
      
      reader.readAsText(file);
    },
    
    applyTemplateData(data) {
      // Apply personal info
      document.getElementById('fullname').value = data.personal.name || '';
      document.getElementById('email').value = data.personal.email || '';
      document.getElementById('location').value = data.personal.location || '';
      
      // Apply summary
      document.getElementById('professional-summary').value = data.summary || '';
      
      // Apply technical skills
      const technicalSkills = (data.technicalSkills || []).join(', ');
      document.getElementById('technical-skills').value = technicalSkills;
      document.getElementById('technical-skills-preview').innerHTML = 
        (data.technicalSkills || []).map(skill => `<span class="skill-chip-preview">${skill}</span>`).join('');
      
      // Apply hobbies
      const hobbies = (data.hobbies || []).join(', ');
      document.getElementById('hobbies').value = hobbies;
      document.getElementById('hobbies-preview').innerHTML = 
        (data.hobbies || []).map(hobby => `<span class="skill-chip-preview">${hobby}</span>`).join('');
        
      // Apply styling options if available
      if (data.styling) {
        if (data.styling.primaryColor) {
          document.getElementById('primary-color').value = data.styling.primaryColor;
          document.querySelector('.color-value').textContent = data.styling.primaryColor;
          this.updateStyleVisuals(data.styling.primaryColor);
        }
        
        if (data.styling.headingFont) {
          document.getElementById('heading-font').value = data.styling.headingFont;
        }
        
        if (data.styling.bodyFont) {
          document.getElementById('body-font').value = data.styling.bodyFont;
        }
        
        if (data.styling.borderStyle) {
          document.querySelector(`input[name="border-style"][value="${data.styling.borderStyle}"]`).checked = true;
        }
      }
      
      // Apply education data if available
      if (data.education && data.education.length > 0) {
        const educationForm = document.querySelector('.education-form');
        const educationData = data.education[0]; // Just use the first education entry
        
        educationForm.querySelector('.school-input').value = educationData.school || '';
        educationForm.querySelector('.degree-input').value = educationData.degree || '';
        educationForm.querySelector('.field-input').value = educationData.field || '';
        educationForm.querySelector('.gpa-input').value = educationData.gpa || '';
        
        // Set start date
        const startDateInput = educationForm.querySelector('.education-start-date');
        startDateInput._flatpickr.setDate(educationData.startDate || '', true);
        
        // Handle end date
        const isCurrentEducation = educationData.endDate === 'present';
        educationForm.querySelector('.education-current').checked = isCurrentEducation;
        const endDateInput = educationForm.querySelector('.education-end-date');
        endDateInput.disabled = isCurrentEducation;
        
        if (!isCurrentEducation && educationData.endDate) {
          endDateInput._flatpickr.setDate(educationData.endDate, true);
        } else {
          endDateInput._flatpickr.clear();
        }
        
        educationForm.querySelector('.education-description').value = educationData.description || '';
      }
      
      // Clear existing jobs
      document.getElementById('jobs-container').innerHTML = '';
      
      // Create jobs
      if (data.jobs && data.jobs.length > 0) {
        data.jobs.forEach(jobData => {
          // Add job form
          this.addJob();
          const jobForm = document.querySelector('.job-form:last-child');
          
          // Fill job data
          jobForm.querySelector('.job-title-input').value = jobData.title || '';
          jobForm.querySelector('.company-input').value = jobData.company || '';
          jobForm.querySelector('.job-type-input').value = jobData.type || '';
          jobForm.querySelector('.job-location-input').value = jobData.location || '';
          
          // Set start date
          const startDateInput = jobForm.querySelector('.job-start-date');
          startDateInput._flatpickr.setDate(jobData.startDate || '', true);
          
          // Handle end date
          const isCurrentJob = jobData.endDate === 'present';
          jobForm.querySelector('.job-current').checked = isCurrentJob;
          const endDateInput = jobForm.querySelector('.job-end-date');
          endDateInput.disabled = isCurrentJob;
          
          if (!isCurrentJob && jobData.endDate) {
            endDateInput._flatpickr.setDate(jobData.endDate, true);
          } else {
            endDateInput._flatpickr.clear();
          }
          
          jobForm.querySelector('.job-description').value = jobData.description || '';
          jobForm.querySelector('.job-page-break').checked = jobData.pageBreak || false;
          
          // Set job skills
          const jobSkills = (jobData.skills || []).join(', ');
          jobForm.querySelector('.job-skills-input').value = jobSkills;
          jobForm.querySelector('.job-skills-preview').innerHTML = 
            (jobData.skills || []).map(skill => `<span class="skill-chip-preview">${skill}</span>`).join('');
          
          // Clear default achievements
          jobForm.querySelector('.achievements-list').innerHTML = '';
          
          // Add achievements
          if (jobData.achievements && jobData.achievements.length > 0) {
            jobData.achievements.forEach(achievement => {
              const achievementsList = jobForm.querySelector('.achievements-list');
              this.addAchievement(achievementsList);
              const li = achievementsList.querySelector('li:last-child');
              li.querySelector('.achievement-input').value = achievement;
            });
          } else {
            // Add at least one empty achievement field
            this.addAchievement(jobForm.querySelector('.achievements-list'));
          }
          
          // Add promotions
          if (jobData.promotions && jobData.promotions.length > 0) {
            jobData.promotions.forEach(promotionData => {
              this.addPromotion(jobForm.dataset.jobId);
              const promotionForm = jobForm.querySelector('.promotion-form:last-child');
              
              promotionForm.querySelector('.promotion-title-input').value = promotionData.title || '';
              
              // Set promotion start date
              const promotionStartDateInput = promotionForm.querySelector('.promotion-start-date');
              promotionStartDateInput._flatpickr.setDate(promotionData.startDate || '', true);
              
              // Set promotion end date
              const promotionEndDateInput = promotionForm.querySelector('.promotion-end-date');
              if (promotionData.endDate) {
                promotionEndDateInput._flatpickr.setDate(promotionData.endDate, true);
              } else {
                promotionEndDateInput._flatpickr.clear();
              }
              
              // Set promotion skills
              const promotionSkills = (promotionData.skills || []).join(', ');
              promotionForm.querySelector('.promotion-skills-input').value = promotionSkills;
              promotionForm.querySelector('.promotion-skills-preview').innerHTML = 
                (promotionData.skills || []).map(skill => `<span class="skill-chip-preview">${skill}</span>`).join('');
              
              // Clear default achievements
              promotionForm.querySelector('.achievements-list').innerHTML = '';
              
              // Add achievements
              if (promotionData.achievements && promotionData.achievements.length > 0) {
                promotionData.achievements.forEach(achievement => {
                  const achievementsList = promotionForm.querySelector('.achievements-list');
                  this.addAchievement(achievementsList);
                  const li = achievementsList.querySelector('li:last-child');
                  li.querySelector('.achievement-input').value = achievement;
                });
              } else {
                // Add at least one empty achievement field
                this.addAchievement(promotionForm.querySelector('.achievements-list'));
              }
            });
          }
        });
      }
      
      // Update preview
      this.updatePreview();
    }
  };
  
  // Show a welcome toast when the app loads
  const showWelcomeToast = () => {
    setTimeout(() => {
      ResumeGenerator.showToast('Welcome to the Resume Generator!', 'info');
    }, 500);
  };

  // Initialize the resume generator
  ResumeGenerator.init();
  showWelcomeToast();
});