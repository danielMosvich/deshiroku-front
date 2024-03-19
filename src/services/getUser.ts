import type { UserProps } from "@/types/UserProps";
// import type { ImagesProps } from "@/types/ImagesProps";

async function getUser(extension: string) {
  const res = await fetch(
    `http://localhost:3000/api/user/search/${extension}`,
    { credentials: "include" }
  );
  const data: { success: boolean; data: UserProps } = await res.json();
  //   console.log(data);
  return data;
}

export default getUser;
