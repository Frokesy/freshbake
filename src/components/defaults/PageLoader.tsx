import Container from "./Container";

const PageLoader = () => {
  return (
    <Container>
      <div className="flex h-screen w-[100%] items-center justify-center">
        <img src="/assets/logo.png" alt="logo" className="animate-pulse" />
      </div>
    </Container>
  );
};

export default PageLoader;
