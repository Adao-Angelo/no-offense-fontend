"use client";
import { useState } from "react";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LucideRss, MoreHorizontal, Send, Share } from "lucide-react";
import { Textarea } from "./ui/textarea";
import AOS from "aos";
import "aos/dist/aos.css";

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
  user: User;
  image: string;
  comments: Comment[];
  className?: string;
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
  user,
  image,
  comments: initialComments,
  className,
}: PublicationCardProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { user, content: newComment.trim() }]);
      setNewComment("");
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Card
      className={`w-full max-w-md mx-auto my-4 ${className}`}
      data-aos="zoom-in-up"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <UserAvatar user={user} />
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-500 text-[10px]">1h</p>
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
        <p className="p-4 text-[14px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
          facilis necessitatibus inventore! Ex fuga libero mollitia, assumenda
          quae illo tempora quibusdam? Nobis fugiat ad esse laborum expedita
          officia ipsam sequi.
        </p>
        <img src={image} alt="Publication" className="w-full h-auto" />
        <ScrollArea className="h-60 w-full p-4">
          {comments.map((comment, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={comment.user.avatar}
                  alt={comment.user.name}
                />
                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-muted rounded-md p-2">
                <p className="text-sm font-semibold">{comment.user.name}</p>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex items-end space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
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
