import OnboardingContainer from "../../components/containers/OnboardingContainer";
import ForgotPassword from "../../components/sections/auth/ForgotPassword";
import OTPPage from "../../components/sections/auth/OTPPage";

const ResetPassword = () => {
  return (
    <OnboardingContainer>
      {/* <ForgotPassword /> */}
      <OTPPage />
    </OnboardingContainer>
  );
};

export default ResetPassword;
