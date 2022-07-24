
export class DataRow  {
    public ipAddress:string
    public userAgent:string
    public OS: "WINDOWS" | "MAC" | "LINUX"


    constructor(ipAddress,userAgent,OS) {
        this.ipAddress=ipAddress
        this.userAgent=userAgent
        this.OS=OS
    }
}

