export class Store {
  id: number;
  name: string;
  addr: string;
  tel: string;
  category: string;
  openTime: string;
  closeTime: string;
  weekendOpen: string;
  weekendClose: string;
  couponName: string;
  couponAmount: number;
  lat: number;
  lng: number;
  imgs: string;
  imgsMenu: string;
  store_replies: [
    {
      id: number;
      content: string;
      star: number;
      wdUserId: number;
      nick: string;
    }
  ]
}
