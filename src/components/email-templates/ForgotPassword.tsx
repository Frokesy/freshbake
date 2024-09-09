import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Heading,
    Section,
    Text,
    Link,
    Hr,
  } from "@react-email/components";
  import { FC } from "react";
  
  interface ForgotPasswordTemplateProps {
    userData: { firstname: string } | undefined;
    otp: string;
  }
  
  export const ForgotPasswordTemplate: FC<ForgotPasswordTemplateProps> = ({
    userData,
    otp,
  }) => {
    return (
      <Html>
        <Head />
        <Preview>Reset your password for FreshBake</Preview>
        <Body style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
          <Container
            style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
          >
            <Heading style={{ textAlign: "center", color: "#7d6c3a" }}>
              Hello {userData?.firstname}, Reset Your Password
            </Heading>
            <Section>
              <Text>
                We received a request to reset your FreshBake account password.
                Please use the following OTP to reset your password.
              </Text>
  
              <Section style={styles.section}>
                <Heading style={styles.subheading}>Your OTP</Heading>
                <Hr />
                <Text style={styles.otpCode}>{otp}</Text>
              </Section>
  
              <Section style={{ marginTop: "20px" }}>
                <Text>
                  If you did not request a password reset, please ignore this
                  email or{" "}
                  <Link href="mailto:support@freshbake.com">contact support</Link>{" "}
                  if you have any concerns.
                </Text>
              </Section>
  
              <Section style={styles.footer}>
                <Text style={styles.footerText}>
                  © {new Date().getFullYear()} FreshBake. All rights reserved.
                </Text>
                <Text style={styles.footerText}>
                  FreshBake Inc., 123 Bakery Street, Sweet City, Yumland.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  };
  
  const styles = {
    subheading: {
      fontSize: "18px",
      color: "#333333",
      marginBottom: "10px",
    },
    text: {
      fontSize: "16px",
      color: "#555555",
      lineHeight: "1.5",
    },
    section: {
      marginBottom: "20px",
    },
    otpCode: {
      fontSize: "24px",
      fontWeight: "bold",
      textAlign: "center" as const,
      color: "#7d6c3a",
    },
    footer: {
      borderTop: "1px solid #eaeaea",
      paddingTop: "10px",
      textAlign: "center" as const,
    },
    footerText: {
      fontSize: "12px",
      color: "#999999",
      marginBottom: "5px",
    },
  };
  