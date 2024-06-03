export default interface IProduct {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
  username: string;
  isCertificated: boolean;
  saved: boolean;
  category: string;
  likedCount: number;
  price: number;
}
