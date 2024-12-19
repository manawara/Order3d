import { getOrderByID } from "@/action/order";
import Image from "next/image";
import placeHolder from "@/public/placeholder.png";
import { chooseOrder, formatDate, formatStatusOrder } from "@/helpers";
import { Link } from "lucide-react";
Image;
const ViewPageOrder = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const order = await getOrderByID(+id);
  return (
    <div className="mx-auto  max-w-5xl flex flex-col mt-8 ">
      <div className="flex justify-center gap-10 flex-col lg:flex-row">
        <div className="sm:min-w-96 mx-auto">
          <h2 className="text-center mt-4 text-2xl text-greenLight font-semibold">
            {order?.name}
          </h2>
          <ol className="mt-4 text-greenLight border solid border-greenLight rounded-md p-4">
            <li>
              <span className="font-semibold">Numer zamówienia:</span> #
              {order?.id}
            </li>
            <li className="mt-2">
              <span className="font-semibold">Status:</span>{" "}
              {formatStatusOrder(order?.status as string)}
            </li>
            <li className="mt-2">
              <span className="font-semibold">Osoba zamawiająca: </span>
              {order?.user.name}
            </li>
            <li className="mt-2">
              <span className="font-semibold">Data utworzenia: </span>
              {formatDate(order?.createdAt)}
            </li>
            <li className="mt-2">
              <span className="font-semibold">Ilość: </span>
              {order?.quantity} szt
            </li>
            <li className="mt-2">
              <span className="font-semibold">Kwota za sztukę: </span>
              {order?.price.toFixed(2)} zł
            </li>
            <li className="mt-2">
              <span className="font-semibold">Łączna wartość zamówienia: </span>
              {((order?.price as number) * (order?.quantity as number)).toFixed(
                2
              )}
              zł {"(" + order?.quantity + "szt x " + order?.price + "zł)"}
            </li>
            <li className="mt-2">
              <span className="font-semibold">Adres email: </span>
              <a
                href={`mailto:${order?.user.email}`}
                className="hover:text-gray-400"
              >
                {order?.user.email}
              </a>
            </li>
          </ol>
        </div>
        <Image
          src={placeHolder}
          width={340}
          height={250}
          alt="placeholder"
          className="rounded-xl object-cover mx-auto"
        />
      </div>
      <div className="border border-solid p-2 border-greenLight rounded-md text-greenLight mt-8">
        <div className=" text-xs font-bold">Opis:</div>
        <div className="px-2 py-2">{order?.description}</div>
      </div>
    </div>
  );
};

export default ViewPageOrder;
