# 💰 Budget Tracker

A beautiful, feature-rich budget tracking web app with receipt OCR, category management, and automatic monthly resets.

## ✨ Features

### 📸 Receipt Scanning
- Upload or take photos of receipts
- Automatic OCR extraction of amount and merchant
- Drag & drop support

### 💰 Budget Management
- Create custom categories with emojis and colors
- Set monthly spending limits
- Real-time progress tracking
- Visual budget indicators

### 📊 Progress Tracking
- Overall budget progress bar
- Individual category tracking
- Color-coded spending status
- Budget exceeded warnings

### 📅 Automatic Monthly Reset
- Transactions automatically reset each month
- Previous months saved to history
- Budget limits persist across months

### 📖 History
- View all past transactions
- Organized by month
- Expandable/collapsible sections
- Transaction details and notes

## 🎨 Design

- **Color Palette**: Navy, Cream, Gold, Orange, Tomato
- **Typography**: Poppins font family
- **Style**: Modern, rounded, artistic design
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Works on desktop, tablet, and mobile

## 🚀 Getting Started

### Option 1: Use Locally

1. Download all files
2. Open `index.html` in your browser
3. Start tracking your spending!

### Option 2: Deploy to GitHub Pages

1. Create a new GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Enable GitHub Pages from the `main` branch
5. Access your site at `https://yourusername.github.io/repository-name`

### Option 3: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the folder
3. Get instant URL

## 📁 File Structure

```
budget-tracker/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── data.js             # Data management and storage
├── ui.js               # UI updates and rendering
├── receipt.js          # Receipt OCR functionality
├── app.js              # App initialization
└── README.md           # This file
```

## 🔧 File Descriptions

### `index.html`
The main structure of the app with three pages:
- **Home**: Add spending, view progress
- **Setup**: Manage budget categories
- **History**: View past transactions

### `styles.css`
All visual styling including:
- Color variables and theme
- Component styles (cards, buttons, forms)
- Animations and transitions
- Responsive design
- Progress bars and indicators

### `data.js`
Handles all data operations:
- localStorage management
- Data structure
- CRUD operations for categories and transactions
- Month reset logic
- Import/export functionality

### `ui.js`
Manages user interface:
- Page navigation
- Dynamic rendering
- Progress bar updates
- History display
- Empty states

### `receipt.js`
Receipt scanning features:
- Image upload handling
- Drag & drop support
- OCR simulation (ready for real OCR API)
- Form auto-fill

### `app.js`
Application initialization:
- App setup and configuration
- Color picker setup
- Keyboard shortcuts
- Periodic checks

## 🛠️ Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --navy: #0D3B66;
    --cream: #FAF0CA;
    --gold: #F4D35E;
    --orange: #EE964B;
    --tomato: #F95738;
}
```

### Receipt OCR
The app uses simulated OCR by default. To use real OCR:

1. Uncomment the real OCR code in `receipt.js`
2. Add Tesseract.js or Google Cloud Vision API
3. Update the `performRealOCR` function

Example with Tesseract.js:
```html
<!-- Add to index.html -->
<script src='https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js'></script>
```

### Add More Features
The modular structure makes it easy to add features:
- Add new functions to `data.js` for data operations
- Add new rendering functions to `ui.js` for display
- Create new files for major features

## 💾 Data Storage

All data is stored in browser localStorage:
- **Categories**: Budget categories with limits
- **Transactions**: Current month spending
- **History**: Previous months' transactions

### Backup Your Data
You can export your data as JSON (feature ready in `data.js`):
```javascript
exportData(); // Downloads JSON file
```

### Restore Data
```javascript
importData(file); // Import from JSON file
```

## 🌐 Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 📱 Mobile Usage

### Add to Home Screen

**iPhone:**
1. Open in Safari
2. Tap Share button
3. Select "Add to Home Screen"

**Android:**
1. Open in Chrome
2. Tap menu (⋮)
3. Select "Add to Home screen"

## 🔒 Privacy

- All data stored locally in your browser
- No server-side storage
- No data collection
- Works offline

## 🐛 Troubleshooting

**Data not saving?**
- Check if localStorage is enabled
- Try clearing browser cache
- Export data as backup before clearing

**Receipt upload not working?**
- Ensure file is an image (JPG, PNG)
- Check file size (keep under 5MB)
- Try different browser

**Page not loading?**
- Check console for errors (F12)
- Ensure all files are in same folder
- Clear browser cache

## 📝 License

Free to use and modify for personal projects!

## 🎯 Future Enhancements

Potential features to add:
- [ ] Real OCR integration
- [ ] Data sync across devices
- [ ] Budget recommendations
- [ ] Spending insights and charts
- [ ] Export to CSV/PDF
- [ ] Recurring transactions
- [ ] Multi-currency support
- [ ] Budget sharing with family

## 🤝 Contributing

Feel free to fork and improve! Some areas to contribute:
- Real OCR implementation
- Additional visualizations
- Mobile app version
- More themes and colors

## 📧 Support

If you need help:
1. Check the troubleshooting section
2. Review the code comments
3. Open an issue on GitHub

---

Made with ❤️ by Mel

**Version**: 1.0  
**Last Updated**: February 2026
