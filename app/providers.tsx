"use client";

import { useEffect } from "react";

export function JsClassProvider() {
  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);

  return null;
}