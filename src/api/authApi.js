import api from "./axios";

/**
 * Get Logged-in User
 */
export const getProfile = async () => {
  const { data } = await api.get("/auth/profile");
  return data;
};

/**
 * Update Opening Balance
 */
export const updateOpeningBalance = async (openingBalance) => {
  const { data } = await api.patch("/auth/opening-balance", {
    openingBalance,
  });

  return data;
};