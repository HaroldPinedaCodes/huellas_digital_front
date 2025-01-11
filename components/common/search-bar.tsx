"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({ placeholder = "Buscar..." }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const params = new URLSearchParams(searchParams);
    params.set("q", query.trim());
    router.push(`/productos?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pr-10"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full"
      >
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
}
