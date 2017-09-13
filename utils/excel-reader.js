var xlsx = require("xlsx");

module.exports = () => {
    const workbook = xlsx.readFile("data/test_data.xlsx");
    const SheetName0 = workbook.SheetNames[0];
    const Sheet0 = workbook.Sheets[SheetName0];

    return xlsx.utils.sheet_to_json(Sheet0);
}
