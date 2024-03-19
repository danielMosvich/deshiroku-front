import { useEffect, useState } from "react";

function PostById({ data }) {
  // const [user, setUser] = useState(null);
  // const [collectionSelect, setCollectionSelect] = useState("");
  const [defaultCollection, setDefaultCollection] = useState(null);
  const [saved, setSaved] = useState(undefined);
  async function handleSave() {
    if (document.cookie) {
      console.log("OBJET SAVED: " + data, "IN :" + defaultCollection.name);
      // console.log(collectionSelect);
      const resp = await fetch("http://localhost:3000/api/user/collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: defaultCollection.id, image: data }),
      });
      const response = await resp.json();
      // console.log(response);
      if (response.success) {
        async function getProfile() {
          const res = await fetch("http://localhost:3000/api/user/profile", {
            method: "GET",
            credentials: "include",
          });
          const data = await res.json();
          localStorage.setItem("user", JSON.stringify(data.data));
        }
        getProfile();
        setSaved(true);
      } else {
        alert(response.message);
      }
    }
  }
  useEffect(() => {
    // ! ESTO VERIFICA SI ES QUE EXISTE UNA COLLECTION POR DEFECTO DONDE GUARDAR LAS IMAGENES.
    const localStorageDefaultCollection =
      localStorage.getItem("defaultCollection");
    const parsedLocalStorageDefaultCollection = JSON.parse(
      localStorageDefaultCollection
    );
    parsedLocalStorageDefaultCollection &&
      setDefaultCollection(parsedLocalStorageDefaultCollection);

    const localStorageUser = localStorage.getItem("user");
    const parsedLocalStorageUser = JSON.parse(localStorageUser);
    if (parsedLocalStorageUser) {
      console.log("SOME");
      const index = parsedLocalStorageUser.collections.findIndex(
        (e) => e._id === parsedLocalStorageDefaultCollection.id
      );
      if (index !== -1) {
        const match = parsedLocalStorageUser.collections[index].images.some(
          (e) => e.file_url === data.file_url
        );
        setSaved(match);
        console.log("SE ESTABLECE :", match);
      } else {
        console.log("SE ESTABLECE NO GUARDADo");
        setSaved(false);
      }
    }
  }, []);
  //   useEffect(() => {
  //     const localStorageUser = localStorage.getItem("user");
  //     if (localStorageUser) {
  //       try {
  //         const localUser = JSON.parse(localStorageUser);
  //         console.log(localUser)
  //         if(localUser.collections){
  //           // console.log("CAN READ COLLECTIONS")
  //           const collections = localUser.collections
  //           const indexCompareCollection = collections.findIndex(e => e._id === )
  //         }
  //         // if (localUser && localUser.collections) {
  //         //   const indexMatch = localUser.collections.findIndex(
  //         //     (e) => e._id === defaultCollection.id
  //         //   );
  //         //   if (indexMatch !== -1 && localUser.collections[indexMatch].images) {
  //         //     const match = localUser.collections[indexMatch].images.some(
  //         //       (e) => e.file_url === data.file_url
  //         //     );
  //         //     setSaved(match);
  //         //     console.log(match);
  //         //   }
  //         // }
  //       } catch (error) {
  //         console.error("Error al parsear los datos del usuario en localStorage:", error);
  //       }
  //     }
  // }, []);

  return (
    <div className="pt-4">
      <div className="bg-white shadow-2xl max-w-6xl mx-auto rounded-3xl overflow-hidden flex p-5">
        {(data && data.type_file === "webm") ||
        (data && data.type_file === "mp4") ? (
          <div className="w-1/2 relative">
            <a
              href={data?.file_url}
              target="_blank"
              className="absolute bottom-5 left-5 z-10 bg-neutral-50 text-2xl px-4 py-3 rounded-full capitalize"
            >
              original image
            </a>
            <video
              src={data.file_url}
              muted
              controls
              className="w-full rounded-3xl"
            />
          </div>
        ) : (
          <div className="w-1/2 relative h-fit">
            <a
              href={data?.file_url}
              target="_blank"
              className="absolute flex gap-2 items-center bottom-5 left-5 z-10 bg-neutral-50 text-lg px-4 py-2 rounded-full capitalize"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m21 15.344l-2.121 2.121l-3.172-3.172l-1.414 1.414l3.172 3.172L15.344 21H21zM3 8.656l2.121-2.121l3.172 3.172l1.414-1.414l-3.172-3.172L8.656 3H3zM21 3h-5.656l2.121 2.121l-3.172 3.172l1.414 1.414l3.172-3.172L21 8.656zM3 21h5.656l-2.121-2.121l3.172-3.172l-1.414-1.414l-3.172 3.172L3 15.344z"
                />
              </svg>
              <p className="font-semibold">original image</p>
            </a>
            <img src={data?.file_url} className="w-full rounded-3xl" />
          </div>
        )}
        <div className="p-5 w-1/2">
          <div className="flex gap-3 justify-end">
            <button className="bg-white px-4 py-3 rounded-full capitalize text-black shadow-lg font-semibold">
              descargar
            </button>
            {defaultCollection && <button>{defaultCollection.name}</button>}
            {saved === undefined ? (
              <button className="px-4 rounded-full ">load</button>
            ) : saved ? (
              <button className="px-4 rounded-full text-white bg-neutral-900">guardado</button>
            ) : (
              <button className="px-4 rounded-full text-white bg-red-500" onClick={handleSave}>
                guardar
              </button>
            )}
          </div>
          <div>
            <div className="flex items-center gap-3 mt-5">
              <div className="bg-rose-400 w-12 h-12 rounded-full grid place-content-center uppercase font-semibold text-white">
                {data?.owner.split("")[0]}
              </div>
              <p className="font-semibold">{data?.owner}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              {data?.tags.split(" ").map((e, i) => (
                <a
                  key={i + e}
                  className="items-center justify-center px-3 py-1 text-sm text-rose-900 bg-rose-100 rounded-full cursor-pointer backdrop-blur-3xl ring-1 ring-rose-300"
                >
                  {e}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostById;
