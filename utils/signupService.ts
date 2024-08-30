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
  }>>
) {
    const isFirstnameValid = validateField(user.firstname);
    const isLastnameValid = validateField(user.lastname);
    const isEmailValid = validateField(user.email);
    const isPhoneValid = validateField(user.phone);
    const isPasswordValid = validatePassword(user.password)

    setError({
        firstname: isFirstnameValid ? "" : "field is required",
        lastname: isLastnameValid ? "" : "field is required",
        phone: isPhoneValid ? "" : "field is required",
        email: isEmailValid ? "" : "Email is required",
        password: isPasswordValid
          ? ""
          : "Password must be at least 6 character with at least 1 lowercase, 1 uppercase, 1 digit and 1 special case",
      });
}
