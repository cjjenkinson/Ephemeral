const batcher = require("./batcher");

describe("batcher", () => {
  it("splits an array into batches of a specified target size", () => {
    const list = [1, 2, 3, 4, 5];
    const batched = batcher(2)(list);
    expect(batched).toEqual([[1, 2], [3, 4], [5]]);
  });
});
