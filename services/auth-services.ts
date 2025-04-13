import { ENDPOINTS } from "@/constants/endpoints";
import { SignUpData } from "@/interfaces/auth.interface";
import axios from "@/lib/axios";
import { buildUrl } from "@/utils/general-utils";

export const signUp = async (data: SignUpData) => {
  try {
    const response = await axios.post(buildUrl(ENDPOINTS.API.SIGN_UP), {
      email: data.email,
      password: data.password,
      name: data.name,
      surname: data.surname,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
