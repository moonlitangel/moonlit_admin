export class Store {
  id: number;
  name: string;
  addr: string;
  tel: string;
  category: string;
  intro: string;
  openTime: string;
  closeTime: string;
  weekendOpen: string;
  weekendClose: string;
  couponName: string;
  couponAmount: number;
  lat: number;
  lng: number;
  images: string[] = [];
  tags: any;
  storeImages: [
    {
      img: string;
    }
  ];
}
