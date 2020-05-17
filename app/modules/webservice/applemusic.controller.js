"use strict";
const fs = require("fs");
const jwt = require("jsonwebtoken");

/* 
// @Method: getSettingBySlug
// @Description: Get Setting data By Slug
*/
exports.getAppleMusicToken = async req => {
    try {

        const privateKey = fs.readFileSync("./public/AuthKey_KJ7DJB3768.p8").toString();
        // const privateKey = "MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg7zqiCWWF8bUX8g/16SDzqarrs7hi11S10x2B352BBCmgCgYIKoZIzj0DAQehRANCAASdehDO37KkvUOPTGqt1unZcQ4Fzuc//ZOJRZFYelGPdz65HaJJKqdrpSJspwf3YYJXqJ0Kb2iYZlqGlpaadXuZ";
        const teamId = "H23W3EERLK";
        const keyId = "KJ7DJB3768";

        const jwtToken = jwt.sign({}, privateKey, {
            algorithm: "ES256",
            expiresIn: "180d",
            issuer: teamId,
            header: {
                alg: "ES256",
                kid: keyId
            }
        });

        // console.log(jwtToken);

        if (jwtToken) {
            return { status: 200, token: jwtToken, message: 'Success' };
        } else {
            return { status: 201, data: [], message: 'No Data Found' };
        }
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};