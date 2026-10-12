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
      <Preview>Verify your email address for TradeX</Preview>

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
            Welcome to TradeX
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
            Thanks for creating your TradeX account. Before you can start investing, please verify your email address by clicking the button below.
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
              Verify Email Address
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
            This verification link will expire in <strong>24 hours</strong>. If the button doesn't work, copy and paste this URL into your browser:
          </Text>

          <Text
            style={{
              fontSize: "14px",
              color: "#2563eb",
              wordBreak: "break-all",
              marginBottom: "32px",
              padding: "12px",
              backgroundColor: "#f5f5f5",
              borderRadius: "6px",
            }}
          >
            {url}
          </Text>

          <Text
            style={{
              fontSize: "14px",
              color: "#a3a3a3",
              borderTop: "1px solid #f0f0f0",
              paddingTop: "24px",
            }}
          >
            If you didn't create an account, you can safely ignore this email.
          </Text>

          <Text
            style={{
              fontSize: "15px",
              color: "#0a0a0a",
              marginTop: "24px",
              fontWeight: "500",
            }}
          >
            Happy Trading,<br />
            <span style={{ color: "#525252" }}>The TradeX Team</span>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
