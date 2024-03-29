import type { UserProps } from "@/types/UserProps";
import { useEffect, useState } from "react";
interface PopoverButtonProps {
  defaultCollectionName: string;
  saved: boolean;
  collections: {
    _id: string;
    name: string;
    images: { preview_url: string; file_url: string }[];
  }[];
  file_url: string;
  handleRemove: () => void;
  handleSave: () => void;
  setDefaultCollection: React.Dispatch<React.SetStateAction<null | {}>>;
  handleChangeDefaultCollection: ({
    id,
    name,
  }: {
    id: string;
    name: string;
  }) => void;
  defaultCollection: { id: string; name: string };
  user:UserProps
}
interface PopoverBodyProps {
  collections: {
    name: string;
    _id: string;
    images: { preview_url: string; file_url: string }[];
  }[];
  file_url: string;
  handleClose: () => void;
  handleRemove: (id: string) => void;
  handleSave: (id: string) => void;
  setDefaultCollection: React.Dispatch<React.SetStateAction<null | {}>>;
  handleChangeDefaultCollection: ({
    id,
    name,
  }: {
    id: string;
    name: string;
  }) => void;
}
function PopoverBody({
  collections,
  handleClose,
  file_url,
  handleSave,
  handleRemove,
  setDefaultCollection,
  handleChangeDefaultCollection,
}: PopoverBodyProps) {
  useEffect(() => {
    console.log(collections, "collections :D");
  }, []);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="absolute shadow-2xl bg-white top-[100%] left-[-60%] mx-auto w-72 rounded-xl p-2 flex flex-col justify-center mt-2 z-40 select-none overflow-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4 className="text-center">Guardar</h4>
        <p className="text-xs mt-3 mb-1 px-2">Guardar en tus colecciones</p>
        {collections.map((collection, i) => {
          return (
            <div
              key={i + "collectionBy" + collection._id}
              className="flex  w-full items-center justify-between gap-3 group hover:bg-neutral-200 p-2 rounded-md"
              onClick={() => {
                handleChangeDefaultCollection({
                  id: collection._id,
                  name: collection.name,
                });
                handleClose();
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-neutral-500 overflow-hidden ">
                  {collection.images.length > 0 && (
                    <img
                      className="w-full h-full object-cover"
                      src={collection.images[0].preview_url}
                      alt=""
                    />
                  )}
                </div>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap capitalize hover:underline">
                  {collection.name}
                </p>
              </div>
              {collection.images.length > 0 ? (
                collection.images.some((e) => e.file_url === file_url) ? (
                  <button
                    className="hidden group-hover:flex bg-neutral-900 px-4 py-2 rounded-full text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(collection._id);
                      handleChangeDefaultCollection({
                        id: collection._id,
                        name: collection.name,
                      });
                      handleClose();
                    }}
                  >
                    guardado
                  </button>
                ) : (
                  <button
                    className="hidden group-hover:flex bg-red-500 px-4 py-2 rounded-full text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSave(collection._id);
                      handleChangeDefaultCollection({
                        id: collection._id,
                        name: collection.name,
                      });
                      handleClose();
                    }}
                  >
                    guardar
                  </button>
                )
              ) : (
                <button
                  className="hidden group-hover:flex bg-red-500 px-4 py-2 rounded-full text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSave(collection._id);
                    handleChangeDefaultCollection({
                      id: collection._id,
                      name: collection.name,
                    });
                    handleClose();
                  }}
                >
                  guardar
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div
        className="fixed bg-rose-100/20  w-full h-screen left-0 top-0 z-30 "
        onClick={handleClose}
      ></div>
    </div>
  );
}
function PopoverButton({
  defaultCollectionName,
  defaultCollection,
  collections,
  file_url,
  handleRemove,
  handleSave,
  setDefaultCollection,
  handleChangeDefaultCollection,
  user
}: PopoverButtonProps) {
  const [active, setActive] = useState<boolean>(false);
  
  function handleActive() {
    setActive(true);
  }
  function handleClose() {
    setActive(false);
  }
  useEffect(() => {
    console.log("POPOVER RUNING", collections);
  }, [collections]);
  return (
    <div
      className="relative flex items-center rounded-full px-4 font-semibold cursor-pointer select-none"
      onClick={handleActive}
    >
      <label className="cursor-pointer capitalize">
        {defaultCollectionName}
      </label>
      <i className="cursor-pointer ml-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <g fill="none" fillRule="evenodd">
            <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
            <path
              fill="currentColor"
              d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"
            />
          </g>
        </svg>
      </i>
      <a href={`/${user.name}/${defaultCollectionName}/${defaultCollection.id}`} className="ml-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-external-link"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
          <path d="M11 13l9 -9" />
          <path d="M15 4h5v5" />
        </svg>
      </a>
      {active && (
        <PopoverBody
          setDefaultCollection={setDefaultCollection}
          handleChangeDefaultCollection={handleChangeDefaultCollection}
          handleRemove={handleRemove}
          handleSave={handleSave}
          collections={collections}
          handleClose={handleClose}
          file_url={file_url}
        />
      )}
    </div>
  );
}
export default PopoverButton;
