"use strict";

const { makeBoard, find } = require("./boggle");

describe("test find", function() {
  const board = makeBoard(`N C A N E
                           O U I O P
                           Z Q Z O N
                           F A D P L
                           E D E A Z`);
  test("it should return true if word is found", function() {
    expect(find(board, "CAN")).toBe(true);
    // expect(find(board, "NOPE")).toBe(true);
    // expect(find(board, "NOON")).toBe(true);
    expect(find(board, "CANNON")).toBe(false);
    expect(find(board, "DANICA")).toBe(false);
  });

  const board2 = makeBoard(`E D O S Z
                          N S O N R
                          O U O O P
                          Z Q Z O R
                          F A D P L`);
  test("it should find multiple pathways", function() {
    expect(find(board2, "NOOOOS")).toBe(true);
  })
})