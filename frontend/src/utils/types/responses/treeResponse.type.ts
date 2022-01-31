export type TreeResponseT = {
  relations: {
    id: string;
    gender: "female" | "male";
    siblings: {
      id: string;
      type: "blood" | "divorced" | "adopted" | "married";
    }[];
    parents: {
      id: string;
      type: "blood" | "divorced" | "adopted" | "married";
    }[];
    children: {
      id: string;
      type: "blood" | "divorced" | "adopted" | "married";
    }[];
    spouses: {
      id: string;
      type: "blood" | "divorced" | "adopted" | "married";
    }[];
  }[];

  infos: { id: string; names: string; date_of_birth: string ; date_of_death: string;
        hometown: string; job: string; hobbies: {name: string}[]; images: FileList}[];

  rootId: string;
};
