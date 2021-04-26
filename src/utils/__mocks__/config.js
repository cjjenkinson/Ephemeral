export default jest.fn(
  () =>
    new Proxy(
      {},
      {
        get: (target, key) => process.env[key] || key,
      }
    )
);
