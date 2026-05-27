import * as UE from "ue";

class TsItem2 extends UE.Actor {
    constructor() {
        super();
    }
    ReceiveBeginPlay(): void {
        console.log("TsItem2 ReceissveBeginPlay");
    }
}
export default TsItem2;
