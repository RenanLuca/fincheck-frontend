import { httpClient } from "../httpClient";

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export async function signin({ email, password }: LoginParams) {
  const { data } = await httpClient.post<LoginResponse>("/auth/signin", {
    email,
    password,
  });

  return data;
}
