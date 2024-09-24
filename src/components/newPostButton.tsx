"use client";
import { useState } from "react";
import PublicationModal from "@/components/publicationModal";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";
import { useToast } from "@/hooks/use-toast";

export default function NewPostButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { edgestore } = useEdgeStore();

  const handlePublish = async (
    file: File | null,
    description: string,
    handleProgress: (progress: number) => void
  ) => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          handleProgress(Number(progress));
        },
      });
      console.log(res);
    }
  };

  return (
    <div>
      <Button
        className="flex gap-1"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
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
