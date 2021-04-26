import { createLib as createTracksLib } from "./tracks";

export const createLibs = () => {
  const tracks = createTracksLib();

  return {
    tracks,
  };
};
