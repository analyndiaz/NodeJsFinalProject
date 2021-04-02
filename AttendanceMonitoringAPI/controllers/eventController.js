const { eventRepository, attendanceRepository } = require("../db/repositories");
const { EventModel } = require("../models");
const {
  objectHelper: { isEmpty },
  dateHelper: { getDateString },
} = require("../utilities/");
const { ExportService } = require("../services");
const BaseController = require("./baseController");

class EventController extends BaseController {
  constructor() {
    super(eventRepository, "Event");
  }

  getEvent = async (req, res) => {
    const { id } = req.params;

    const dbEvent = await eventRepository.getById(id);
    if (isEmpty(dbEvent)) {
      return res.status(404).json({
        error: `Event with id: ${id} does not exists.`,
      });
    }

    const event = new EventModel(dbEvent);

    const attendance = await attendanceRepository.getByEventId(id);
    event.mapMemberAttendance(attendance);

    res.send(event);
  };

  searchEvent = async (req, res) => {
    const { eventname, datestart, dateend } = req.query;
    if (!eventname && !datestart && !dateend) {
      return res.status(404).json({
        error: `No valid search criteria provided.`,
      });
    }
    const dbEvent = await eventRepository.search(eventname, datestart, dateend);

    res.send(dbEvent);
  };

  createEvent = async (req, res) => {
    const { name, startDateTime, endDateTime } = req.body;

    const dbEvent = await eventRepository.search(
      name,
      startDateTime,
      endDateTime
    );
    if (!isEmpty(dbEvent)) {
      return res.status(409).json({
        error: `Event: ${name} on ${startDateTime}-${endDateTime} already exists.`,
      });
    }

    return await this.createData(req, res);
  };

  deleteEvent = async (req, res) => {
    const { id } = req.params;

    const attendance = await attendanceRepository.getByEventId(id);
    if (!isEmpty(attendance)) {
      return res.status(422).json({
        error: `Cannot delete event id: ${id} with member attendance.`,
      });
    }

    return await this.deleteData(req, res);
  };

  exportToExcel = async (req, res) => {
    const { eventId } = req.query;

    const dbEvent = await eventRepository.getById(eventId);
    if (isEmpty(dbEvent)) {
      return res.status(404).json({
        error: `Event with id: ${eventId} does not exists.`,
      });
    }

    const event = new EventModel(dbEvent);
    const attendance = await attendanceRepository.getByEventId(eventId);
    event.mapMemberAttendance(attendance);

    const exportService = new ExportService("Events");

    exportService.addHeaders([
      { header: "Member Name", key: "name" },
      { header: "Time-In", key: "timeIn" },
      { header: "Time-Out", key: "timeOut" },
    ]);

    exportService.addRows(event.memberAttendance);

    const startDateTimeStr = getDateString(event.startDateTime, true);

    return exportService.writeToExcel(res, `${event.name}_${startDateTimeStr}`);
  };
}

module.exports = new EventController();
