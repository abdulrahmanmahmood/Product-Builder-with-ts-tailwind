import { IProduct } from "../interfaces";
import { textSlicer } from "../utils/functoins";
import Image from "./Image";
import Button from "./ui/Button";
import CircleColor from "./ui/CircleColor";
interface Iprops {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: (value: boolean) => void;
  setProductToEditIncex: (value: number) => void;
  index: number;
  setIsOpenCofirmModal: (value: boolean) => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  setProductToEditIncex,
  index,
  setIsOpenCofirmModal,
}: Iprops) => {
  const { imageURL, title, description, colors, category } = product;

  // __________________ Render____________//
  const renderProductColors = colors.map((color) => (
    <CircleColor color={color} key={color} />
  ));

  //_________________Handler______________//
  const onEdit = () => {
    openEditModal(true);
    setProductToEdit(product);
    setProductToEditIncex(index);
  };
  const onREmove = () => {
    setIsOpenCofirmModal(true);
    setProductToEdit(product);
    setProductToEditIncex(index);
  };

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
        <div className="flex flex-row-reverse items-center gap-3">
          <img
            src={category.imageURL}
            alt={category.name}
            className="rounded-full w-10 h-10"
          />{" "}
          <span className="text-sm">{category.name}</span>
        </div>
      </div>

      <div className="flex flex-row justify-evenly space-x-2 text-white my-3">
        <Button className="bg-indigo-500" width="w-full" onClick={onEdit}>
          Edit
        </Button>
        <Button className="bg-red-700" width="w-full" onClick={onREmove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
