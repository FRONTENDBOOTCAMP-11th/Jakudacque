import useAxiosInstance from "@hooks/useAxiosInstance";
import { useRef, useState, useCallback } from "react";
import ReactQuill from "react-quill-new";
import { produce } from "immer";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types";

QuillEditor.propTypes = {
  content: PropTypes.string.isRequired,
  setProduct: PropTypes.func.isRequired,
};

export default function QuillEditor({ content, setProduct }) {
  // const [content, setContent] = useState("");
  const [preview, setPreview] = useState("");
  const quillInstance = useRef(null);
  const axios = useAxiosInstance();

  const imageHandler = useCallback(async () => {
    try {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("attach", file);
        console.log(file);
        console.log(formData);

        const response = await axios("/files", {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });

        const data = await response.data.item[0];

        if (!quillInstance.current) return;

        const range = quillInstance.current.getEditorSelection();
        quillInstance.current
          .getEditor()
          .insertEmbed(
            range?.index || 0,
            "image",
            "https://11.fesp.shop" + data.path,
          );
      };
    } catch (error) {
      console.error("Image handler failed:", error);
    }
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["image"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  const handleChange = value => {
    setProduct(prev =>
      produce(prev, draft => {
        draft.content = value;
      }),
    );
    setPreview(value);
  };

  return (
    <>
      <div className="col-span-6 mb-4 editor-container">
        <h3 className="mb-2 text-lg font-bold">Edit</h3>
        <ReactQuill
          ref={el => {
            quillInstance.current = el;
          }}
          value={content}
          onChange={handleChange}
          modules={modules}
          theme="snow"
          preserveWhitespace
          style={{ width: "100%", height: "600px" }}
        />
      </div>

      <div className="col-span-6 preview-container">
        <h3 className="mb-2 text-lg font-bold">Preview</h3>
        <div
          className="p-4 preview-content"
          dangerouslySetInnerHTML={{ __html: preview }}
        ></div>
      </div>
    </>
  );
}
