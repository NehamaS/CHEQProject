import { test, expect } from '@playwright/test';
import { fileImport, } from "../common/Helper"
import {findMaliciousWithSpecificIP, findSpecificIPsList} from "../common/malicious.find"

let data
test.beforeEach(async () => {
  data=await fileImport("data.xlsx")
});

test('check if there is malicious bot match 140.235.248.3 IP in Excel', async () => {

   await findMaliciousWithSpecificIP(data,'61.247.133.200')
});

test('check if all malicious data in centers list are in Excel', async () => {
   const ipList=['61.247.133.200','241.81.13.96','0.0.0.0']
   await findSpecificIPsList(data,ipList)

});

