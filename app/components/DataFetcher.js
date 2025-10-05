"use client";

import { useEffect, useState } from "react";

export default function DataFetcher({path}) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${path}`)
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return <p>{message}</p>;
}
