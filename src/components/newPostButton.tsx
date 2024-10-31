"use client";

import { useState } from "react";
import PublicationModal from "@/components/publicationModal";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";
import { PublicationType } from "@/types";
import { PublicationService } from "@/services";
import { useToast } from "@/hooks/use-toast";

export default function NewPostButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { edgestore } = useEdgeStore();
  const [isLoading, setIsLoading] = useState(false);
  const [postUrl, setPostUrl] = useState<string>();
  const { toast } = useToast();

  const handlePublish = async (
    file: File | null,
    description: string,
    handleProgress: (progress: number) => void
  ) => {
    setIsLoading(true);
    try {
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            handleProgress(Number(progress));
          },
        });

        const publication: PublicationType = {
          imageUrl: res.url,
          text: description,
        };

        await PublicationService.createPublication(publication);

        setIsModalOpen(false);
        setIsLoading(false);

        toast({
          title: "Do you make a post",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      } else {
        const publication: PublicationType = {
          imageUrl: "",
          text: description,
        };

        await PublicationService.createPublication(publication);

        setIsModalOpen(false);
        setIsLoading(false);

        toast({
          title: "Do you make a post",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error During Post",
        description: "Failed to post. Please try again.",
      });
      setIsLoading(false);
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
        <p className="hidden sm:block">New post</p>{" "}
      </Button>
      <PublicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPublish={handlePublish}
        isLoading={isLoading}
      />
    </div>
  );
}
