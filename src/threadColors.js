"use strict";

module.exports = function (_defaultFuncs, _api, _ctx) {
  // Currently the only colors that can be passed to api.changeThreadColor(); may change if Facebook adds more
  return {

    //#region This part is for backward compatibly
    //trying to match the color one-by-one. kill me plz
    MessengerBlue: "196241301102133",  //DefaultBlue
    Viking: "1928399724138152", //TealBlue
    GoldenPoppy: "174636906462322",  //Yellow
    RadicalRed: "2129984390566328", //Red
    Shocking: "2058653964378557", //LavenderPurple
    FreeSpeechGreen: "2136751179887052", //Green
    Pumpkin: "175615189761153",  //Orange
    LightCoral: "980963458735625",  //CoralPink
    MediumSlateBlue: "234137870477637",  //BrightPurple
    DeepSkyBlue: "2442142322678320", //AquaBlue
    BrilliantRose: "169463077092846",  //HotPink
    //i've tried my best, everything else can't be mapped. (or is it?) -UIRI 2020
    //#endregion

    DefaultBlue: "196241301102133",
    HotPink: "169463077092846",
    AquaBlue: "2442142322678320",
    BrightPurple: "234137870477637",
    CoralPink: "980963458735625",
    Orange: "175615189761153",
    Green: "2136751179887052",
    LavenderPurple: "2058653964378557",
    Red: "2129984390566328",
    Yellow: "174636906462322",
    TealBlue: "1928399724138152",
    Aqua: "417639218648241",
    Mango: "930060997172551",
    Berry: "164535220883264",
    Citrus: "370940413392601",
    Candy: "205488546921017",
    //StarWars: "809305022860427" Removed.
  };
};
