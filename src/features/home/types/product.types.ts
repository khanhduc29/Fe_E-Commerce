export type ProductItemType = {
  id: string;
  title: string;
  slug: string;
  description: string[] | null;
  brand: string;
  price: number;
  category: string;
  quantity: number;
  sold: number;
  thumb: string;
  images: string[];
  color: string;
  ratings: RatingType[];
  totalRatings: number;
  discount?: number;
};

export type RatingType = {
  star: number;
  postedBy: string;
  comment: string;
};
