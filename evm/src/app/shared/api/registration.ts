export const registrationUser = async (user: {
    userName: string;
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch("https://localhost:7034/identity/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });
  
      const jsonData = await response.json();
      const data = jsonData.data;
      
      if (!response.ok) {
        throw new Error(data?.message || "Registration failed");
      }
  
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
