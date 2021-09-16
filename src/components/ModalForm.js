import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Input from "./Input";

export default function Modal(props) {
  const [className, setClassName] = useState(null);
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    setClassName(
      props.isShown ? "fixed z-10 inset-0 overflow-y-auto" : "hidden"
    );
    const aux = props.inputs.map((item) => {
      return [item, ""];
    });
    setInputs(aux);
  }, [props.isShown, props.inputs]);

  const handleHide = () => {
    props.hideModal();
  };

  function isEmpty(arr) {
    return arr[1] === "";
  }

  const handleAction = () => {
    if (inputs.find(isEmpty) === undefined) {
      let objectData = {};
      for (const key of inputs) {
        objectData[key[0].toLowerCase()] = key[1];
      }
      props.handleAction(objectData);
    } else {
      Swal.fire(
        "Campos Incompletos",
        "Debe llenar todos los campos solicitados",
        "warning"
      );
    }
    props.hideModal();
  };

  const handleChange = (e) => {
    const aux2 = inputs.map((item, index) => {
      if (index.toString() === e.target.id) {
        return [item[0], e.target.value];
      } else {
        return item;
      }
    });
    setInputs(aux2);
  };

  return (
    <div
      className={className}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <i className={`${props.icon} text-blue-500`}></i>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  {props.title}
                </h3>
                <div className="mt-2">
                  {inputs.map((item, index) => {
                    return (
                      <Input
                        key={index}
                        id={index}
                        name={item[0]}
                        fontSize={"text-lg"}
                        placeholder={item[0]}
                        value={item[1]}
                        type={"text"}
                        onChange={handleChange}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleAction}
            >
              {props.button}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleHide}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
