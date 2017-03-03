export class User {
  id: number;
  auth: string;
  storeId: number;
  wdUserId: number;
  store: {
    id: number;
    name: string;
  };
  wd_user: {
    id: number;
    user_login: string;
    user_nickname: string;
  };
}
