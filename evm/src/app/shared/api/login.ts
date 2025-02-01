export const loginUser = async (email: string, password: string) => {
    try {
      const response = await fetch("https://localhost:7034/identity/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Wrong email or password");
      }
  
      const data = await response.json();
      console.log(data.data.token);
      if (!data.data.token) throw new Error("Token error!");
  
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  