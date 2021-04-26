import { ExtendedError, LambdaError } from "./errors";

describe("errors", () => {
  describe("when instantiating ExtendedError", () => {
    it("contains expected properties", () => {
      try {
        throw new ExtendedError({
          error: new Error("Argh"),
          context: {
            true: false,
          },
          message: "I've thrown and I can't get up",
          statusCode: 502,
        });
      } catch (err) {
        expect(err.message).toMatch("I've thrown and I can't get up");
        expect(err.statusCode).toEqual(502);
        expect(err.toString()).toMatch("Error: I've thrown and I can't get up");
        expect(err.expose).toBe(false);
      }
    });
  });
  describe("when instantiating LambdaError", () => {
    it("contains expected properties", () => {
      try {
        throw new LambdaError({
          error: new Error("Argh"),
          event: {
            true: false,
          },
          message: "I've thrown and I can't get up",
          statusCode: 502,
          errorCode: "ARG",
        });
      } catch (err) {
        expect(err.message).toMatch("I've thrown and I can't get up");
        expect(err.statusCode).toEqual(502);
        expect(err.errorCode).toMatch("ARG");
        expect(err.expose).toBe(true);
        expect(err.toString()).toMatch("Error: I've thrown and I can't get up");
      }
    });

    it("does not prefix error code if not provided", () => {
      try {
        throw new LambdaError({
          error: new Error("Argh"),
          event: {
            true: false,
          },
          message: "I've thrown and I can't get up",
          statusCode: 502,
        });
      } catch (err) {
        expect(err.message).toMatch("I've thrown and I can't get up");
        expect(err.statusCode).toEqual(502);
        expect(err.toString()).toMatch("Error: I've thrown and I can't get up");
      }
    });
  });
});
