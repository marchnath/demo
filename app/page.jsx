"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "555") {
      router.push("/admin");
    } else {
      setError("Неверный пароль");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center pb-40 justify-center">
      <h1 className="text-4xl font-bold mb-8">Вход</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-6">
        <Input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-lg p-4"
        />
        <Button type="submit" className="w-full text-lg p-4">
          Я Администратор
        </Button>
        {error && <p className="text-red-500 text-lg">{error}</p>}
      </form>
    </div>
  );
}
