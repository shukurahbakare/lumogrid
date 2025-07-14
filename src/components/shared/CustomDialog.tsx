import React from "react";
import { IoIosClose } from "react-icons/io";
import { MdArrowBackIos } from "react-icons/md";

type PropsType = {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
  header?: string;
  display?: string;
};
const CustomDialog = (props: PropsType) => {
  const dialogClass =
    props.display === "full"
      ? "fixed inset-0 w-screen h-screen p-0 m-0 rounded-none shadow-lg"
      : "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-2xl shadow-lg w-full min-w-[500px] max-w-xl border-t-3 border-green-500";

  return props.display == "full" ? (
    <dialog
      id={props.id}
      className={dialogClass}
    >
      <div className="mb-20">
        <header className="px-20 fixed top-0 bg-white w-full">
          <span
            onClick={props.onClose}
            tabIndex={0}
            onKeyUp={(e) =>
              (e.key === "Enter" || e.key === " ") && props.onClose()
            }
            className=" text-gray-500 p-3 rounded-full cursor-pointer"
            role="button"
            aria-label="Close"
          >
            <MdArrowBackIos className="text-xl" />
          </span>
        </header>
      </div>

      {props.children}
    </dialog>
  ) : (
    <dialog id={props.id} className={dialogClass}>
      <div className="flex justify-end items-center">
        <span
          onClick={props.onClose}
          tabIndex={0}
          onKeyUp={(e) =>
            (e.key === "Enter" || e.key === " ") && props.onClose()
          }
          className="absolute right-8 top-8 text-white rounded-full cursor-pointer bg-black"
          role="button"
          aria-label="Close"
        >
          <IoIosClose className="text-2xl" />
        </span>
      </div>{" "}
      <header className="">
        <h2 className="text-2xl font-bold mb-4 text-black">{props.header}</h2>
      </header>
      {props.children}
    </dialog>
  );
};

export default CustomDialog;

export const handleToggleDialog = (id: string, mode: boolean) => {
  const dialog = document.getElementById(String(id)) as HTMLDialogElement;
  if (dialog) {
    if (mode) {
      dialog.showModal();
      return;
    }
    dialog.close();
  }
};
