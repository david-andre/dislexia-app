import React from "react";

export default function Input(props) {
  const className = `focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full ${props.fontSize} text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-5 my-3`;

  return (
    <input
      id={props.id}
      name={props.name}
      className={className}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      autoComplete="off"
      required
    />
  );
}
