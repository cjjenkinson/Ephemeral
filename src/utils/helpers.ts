export const parseMessageBody = (message) => {
  return JSON.parse(JSON.stringify(message)).map(({ body }) =>
    JSON.parse(body)
  );
};
