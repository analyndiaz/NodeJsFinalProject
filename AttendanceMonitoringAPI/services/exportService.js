const Excel = require("exceljs");

class ExportService {
  constructor(sheetName) {
    this.workbook = new Excel.Workbook();
    this.worksheet = this.workbook.addWorksheet(sheetName);
    this.worksheet.columns = [];
  }

  addHeaders = (headers) => {
    this.worksheet.columns = headers;
    this.worksheet.columns.forEach((column) => {
      column.width = column.header.length < 12 ? 12 : column.header.length;
    });

    this.worksheet.getRow(1).font = { bold: true, align: "center" };
  };

  addRows = (data) => {
    this.worksheet.addRows(data);
  };

  writeToExcel = (res, fileName) => {
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + `${fileName}.xlsx`
    );

    return this.workbook.xlsx.write(res).then(() => res.status(200).end());
  };
}

module.exports = ExportService;
