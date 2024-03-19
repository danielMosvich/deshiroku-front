import getImages from "@/services/getImages";
import { useState, useEffect } from "react";
import Masonry from "react-layout-masonry";
// import { Masonro } from "./Masonry";
// import Macy from "macy"
// import type { ImagesProps } from "@/types/ImagesProps";
// interface ExtensionProps {
//   data: {
//     success: boolean;
//     data: ImagesProps[];
//   };
// }

function Extension({ data: dataByAstro, extension }) {
  const [loadClient, setClientLoad] = useState(false);
  const [loadImages, setLoadImages] = useState(false);
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  async function GetImages(page) {
    getImages(extension, page).then((res) => {
      // console.log(res);
      if (page === 1) {
        if (res.success) {
          setData(res.data);
        }
      } else {
        setData((prevData) => [...prevData, ...res.data]);
      }
    });
  }
  useEffect(() => {
    if (extension) {
      setClientLoad(true);
      GetImages(page);
    }
  }, []);

  useEffect(() => {
    if (data) {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - scrollHeight / 4) {
          setIsLoadingMore(true);
        }
      };
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  useEffect(() => {
    if (data && isLoadingMore) {
      console.log(page + 1, "CARGAR MAS");
      GetImages(page + 1);
      setPage(page + 1);
      setTimeout(() => {
        setIsLoadingMore(false);
      }, 1000);
    }
  }, [isLoadingMore]);
  return (
    <div className="">
      {loadClient ? (
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
            {data.map((e, index) => {
              return (
                <a href={`/extensions/${extension}/${e.id}`} key={e.id} className="">
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

      {/* <div className="container">
        {data.map((e) =>
          e.type_file === "webm" ? (
            <video
              key={e.id}
              className="w-full mb-3 object-cover rounded-xl item"
              src={e.file_url}
              autoplay
              muted
            />
          ) : (
            <div
              key={e.id}
              className="w-full mb-8 item"
              // style={`height: :${e.height};`}
            >
              <img
                loading="lazy"
                className="w-full object-cover rounded-xl shadow-lg item"
                src={e.preview_url}
              />
              <div className="flex items-center gap-2 mt-3">
                <div className="rounded-full bg-neutral-200 shadow-xl w-8 max-w-8 h-8 max-h-8 place-content-center grid font-semibold uppercase">
                  {() => {
                    return e.owner.split("")[0];
                  }}
                </div>
                <h2 className="">{e.owner}</h2>
              </div>
            </div>
          )
        )}
      </div> */}
    </div>
  );
}
export default Extension;
{
  /* <script src="https://cdn.jsdelivr.net/npm/macy@2" is:inline></script>
<script
  src="https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js"
  is:inline></script>
<script is:inline>
  imagesLoaded(document.querySelector(".container"), () => {
    let macy = Macy({
      container: `.container`,
      trueOrder: false,
      waitForImages: true,
      margin: {
        x: 15,
        y: 15,
      },
      columns: 7,
      breakAt: {
        1600: 6,
        1300: 5,
        1000: 4,
        800: 3,
        500: 2,
        300: 1,
      },
    });
    macyInstance.runOnImageLoad(function () {
      console.log("Every time an image loads I get fired");
      macyInstance.recalculate(true);
    }, true);
  });
</script> */
}
