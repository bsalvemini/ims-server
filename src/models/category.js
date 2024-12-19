const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the category schema
let categorySchema = new Schema({
  categoryId: {
    type: Number,
    required: true,
    unique: true
  },
  categoryName: {
    type: String,
    unique: true,
    required: [true, "Category name is required"],
    minlength: [3, "Category name must be at least 3 characters"],
    maxlength: [100, "Category name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    maxlength: [500, "Description cannot exceed 500 characters"],
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
  },
});

// Custom validator 
categorySchema.path('categoryName').validate(function(val) {
  return /^[A-Za-z\s]+$/.test(val); // Only allows letters and spaces 
}, 'Category name can only contain letters and spaces');

const Category = mongoose.model("Category", categorySchema);

module.exports = {
  Category
};