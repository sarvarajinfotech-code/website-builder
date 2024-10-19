import * as XLSX from "xlsx";

const formatHeader = (key) => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const exportToExcel = (
  data,
  columnOrder = [],
  fileName = "data.xlsx"
) => {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Invalid data: Please provide a non-empty array.");
    return;
  }

  // Use only the keys present in the columnOrder
  const orderedKeys = columnOrder.filter((key) => key in data[0]);

  // Format headers and create new sorted data based on column order
  const formattedData = data.map((item) => {
    const newItem = {};
    orderedKeys.forEach((key) => {
      newItem[formatHeader(key)] = item[key];
    });
    return newItem;
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Export the workbook
  XLSX.writeFile(workbook, fileName);
};
