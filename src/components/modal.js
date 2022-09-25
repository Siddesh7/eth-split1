import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import sendNotification from "./sendNotifs";
export default function MyModal(props) {
  let [isOpen, setIsOpen] = useState(false);
  const [inputFields, setInputFields] = useState([{ address: "" }]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.address] = event.target.value;
    setInputFields(data);
  };
  const onSubmit = (data) => {
    console.log(data);
    sendNotification(props.t_amount, props.t_sender, data);
  };
  const addFields = () => {
    let newfield = { address: "" };

    setInputFields([...inputFields, newfield]);
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          View
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2">
                    <h1 className="font-bold text-black">
                      Transaction Details
                    </h1>
                    <p className="text-sm text-gray-500 truncate">
                      {props.t_id}
                    </p>
                    <div className="flex justify-between flex-row align-center">
                      <div>
                        <input type="checkbox" id="checkbox" />
                        <label htmlFor="checkbox">Split equally?</label>
                      </div>
                      <div className="flex items-center">
                        <AiOutlinePlusCircle
                          onClick={addFields}
                          size="1.2rem"
                        />
                        <p className="text-[16px]" onClick={addFields}>
                          Add Field?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <form
                      action="http://127.0.0.1:9090/api"
                      method="POST"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <input
                        type="number"
                        name="addressCount"
                        value={inputFields.length}
                        hidden
                      />
                      <input
                        type="number"
                        name="amount"
                        value={props.t_amount}
                        hidden
                      />
                      {inputFields.map((input, index) => {
                        return (
                          <div key={index}>
                            <input
                              className="w-[100%] outline-none my-[4px]"
                              name={`address${index}`}
                              placeholder="Address/ens"
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                              {...register(`address${index}`)}
                            />
                          </div>
                        );
                      })}
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 my-[15px]"
                        onClick={closeModal}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
