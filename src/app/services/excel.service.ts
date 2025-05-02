import { Injectable } from "@angular/core";
import * as fs from 'file-saver';
import { Workbook } from 'ExcelJS';
// import { GlobalMethods } from "../shared/global.shared";
import moment from 'moment';

@Injectable({ providedIn: 'root'})
export class ExcelService {
  // private gm: GlobalMethods = new GlobalMethods();

  async expExcel(dt: any) {
    //Title, Header & Data
    // const base64data = await this.gm.getBase64("/assets/150/gclogo.png");
    const filename = dt.filename;
    const title1 = dt.title1;
    const title2 = dt.title2;
    const title3 = dt.title3;
    const header = dt.headers
    const data = dt.data;
    const footer = dt.footer;
    const endcol = dt.endcol;
    const colset = dt.colset;

    const header1: string = 'GORDON COLLEGE';
    const header2: string = 'Olongapo City Sports Complex, Donor St. East Tapinac, Olongapo City';
    const header3: string = 'Phone: (047) 222 4080; Web: https://gordoncollege.edu.ph';

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(title1);

    //Add Row and formatting

    let hRow1 = this.setTitleRowFormat(worksheet, 'A1', `${endcol}1`, header1, 'middle', 'center', 16);
    let hRow2 = this.setTitleRowFormat(worksheet, 'A2', `${endcol}2`, header2, 'middle', 'center', 12);
    let hRow3 = this.setTitleRowFormat(worksheet, 'A3', `${endcol}3`, header3, 'middle', 'center', 12);
    let tRow1 = this.setTitleRowFormat(worksheet,'A5', `${endcol}5`, title1, 'middle', 'center', 16);
    let tRow2 = this.setTitleRowFormat(worksheet,'A6', `${endcol}6`, title2, 'middle', 'center', 16);
    let tRow3 = this.setTitleRowFormat(worksheet,'A7', `${endcol}7`, title3, 'middle', 'center', 16);

    // let b64: any = base64data;
    // let logo = workbook.addImage({
    //   base64: base64data,
    //   extension: 'png'
    // });

    // worksheet.addImage(logo, {
    //   tl: { col: 0, row: 0 },
    //   ext: { width: 120, height: 120 },
    //   editAs: 'absolute'
    // });

    let d: Date = new Date();
    let date = `${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}`;

    worksheet.addRow([]); // Blank row inserted

    let hRow = worksheet.addRow(header);
    let st: any = { style: 'thin', color: { argb: '000000'}};
    data.forEach((e: any) => {
      let row = worksheet.addRow(e);
      for(let i=1; i<=Object.keys(e).length; i++) {

        row.getCell(i).border = { top: st,left: st,bottom: st,right: st }
      }
    });

    worksheet.addRow([]); // Blank row inserted



    // Data Area formatting
    colset.forEach((e: any, i: number) => {
      worksheet.getColumn(i+1).width = colset[i].w;
      worksheet.getColumn(i+1).alignment = this.setAlignment(colset[i].a, colset[i].wt);
    });
    worksheet.addRow([]);
    // ./Data Area formatting

    // // Header Formatting
    let topRowAlignment: any = this.setAlignment('mc', false);
    hRow1.alignment = topRowAlignment;
    hRow2.alignment = topRowAlignment;
    hRow3.alignment = topRowAlignment;

    let stRowAlignment: any = this.setAlignment('mc', false);
    tRow1.alignment = stRowAlignment;
    tRow2.alignment = stRowAlignment;
    tRow3.alignment = stRowAlignment;

    hRow.height = 30;
    hRow.alignment = { vertical: 'middle', horizontal: 'center' };
    hRow.eachCell((cell, number) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4167B8' }, bgColor: { argb: '' }}
      cell.border = { top: st, left: st, bottom: st, right: st }
      cell.font = { bold: true, color: { argb: 'FFFFFF' }, size: 12 }
    });

    // ./Header Formatting


    // Footer Area
    let fRow = worksheet.addRow([footer]);
    fRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFB050'}}
    worksheet.mergeCells(`A${fRow.number}:${endcol}${fRow.number}`);
    // ./Footer Area

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, filename + '.xlsx');
    });
  }

  private setTitleRowFormat(ws: any, celStart: string, celEnd: string, titleText: string, ver: string, hor: string, sz: number): any {
    ws.mergeCells(celStart, celEnd);
    let tr = ws.getCell(celStart);
    tr.value = titleText;
    tr.font = {
      name: 'Calibri',
      size: sz,
      underline: 'single',
      bold: true,
      color: { argb: '0085A3' }
    }
    tr.alignment = { vertical: ver, horizontal: hor }
    return tr;
  }

  private setAlignment(aSet: string, wt: boolean): any {
    let tmp: any;
    switch (aSet) {
      case 'mc': tmp = { vertical: "middle", horizontal: "center", wrapText: wt }; break;
      case 'ml': tmp = { vertical: "middle", horizontal: "left", wrapText: wt }; break;
      case 'mr': tmp = { vertical: "middle", horizontal: "right", wrapText: wt }; break;
      default: tmp = { vertical: "middle", horizontal: "center", wrapText: wt }; break;
    }
    return tmp;
  }
}
