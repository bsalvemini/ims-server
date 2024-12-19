const addInventoryItemSchema = {
  type: 'object',
  properties: {
    categoryId: { type: 'number' },
    supplierId: { type: 'number' },
    name: { type: 'string', minLength: 3, maxLength: 100 },
    description: { type: 'string', maxLength: 500 },
    quantity: { type: 'number', minimum: 0 },
    price: { type: 'number', minimum: 0.0 },
    dateCreated: { type: 'string', pattern: '^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$' }
  },
  required: ['categoryId', 'supplierId', 'name', 'description', 'quantity', 'price'],
  additionalProperties: false
};

const updateInventoryItemSchema = {
  type: 'object',
  properties: {
    categoryId: { type: 'number' },
    supplierId: { type: 'number' },
    name: { type: 'string', minLength: 3, maxLength: 100 },
    description: { type: 'string', maxLength: 500 },
    quantity: { type: 'number', minimum: 0 },
    price: { type: 'number', minimum: 0.0 },
    dateModified: { type: 'string', pattern: '^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$' }
  },
  required: ['categoryId', 'supplierId', 'name', 'description', 'quantity', 'price'],
  additionalProperties: false
};

module.exports = {
  addInventoryItemSchema,
  updateInventoryItemSchema
};