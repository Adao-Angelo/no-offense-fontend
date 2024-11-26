"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { PublicationService } from "@/services";
import { ResponsePublicationType } from "@/types";
import { Loader2 } from "lucide-react";

export default function Profile() {
  const [publications, setPublications] = useState<ResponsePublicationType[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRemoving, setLoadingRemoving] = useState(false);
  const { toast } = useToast();

  const getPublications = async () => {
    setIsLoading(true);

    try {
      const response: ResponsePublicationType[] =
        await PublicationService.fetchPublications();
      setIsLoading(false);
      setPublications(response);
    } catch {
      toast({
        variant: "destructive",
        title: "Error During Post",
        description: "Failed to post. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deletePublication = async (id?: string) => {
    setLoadingRemoving(true);
    try {
      await PublicationService.deletePublication(id);
      toast({
        variant: "default",
        title: "Deleted with success",
        description: "You remove your post.",
      });
      getPublications();
    } catch {
      toast({
        variant: "destructive",
        title: "Error During Post",
        description: "Failed to remove. Please try again.",
      });
    } finally {
      setLoadingRemoving(false);
    }
  };

  useEffect(() => {
    getPublications();
  }, []);

  return (
    <main className="pt-16 px-8">
      <h1 className="font-bold text-[42px] my-[20px]">Yours Publications</h1>
      <div className="grid grid-cols-3 gap-4">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </div>
        ) : (
          publications?.map((publication) => (
            <Card key={publication.publication.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{publication.user.name}</CardTitle>
                  {loadingRemoving ? (
                    <div className="flex justify-center items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        deletePublication(publication.publication.id);
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <img
                    src={`${publication.publication.imageUrl}`}
                    alt="Image description."
                  />
                </div>
                <CardDescription>
                  <p>{publication.publication.text}</p>
                </CardDescription>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}
