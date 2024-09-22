import PublicationCard from "@/components/socialMediaCard";

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
  return (
    <div className="py-20">
      <PublicationCard
        user={user}
        image="https://nxboats.com.br/wp-content/uploads/2023/11/Lamborghini.jpg"
        comments={comments}
      />
      <PublicationCard
        user={user}
        image="https://nxboats.com.br/wp-content/uploads/2023/11/Lamborghini.jpg"
        comments={comments}
      />
      <PublicationCard
        user={user}
        image="https://nxboats.com.br/wp-content/uploads/2023/11/Lamborghini.jpg"
        comments={comments}
      />
      <PublicationCard
        user={user}
        image="https://nxboats.com.br/wp-content/uploads/2023/11/Lamborghini.jpg"
        comments={comments}
      />
      <PublicationCard
        user={user}
        image="https://nxboats.com.br/wp-content/uploads/2023/11/Lamborghini.jpg"
        comments={comments}
      />
    </div>
  );
}
