"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
class TsItem2 extends UE.Actor {
    constructor() {
        super();
    }
    ReceiveBeginPlay() {
        console.log("TsItem2 ReceissveBeginPlay");
    }
}
exports.default = TsItem2;
