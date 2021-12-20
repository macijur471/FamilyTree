import { peopleDataT } from "utils/types/treeContext.type";

export const findPerson = (arr: peopleDataT[], userId: string) => {
  return (
    arr.find((el) => el.userId === userId) ?? {
      fullName: "Error",
      dateOfBirth: "20.12.2021",
      userId: "error-id",
      imgUrl: "",
    }
  );
};
