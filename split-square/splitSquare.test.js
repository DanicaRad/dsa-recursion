"use strict";

const {
  dump,
  validate,
  simplify,
  add
} = require("./splitSquare");

describe("dump", function() {
  it("should dump ints", function() {
    expect(dump(0)).toEqual("0");
    expect(dump(1)).toEqual("1");
  });

  it("should dump arrays", function() {
    expect(dump([0, 1, 0, 1])).toEqual("0 1 0 1");
  });

  it("should handle nested arrays", function() {
    expect(dump([0, 0, 0, [1, 1, [0, 0, 0, 0], 1]])).toEqual("0 0 0 1 1 0 0 0 0 1")
  });
});

describe("validate", function() {
  it("should allow correct ints", function() {
    expect(validate(0)).toBe(true);
    expect(validate(1)).toBe(true);
  });
  it("should reject wrong ints", function() {
    expect(validate(3)).toBe(false);
    expect(validate(-1)).toBe(false);
  });
  it("should reject wrong types", function() {
    expect(validate("hello")).toBe(false);
    expect(validate({"hey": "there"})).toBe(false);
  });
  it("should disallow wrong length arrays", function() {
    expect(validate([1, 1, 0, 0, 1])).toBe(false);
    expect(validate([0,0,0])).toBe(false);
  });
  it("should validate correct arrays", function() {
    expect(validate([1, 1, 0, 0])).toBe(true);
  });
  it("should handle nested arrays", function() {
    expect(validate([1, 0, [0,0,1,0], 0])).toBe(true);
    expect(validate([0, 0, 0, [1, 1, 1, 1, [0, 0, 0, 0]]])).toBe(false); 
  });
});

describe("simplify", function() {
  it("should handle correct ints", function() {
    expect(simplify(0)).toEqual(0);
  });
  it("should handle all same int arrays", function() {
    expect(simplify([1, 1, 1, 1])).toEqual(1);
    expect(simplify([0,0,0,0])).toEqual(0);
  });
  it("should handle correct nested arrays", function() {
    expect(simplify([0, 0, 0, [0, 0, 0, [0, 0, 0, 0]]])).toEqual(0);
  });
});

describe("add", function() {
  test("it should add ints", function() {
    expect(add(0, 0)).toEqual(0);
    expect(add(1, 1)).toEqual(1);
    expect(add(1, 0)).toEqual(1);
    expect(add(0, 1)).toEqual(1);
  });

  test("it should add arrays", function() {
    expect(add([1, 0, 1, 0], [0, 0, 0, 1])).toEqual([1, 0, 1, 1]);
    expect(add(0, [1, 0, 1, 0])).toEqual([1, 0, 1, 0]);
  });

  test("it should handle nesting", function() {
    expect(add(0, [1, 0, 1, 0])).toEqual([1, 0, 1, 0]);
    expect(add(1, [1, 0, 1, 0])).toEqual([1, 1, 1, 1]);
    expect(add(
      [0, [1, 1, 1, [0, 0, 0, 0]], [0, 0, 0, 0], 1],
      [1, [1, 0, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]
    )).toEqual([1, [1, 1, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]);
  });

  test("it should handle unevenly nested arrays", function() {
    expect(add(
      [0, [1, 1, 1, 0           ], [0, 0, 0, 0], 1],
      [1, [1, 0, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]
    )).toEqual([1, [1, 1, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]);
    
    expect(add(
      [0, [1, 1, 1, 1                      ], [0, 0, 0, 0], 1],
      [1, [1, 0, 1, [0, [0, 0, 0, 0], 1, 1]], [1, 0, 1, 0], 1]
    )).toEqual([1, [1, 1, 1, [1, [1, 1, 1, 1], 1, 1]], [1, 0, 1, 0], 1]);
  });
})
