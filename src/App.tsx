import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
// import { Label } from "@headlessui/react";
import Input from "./components/ui/Input";
import { ICategory, IProduct } from "./interfaces";
import { productValidation } from "./validatoin";
import ErrorMessage from "./components/ui/ErrorMessage";
import CircleColor from "./components/ui/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import toast, { Toaster } from "react-hot-toast";

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
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [productToEditIndex, setProductToEditIndex] = useState<number>(0);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isOpenConfirmModal, setIsOpenConfirmMOdal] = useState(false);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });

  /* _____________ HANDLER _________ */
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const openEditModal = () => setIsOpenEditModal(true);
  const closeEditModal = () => setIsOpenEditModal(false);
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
  const onchangeUpdateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit({
      ...productToEdit,
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
      colors: tempColors,
    });

    // ** check if any property has a value of "" && check if all properties have a value of ""
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColors([]);
    close();
    AddedNotify();
  };
  const cancelHandler = () => {
    close();
    setProduct(defaultProductObj);
  };
  const cancelUpdateHandler = () => {
    closeEditModal();
  };
  const submitEditHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, price, imageURL } = productToEdit;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
      colors: productToEdit.colors.concat(tempColors),
    });

    // ** check if any property has a value of "" && check if all properties have a value of ""
    const hasErrorMsg = Object.values(errors).some((value) => value !== "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIndex] = {
      ...productToEdit,
      colors: productToEdit.colors.concat(tempColors),
    };
    setProducts(updatedProducts);
    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeEditModal();
  };

  const removeProductHandler = () => {
    const filtered = products.filter(
      (product) => product.id !== productToEdit.id
    );
    setProducts(filtered);
    closeModalCofirm();
    DeletedNotify();
  };
  const closeModalCofirm = () => setIsOpenConfirmMOdal(false);

  /* _____________ RENDER _________ */

  const renderProductList = products.map((product, index) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={setIsOpenEditModal}
      setProductToEditIncex={setProductToEditIndex}
      index={index}
      setIsOpenCofirmModal={setIsOpenConfirmMOdal}
    />
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
  const renderUpdatingFormInput = formInputsList.map((input) => {
    return (
      <div className="flex flex-col gap-1   my-1 " key={input.id}>
        <label htmlFor={input.id} className="text-black text-sm font-medium">
          {input.label}
        </label>
        <Input
          type={input.type}
          name={input.name}
          id={input.id}
          value={productToEdit[input.name]}
          onChange={onchangeUpdateHandler}
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
        if (productToEdit.colors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
        setErrors({
          ...errors,
          colors: "",
        });
        return;
      }}
    />
  ));
  const DeletedNotify = () =>
    toast("product Deleted", {
      duration: 7000,
      position: "top-center",

      // Styling
      style: {
        backgroundColor: "black",
        color: "white",
      },
      className: "",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#fff",
        secondary: "#fff",
      },
    });
  const AddedNotify = () =>
    toast("product Added Succeffully", {
      duration: 7000,
      position: "top-center",

      // Styling
      style: {
        backgroundColor: "green",
        color: "white",
      },
      className: "",
      icon: "👏",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#fff",
        secondary: "#fff",
      },
    });

  return (
    <main className="container mx-auto">
      <Button className="bg-blue-600 w-fit" onClick={open}>
        ADD PRODUCt
      </Button>
      <Toaster />

      <div className="  mt-10 grid grid-cols-1 md:grid-cols-2  mx-auto  border  border-blue-800 lg:grid-cols-4 gap-2 md:gap-4">
        {renderProductList}
      </div>
      {/* Add Product Modal */}
      <Modal isOpen={isOpen} closeModal={close} title="ADD A NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInput}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          <div className="flex flex-row items-center my-3 space-x-1 flex-wrap">
            {renderProductColors}
          </div>
          <ErrorMessage message={errors.colors} />

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

      {/* Edit Product Modal */}
      <Modal
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        title="Update PRODUCT"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderUpdatingFormInput}
          <Select
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />

          <div className="flex flex-row items-center my-3 space-x-1 flex-wrap">
            {renderProductColors}
          </div>
          <ErrorMessage message={errors.colors} />

          <div>
            {tempColors.concat(productToEdit.colors).map((color) => (
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
              onClick={cancelUpdateHandler}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Product Confirm MODAL */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeModalCofirm}
        title="Are You sure you want to remove this product form your Store? "
      >
        <p>
          Deleting this product will removet it permenaly from you invetory. Any
          assocaited data, slales history, and other related infromation will
          also be deleted. please make sure this is the intended action.
        </p>{" "}
        <div className="flex  items-center space-x-3 w-full mt-3">
          <Button
            className="w-fit bg-red-700 hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Yes,remove
          </Button>
          <Button
            className="w-fit bg-gray-500 hover:bg-gray-800"
            onClick={closeModalCofirm}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </main>
  );
}

export default App;
