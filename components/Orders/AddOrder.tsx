import FormAddOrder from "./FormAddOrder";

const AddOrder = () => {
  return (
    <div className="flex flex-col w-full">
      <h3 className="text-center text-xl">Dodaj nowe zamówienie</h3>
      <p className="text-center mt-2">
        Wypełnij formularz, aby utworzyć nowe zamówienie.
      </p>
      <FormAddOrder />
    </div>
  );
};

export default AddOrder;
