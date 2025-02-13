import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { pb } from "./pocketbaseClient";

export async function handleLogin(
  validateField: (value: string) => boolean,
  user: { input: string; password: string },
  setError: React.Dispatch<
    React.SetStateAction<{ input: string; password: string }>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: ReturnType<typeof useNavigate>,
  keepLoggedIn: boolean
) {
  const isInputValid = validateField(user.input);
  const isPasswordValid = validateField(user.password);
  setLoading(true);

  setError({
    input: isInputValid ? "" : "Field is required",
    password: isPasswordValid ? "" : "Field is required",
  });

  if (isInputValid && isPasswordValid) {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(user.input, user.password);
      if (authData) {
        toast.success(`Welcome back!`, {
          position: "top-right",
          theme: "light",
          autoClose: 2000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          transition: Bounce,
        });
        const authCookie = pb.authStore.exportToCookie();
        if (keepLoggedIn) {
          localStorage.setItem("authToken", authCookie);
        } else {
          sessionStorage.setItem("authToken", authCookie);
        }
        setLoading(false);
        setTimeout(() => {
          navigate("/home");
        }, 2200);
      }
    } catch (error) {
      toast.error("Invalid login credentials", {
        position: "top-right",
        theme: "light",
        autoClose: 2000,
        hideProgressBar: true,
        draggable: true,
      });
      setLoading(false);
      console.error(error);
    }
  } else {
    setLoading(false);
    if (!isInputValid) {
      setTimeout(() => {
        setError((prevState) => ({ ...prevState, input: "" }));
      }, 3000);
    }
    if (!isPasswordValid) {
      setTimeout(() => {
        setError((prevState) => ({ ...prevState, password: "" }));
      }, 3000);
    }
  }
}
