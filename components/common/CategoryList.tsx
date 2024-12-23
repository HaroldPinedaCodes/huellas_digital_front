import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

const CategoryList = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto py-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="flex-shrink-0 text-center"
        >
          <Avatar className="w-24 h-24">
            <AvatarImage src={category.image} alt={category.name} />
            <AvatarFallback>{category.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm mt-2 block">{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export { CategoryList };
