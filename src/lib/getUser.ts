import { GET } from "@api/infoUsuario";
export const getUserLogged = async (Astro: any) => {
  let response = await GET(Astro);
  let data: { username: string | null } = { username: null };
  if (response.ok) {
    return data = await response.json();
  }
    return "Error fetching user data";
};
