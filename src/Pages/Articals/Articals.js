import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../Components/SideBar/Header";

export default function Artical() {
  const [articals, setArticals] = useState([]);

  const handleDelete = async (id) => {
    await axios
      .delete(`https://icom-agency.com/api/articles/${id}`)
      .then(() => {
        setArticals(articals.filter((el) => el.id !== id));
      });
  };

  useEffect(() => {
    fetch("https://icom-agency.com/api/articles")
      .then((res) => res.json())
      .then((data) => setArticals(data));
  }, []);
  const articalsShow = articals.map((item) => (
    <div className="mt-2">
      <h3>{item.title}</h3>
      <h5>{item.summary}</h5>
      <Link to={`/aritcal/${item.id}`}>
        <button type="button" class="btn btn-secondary m-2">
          تعديل المقالة
        </button>
      </Link>
      <button
        type="button"
        class="btn btn-primary"
        onClick={() => handleDelete(item.id)}
      >
        حذف المقالة
      </button>
    </div>
  ));
  return (
    <div className="App">
      <Header />
      <div className="container mt-5" dir="rtl">
        {articalsShow}
      </div>
    </div>
  );
}
