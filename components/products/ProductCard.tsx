import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: { url: string }[];
  slug: string;
}

const ProductCard = ({ name, price, image, slug }: ProductCardProps) => {
  // console.log(price);

  const url = process.env.NEXT_PUBLIC_STRAPI_UPLOAD_URL;

  console.log(image[0].url);
  console.log(url + image[0].url);
  console.log(price);

  // const imageUrl = `${process.env.NEXT_PUBLIC_UPLOAD_URL}/${image[0].url}`;

  console.log(url);
  return (
    <Card className="overflow-hidden">
      <Link href={`/products/${slug}`}>
        <div className="relative h-48 w-full">
          <Image src={url + image[0].url} alt={name} width={400} height={400} />
        </div>
      </Link>

      <CardContent className="p-4">
        <h3 className="font-medium">{name}</h3>
        {/* <p className="mt-1 font-bold text-lg">${price.toFixed(2)}</p> */}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Añadir al carrito</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
