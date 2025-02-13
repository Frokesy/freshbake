import { useEffect, useState } from "react";
import MainContainer from "../../components/containers/MainContainer";
import Search from "../../components/defaults/Search";
import TopNav from "../../components/defaults/TopNav";
import Products from "../../components/sections/products";
import { pb } from "../../../utils/pocketbaseClient";

export interface UserDataProps {
  created_at: string;
  defaultAddress: string;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  phone: string;
  userId: string;
  password?: string;
}

const Home = () => {
  const [userData, setUserData] = useState<UserDataProps | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (!pb.authStore.isValid || !pb.authStore.model) {
          console.warn("No authenticated user found");
          return;
        }

        const userId = pb.authStore.model.id;

        const user = await pb
          .collection("users")
          .getFirstListItem(`id="${userId}"`);

          console.log("user", user)

        setUserData(user as unknown as UserDataProps);
      } catch (error) {
        console.error("Error fetching user data:", error);
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
