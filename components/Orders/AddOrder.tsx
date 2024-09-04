import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";

const AddOrder = () => {
  return (
    <div className="flex flex-col w-full">
      <h3 className="text-center text-xl">Dodaj nowe zamówienie</h3>
      <p className="text-center mt-2">
        Wypełnij formularz, aby utworzyć nowe zamówienie.
      </p>
      <form>
        <Input label="Nazwa produktu" placeholder="Produkt 1" />
        <Input label="Ilość" placeholder="0" type="number" />
        <Select
          name="status"
          data={[
            {
              id: 1,
              value: "Do zrobienia",
            },
            {
              id: 2,
              value: "W toku",
            },
            {
              id: 3,
              value: "Zrobione",
            },
          ]}
          label="Status"
          placeholder="Wybierz status"
        />
        <Select
          name="status"
          data={[
            {
              id: 1,
              value: "Do zrobienia",
            },
            {
              id: 2,
              value: "W toku",
            },
            {
              id: 3,
              value: "Zrobione",
            },
          ]}
          label="Klient"
          placeholder="Wybierz Klienta"
        />
        <Input label="Cena" placeholder="np. xx zł" type="number" />
        <div className="my-4">
          <Button>Dodaj zamówienie</Button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;
