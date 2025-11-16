"use client";
import React from "react";
import FavoritedProducts from "../components/FavoritedProducts/FavoritedProducts";

export default function Favoritos() {
  return (
    <main>
      <div className="container p-5">
        <FavoritedProducts />
      </div>
    </main>
  );
}
