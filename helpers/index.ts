import { StatusOrder } from "@prisma/client";

export const chooseOrder = (option: string) => {
  switch (option) {
    case "Do zrobienia":
      return StatusOrder.TODO;
    case "W toku":
      return StatusOrder.INPROGRESS;
    case "Zrealizowane":
      return StatusOrder.DONE;
  }
};
