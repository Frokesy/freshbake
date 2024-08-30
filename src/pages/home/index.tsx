import { useEffect, useState } from "react";
import MainContainer from "../../components/containers/MainContainer";
import Search from "../../components/defaults/Search";
import TopNav from "../../components/defaults/TopNav";
import Products from "../../components/sections/products";
import { supabase } from "../../../utils/supabaseClient";

export interface UserDataProps {
  created_at: string;
  defaultAddress: string;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  phone: string;
  userId: string;
}

const Home = () => {
  const [userData, setUserData] = useState<UserDataProps>()
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("userId", user.id);
          if (!error) {
            data.map((data) => setUserData(data))
          } else {
            console.log(error)
          }
      }
    };
    getUser();
  }, []);

  return (
    <MainContainer active="Home">
      <TopNav data={userData} />
      <div className="pt-20 px-4">
        <img src="/assets/ad.png" alt="ad" className="w-[100%]" />
        <Search />
        <Products />
      </div>
    </MainContainer>
  );
};

export default Home;
