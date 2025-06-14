export default function getSignupErrorMessage(error: string) {
  if (error.includes("E11000 duplicate key error")) {
    return "Email already in use.";
  }
  return "An error occurred.";
}
