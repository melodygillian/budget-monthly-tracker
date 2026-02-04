/**
 * APP.JS - Main Application File
 * Initializes the app and handles global setup
 */

// Global variable for selected color
let selectedColor = '#0D3B66';

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('🚀 Budget Tracker initializing...');
    
    // Load saved data
    loadData();
    
    // Set up color picker
    setupColorPicker();
    
    // Set today's date as default
    document.getElementById('date').valueAsDate = new Date();
    
    // Update all UI elements
    updateUI();
    
    console.log('✅ Budget Tracker ready!');
}

/**
 * Set up color picker functionality
 */
function setupColorPicker() {
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            document.querySelectorAll('.color-option').forEach(opt => 
                opt.classList.remove('selected')
            );
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Update selected color
            selectedColor = this.dataset.color;
        });
    });
}

/**
 * Check for month reset on page load/visibility change
 */
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        checkMonthReset();
        updateUI();
    }
});

/**
 * Periodic check for month reset (every hour)
 */
setInterval(() => {
    checkMonthReset();
}, 3600000); // 1 hour

/**
 * Initialize app when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

/**
 * Keyboard shortcuts
 */
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save (already auto-saves, but gives feedback)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveData();
        
        // Show temporary save confirmation
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--navy);
            color: white;
            padding: 15px 25px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = '✅ Data saved!';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
});

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/**
 * Log app info
 */
console.log(`
╔════════════════════════════════════╗
║   💰 Budget Tracker v1.0           ║
║   Track spending, reach goals!     ║
╚════════════════════════════════════╝
`);
