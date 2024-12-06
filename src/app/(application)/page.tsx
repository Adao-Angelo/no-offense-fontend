"use client";

import PublicationCard from "@/components/socialMediaCard";
import { useToast } from "@/hooks/use-toast";
import { CommentService, PublicationService } from "@/services";
import { ResponsePublicationType, type CommentResponseType } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [publications, setPublications] = useState<ResponsePublicationType[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<CommentResponseType[]>([]);

  const { toast } = useToast();

  const getComments = async (publicationId: string) => {
    const data = await CommentService.fetchComments(publicationId);
    setComments(data);
  };
  useEffect(() => {
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

    getPublications();
  }, []);
  return (
    <div className="py-20 px-2">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </div>
      ) : (
        publications?.map((publication) => (
          <div>
            <PublicationCard
              id={publication.id}
              key={publication.id}
              user={publication.user}
              image={`${publication.imageUrl}`}
              comments={comments}
              date={`${publication.createdAt}`}
              text={publication.text}
            />
          </div>
        ))
      )}
    </div>
  );
}
