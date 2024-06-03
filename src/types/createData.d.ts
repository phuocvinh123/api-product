export default interface ICreateData {
  imageUrl: string;
  title: string;
  description: string;
}
export interface DataCreate {
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
