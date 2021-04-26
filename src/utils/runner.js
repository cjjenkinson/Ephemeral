/* eslint-disable no-console */

const runner = (fn) => {
  const uncaughtError = (error) => {
    console.error("[fatal]", error);

    // Kill the server, but not inmmediatly so we can have the
    // chance of reporting the error
    setTimeout(() => {
      process.exit(-1);
    }, 2500);
  };

  // Global failsafes
  process.on("uncaughtException", uncaughtError);
  process.on("unhandledRejection", uncaughtError);

  return async function run() {
    try {
      await fn();
    } catch (error) {
      uncaughtError(error);
    }
  };
};

module.exports = runner;
