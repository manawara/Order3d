"use client";
import Input from "@/components/Input/Input";
import RichText from "@/components/RichText/RichText";
import Select from "@/components/Select/Select";
import React from "react";

const EditOrderID = ({ params }) => {
  const id = params.id;
  return (
    <div className="mt-8">
      <h2 className="text-center text-2xl font-bold">
        Edycja zamówienia nr: #{id}
      </h2>
      <form className="text-greenLight">
        <Input label="Nazwa towaru" />
        <Select label="Użytkownik" />
        <Select label="Status" />
        <RichText label="Opis" />
      </form>
    </div>
  );
};

export default EditOrderID;
