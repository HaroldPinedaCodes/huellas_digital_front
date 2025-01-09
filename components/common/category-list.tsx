import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CategoryItem } from "@/components/categories/CategoryItem";

interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

interface CategoryListProps {
  categories: Category[];
  title?: string;
}
interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

const CategoryList = ({ categories, title }: CategoryListProps) => {
  return (
    <div className="space-y-4">
      {title && (
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      )}
      <ScrollArea className="w-full whitespace-nowrap rounded-lg border">
        <div className="flex  justify-between space-x-4 p-4">
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              name={category.name}
              slug={category.slug}
              image={category.image}
              letter={category.name[0]}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export { CategoryList };
