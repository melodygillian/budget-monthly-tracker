/**
 * UI.JS - User Interface Management
 * Handles all UI updates, rendering, and page navigation
 */

/**
 * Page navigation
 */
function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(pageName).classList.add('active');
    event.target.classList.add('active');
    
    if (pageName === 'history') {
        renderHistory();
    }
}

/**
 * Update all UI elements
 */
function updateUI() {
    updateCategoriesList();
    updateCategoryDropdown();
    updateProgress();
}

/**
 * Update categories list in setup page
 */
function updateCategoriesList() {
    const list = document.getElementById('categories-list');
    if (budgetData.categories.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📦</div>
                <p style="font-size: 18px; font-weight: 600; margin-bottom: 10px;">No categories yet</p>
                <p>Add your first category below to get started!</p>
            </div>
        `;
        return;
    }

    const totalBudget = getTotalBudget();
    
    list.innerHTML = `
        <div class="total-budget-display">
            <h2>💰 Total Monthly Budget</h2>
            <div class="total-budget-amount">$${totalBudget.toFixed(2)}</div>
        </div>
        ${budgetData.categories.map(cat => `
            <div class="category-item">
                <div class="category-info">
                    <div class="category-emoji">${cat.emoji}</div>
                    <div class="category-color" style="background: ${cat.color};"></div>
                    <div>
                        <div style="font-weight: 700; font-size: 18px; color: var(--navy);">${cat.name}</div>
                        <div style="color: #666; font-weight: 600;">$${cat.limit.toFixed(2)} / month</div>
                    </div>
                </div>
                <button class="btn btn-delete" onclick="deleteCategory(${cat.id})">🗑️ Delete</button>
            </div>
        `).join('')}
    `;
}

/**
 * Update category dropdown
 */
function updateCategoryDropdown() {
    const select = document.getElementById('category');
    if (budgetData.categories.length === 0) {
        select.innerHTML = '<option value="">⚠️ No categories - Set up first!</option>';
        return;
    }
    select.innerHTML = budgetData.categories.map(cat => 
        `<option value="${cat.id}">${cat.emoji} ${cat.name}</option>`
    ).join('');
}

/**
 * Update progress bars
 */
function updateProgress() {
    const spending = getSpendingByCategory();
    const totalBudget = getTotalBudget();
    const totalSpent = getTotalSpent();

    // Update total progress
    document.getElementById('total-spent').textContent = `$${totalSpent.toFixed(2)}`;
    document.getElementById('total-budget').textContent = `$${totalBudget.toFixed(2)}`;
    
    const totalPercent = totalBudget > 0 ? (totalSpent / totalBudget * 100) : 0;
    const totalBar = document.getElementById('total-progress');
    totalBar.style.width = Math.min(totalPercent, 100) + '%';
    
    if (totalPercent > 100) {
        totalBar.classList.add('progress-exceeded');
        totalBar.textContent = '⚠️ BUDGET EXCEEDED';
    } else {
        totalBar.classList.remove('progress-exceeded');
        totalBar.textContent = '';
        totalBar.style.background = 'linear-gradient(90deg, var(--navy), var(--orange))';
    }

    // Update category progress
    const container = document.getElementById('category-progress');
    if (budgetData.categories.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📊</div>
                <p style="font-size: 16px; font-weight: 600;">Set up your budget categories first!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = budgetData.categories.map(cat => {
        const spent = spending[cat.id] || 0;
        const percent = (spent / cat.limit * 100);
        const remaining = cat.limit - spent;
        const exceeded = spent > cat.limit;

        return `
            <div class="progress-container">
                <div class="progress-label">
                    <span style="font-weight: 700; color: var(--navy);">${cat.emoji} ${cat.name}</span>
                    <span class="amount-left">${exceeded ? '⚠️' : `$${remaining.toFixed(2)} left`}</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill ${exceeded ? 'progress-exceeded' : ''}" 
                         style="width: ${Math.min(percent, 100)}%; background: ${exceeded ? '' : 'linear-gradient(90deg, ' + cat.color + ', var(--orange))'};">
                        ${exceeded ? '⚠️ BUDGET EXCEEDED' : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Render history page
 */
function renderHistory() {
    const container = document.getElementById('history-list');
    const allMonths = Object.keys(budgetData.history).sort().reverse();

    if (allMonths.length === 0 && budgetData.transactions.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <p style="font-size: 18px; font-weight: 600; margin-bottom: 10px;">No transaction history yet</p>
                <p>Start tracking your spending to see your history here!</p>
            </div>
        `;
        return;
    }

    let html = '';

    // Current month
    if (budgetData.transactions.length > 0) {
        html += renderMonthSection(budgetData.currentMonth, budgetData.transactions, true);
    }

    // Previous months
    allMonths.forEach(month => {
        html += renderMonthSection(month, budgetData.history[month], false);
    });

    container.innerHTML = html;
}

/**
 * Render a single month section
 */
function renderMonthSection(month, transactions, isOpen) {
    const monthName = new Date(month + '-01').toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
    });
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    
    const sortedTransactions = [...transactions].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );

    return `
        <div class="month-section">
            <div class="month-header ${isOpen ? 'open' : ''}" onclick="toggleMonth('${month}')">
                <div>
                    <div style="font-size: 22px; font-weight: 700;">${monthName}</div>
                    <div style="font-size: 14px; opacity: 0.9; margin-top: 5px;">
                        ${transactions.length} transactions • $${total.toFixed(2)} spent
                    </div>
                </div>
                <div class="month-arrow">▼</div>
            </div>
            <div id="month-${month}" class="month-content ${isOpen ? 'active' : ''}">
                ${sortedTransactions.map(trans => {
                    const category = budgetData.categories.find(c => c.id === trans.categoryId);
                    return `
                        <div class="transaction-item">
                            <div class="transaction-info">
                                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 8px;">
                                    <span style="font-size: 28px;">${category ? category.emoji : '💰'}</span>
                                    <span style="font-weight: 700; font-size: 16px; color: var(--navy);">
                                        ${category ? category.name : 'Unknown'}
                                    </span>
                                </div>
                                <div class="transaction-date">
                                    ${new Date(trans.date).toLocaleDateString('en-US', { 
                                        weekday: 'short', 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })}
                                </div>
                                ${trans.notes ? `
                                    <div style="font-size: 14px; color: #666; margin-top: 8px; font-weight: 500;">
                                        ${trans.notes}
                                    </div>
                                ` : ''}
                            </div>
                            <div class="transaction-amount">$${trans.amount.toFixed(2)}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

/**
 * Toggle month section open/closed
 */
function toggleMonth(month) {
    const content = document.getElementById('month-' + month);
    const header = content.previousElementSibling;
    content.classList.toggle('active');
    header.classList.toggle('open');
}
