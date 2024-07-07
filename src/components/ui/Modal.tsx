import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Button from "./Button";

interface Iprops {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, closeModal, title, children }: Iprops) => {
  // function open() {
  //   setIsOpen(true);
  // }

  // function close() {
  //   setIsOpen(false);
  // }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-20  focus:outline-none bg-white border-2 "
        onClose={closeModal}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className=" w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              {title && (
                <DialogTitle
                  as="h3"
                  className="text-base/2 font-medium text-black text-center"
                >
                  {title}
                </DialogTitle>
              )}
              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
