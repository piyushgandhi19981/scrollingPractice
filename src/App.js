import { useEffect, useState } from "react";
import "./styles.css";

async function fetchData(page) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
  );
  const data = await res.json();
  return data;
}

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchDataAction = () => {
    setTimeout(async () => {
      const updatedData = await fetchData(page);
      setData([...data, ...updatedData]);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchDataAction();
  }, [page]);

  const handleScroll = (e) => {
    const target = e?.target;
    if (
      !loading &&
      target?.clientHeight + target.scrollTop >= target.scrollHeight
    ) {
      setLoading(true);
      setPage(page + 1);
    }
  };

  return (
    <div style={{ height: "150px", overflow: "auto" }} onScroll={handleScroll}>
      {data.map(({ title }, index) => (
        <div key={index}>{title}</div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
}
