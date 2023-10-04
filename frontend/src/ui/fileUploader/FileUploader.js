import React from "react";
import "./fileUploader.scss";

const FileUploader = ({
  text = "",
  getFile,
  getPreviewIMG,
  centered = false,
  outlineBtn = false,
  noBtn = false,
}) => {
  const random_num = Math.random() * 100;
  const forID = `chooseFile-${random_num}`;

  function handleOnChange(e) {
    getFile(e.target.files[0]);
    getPreviewIMG(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="fileUploader">
      <input id={forID} type="file" onChange={handleOnChange} />
      <label
        className={`fileUploader__text ${outlineBtn && "outline-btn"} ${
          noBtn && "none-btn"
        }`}
        htmlFor={forID}
        style={{ margin: centered ? "0 auto" : "" }}
      >
        {text}
      </label>
    </div>
  );
};

export default FileUploader;
