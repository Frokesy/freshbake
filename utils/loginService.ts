import { supabase } from "./supabaseClient";

export async function handleLogin(
    validateField: (value: string) => boolean,
    user: { input: string, password: string},
    setError: React.Dispatch<
    React.SetStateAction<{ input: string; password: string; }>
  >,
) {
    const isInputValid = validateField(user.input);
    const isPasswordValid = validateField(user.password);
  
    setError({
      input: isInputValid ? "" : "Field is required",
      password: isPasswordValid ? "" : "Password must be at least 6 characters",
    });
  console.log(supabase)
}