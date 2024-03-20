import { useState, useEffect } from "react";
import Masonry from "react-layout-masonry"

function Collection({ id }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function getCollection() {
      const res = await fetch(
        `http://localhost:3000/api/user/collection/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      // console.log(data);
      setData(data);
    }
    getCollection();
  }, []);
  return (
    <div>
      {data ? (
        <div>
          <h2 className="text-3xl">{data.name} collection</h2>
          {data.images ? (
        <div className="lg:px-20 sm:px-10  px-5">
          <Masonry
            columns={{
              200: 1,
              400: 2,
              700: 3,
              1000: 4,
              1250: 5,
              1500: 6,
              1750: 7,
            }}
            gap={16}
          >
            {data.images.map((e, index) => {
              return (
                <a href={`/extensions/${e.extension}/${e.id}`} key={e.id} className="">
                  <img
                    className="w-full rounded-xl max-h-[500px] object-cover"
                    src={e.preview_url}
                    alt={e.owner + "image"}
                    loading="lazy"
                  />
                  <div className="flex gap-1 items-center mt-2">
                    <div className="rounded-full bg-neutral-200 w-8 h-8 grid place-content-center">
                      <p className="uppercase font-semibold">
                        {e.owner.split("")[0]}
                        {index}
                      </p>
                    </div>
                    <h2>{e.owner}</h2>
                  </div>
                </a>
              );
            })}
          </Masonry>
        </div>
      ) : (
        <div>loading</div>
      )}
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
export default Collection;
