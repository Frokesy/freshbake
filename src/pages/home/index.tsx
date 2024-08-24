import MainContainer from "../../components/containers/MainContainer";
import Search from "../../components/defaults/Search";
import TopNav from "../../components/defaults/TopNav";

const Home = () => {
  return (
    <MainContainer active="Home">
      <TopNav />
      <div className="pt-20 px-4">
        <img src="/assets/ad.png" alt="ad" className="w-[100%]" />
        <Search />
      </div>
    </MainContainer>
  );
};

export default Home;
