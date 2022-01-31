export type peopleDataT = {
  fullName: string;
  dateOfBirth: string;
  dateOfDeath?: string;
  imgUrl: string;
  userId: string;
  hometown:string;
  job?: string;
  hobbies: { name: string }[];
  images?: FileList;
};
