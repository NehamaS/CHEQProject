
const path = require("path");
const reader = require('xlsx')
const uaParser = require('uas-parser');

    export async function fileImport(fileName) {

        try{
            const filePath = path.resolve(__dirname, fileName);
            const workbook = reader.readFile(filePath);
            const data = reader.utils.sheet_to_json(workbook.Sheets["Worksheet"])

            return  data

        } catch (e) {
            throw new Error(`file import failed`);
        }
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


