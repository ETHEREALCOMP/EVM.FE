export const loginUser = async (email: string, password: string) => {
    try {
      const response = await fetch("https://localhost:7034/identity/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Incorrect email or password");
      }
      
      const jsonData = await response.json();
      const data = jsonData.data;
      console.log(data);

      if (!data.token) throw new Error("Token error!");
  
      return data;
    } catch (error) {
      console.error(error);
      throw error; 
  }
};