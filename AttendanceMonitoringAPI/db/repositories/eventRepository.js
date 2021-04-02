const { Event } = require("../entities");
const BaseRepository = require("./baseRepository");
const { getDateRangeFilter } = require("../helpers/filterHelper");
const {
  objectHelper: { isEmpty },
} = require("../../utilities");

class EventRepository extends BaseRepository {
  constructor() {
    super(Event);
  }

  async getEventByName(eventName) {
    return await this.getByFilter({ name: eventName });
  }

  async insert(data) {
    const newEvent = new Event({
      name: data.name,
      type: data.type,
      startDateTime: data.startDateTime,
      endDateTime: data.endDateTime,
    });

    await this.save(newEvent);
  }

  async update(id, data) {
    const dbEvent = await this.getById(id);

    if (isEmpty(dbEvent)) {
      return;
    }

    if (data.name) dbEvent.name = data.name;
    if (data.type) dbEvent.type = data.type;
    if (data.startDateTime) dbEvent.startDateTime = data.startDateTime;
    if (data.endDateTime) dbEvent.endDateTime = data.endDateTime;

    await this.save(dbEvent);
  }

  async search(eventname, startdate, enddate) {
    let filter = {};
    if (eventname) filter.name = eventname;
    if (startdate) filter.startDateTime = getDateRangeFilter(startdate, 1);
    if (enddate) filter.endDateTime = getDateRangeFilter(enddate, 1);

    return await this.getByFilter(filter);
  }
}

module.exports = new EventRepository();
