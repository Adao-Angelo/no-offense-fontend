"use client";
import { useState } from "react";
import PublicationModal from "@/components/publicationModal";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

export default function NewPostButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePublish = (image: File | null, description: string) => {};

  return (
    <div>
      <Button className="flex gap-1" onClick={() => setIsModalOpen(true)}>
        <CirclePlus />
        <p>News post</p>
      </Button>
      <PublicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPublish={handlePublish}
      />
    </div>
  );
}
