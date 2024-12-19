const mongoose = require('mongoose');
const { Supplier } = require('../../src/models/supplier');

// Connect to a test database 
beforeAll(async () => {
  const connectionString = 
  'mongodb+srv://ims_user:s3cret@bellevueuniversity.lcwc1ht.mongodb.net/?retryWrites=true&w=majority';

  try {
    await mongoose.connect(connectionString, {
      dbName: 'ims' 
    });
    console.log('Connection to the database instance was successful'); 
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`); 
  }
});

// Close the database connection after all tests 
afterAll(async () => {
  await mongoose.connection.close();
  console.log('Database connection closed'); 
});

describe('Supplier Model Test', () => {
  it('should fail to create a supplier with a name shorter than 3 characters', async () => { 
    const supplierData = {
      supplierId: 1,
      supplierName: "Te",
      contactInformation: "123-456-7890",
      address: "123 Tech Street"
    }

    const supplier = new Supplier(supplierData); 
    let err;
    
    try {
      await supplier.save();
    } catch (error) {
      err = error; 
    }

    expect(err).toBeDefined();
    expect(err.errors['supplierName']).toBeDefined(); 
    expect(err.errors['supplierName'].message).toBe('Supplier name must be at least 3 characters');
  });

  it('should fail to create a supplier with a name longer than 100 characters', async () => { 
    const supplierData = {
      supplierId: 1,
      supplierName: "T".repeat(101),
      contactInformation: "123-456-7890",
      address: "123 Tech Street"
    }

    const supplier = new Supplier(supplierData); 
    let err;
    
    try {
      await supplier.save();
    } catch (error) {
      err = error; 
    }

    expect(err).toBeDefined();
    expect(err.errors['supplierName']).toBeDefined(); 
    expect(err.errors['supplierName'].message).toBe('Supplier name cannot exceed 100 characters');
  });

  it('should fail to create a supplier with an address longer than 200 characters', async () => { 
    const supplierData = {
      supplierId: 1,
      supplierName: "TechSupplier",
      contactInformation: "123-456-7890",
      address: "1".repeat(201)
    }

    const supplier = new Supplier(supplierData); 
    let err;
    
    try {
      await supplier.save();
    } catch (error) {
      err = error; 
    }

    expect(err).toBeDefined();
    expect(err.errors['address']).toBeDefined(); 
    expect(err.errors['address'].message).toBe('Address cannot exceed 200 characters');
  }); 
});