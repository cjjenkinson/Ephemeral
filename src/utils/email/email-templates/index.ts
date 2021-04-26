import moment from "moment";

import magicLinkLoginTemplate from "./magic-link-login";

export default {
  get: (templateName: string, link: string, expiry: string) => {
    const expiresAt = moment(expiry).format("HH:mm:ss");

    return {
      html: magicLinkLoginTemplate.withData({ link, expiresAt }),
    };
  },
};
