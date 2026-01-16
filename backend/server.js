const express = require('express');
const cors = require('cors');
const { LocalStorage } = require('node-localstorage');
const path = require('path');

const app = express();
const PORT = 3000;

// Initialize local storage in './scratch' directory
// This directory will be created automatically in the backend folder
const localStorage = new LocalStorage('./scratch');

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to simulate a delay (optional, for realism)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- Routes ---

// GET /api/items - Retrieve all items
app.get('/api/items', (req, res) => {
    try {
        const itemsJson = localStorage.getItem('items');
        const items = itemsJson ? JSON.parse(itemsJson) : [];
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve items' });
    }
});

// POST /api/items - Create a new item
app.post('/api/items', (req, res) => {
    try {
        const newItem = req.body;
        
        // Simple validation
        if (!newItem || Object.keys(newItem).length === 0) {
           return res.status(400).json({ error: 'Body is required' });
        }

        // Add ID if not present
        if (!newItem.id) {
            newItem.id = Date.now().toString();
        }

        const itemsJson = localStorage.getItem('items');
        const items = itemsJson ? JSON.parse(itemsJson) : [];
        
        items.push(newItem);
        localStorage.setItem('items', JSON.stringify(items));
        
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save item' });
    }
});

// PUT /api/items/:id - Update an item
app.put('/api/items/:id', (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        const itemsJson = localStorage.getItem('items');
        let items = itemsJson ? JSON.parse(itemsJson) : [];
        
        const index = items.findIndex(item => item.id == id); // loose equality for string/number id
        
        if (index === -1) {
            return res.status(404).json({ error: 'Item not found' });
        }
        
        items[index] = { ...items[index], ...updates };
        localStorage.setItem('items', JSON.stringify(items));
        
        res.json(items[index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// DELETE /api/items/:id - Delete an item
app.delete('/api/items/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        const itemsJson = localStorage.getItem('items');
        let items = itemsJson ? JSON.parse(itemsJson) : [];
        
        const initialLength = items.length;
        items = items.filter(item => item.id != id);
        
        if (items.length === initialLength) {
             return res.status(404).json({ error: 'Item not found' });
        }
        
        localStorage.setItem('items', JSON.stringify(items));
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
         res.status(500).json({ error: 'Failed to delete item' });
    }
});

// DELETE /api/clear - Clear all data (Utility)
app.delete('/api/clear', (req, res) => {
    localStorage.clear();
    res.json({ message: 'Storage cleared' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    console.log(`Local storage location: ${path.resolve('./scratch')}`);
});
