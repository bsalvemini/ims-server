const mongoose = require('mongoose');
const { Category } = require('../../src/models/category');

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

describe('Category Model Test', () => {
  it('should validate supplier name correctly', async () => { 
    const categoryData = {
      categoryId: 1000,
      categoryName: "Electronics123",
      description: "Electronic devices and gadgets"
    }
    
    const category = new Category(categoryData); 
    let err;
    
    try {
      await category.save();
    } catch (error) {
      err = error; 
    }
    
    expect(err).toBeDefined();
    expect(err.errors['categoryName']).toBeDefined();
    expect(err.errors['categoryName'].message).toBe('Category name can only contain letters and spaces');
  });

  it('should fail to create a category with a name shorter than 3 characters', async () => { 
    const categoryData = {
      categoryId: 1000,
      categoryName: "El",
      description: "Electronic devices and gadgets"
    }
    
    const category = new Category(categoryData); 
    let err;
    
    try {
      await category.save();
    } catch (error) {
      err = error; 
    }

    expect(err).toBeDefined();
    expect(err.errors['categoryName']).toBeDefined(); 
    expect(err.errors['categoryName'].message).toBe('Category name must be at least 3 characters');
  });

  it('should fail to create a category with a name longer than 100 characters', async () => { 
    const categoryData = {
      categoryId: 1000,
      categoryName: "E".repeat(101),
      description: "Electronic devices and gadgets"
    }
    
    const category = new Category(categoryData); 
    let err;
    
    try {
      await category.save();
    } catch (error) {
      err = error; 
    }

    expect(err).toBeDefined();
    expect(err.errors['categoryName']).toBeDefined(); 
    expect(err.errors['categoryName'].message).toBe('Category name cannot exceed 100 characters');
  });

  it('should fail to create a category with a description longer than 500 characters', async () => { 
    const categoryData = {
      categoryId: 1000,
      categoryName: "Electronics",
      description: "E".repeat(501)
    }
    
    const category = new Category(categoryData); 
    let err;
    
    try {
      await category.save();
    } catch (error) {
      err = error; 
    }

    expect(err).toBeDefined();
    expect(err.errors['description']).toBeDefined(); 
    expect(err.errors['description'].message).toBe('Description cannot exceed 500 characters');
  }); 
});