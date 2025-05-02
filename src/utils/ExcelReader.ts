import * as XLSX from "xlsx";

export default class ExcelReader {
  static readSheet(filePath: string, sheetName: string) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
  }
}
