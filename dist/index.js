"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.get("/", (request, respone) => {
    respone.status(200).send("hi");
});
app.listen((PORT) => console.log(`listing in port ${PORT}`));
