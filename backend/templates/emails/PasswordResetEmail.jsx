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

export default function PasswordResetEmail({ firstName, url }) {
  return (
    <Html>
      <Head />
      <Preview>Reset your TradeX password</Preview>

      <Body
        style={{
          backgroundColor: "#fafafa",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          padding: "60px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "40px",
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)",
            boxSizing: "border-box",
            border: "1px solid #f0f0f0",
          }}
        >
          <Heading
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#0a0a0a",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Password Reset
          </Heading>

          <Text
            style={{
              fontSize: "16px",
              color: "#525252",
              lineHeight: "26px",
              marginBottom: "24px",
            }}
          >
            Hi <strong>{firstName}</strong>,
          </Text>

          <Text
            style={{
              fontSize: "16px",
              color: "#525252",
              lineHeight: "26px",
              marginBottom: "32px",
            }}
          >
            We received a request to reset the password for your TradeX account. Click the button below to proceed.
          </Text>

          <Section
            style={{
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Button
              href={url}
              style={{
                backgroundColor: "#0a0a0a",
                color: "#ffffff",
                padding: "16px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "15px",
                display: "inline-block",
              }}
            >
              Reset Password
            </Button>
          </Section>

          <Text
            style={{
              fontSize: "14px",
              color: "#737373",
              lineHeight: "22px",
              marginBottom: "16px",
            }}
          >
            This link expires in <strong>10 minutes</strong>. If you didn't request a password reset, you can safely ignore this email.
          </Text>

          <Text
            style={{
              fontSize: "14px",
              color: "#a3a3a3",
              borderTop: "1px solid #f0f0f0",
              paddingTop: "24px",
            }}
          >
            Need help? Contact our support team.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
