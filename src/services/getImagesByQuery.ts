import type { ImagesProps } from "../types/ImagesProps";

async function getImagesByQuery(
  extension: string,
  query: string,
  page: number
) {
  const res = await fetch(
    `http://localhost:3000/api/deshiroku/${extension}/search/${String(
      query
    )}/${page}`
  );
  const data: { success: boolean; data: ImagesProps[] } = await res.json();
  return data;
}

export default getImagesByQuery;
