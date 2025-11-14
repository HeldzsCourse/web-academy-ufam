"use client";

import { useRouter } from "next/navigation";

const Exemplo = () => {
  const router = useRouter();

  router.prefetch("/carrinho");
};

export default Exemplo;
