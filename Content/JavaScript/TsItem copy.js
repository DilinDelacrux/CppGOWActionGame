"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
class TsItem extends UE.Actor {
    constructor() {
        super();
    }
    ReceiveBeginPlay() {
        console.log("TsItem ReceissveBeginPlay");
    }
}
exports.default = TsItem;
