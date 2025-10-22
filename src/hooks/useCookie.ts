function useCookie(cookieName: string) {
  const cookies = document.cookie.split(";");

  console.log("cookies", cookies);

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    // Check if the cookie starts with the desired name
    if (cookie.startsWith(`${cookieName}=`)) {
      // Return the value of the cookie
      return cookie.substring(cookieName.length + 1);
    }
  }

  // If the cookie is not found, return null
  return null;
}

export default useCookie;
