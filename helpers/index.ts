import { StatusOrder } from "@prisma/client";

export const chooseOrder = (option: string) => {
  console.log(option);
  switch (option) {
    case "Przyjęto zamówienie":
      return StatusOrder.TODO;
    case "W fazie projektu":
      return StatusOrder.PROJECT;
    case "Trwa proces druku":
      return StatusOrder.IN_PROGRESS;
    case "Druk gotowy - czekaj na kontakt":
      return StatusOrder.DONE;
  }
};

export const formatDate = (date: Date | undefined) => {
  if (!(date instanceof Date)) {
    console.error("Nieprawidłowy format daty");
    return "Nieprawidłowa data";
  }
  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatStatusOrder = (status: string) => {
  switch (status) {
    case "TODO":
      return "Przyjęto zamówienie";
    case "PROJECT":
      return "W fazie projektu";
    case "IN_PROGRESS":
      return "Trwa proces druku";
    case "DONE":
      return "Druk gotowy - czekaj na kontakt";
  }
};
