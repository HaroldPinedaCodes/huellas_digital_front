import Image from "next/image";
import Link from "next/link";

interface ImageData {
  url: string;
  id: number;
  name: string;
}

interface CategoryItemProps {
  name: string;
  slug: string;
  image: ImageData | null | undefined;
  letter: string;
}

const CategoryItem = ({ name, slug, image, letter }: CategoryItemProps) => {
  const imageUrl = image?.url || "";

  return (
    <Link
      href={`/category/${slug}`}
      className="category-item relative flex min-w-[150px] flex-col items-center rounded-lg p-4 transition-all hover:bg-primary/5"
      role="listitem"
      aria-label={`Categoría: ${name}`}
    >
      <div className="relative mb-3 flex items-center border-none justify-center">
        {imageUrl ? (
          <div className="relative h-32 w-32 overflow-hidden rounded-xl">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 bg-white"
              style={{
                transform: "scale(1)",
              }}
              sizes="(max-width: 128px) 100vw, 128px"
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10" />
          </div>
        ) : (
          <div className="relative flex h-32 w-32 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
            <span className="text-3xl font-semibold text-primary">
              {letter}
            </span>
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10" />
          </div>
        )}
      </div>

      <span className="text-center font-medium text-gray-700 line-clamp-2 transition-colors">
        {name}
      </span>

      {/* Overlay para el hover */}
      <div className="absolute inset-0 rounded-lg transition-colors hover:bg-primary/5">
        <div className="h-full w-full">
          {imageUrl && (
            <div className="absolute top-4 left-4 right-4 bottom-4 overflow-hidden">
              <div className="h-32 w-32 mx-auto">
                <div className="h-full w-full transform transition-transform duration-300 hover:scale-110" />
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export { CategoryItem };
