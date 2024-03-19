import type { ImagesProps } from "../types/ImagesProps";

async function getPostById(
  extension: string | undefined,
  id: string | undefined
) {
  if (extension && id) {
    const res = await fetch(
      `http://localhost:3000/api/deshiroku/${extension}/post/${id}`
    );
    const data: { success: boolean; data: ImagesProps } = await res.json();
    return data;
  }
}

export default getPostById;
