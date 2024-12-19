const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the counter schema
let counterSchema = new Schema({ 
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 } 
});

// Create a counter model
const Counter = mongoose.model('Counter', counterSchema);

// Define the supplier schema
let supplierSchema = new Schema({
  supplierId: {
    type: Number,
    required: true,
    unique: true
  },
  supplierName: {
    type: String,
    unique: true,
    required: [true, "Supplier name is required"],
    minlength: [3, "Supplier name must be at least 3 characters"],
    maxlength: [100, "Supplier name cannot exceed 100 characters"],
  },
  contactInformation: {
    type: String,
    required: true,
    match: /[0-9]{3}-[0-9]{3}-[0-9]{4}/
  },
  address: {
    type: String,
    maxlength: [200, "Address cannot exceed 200 characters"],
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  }
});

// Pre-save hook to increment the supplierId
// If the document is new, increment the supplierId
supplierSchema.pre('validate', async function(next) {
  let doc = this;

  try {
    const counter = await Counter.findByIdAndUpdate( 
      { _id: 'supplierId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.supplierId = counter.seq; next();
  } catch (err) {
    console.error('Error in Counter.findByIdAndUpdate:', err); next(err);
  }
});

// Creating a supplier model
const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = {
  Supplier, Counter
};