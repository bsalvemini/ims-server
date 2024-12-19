const createSupplierSchema = {
  type: 'object',
  properties: {
    supplierName: { type: 'string', minLength: 3, maxLength: 100 },
    contactInformation: { type: 'string', pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}' },
    address: { type: 'string', maxLength: 200 },
    dateCreated: { type: 'string', pattern: '^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$' }
  },
  required: ['supplierName', 'contactInformation', 'address'],
  additionalProperties: false
};

module.exports = {
  createSupplierSchema
};