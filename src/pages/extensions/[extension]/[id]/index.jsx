import { useEffect, useState } from "react";
import PopoverButton from "@/components/popoverButton";
function PostById({ data }) {
  const [defaultCollection, setDefaultCollection] = useState(null);
  const [changeDefaultCollection, setChangeDefaultCollection] = useState(null);
  const [collections, setCollections] = useState(null);
  const [saved, setSaved] = useState(undefined);
  // const [userData, setUserData] = useState(undefined)
  async function handleSave(id) {
    console.log("SAVE");
    if (document.cookie) {
      console.log("FETCH");
      const resp = await fetch("http://localhost:3000/api/user/collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: id, image: data }),
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
          setCollections(data.data.collections);
          // setUserData(data.data)
          console.log("SE ACTUALIZO EL LOCAL STORAGE DE USER");
          // console.log(data.data)
        }
        getProfile();
        setSaved(true);
      } else {
        alert(response.message);
      }
    }
  }
  async function handleRemove(id) {
    if (document.cookie) {
      const fileUrl = data.file_url;
      const resp = await fetch("http://localhost:3000/api/user/collection", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id_collection: id,
          url: fileUrl,
        }),
      });
      const response = await resp.json();
      if (response.success) {
        async function getProfile() {
          const res = await fetch("http://localhost:3000/api/user/profile", {
            method: "GET",
            credentials: "include",
          });
          const data = await res.json();
          localStorage.setItem("user", JSON.stringify(data.data));
          setCollections(data.data.collections);
          console.log(data.data.collections);
        }
        getProfile();
        setSaved(false);
      } else {
        alert(response.message);
      }
    }
  }
  async function handleChangeDefaultCollection(obj) {
    setDefaultCollection(obj);
    setChangeDefaultCollection(obj);
    localStorage.setItem("defaultCollection", JSON.stringify(obj));
    
  }

  useEffect(() => {
    console.log(data);
    // ! ESTO VERIFICA SI ES QUE EXISTE UNA COLLECTION POR DEFECTO DONDE GUARDAR LAS IMAGENES.
    const localStorageDefaultCollection =
      localStorage.getItem("defaultCollection");
    const parsedLocalStorageDefaultCollection = JSON.parse(
      localStorageDefaultCollection
    );
    parsedLocalStorageDefaultCollection &&
      setDefaultCollection(parsedLocalStorageDefaultCollection);

    const localStorageUser = localStorage.getItem("user");
    // console.log(localStorageUser)
    // !VERIFICA SI ES QUE LA IMAGEN YA EXISTE EN LA COLECCION DEFAULT O SELECIONADA.
    if (localStorageUser) {
      const parsedLocalStorageUser = JSON.parse(localStorageUser);
      if (parsedLocalStorageUser) {
        // console.log("SOME");
        // setUserData(parsedLocalStorageUser)
        setCollections(parsedLocalStorageUser.collections);
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
    }
  }, [changeDefaultCollection]);

  return (
    <div className="pt-4">
      <div className="bg-white shadow-2xl max-w-6xl mx-auto rounded-3xl overflow-hidden flex p-0">
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
              className="w-full rounded-l-3xl"
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
            <img src={data?.file_url} className="w-full rounded-l-3xl" />
          </div>
        )}
        <div className="p-10 w-1/2 ">
          <div className="flex gap-1 justify-end">
            {data.source && (
              <a
                href={data.source}
                target="_blank"
                className=" p-2 grid place-content-center w-10 h-10 hover:bg-neutral-200  rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"
                  />
                </svg>
              </a>
            )}
            {data.file_url && (
              <a
                className="hover:bg-neutral-300 p-2 grid place-content-center w-10 h-10 rounded-full capitalize text-black font-semibold"
                target="_blank"
                href={data.file_url}
                download
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
                  />
                </svg>
              </a>
            )}
            {/* THIS IS A TOOLTIP :D */}
            {defaultCollection && collections && (
              <PopoverButton
                defaultCollectionName={defaultCollection.name}
                collections={collections}
                file_url={data.file_url}
                handleRemove={handleRemove}
                handleSave={handleSave}
                setDefaultCollection={setDefaultCollection}
                handleChangeDefaultCollection={handleChangeDefaultCollection}
              />
            )}
            {/* {defaultCollection && collections && <button>{defaultCollection.name}</button>} */}
            {saved === undefined ? (
              <button className="px-4 rounded-full text-white">loading</button>
            ) : saved ? (
              <button
                className="px-4 py-3 capitalize rounded-full text-white font-semibold bg-neutral-900"
                onClick={() => handleRemove(defaultCollection.id)}
              >
                guardado
              </button>
            ) : (
              <button
                className="px-4 py-3 capitalize rounded-full text-white font-semibold bg-red-500"
                onClick={() => handleSave(defaultCollection.id)}
              >
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
        {/* {data.source && data.source} */}
      </div>
    </div>
  );
}
export default PostById;
