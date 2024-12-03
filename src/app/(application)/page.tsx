"use client";

import PublicationCard from "@/components/socialMediaCard";
import { useToast } from "@/hooks/use-toast";
import { PublicationService } from "@/services";
import { ResponsePublicationType } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const user = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://github.com/Antonio-Gabriel.png",
};

const comments = [
  {
    user: {
      name: "Alice",
      email: "alice@example.com",
      avatar: "https://github.com/Adao-Angelo.png",
    },
    content: "Great post!",
  },
  {
    user: {
      name: "Bob",
      email: "bob@example.com",
      avatar: "https://github.com/Adao-Angelo.png",
    },
    content: "I love this!",
  },
];

export default function Page() {
  const [publications, setPublications] = useState<ResponsePublicationType[]>();
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const getComments = async (publicationId: string) => {
    return comments;
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
