import React from "react";
import { render } from "@react-email/render";
import WelcomeEmail from "../templates/emails/WelcomeEmail.jsx";
import PasswordResetEmail from "../templates/emails/PasswordResetEmail.jsx";
import EmailVerification from "../templates/emails/EmailVerfication.jsx";
import nodemailer from "nodemailer";
import { convert } from "html-to-text";

export default class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Shivam Kumar <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        host: process.env.BREVO_HOST,
        port: process.env.BREVO_PORT,
        auth: {
          user: process.env.BREVO_USER,
          pass: process.env.BREVO_PASS,
        },
      });
    }
    if (process.env.NODE_ENV === "development") {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }
  }

  async send(component, subject) {
    // 1) Render html from pug template
    const html = await render(component);

    // 2) define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html,
      text: convert(html),
    };

    // 3) send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(
      React.createElement(WelcomeEmail, {
        firstName: this.firstName,
        url: this.url,
      }),
      "Welcome to the Natours Family!",
    );
  }

  async sendPasswordReset() {
    await this.send(
      React.createElement(PasswordResetEmail, {
        firstName: this.firstName,
        url: this.url,
      }),
      "Reset Your Password (valid for only 10 minutes)",
    );
  }

  async sendEmailVerification() {
    await this.send(
      React.createElement(EmailVerification, {
        firstName: this.firstName,
        url: this.url,
      }),
      "Verify Your Email Address",
    );
  }
}
