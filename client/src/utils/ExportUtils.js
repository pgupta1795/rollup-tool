import Excel from 'exceljs';
import saveAs from 'file-saver';
import Colors from '../helper/Colors';
import { flattenWithLevel } from './ArrayUtils';

const LEVEL = {
  id: 'level',
  header: 'Level',
};

export const createWorkbook = () => new Excel.Workbook();

export const createSheet = (excelWorkbook, name) =>
  excelWorkbook.addWorksheet(name);

const addFilter = (workSheet, columns) => {
  workSheet.autoFilter = {
    from: {
      row: 1,
      column: 1,
    },
    to: {
      row: 1,
      column: columns.length,
    },
  };
  workSheet.views = [{ state: 'frozen', ySplit: 2, xSplit: 1 }];
};

const addLevelColumn = (worksheet, headerRow, level) => {
  const levelColumn = worksheet.getColumn(level);
  levelColumn.width = 10;
  levelColumn.style = {
    font: {
      bold: true,
    },
  };
  headerRow.getCell(level).value = LEVEL.header;
};

const addConditions = (worksheet, rows) => {
  const size = rows.length;
  console.log(size);
  worksheet.addConditionalFormatting({
    ref: `A2:O${size}`,
    rules: [
      {
        type: 'expression',
        formulae: ['MOD(ROW(),2)=0'],
        style: {
          fill: {
            type: 'pattern',
            pattern: 'solid',
            bgColor: { argb: 'D3D3D3' },
          },
        },
      },
    ],
  });
};

/**
 * add first column as LEVEL,
 * add other table columns
 * @param {*} worksheet
 * @param {table-columns} columns
 */
export const addHeaders = (worksheet, columns) => {
  const headerRow = worksheet.addRow();
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: Colors.THEME_MAIN.split('#')[1] },
  };
  worksheet.getRow(1).font = { bold: true };
  let level = 1;
  addLevelColumn(worksheet, headerRow, level);
  level += 1;
  columns.forEach((column, i) => {
    const width = column.getSize();
    worksheet.getColumn(level).width = width !== undefined ? width / 6 : 20;
    const cell = headerRow.getCell(level);
    cell.value = columns[i].columnDef.header;
    level += 1;
  });
  addFilter(worksheet, columns);
};

const addLevelRow = (dataRow, row, level) => {
  const levelCell = dataRow.getCell(level);
  levelCell.value = row[LEVEL.id];
  levelCell.alignment = { vertical: 'middle', horizontal: 'center' };
};

export const addRows = (workSheet, columns, rows) => {
  const flatRows = flattenWithLevel(rows);
  flatRows.forEach((row) => {
    const dataRow = workSheet.addRow();
    let level = 1;
    addLevelRow(dataRow, row, level);
    level += 1;
    columns.forEach((column) => {
      const cellValue = row[column.id];
      const isDate = column.columnDef.header.includes('Date');
      dataRow.getCell(level).value = isDate ? new Date(cellValue) : cellValue;
      level += 1;
    });
  });
  addConditions(workSheet, flatRows);
};

export const saveExcel = (excelWorkbook, name) => {
  excelWorkbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), name);
  });
};

export const createExcel = (columns, rows) => {
  const { title } = rows[0];
  const excelWorkbook = createWorkbook();
  const workSheet = createSheet(excelWorkbook, title);
  addHeaders(workSheet, columns);
  addRows(workSheet, columns, rows);
  saveExcel(excelWorkbook, `Export_${title}.xlsx`);
};

export const saveCSV = (excelWorkbook, name) => {
  excelWorkbook.csv.writeBuffer().then((buffer) => {
    saveAs(
      new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
      name
    );
  });
};

export const createCSV = (columns, rows) => {
  const { title } = rows[0];
  const excelWorkbook = createWorkbook();
  const workSheet = createSheet(excelWorkbook, title);
  addHeaders(workSheet, columns);
  addRows(workSheet, columns, rows);
  saveCSV(excelWorkbook, `Export_${title}.csv`);
};

const jsonToXml = (json, root = 'root') => {
  let xml = `<${root}>`;
  json.forEach((element) => {
    xml += '<element>';
    Object.keys(element).forEach((key) => {
      const val = element[key];
      const isObject = typeof val === 'object';
      xml += isObject ? jsonToXml(val, key) : `<${key}>${val}</${key}>`;
    });
    xml += '</element>';
  });
  xml += `</${root}>`;
  return xml;
};

const formatXML = (sourceXml) => {
  const xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
  const xsltDoc = new DOMParser().parseFromString(
    [
      // describes how we want to modify the XML - indent everything
      '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
      '  <xsl:strip-space elements="*"/>',
      '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
      '    <xsl:value-of select="normalize-space(.)"/>',
      '  </xsl:template>',
      '  <xsl:template match="node()|@*">',
      '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
      '  </xsl:template>',
      '  <xsl:output indent="yes"/>',
      '</xsl:stylesheet>',
    ].join('\n'),
    'application/xml'
  );
  const xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsltDoc);
  const resultDoc = xsltProcessor.transformToDocument(xmlDoc);
  const resultXml = new XMLSerializer().serializeToString(resultDoc);
  return resultXml;
};

const saveXML = (xml, name) => {
  saveAs(new Blob([xml], { type: 'text/plain;charset=utf-8' }), name);
};

export const createXML = (rows) => {
  const xml = jsonToXml(rows);
  const formattedXML = formatXML(xml);
  saveXML(formattedXML, 'EBOM_Export.xml');
};
