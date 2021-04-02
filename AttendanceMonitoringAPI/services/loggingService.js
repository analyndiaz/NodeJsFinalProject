const config = require("config");
const fs = require("fs");
const fsPromise = require("fs/promises");
const loggerDir = config.get("loggerDir");
const logFilename = config.get("logFilename");
const {
  objectHelper: { isEmpty },
  dateHelper: { getDateString },
} = require("../utilities");

class LoggingService {
  logRequest = async (req) => {
    const currDate = new Date();
    const currDateStr = getDateString(currDate, false);
    const newFilename = `${loggerDir}\\${logFilename}-${currDateStr}`;

    this.createDirectory();
    const data = this.getData(
      currDate,
      req.baseUrl,
      req.method.toUpperCase(),
      req.params,
      req.query,
      req.body
    );
    await this.writeToFile(newFilename, data);
  };

  createDirectory = () => {
    if (!fs.existsSync(loggerDir)) {
      fs.mkdirSync(loggerDir);
    }
  };

  getData = (currDate, route, method, params, query, body) => {
    let data = `${currDate}: ${method} ${route}`;
    if (!isEmpty(params)) data += `, params: ${JSON.stringify(params)}`;
    if (!isEmpty(query)) data += `, query: ${JSON.stringify(query)}`;
    if (!isEmpty(body)) data += `, body: ${JSON.stringify(body)}`;
    data += "\r\n";

    return data;
  };

  writeToFile = async (newFilename, data) => {
    try {
      await fsPromise.access(newFilename, fs.F_OK);
    } catch (error) {
      fs.writeFile(newFilename, data, function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      });
      return;
    }

    await fsPromise.appendFile(newFilename, data);
  };
}

module.exports = new LoggingService();
