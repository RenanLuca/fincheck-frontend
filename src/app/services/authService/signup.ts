import { httpClient } from "../httpClient";

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  accessToken: string;
}

export async function signup({
  name,
  email,
  password,
}: RegisterParams) {
  const { data } = await httpClient.post<RegisterResponse>(
    "/auth/signup",
    {
      name,
      email,
      password,
    },
  );

  return data;
}
