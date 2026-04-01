"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HeartIcon, MessageCircleIcon } from "@/components/ui/icons";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export function Instagram() {
  const [mediaItems, setMediaItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_INSTAGRAM_API || ""
        );

        if (response.data && Array.isArray(response.data.data)) {
          setMediaItems(response.data.data);
        } else {
          console.error(
            "Dados não encontrados ou formato incorreto:",
            response.data
          );
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-12">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12 md:w-16 md:h-16">
            <AvatarFallback>
              <Image src={"/logo-senamun.png"} alt="SN" width={64} height={64} />
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="text-lg font-semibold">@senamun_</div>
            <div className="text-sm text-muted-foreground">SenaMUN</div>
          </div>
        </div>
        <Link href="https://www.instagram.com/senamun_/" passHref>
          <Button rel="noopener noreferrer" variant="outline">
            Seguir
          </Button>
        </Link>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mediaItems.map((item: any) => (
          <Link
            key={item.id}
            href={item.permalink}
            prefetch={false}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden rounded-lg"
          >
            {item.media_type === "CAROUSEL_ALBUM" && item.children?.data ? (
              <Image
                src={item.children.data[0]?.media_url}
                alt={item.children.data[0]?.caption || "Imagem do carrossel"}
                width={500}
                height={500}
                className="object-cover w-full aspect-square"
              />
            ) : item.media_type === "IMAGE" ? (
              <Image
                src={item.media_url}
                alt={item.caption || "Imagem"}
                width={500}
                height={500}
                className="object-cover w-full aspect-square"
              />
            ) : item.media_type === "VIDEO" ? (
              <video
                controls
                width={500}
                height={500}
                className="object-cover w-full aspect-square"
              >
                <source src={item.media_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p className="p-4 text-center text-gray-700">
                Tipo de mídia desconhecido
              </p>
            )}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4 text-sm text-white">
                <div className="flex items-center gap-1">
                  <HeartIcon className="w-4 h-4 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircleIcon className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
