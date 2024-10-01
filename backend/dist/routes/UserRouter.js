"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const JWT_SECRET = process.env.JWT_SECRET || "Arun98710"; // Use env variable for the JWT secret
const prismaClient = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req, "Req");
    const hardCodedWallet = "jdsnfksaf_nkjndasf_nkjsadfiurkajn";
    const existingUser = yield prismaClient.user.findFirst({
        where: {
            adress: hardCodedWallet,
        },
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({ userId: existingUser.id }, JWT_SECRET, {
            expiresIn: "1h",
        });
        // return res.json({ message: "User logged in successfully.", token });
    }
    else {
        const newUser = yield prismaClient.user.create({
            data: {
                adress: hardCodedWallet,
            },
        });
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, JWT_SECRET, {
            expiresIn: "1h",
        });
        console.log(token);
    }
}));
exports.default = router;
