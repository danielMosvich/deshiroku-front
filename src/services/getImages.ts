import type { ImagesProps } from "../types/ImagesProps";

async function getImages(extension:string, page:number) {
  const res = await fetch(`http://localhost:3000/api/deshiroku/${extension}/${String(page)}`);
  const data:{success:boolean, data:ImagesProps[]} = await res.json();
  return data
}

export default getImages
