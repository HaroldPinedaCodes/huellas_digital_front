import Image from "next/image";
import Link from "next/link";

interface ImageData {
  url: string;
  id: number;
  name: string;
  // ... otros campos opcionales
}

interface CategoryItemProps {
  name: string;
  slug: string;
  image: ImageData | null | undefined;
  letter: string;
}

const CategoryItem = ({ name, slug, image, letter }: CategoryItemProps) => {
  // Ya no necesitamos baseUrl porque tenemos la URL completa de Cloudinary
  const imageUrl = image?.url || "";

  return (
    <Link
      href={`/category/${slug}`}
      className="group flex flex-col items-center p-2 transition-all hover:scale-105"
    >
      <div className="relative w-16 h-16 mb-2">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={64}
            height={64}
            className="rounded-full object-cover shadow-sm group-hover:shadow-md transition-shadow"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <span className="text-xl font-semibold text-primary">{letter}</span>
          </div>
        )}
      </div>
      <span className="text-sm text-center font-medium group-hover:text-primary transition-colors">
        {name}
      </span>
    </Link>
  );
};

export { CategoryItem };
