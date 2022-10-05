import { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";

import Header from "../../Components/SideBar/Header";

// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
  imageUploader: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", file);

        fetch(
          "https://api.imgbb.com/1/upload?key=c96efe63604b6a9fc83d311a11f6088d",
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((result) => {
            resolve(result.data.url);
          })
          .catch((error) => {
            reject("Upload failed");
            console.error("Error:", error);
          });
      });
    },
  },
};

export default function NewArtical() {
  // #2 register module
  Quill.register("modules/imageUploader", ImageUploader);
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [summary, setsummary] = useState("");
  const [image, setimage] = useState();
  const [sources, setsources] = useState("");

  const id = Number(window.location.pathname.split("/").slice(-1)[0]);

  useEffect(() => {
    fetch(`https://icom-agency.com/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data[0].title);
        setdescription(data[0].description);
        setsummary(data[0].summary);
        setimage(data[0].image);
        setsources(data[0].sources);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("summary", summary);
    formData.append("image", image);
    formData.append("sources", sources);

    axios
      .post(`https://icom-agency.com/api/articles/update/${id}`, formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <Header />
      <div className="container row" dir="rtl">
        <form className="col-md-6" onSubmit={handleSubmit}>
          <label htmlFor="name" className="labels">
            عنوان المقالة
          </label>
          <input
            type="text"
            placeholder="ادخل عنوان المقالة"
            onChange={(e) => setTitle(e.target.value)}
            name="name"
            id="name"
            value={title}
            required
          />

          <label htmlFor="summary" className="labels">
            موجز المقالة
          </label>
          <input
            type="text"
            placeholder="ادخل موجز المقالة"
            onChange={(e) => setsummary(e.target.value)}
            name="summary"
            id="summary"
            value={summary}
            required
          />
          <label htmlFor="file" className="labels">
            صورة المقالة
          </label>
          <input
            type="file"
            id="file"
            multiple
            onChange={(e) => setimage(e.target.files.item(0))}
          />
          <label htmlFor="sources" className="labels">
            المصادر
          </label>
          <textarea
            type="text"
            placeholder="ref"
            onChange={(e) => setsources(e.target.value)}
            name="sources"
            id="sources"
            value={sources}
            required
            rows={5}
            dir="ltr"
          />

          <div className="mt-3">
            <ReactQuill
              theme="snow"
              modules={modules}
              placeholder="Content goes here..."
              onChange={setdescription}
              value={description}
            />
          </div>
          <button type="submit">تعديل</button>
        </form>
      </div>
    </div>
  );
}
