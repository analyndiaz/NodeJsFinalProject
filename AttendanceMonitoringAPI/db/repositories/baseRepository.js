class BaseRepository {
  constructor(schema) {
    this.schema = schema;
  }

  async getAll(order) {
    return await this.schema.find().sort(order);
  }

  async getAll() {
    return await this.schema.find();
  }

  async getById(id) {
    return await this.schema.findById(id);
  }

  async getByFilter(filter) {
    return await this.schema.find(filter);
  }

  async save(data) {
    return await data.save();
  }

  async delete(data) {
    await data.remove();
  }
}

module.exports = BaseRepository;
