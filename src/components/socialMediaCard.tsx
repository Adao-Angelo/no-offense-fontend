"use client";

import { UserType, type CommentType } from "@/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { CommentService } from "@/services";
import AOS from "aos";
import "aos/dist/aos.css";
import { Loader2, LucideRss, MoreHorizontal, Send, Share } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface Comment {
  user: User;
  content: string;
}

interface PublicationCardProps {
  id?: string;
  user: User;
  image: string;
  comments: Comment[];
  date: string;
  text: string;
}

export function UserAvatar({ user }: { user: User }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex gap-4 space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{user.name}</h4>
            <p className="text-sm">{user.email}</p>
            <div className="flex items-center pt-2">
              <Button variant="outline" className="rounded-md text-xs">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default function PublicationCard({
  id,
  user,
  image,
  comments: initialComments,
  date,
  text,
}: PublicationCardProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [userAuth, setUserAuth] = useState<UserType>();
  const [isLoadingComment, setIsLoadingComment] = useState<boolean>(false);
  const { toast } = useToast();
  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { user, content: newComment.trim() }]);
      setNewComment("");
    }
  };

  const addNewComment = async (newComment: CommentType) => {
    try {
    } catch {
    } finally {
    }
  };

  useEffect(() => {
    const getComments = async (publicationId: string) => {
      setIsLoadingComment(true);
      try {
        const data = await CommentService.fetchComments(publicationId);
        setComments(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error on list a comments ",
          description: "Failed to list a comments of this publication.",
        });
      } finally {
        setIsLoadingComment(false);
      }
    };
    AOS.init();
    getComments(id as string);
  }, []);

  const router = useRouter();

  useEffect(() => {
    const User = Cookies.get("userAuthenticated");
    if (!User) {
      router.push("/auth");
    } else {
      const userParse: UserType = JSON.parse(User);
      setUserAuth(userParse);
    }
  }, []);

  const userAuthenticate = {
    name: userAuth?.name || "Anonymous",
    email: userAuth?.email || "",
    avatar: userAuth?.avatar || "",
  };

  return (
    <Card className={`w-full max-w-md mx-auto my-4`} data-aos="">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <UserAvatar user={user} />
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-500 text-[10px]">{date}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Share className="mr-2 h-4 w-4" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LucideRss className="mr-2 h-4 w-4" />
              <span>Publish</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-0">
        <p className="p-4 text-[14px]">{text}</p>
        <img
          src={image}
          alt="Publication Image"
          className="w-full h-auto p-4"
        />
        <ScrollArea className="h-60 w-full p-4">
          {isLoadingComment ? (
            <div className="flex justify-center items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
          ) : (
            <div>
              {comments.map((comment, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={comment.user.avatar}
                      alt={comment.user.name}
                    />
                    <AvatarFallback>
                      {comment.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-muted rounded-md p-2">
                    <p className="text-sm font-semibold">{comment.user.name}</p>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex items-end space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={userAuthenticate.avatar}
            alt={userAuthenticate.name}
          />
          <AvatarFallback>{userAuthenticate.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex items-end ">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1"
            rows={1}
          />

          <Button size="icon" onClick={handleAddComment} className="ml-2">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send comment</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
