"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },
        success: {
          duration: 3000,
          style: {
            background: "#22c55e",
            color: "#fff",
          },
        },
        error: {
          duration: 5000,
          style: {
            background: "#ef4444",
            color: "#fff",
          },
        },
      }}
    />
  );
}
