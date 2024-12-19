const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the inventoryItem schema
let inventoryItemSchema = new Schema({
  categoryId: {
    type: Number,
    required: [true, 'Category ID is required'] 
  },
  supplierId: {
    type: Number,
    required: [true, 'Supplier ID is required'] 
  },
  name: {
    type: String,
    unique: true,
    required: [true, "Item name is required"],
    minlength: [3, "Item name must be at least 3 characters"],
    maxlength: [100, "Item name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    minlength: [3, "Description must be at least 3 characters"],
    maxlength: [500, "Description cannot exceed 500 characters"],
    required: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity must be a non-negative number'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0.0, 'Price must be a non-negative number'],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
  },
});

inventoryItemSchema.pre('save', function(next) { 
  if (!this.isNew) {
    this.dateModified = new Date(); 
  }
  next(); 
})

module.exports = {
  InventoryItem: mongoose.model("InventoryItem", inventoryItemSchema)
};
