
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("accessToken");
  return !!token; 
};


export const getUserRole = (): string | null => {
  return localStorage.getItem("userRole");
};


export const logout = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userRole");

};


export const setAuthData = (token: string, role: string): void => {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("userRole", role);
};
