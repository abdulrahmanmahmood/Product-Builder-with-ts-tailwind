import { IProduct } from "../interfaces";
import { textSlicer } from "../utils/functoins";
import Image from "./Image";
import Button from "./ui/Button";
import CircleColor from "./ui/CircleColor";
interface Iprops {
  product: IProduct;
}

const ProductCard = ({ product }: Iprops) => {
  const { imageURL, title, description,colors } = product;

  // __________________ Render____________//
  const renderProductColors = colors.map((color) => (
    <CircleColor
      color={color}
      key={color}

    />
  ));

  return (
    <div className="max-w-sm md:max-w-lg mx-auto border rounded-md p-2 flex flex-col  ">
      <Image
        alt="product image"
        className="rounded-md mb-2 h-[180px] min-w-[300px] "
        imageUrl={imageURL}
      />

      <h3>{title}</h3>
      <p>{textSlicer(description, 80)} </p>
      <div className="flex flex-row items-center my-3 space-x-1 flex-wrap">
        {renderProductColors}
      </div>


      <div className="flex flex-row items-center justify-between">
        <span>${product.price}</span>
        <img
          src={product.category.imageURL}
          alt={product.category.name}
          className="rounded-full w-10 h-10"
        />{" "}
      </div>

      <div className="flex flex-row justify-evenly space-x-2 text-white my-3">
        <Button
          className="bg-indigo-500"
          width="w-full"
          onClick={() => {
            console.log("clicked");
          }}
        >
          Edit
        </Button>
        <Button className="bg-red-700" width="w-full">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
