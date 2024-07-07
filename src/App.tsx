import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
// import { Label } from "@headlessui/react";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validatoin";
import ErrorMessage from "./components/ui/ErrorMessage";
import CircleColor from "./components/ui/CircleColor";
import { v4 as uuid } from "uuid";

function App() {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  /* _____________ State_________ */
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [tempColors, setTempColors] = useState<string[]>([]);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  /* _____________ HANDLER _________ */
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, price, imageURL } = product;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });

    // ** check if any property has a value of "" && check if all properties have a value of ""
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    console.log({ ...product, id: uuid(), colors: tempColors });

    setProducts((prev) => [
      { ...product, id: uuid(), colors: tempColors },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColors([]);
    close();
  };
  const cancelHandler = () => {
    close();
    setProduct(defaultProductObj);
  };

  /* _____________ RENDER _________ */

  const renderProductList = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInput = formInputsList.map((input) => {
    return (
      <div className="flex flex-col gap-1   my-1 " key={input.id}>
        <label htmlFor={input.id} className="text-black text-sm font-medium">
          {input.label}
        </label>
        <Input
          type={input.type}
          name={input.name}
          id={input.id}
          value={product[input.name]}
          onChange={onchangeHandler}
        />
        <ErrorMessage message={errors[input.name]} />
      </div>
    );
  });

  const renderProductColors = colors.map((color) => (
    <CircleColor
      color={color}
      key={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
        return;
      }}
    />
  ));

  return (
    <main className="container mx-auto">
      <Button className="bg-blue-600 w-fit" onClick={open}>
        ADD PRODUCt
      </Button>
      <div className="  mt-10 grid grid-cols-1 md:grid-cols-2  mx-auto  border  border-blue-800 lg:grid-cols-4 gap-2 md:gap-4">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={close} title="ADD A NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInput}
          <div className="flex flex-row items-center my-3 space-x-1 flex-wrap">
            {renderProductColors}
          </div>
          <div>
            {tempColors.map((color) => (
              <span
                className={`m-1 text-xs p-1 rounded-lg text-white`}
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex  items-center space-x-3 w-full mt-3">
            <Button className="w-fit bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="w-fit bg-gray-500 hover:bg-gray-800"
              onClick={cancelHandler}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
