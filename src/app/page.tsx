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
        image="https://automotivoshopping.com.br/wp-content/uploads/2020/10/maxresdefault-1-768x432.jpg"
        comments={comments}
      />
      <PublicationCard
        user={user}
        image="https://assegurou.com.br/blog/wp-content/uploads/2024/03/Bugatti-La-Voiture-Noire-1024x577.jpg"
        comments={comments}
      />
      <PublicationCard
        user={user}
        image="https://www.razaoautomovel.com/wp-content/uploads/2023/11/citroen_e-c3_max-925x520.webp"
        comments={comments}
      />
      <PublicationCard
        user={user}
        image="https://img.odcdn.com.br/wp-content/uploads/2023/11/Mustang-GT2024.jpg"
        comments={comments}
      />
    </div>
  );
}
