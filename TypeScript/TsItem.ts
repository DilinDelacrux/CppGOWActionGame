import * as UE from "ue";

class TsItem extends UE.Actor {
    constructor() {
        super();
    }
    ReceiveBeginPlay(): void {
        console.log("TsItem ReceissveBeginPlay");
    }
}
export default TsItem;
