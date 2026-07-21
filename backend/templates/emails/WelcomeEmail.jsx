import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
} from "@react-email/components";

// MODIFY LATER TO SAY ACCOUNT ACTIVATED INSTEAD OF WELCOME
export default function WelcomeEmail({ firstName, url }) {
  return (
    <Html>
      <Head />

      <Body
        style={{
          backgroundColor: "#f4f4f4",
          fontFamily: "Arial",
        }}
      >
        <Container
          style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "8px",
          }}
        >
          <Heading>Welcome {firstName}!</Heading>

          <Text>Thanks for joining our stock trading platform.</Text>

          <Button
            href={url}
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "6px",
            }}
          >
            Get Started
          </Button>

          <Text>Happy Trading!</Text>
        </Container>
      </Body>
    </Html>
  );
}
