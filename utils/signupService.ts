import { Bounce, toast } from "react-toastify";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export async function handleSignup(
  validateField: (value: string) => boolean,
  user: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
  },
  validatePassword: (password: string) => boolean,
  setError: React.Dispatch<
    React.SetStateAction<{
      firstname: string;
      lastname: string;
      email: string;
      phone: string;
      password: string;
    }>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: ReturnType<typeof useNavigate>
) {
  const isFirstnameValid = validateField(user.firstname);
  const isLastnameValid = validateField(user.lastname);
  const isEmailValid = validateField(user.email);
  const isPhoneValid = validateField(user.phone);
  const isPasswordValid = validatePassword(user.password);

  setLoading(true);

  setError({
    firstname: isFirstnameValid ? "" : "field is required",
    lastname: isLastnameValid ? "" : "field is required",
    phone: isPhoneValid ? "" : "field is required",
    email: isEmailValid ? "" : "Email is required",
    password: isPasswordValid
      ? ""
      : "Password must be at least 6 characters with at least 1 lowercase, 1 uppercase, 1 digit, and 1 special case",
  });

  if (
    isFirstnameValid &&
    isLastnameValid &&
    isEmailValid &&
    isPhoneValid &&
    isPasswordValid
  ) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
      });
      if (error) {
        if (error.message === "User already registered") {
          setLoading(false)
          throw error.message;
        }
      }
      if (!error) {
        const id = data.user?.id;
        const { error: userError } = await supabase.from("users").insert([
          {
            userId: id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
          },
        ]);
        if (userError) {
          setLoading(false)
          throw userError.message;
        } else {
          toast.success(`Welcome ${user.firstname}!`, {
            position: "top-right",
            theme: "light",
            autoClose: 2500,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
            transition: Bounce
          });
          setLoading(false);
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        }
      }
    } catch (error) {
      setLoading(false)
      toast.error(error as string, {
        position: "top-right",
        theme: "light",
        autoClose: 2500,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce
      });
    }
  } else {
    setLoading(false);
    if (!isFirstnameValid) {
      setTimeout(() => {
        setError((prevState) => ({ ...prevState, firstname: "" }));
      }, 3000);
    }
    if (!isLastnameValid) {
      setTimeout(() => {
        setError((prevState) => ({ ...prevState, lastname: "" }));
      }, 3000);
    }
    if (!isPhoneValid) {
      setTimeout(() => {
        setError((prevState) => ({ ...prevState, phone: "" }));
      }, 3000);
    }
    if (!isEmailValid) {
      setTimeout(() => {
        setError((prevState) => ({ ...prevState, email: "" }));
      }, 3000);
    }
    if (!isPasswordValid) {
      setTimeout(() => {
        setError((prevState) => ({ ...prevState, password: "" }));
      }, 3000);
    }
  }
}
