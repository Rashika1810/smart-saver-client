import api from "./axios";

/**
 * Upload PhonePe Statement
 */
export const uploadPhonePeStatement = async (file) => {
  const formData = new FormData();

  formData.append("statement", file);

  const { data } = await api.post(
    "/import/phonepe",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};