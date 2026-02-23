"use client";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3333/logout", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Erro ao deslogar");
      }
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <div>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
