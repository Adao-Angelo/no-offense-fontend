"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { useToast } from "@/hooks/use-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { PublicationService } from "@/services";
import { PublicationType } from "@/types";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewPost() {
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { edgestore } = useEdgeStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handleProgress = (progress: number) => {
    setProgress(progress);
  };

  const handlePublish = async (file: File | null) => {
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

        toast({
          title: "Do you make a publication",
          description: "publication created",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error During Post",
        description: "Failed to post. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center pt-16">
      <CardContent className="sm:max-w-[425px] ">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Create Publication
          </CardTitle>
        </CardHeader>
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
          <div className="flex justify-between items-center mt-4"></div>

          <Textarea
            placeholder="Write a description for your publication..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />

          <Button
            onClick={() => {
              handlePublish(image);
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              "Publish"
            )}
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
