import React from "react";
import { headers } from "next/headers";

const page = () => {
  const heads = headers();
  const pathname = heads.get("next-url");

  console.log("fullUrl asfsadf", pathname);
  return <div>page test</div>;
};

export default page;
