import { useState, useEffect } from "react";
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
      console.log(data);
      setData(data);
    }
    getCollection();
  }, []);
  return (
    <div>
      {data ? (
        <div>
          <h2 className="text-3xl">{data.name} collection</h2>
          {data.images.map((e, i) => {
            return (
              <div key={i + e.id}>
                <img src={e.preview_url} alt="" />
              </div>
            );
          })}
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
export default Collection;
