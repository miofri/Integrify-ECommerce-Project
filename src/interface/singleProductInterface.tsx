export interface SingleProductState {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: Date;
  updatedAt: Date;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: Date;
  updatedAt: Date;
}

export const defaultState = {
  id: 10,
  title: "Generic Granite Hat",
  price: 789,
  description:
    "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
  images: [
    "https://picsum.photos/640/640?r=6665",
    "https://picsum.photos/640/640?r=6006",
    "https://picsum.photos/640/640?r=2057",
  ],
  creationAt: new Date("2023-05-17T05:46:31.000Z"),
  updatedAt: new Date("2023-05-17T05:46:31.000Z"),
  category: {
    id: 1,
    name: "Clothes",
    image: "https://picsum.photos/640/640?r=8489",
    creationAt: new Date("2023-05-17T05:46:31.000Z"),
    updatedAt: new Date("2023-05-17T05:46:31.000Z"),
  },
};
