export default function getLoginErrorMessage(error: string) {
  if (error.includes("Unable to login")) {
    return "Invalid email or password.";
  }
  return "An error occurred.";
}
