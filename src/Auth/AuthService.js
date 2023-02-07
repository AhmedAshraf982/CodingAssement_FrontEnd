export const authSession = (user, token) => {
  if (token) {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user);
};
