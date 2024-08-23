import OnboardingContainer from "../containers/OnboardingContainer";

const PageLoader = () => {
  return (
    <OnboardingContainer>
      <div className="flex h-screen w-[100%] items-center justify-center">
        <img src="/assets/logo.png" alt="logo" className="animate-pulse" />
      </div>
    </OnboardingContainer>
  );
};

export default PageLoader;
