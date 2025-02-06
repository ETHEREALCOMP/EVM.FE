export const validatePassword = (password: string): string | null => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    
    if (!passwordRegex.test(password)) {
      return "Password must contain at least one letter, one number, one special character, and be at least 6 characters long.";
    }
    return null;
  };
  