import { createSendgridClient } from "./sendgrid";
import emailTemplates from "./email-templates";

type EmailServiceOptions = {
  SENDGRID_API_KEY: string;
};

export type EmailConfig = EmailServiceOptions;

export default class EmailService {
  _config: EmailConfig;
  _client: any;

  constructor(config: EmailServiceOptions) {
    this._config = config;
    this._client = createSendgridClient(config);
  }

  getTemplate(templateName: string, link: string, expiry: string) {
    const template = emailTemplates.get(templateName, link, expiry);

    const { html } = template;

    return html;
  }

  async send({ email, templateId, payload }: any) {
    const message = {
      to: email,
      templateId,
      dynamicTemplateData: payload,
    };

    await this._client.triggerDynamicTemplateEmail(message);
  }

  async triggerLogin({
    email,
    link,
    expiry,
  }: {
    email: string;
    link: string;
    expiry: string;
  }) {
    const html = this.getTemplate("magic-login-link", link, expiry);

    const message = {
      to: email,
      subject: "Log in to Trackstack",
      html,
    };

    await this._client.triggerEmail(message);
  }

  async createContact({ email }: { email: string }) {
    await this._client.createContact({ email });
  }
}
