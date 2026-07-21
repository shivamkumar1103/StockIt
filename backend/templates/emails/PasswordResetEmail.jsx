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

export default function PasswordResetEmail({ firstName, url }) {
  return (
    <Html>
      <Head />

      <Body>
        <Container>
          <Heading>Password Reset</Heading>

          <Text>Hello {firstName},</Text>

          <Text>Click below to reset your password.</Text>

          <Button href={url}>Reset Password</Button>

          <Text>This link expires in 10 minutes.</Text>
        </Container>
      </Body>
    </Html>
  );
}
