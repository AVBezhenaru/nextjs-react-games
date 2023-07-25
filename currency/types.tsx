export interface IUser {
  name: string;
  id: string;
  amount: string;
}

export interface IUsers {
  users: IUser[];
}

export interface IDataChangeAmount {
  id: string;
  newAmount: string;
}
