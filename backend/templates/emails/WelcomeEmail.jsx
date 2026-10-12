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

export default function WelcomeEmail({ firstName, url }) {
  return (
    <Html>
      <Head />
      <Preview>Your TradeX account is activated!</Preview>

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
            Account Activated!
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
            Thanks for joining TradeX. Your account has been fully activated and you're ready to start your trading journey with us.
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
              Go to Dashboard
            </Button>
          </Section>

          <Text
            style={{
              fontSize: "15px",
              color: "#0a0a0a",
              marginTop: "32px",
              fontWeight: "500",
              borderTop: "1px solid #f0f0f0",
              paddingTop: "24px",
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
