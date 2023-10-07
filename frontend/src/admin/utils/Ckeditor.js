import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import RichText from "ckeditor5-custom-build/build/ckeditor";

const CKeditor = ({
  onFormik = false,
  name,
  setText,
  text,
  disabled = false,
  small,
}) => {
  return (
    <div className={`ckEditor ${small && "sm"} ${disabled && "disabled"}`}>
      <CKEditor
        editor={RichText}
        data={text}
        disabled={disabled}
        onChange={(event, editor) => {
          const data = editor.getData();

          onFormik ? setText(name, data) : setText(data);
        }}
      />
    </div>
  );
};

export default CKeditor;
