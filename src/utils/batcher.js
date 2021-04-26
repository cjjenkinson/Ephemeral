const batcher = (batchSize) => (target) => {
  const batchCount = Math.ceil(target.length / batchSize);
  const emptyBatches = Array(batchCount);

  return Array.from(emptyBatches, (_, batchNumber) => {
    const start = batchNumber * batchSize;
    return target.slice(start, start + batchSize);
  });
};

module.exports = batcher;
