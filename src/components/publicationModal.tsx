"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface PublicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (image: File | null, description: string) => void;
}

export default function PublicationModal({
  isOpen,
  onClose,
  onPublish,
}: PublicationModalProps) {
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handlePublish = () => {
    onPublish(image, description);
    setImage(null);
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            Create Publication
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
              isDragActive ? "border-primary" : "border-gray-300"
            }`}
          >
            <Input {...getInputProps()} />
            {image ? (
              <div className="relative h-48 w-full">
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            ) : (
              <div className="text-muted-foreground">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p>Drag and drop an image here, or click to select a file</p>
              </div>
            )}
          </div>
          <Textarea
            placeholder="Write a description for your publication..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
          <Button onClick={handlePublish}>Publish</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}