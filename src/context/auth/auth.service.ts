interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  signup: async (userData: SignupData) => {
    const response = await fetch(
      `${import.meta.env.VITE_MONGODB_URL}/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return data;
  },

  verify: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_MONGODB_URL}/users/verify`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Verification failed");
    }

    return data;
  },

  login: async (credentials: LoginData) => {
    const response = await fetch(
      `${import.meta.env.VITE_MONGODB_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  },

  logout: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_MONGODB_URL}/users/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Logout failed");
    }
  },
};
