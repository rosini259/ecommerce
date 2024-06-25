export type TProduct = {
  id?: number;
  title: string;
  cat_prefix: string;
  img: string;
  price: string;
  quantity?: number;
  max: number;
  isLiked?: boolean;
  isAuthenticated? :boolean
};
