/* eslint-disable no-console */

import sendgrid from "@sendgrid/mail";

import fetch from "node-fetch";

class SendgridError extends Error {}

const SENDGRID_BASE_API_URL = "https://api.sendgrid.com/v3";

const createSendgridClient = (config) => {
  sendgrid.setApiKey(config.SENDGRID_API_KEY);

  const triggerDynamicTemplateEmail = async ({
    to,
    templateId,
    dynamicTemplateData,
  }) => {
    try {
      const email = {
        to,
        from: "Trackstack <support@trackstack.in>",
        templateId,
        dynamicTemplateData,
      };

      await sendgrid.send(email);
    } catch (error) {
      throw new SendgridError(`Failed to send email :: ${error.message}`);
    }
  };

  const triggerEmail = async ({ to, subject, text, html }) => {
    try {
      const email = {
        to,
        from: "Trackstack <no-reply@trackstack.in>",
        subject,
        text,
        html,
      };

      await sendgrid.send(email);
    } catch (error) {
      throw new SendgridError(`Failed to send email :: ${error.message}`);
    }
  };

  const createContact = async ({ email }) => {
    if (config.SENDGRID_MARKETING_CONTACT_LISTS__SENDERS) {
      const response = await fetch(
        `${SENDGRID_BASE_API_URL}/marketing/contacts`,
        {
          body: JSON.stringify({
            list_ids: [config.SENDGRID_MARKETING_CONTACT_LISTS__SENDERS],
            contacts: [
              {
                email: email,
              },
            ],
          }),
          headers: {
            Authorization: `Bearer ${config.SENDGRID_API_KEY}`,
            "Content-Type": "application/json",
          },
          method: "PUT",
        }
      );

      if (response.status >= 400) {
        throw new SendgridError("Failed to create contact");
      }

      return response.json();
    }
  };

  return {
    triggerDynamicTemplateEmail,
    triggerEmail,
    createContact,
  };
};

export { createSendgridClient };
