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
import { UserDataProps } from "../../pages/home";
import { CartItemProps } from "../../pages/cart";
import { FC } from "react";

interface EmailTemplateProps {
  userData: UserDataProps | undefined;
  cartItems: CartItemProps[];
  finalTotal: number;
  orderId: number;
  activeTab: string;
  deliveryFee: number;
}

export const PaymentSuccessful: FC<EmailTemplateProps> = ({
  userData,
  cartItems,
  finalTotal,
  orderId,
  activeTab,
  deliveryFee,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Your FreshBake order was successful!</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
        <Container
          style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
        >
          <Heading style={{ textAlign: "center", color: "#7d6c3a" }}>
            Thank you for your order, {userData?.firstname}!
          </Heading>
          <Section>
            <Text>
              We have received your order <strong>#{orderId}</strong> and it's
              being processed.
            </Text>
            <Section>
              <Heading style={{ fontSize: "18px", fontWeight: "bold" }}>
                Order Details
              </Heading>
              <Hr />
              {cartItems.map((item) => (
                <div key={item.id} style={{ marginBottom: "10px" }}>
                  <Text>
                    <strong>Item:</strong> {item.category} ({item.weight}{" "}
                    {item.type})
                  </Text>
                  <Text>
                    <strong>Quantity:</strong> {item.quantity}
                  </Text>
                  <Text>
                    <strong>Total Cost:</strong> ${item.totalCost}
                  </Text>
                  <Text>
                    <strong>Delivery Fee:</strong> ${deliveryFee}
                  </Text>
                  <Section style={styles.section}>
                    <Heading style={styles.subheading}>
                      Delivery Information
                    </Heading>
                    <Hr />
                    <Text style={styles.text}>
                      <strong>Delivery Method:</strong>{" "}
                      {activeTab === "delivery" ? "Home Delivery" : "Pickup"}
                    </Text>
                    {activeTab === "delivery" && (
                      <Text style={styles.text}>
                        <strong>Address:</strong> {userData?.defaultAddress}
                      </Text>
                    )}
                  </Section>
                </div>
              ))}
            </Section>
            <Section style={{ marginTop: "20px" }}>
              <Text>
                <strong>Total Paid:</strong> ${finalTotal}
              </Text>
            </Section>
            <Section style={{ marginTop: "20px" }}>
              <Text>
                If you have any questions or need further assistance, please
                feel free to{" "}
                <Link href="mailto:support@freshbake.com">contact us</Link>.
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
  itemSection: {
    padding: "10px 0",
  },
  itemText: {
    fontSize: "16px",
    color: "#555555",
    marginBottom: "5px",
  },
  totalText: {
    fontSize: "16px",
    color: "#333333",
    marginTop: "10px",
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
