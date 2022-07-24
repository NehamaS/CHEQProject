
const path = require("path");
const reader = require('xlsx')
import {DataRow} from "./dataRow"
const uaParser = require('uas-parser');


    export async function fileImport(fileName) {

        try{

            const filePath = path.resolve(__dirname, fileName);
            const workbook = reader.readFile(filePath);
            const sheetNames = workbook.SheetNames;
            const data = reader.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

            return data

        } catch (e) {
            throw new Error(`file import failed`);
        }
    }

    export async function findMaliciousWithSpecificIP(data,ip): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await  data.map(row => {
                const dataRow = new DataRow(row.ip_address,row["User Agent"],row.OS)
                if(dataRow.OS!=userAgentToOS(dataRow.userAgent))
                {
                    if(dataRow.ipAddress==ip) {
                        return resolve(true)
                    }
                }
            })
            return reject(`any malicious bot match ${ip} IP`)
        });
    }

    export  function userAgentToOS(userAgent): string{
        switch ( uaParser.parse(userAgent).osFamily){
            case 'OS X':
                return 'MAC'
            case 'Windows':
                return 'WINDOWS'
            case 'Linux' :
                return  'LINUX'
            case 'unknown' :
                return  'unknown'
            default:
                throw new Error(`Unsupported userAgent`);
        }
    }


