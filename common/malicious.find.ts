import { userAgentToOS} from "./Helper";
import {DataRow} from "./dataRow";

export async function findSpecificIPsList(data,ipList): Promise<void> {
    return new Promise(async (resolve, reject) => {
        const ipsArray: Array<Promise<any>> = [];

        await  ipList.map(ip => {
            ipsArray.push(findSpecificIP(data,ip));
        })

        await Promise.allSettled(ipsArray).then((results) => {

            if(results.filter(result => result.status =='rejected').length==0)
                return resolve()
            else
                return reject('Not all IPs in the list found in Excel')

        } );

    });
}

export async function findSpecificIP(data,ip): Promise<void> {
    return new Promise(async (resolve, reject) => {
        let rows:Array<string> = data.filter(row => row.ip_address == ip);

        if (rows.length==0) {
            return reject()
        }
        else {
            console.log(`data provided for ip ${ip} is:` + JSON.stringify(rows))
            return resolve()

        }
    });
}



export async function findMaliciousWithSpecificIP(data,ip): Promise<void> {
    return new Promise(async (resolve, reject) => {
        await  data.map(row => {
            const dataRow = new DataRow(row.ip_address,row["User Agent"],row.OS)
            if(dataRow.OS!=userAgentToOS(dataRow.userAgent))
            {
                if(dataRow.ipAddress==ip) {
                    return resolve()
                }
            }
        })
        return reject(`any malicious bot match ${ip} IP`)
    });
}