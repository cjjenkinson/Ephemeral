export default jest.fn(
  () =>
    new Proxy(
      {},
      {
        get: () => jest.fn(),
      }
    )
);
