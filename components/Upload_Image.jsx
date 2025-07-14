"use client";
import React from "react";

const UploadImage = ({ onChange, id }) => (
  <input
    type="file"
    id={id}
    accept="image/*"
    style={{ display: "none" }}
    onChange={onChange}
  />
);

export default UploadImage;