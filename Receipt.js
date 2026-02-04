/**
 * RECEIPT.JS - Receipt OCR Functionality
 * Handles receipt image upload, processing, and data extraction
 */

/**
 * Handle receipt file input change
 */
document.getElementById('receiptInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        handleReceiptFile(file);
    }
});

/**
 * Set up drag and drop for receipt upload
 */
const receiptUpload = document.getElementById('receiptUpload');

receiptUpload.addEventListener('dragover', (e) => {
    e.preventDefault();
    receiptUpload.classList.add('dragover');
});

receiptUpload.addEventListener('dragleave', () => {
    receiptUpload.classList.remove('dragover');
});

receiptUpload.addEventListener('drop', (e) => {
    e.preventDefault();
    receiptUpload.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleReceiptFile(file);
    }
});

/**
 * Process receipt file
 */
async function handleReceiptFile(file) {
    // Show preview
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('receiptPreview').innerHTML = `
            <img src="${e.target.result}" alt="Receipt">
        `;
    };
    reader.readAsDataURL(file);

    // Show loading
    document.getElementById('receiptLoading').style.display = 'block';

    // Simulate OCR processing
    // In a real app, you would call an OCR API here (Tesseract.js, Google Cloud Vision, etc.)
    setTimeout(() => {
        const extractedData = simulateOCR();
        fillFormWithReceiptData(extractedData);
        
        // Hide loading
        document.getElementById('receiptLoading').style.display = 'none';

        // Show success message
        alert(`✅ Receipt scanned!\n\nAmount: $${extractedData.amount}\nMerchant: ${extractedData.merchant}\n\nPlease select a category and confirm.`);
    }, 2000);
}

/**
 * Simulate OCR extraction
 * In production, replace this with actual OCR API call
 */
function simulateOCR() {
    // Simulated extracted data
    const merchants = [
        'Starbucks',
        'Target',
        'Whole Foods',
        'Shell Gas Station',
        'Amazon Fresh',
        'CVS Pharmacy',
        'McDonald\'s',
        'Walmart',
        'Best Buy',
        'Home Depot'
    ];

    return {
        amount: (Math.random() * 100 + 10).toFixed(2),
        merchant: merchants[Math.floor(Math.random() * merchants.length)],
        date: new Date().toISOString().split('T')[0]
    };
}

/**
 * Real OCR implementation using Tesseract.js (example)
 * Uncomment and use this if you want real OCR
 */
/*
async function performRealOCR(file) {
    try {
        const { createWorker } = Tesseract;
        const worker = await createWorker();
        
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        
        const { data: { text } } = await worker.recognize(file);
        await worker.terminate();
        
        return parseReceiptText(text);
    } catch (error) {
        console.error('OCR Error:', error);
        return simulateOCR(); // Fallback to simulation
    }
}

function parseReceiptText(text) {
    // Extract amount (look for patterns like $XX.XX or XX.XX)
    const amountMatch = text.match(/\$?(\d+\.\d{2})/);
    const amount = amountMatch ? amountMatch[1] : '0.00';
    
    // Extract merchant (usually first line or contains common keywords)
    const lines = text.split('\n').filter(line => line.trim());
    const merchant = lines[0] || 'Unknown Merchant';
    
    // Extract date (look for date patterns)
    const dateMatch = text.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})/);
    const date = dateMatch ? parseDate(dateMatch[1]) : new Date().toISOString().split('T')[0];
    
    return { amount, merchant, date };
}

function parseDate(dateStr) {
    const [month, day, year] = dateStr.split('/');
    const fullYear = year.length === 2 ? '20' + year : year;
    return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}
*/

/**
 * Fill form with extracted receipt data
 */
function fillFormWithReceiptData(data) {
    document.getElementById('amount').value = data.amount;
    document.getElementById('notes').value = `Receipt from ${data.merchant}`;
    document.getElementById('date').value = data.date;
}

/**
 * Clear receipt preview
 */
function clearReceiptPreview() {
    document.getElementById('receiptPreview').innerHTML = '';
    document.getElementById('receiptInput').value = '';
}
