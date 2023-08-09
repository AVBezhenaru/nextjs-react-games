export type User = {
  email: string;
  password: string;
  token?: string;
  username: string;
  image: string;
  address: string;
  phone: string;
  birthdate: string;
  gender: string;
};

export type FormValues = {
  username: string;
  email: string;
  address: string;
  phone: string;
  birthdate: string;
  gender: string;
};

export type InfoEditFormProps = {
  setEditInfo: (arg0: boolean) => void;
};
