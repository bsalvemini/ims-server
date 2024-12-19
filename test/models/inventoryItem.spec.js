const mongoose = require('mongoose');
const { InventoryItem } = require('../../src/models/inventoryItem');

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

describe('Inventory Item Model Test', () => {
  it('should fail to create an inventory item with a name shorter than 3 characters', async () => { 
    const inventoryItemData = {
      categoryId: 1000,
      supplierId: 1,
      name: 'Ma',
      description: 'M2 chip Built for Apple Intelligence - 8GB Memory - 256GB SSD - Midnight',
      quantity: 13,
      price: 749.99
    };

    const inventoryItem = new InventoryItem(inventoryItemData); 
    let err;

    try {
      await inventoryItem.save();
    } catch (error) { 
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors['name']).toBeDefined(); 
    expect(err.errors['name'].message).toBe('Item name must be at least 3 characters');
  });

  it('should fail to create an inventory item with a name longer than 100 characters', async () => { 
    const inventoryItemData = {
      categoryId: 1000,
      supplierId: 1,
      name: 'M'.repeat(101),
      description: 'M2 chip Built for Apple Intelligence - 8GB Memory - 256GB SSD - Midnight',
      quantity: 13,
      price: 749.99
    };
    
    const inventoryItem = new InventoryItem(inventoryItemData); 
    let err;

    try {
      await inventoryItem.save();
    } catch (error) { 
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors['name']).toBeDefined(); 
    expect(err.errors['name'].message).toBe('Item name cannot exceed 100 characters');
  });

  it('should fail to create an inventory item with a description longer than 500 characters', async () => { 
    const gardenData = {
      name: 'Rose Garden', 
      location: 'Central Park', 
      description: 'D'.repeat(501)
    };
    const inventoryItemData = {
      categoryId: 1000,
      supplierId: 1,
      name: 'MacBook Air 13.6 Laptop',
      description: 'M'.repeat(501),
      quantity: 13,
      price: 749.99
    };
    
    const inventoryItem = new InventoryItem(inventoryItemData); 
    let err;

    try {
      await inventoryItem.save();
    } catch (error) {
      err = error; 
    }

    expect(err).toBeDefined();
    expect(err.errors['description']).toBeDefined(); 
    expect(err.errors['description'].message).toBe('Description cannot exceed 500 characters');
  }); 
});