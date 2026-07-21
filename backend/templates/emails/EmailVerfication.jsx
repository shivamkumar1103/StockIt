import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
} from "@react-email/components";

export default function EmailVerification({ firstName, url }) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>

      <Body
        style={{
          backgroundColor: "#f5f7fb",
          fontFamily: "Arial, sans-serif",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "40px",
            boxSizing: "border-box",
          }}
        >
          <Heading
            style={{
              fontSize: "28px",
              color: "#111827",
              marginBottom: "24px",
            }}
          >
            Welcome to TradeX 🚀
          </Heading>

          <Text
            style={{
              fontSize: "16px",
              color: "#374151",
              lineHeight: "24px",
            }}
          >
            Hi <strong>{firstName}</strong>,
          </Text>

          <Text
            style={{
              fontSize: "16px",
              color: "#374151",
              lineHeight: "24px",
            }}
          >
            Thanks for creating your TradeX account. Before you can start
            investing, please verify your email address by clicking the button
            below.
          </Text>

          <Section
            style={{
              textAlign: "center",
              margin: "35px 0",
            }}
          >
            <Button
              href={url}
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "14px 28px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Verify Email
            </Button>
          </Section>

          <Text
            style={{
              fontSize: "14px",
              color: "#6b7280",
              lineHeight: "22px",
            }}
          >
            This verification link will expire in
            <strong> 24 hours</strong>.
          </Text>

          <Text
            style={{
              fontSize: "14px",
              color: "#6b7280",
              lineHeight: "22px",
            }}
          >
            If the button doesn't work, copy and paste this URL into your
            browser:
          </Text>

          <Text
            style={{
              fontSize: "14px",
              color: "#2563eb",
              wordBreak: "break-all",
            }}
          >
            {url}
          </Text>

          <Text
            style={{
              marginTop: "32px",
              fontSize: "14px",
              color: "#6b7280",
            }}
          >
            If you didn't create an account, you can safely ignore this email.
          </Text>

          <Text
            style={{
              marginTop: "30px",
              color: "#111827",
            }}
          >
            Happy Trading,
            <br />
            <strong>The TradeX Team</strong>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
