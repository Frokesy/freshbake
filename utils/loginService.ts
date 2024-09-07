import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { Bounce, toast } from "react-toastify";

export async function handleLogin(
    validateField: (value: string) => boolean,
    user: { input: string, password: string},
    setError: React.Dispatch<
    React.SetStateAction<{ input: string; password: string; }>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: ReturnType<typeof useNavigate>,
  keepLoggedIn: boolean
) {
    const isInputValid = validateField(user.input);
    const isPasswordValid = validateField(user.password);
    setLoading(true)
  
    setError({
      input: isInputValid ? "" : "Field is required",
      password: isPasswordValid ? "" : "Field is required",
    });

    if (isInputValid && isPasswordValid) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: user.input,
          password: user.password
        });
        if (error) {
          setLoading(false);
          throw error.message
        }
        toast.success(`Welcome back!!`, {
          position: "top-right",
          theme: "light",
          autoClose: 2000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          transition: Bounce,
        });
        if (keepLoggedIn) {
          localStorage.setItem("authToken", data.session.access_token);
        } else {
          sessionStorage.setItem("authToken", data.session.access_token);
        }
        setLoading(false);
        setTimeout(() => {
          navigate("/home");
        }, 2200);
      } catch (error) {
        toast.error(error as string, {
          position: "top-right",
          theme: "light",
          autoClose: 2000,
          hideProgressBar: true,
          draggable: true,
        });
        setLoading(false);
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