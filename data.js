/**
 * DATA.JS - Data Storage and Management
 * Handles localStorage operations, data structure, and month resets
 */

// Data structure
let budgetData = {
    categories: [],
    currentMonth: new Date().toISOString().slice(0, 7), // YYYY-MM
    transactions: [],
    history: {} // { "2025-01": [...transactions] }
};

/**
 * Load data from localStorage
 */
function loadData() {
    const saved = localStorage.getItem('budgetData');
    if (saved) {
        budgetData = JSON.parse(saved);
        checkMonthReset();
    }
}

/**
 * Save data to localStorage
 */
function saveData() {
    localStorage.setItem('budgetData', JSON.stringify(budgetData));
}

/**
 * Check if we need to reset for new month
 * Automatically moves current transactions to history
 */
function checkMonthReset() {
    const currentMonth = new Date().toISOString().slice(0, 7);
    if (budgetData.currentMonth !== currentMonth) {
        // Save current month to history
        if (budgetData.transactions.length > 0) {
            budgetData.history[budgetData.currentMonth] = budgetData.transactions;
        }
        // Reset for new month
        budgetData.transactions = [];
        budgetData.currentMonth = currentMonth;
        saveData();
    }
}

/**
 * Add a new category
 */
function addCategory() {
    const name = document.getElementById('new-category-name').value.trim();
    const emoji = document.getElementById('new-category-emoji').value.trim();
    const limit = parseFloat(document.getElementById('new-category-limit').value);

    if (!name || !emoji || !limit || limit <= 0) {
        alert('Please fill in all fields with valid values!');
        return;
    }

    budgetData.categories.push({
        id: Date.now(),
        name,
        emoji,
        color: selectedColor,
        limit
    });

    // Clear inputs
    document.getElementById('new-category-name').value = '';
    document.getElementById('new-category-emoji').value = '';
    document.getElementById('new-category-limit').value = '';

    saveData();
    updateUI();
}

/**
 * Delete a category
 */
function deleteCategory(id) {
    if (confirm('Are you sure you want to delete this category?')) {
        budgetData.categories = budgetData.categories.filter(cat => cat.id !== id);
        saveData();
        updateUI();
    }
}

/**
 * Add a new transaction
 */
function addTransaction() {
    const amount = parseFloat(document.getElementById('amount').value);
    const categoryId = parseInt(document.getElementById('category').value);
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value.trim();

    if (!amount || amount <= 0 || !categoryId || !date) {
        alert('Please fill in all required fields!');
        return;
    }

    budgetData.transactions.push({
        id: Date.now(),
        amount,
        categoryId,
        date,
        notes
    });

    // Clear inputs
    document.getElementById('amount').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('date').valueAsDate = new Date();
    document.getElementById('receiptPreview').innerHTML = '';

    saveData();
    updateUI();

    alert('✅ Spending added successfully!');
}

/**
 * Calculate spending by category
 */
function getSpendingByCategory() {
    const spending = {};
    budgetData.categories.forEach(cat => {
        spending[cat.id] = 0;
    });
    
    budgetData.transactions.forEach(trans => {
        spending[trans.categoryId] = (spending[trans.categoryId] || 0) + trans.amount;
    });
    
    return spending;
}

/**
 * Get total budget
 */
function getTotalBudget() {
    return budgetData.categories.reduce((sum, cat) => sum + cat.limit, 0);
}

/**
 * Get total spent
 */
function getTotalSpent() {
    return budgetData.transactions.reduce((sum, trans) => sum + trans.amount, 0);
}

/**
 * Export data as JSON (for backup)
 */
function exportData() {
    const dataStr = JSON.stringify(budgetData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `budget-data-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
}

/**
 * Import data from JSON (for restore)
 */
function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (confirm('This will replace all your current data. Are you sure?')) {
                budgetData = imported;
                saveData();
                updateUI();
                alert('Data imported successfully!');
            }
        } catch (error) {
            alert('Error importing data. Please check the file format.');
        }
    };
    reader.readAsText(file);
}
