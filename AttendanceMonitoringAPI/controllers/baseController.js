const {
  objectHelper: { isEmpty },
} = require("../utilities");

class BaseController {
  constructor(repository, controllerName) {
    this.controllerName = controllerName;
    this.repository = repository;
  }

  getAllData = async (req, res) => {
    const allData = await this.repository.getAll();
    res.send(allData);
  };

  createData = async (req, res) => {
    await this.repository.insert(req.body);
    res.sendStatus(201);
  };

  updateData = async (req, res) => {
    const { id } = req.params;

    const dbData = await this.repository.getById(id);
    if (isEmpty(dbData)) {
      return res.status(404).json({
        error: `${this.controllerName} with id: ${id} does not exist.`,
      });
    }

    await this.repository.update(id, req.body);
    res.sendStatus(200);
  };

  deleteData = async (req, res) => {
    const { id } = req.params;

    const dbData = await this.repository.getById(id);
    if (isEmpty(dbData)) {
      return res.status(404).json({
        error: `${this.controllerName} with id: ${id} does not exist.`,
      });
    }

    await this.repository.delete(dbData);

    res.json(200);
  };
}

module.exports = BaseController;
