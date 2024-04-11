export type FilterValues = { name:string, id:number, checked:boolean };
export type FilterBoxItem = {
  id:number;
  title : string;
  values: Array<FilterValues>
  key:string
};

export const filterBoxData: Array<FilterBoxItem> = [
  {
    id: 1,
    title: 'brands',
    key: 'brand',
    values: [
      {
        id: 1,
        name: 'Adidas',
        checked: false,
      },
      {
        id: 2,
        name: 'Armani',
        checked: false,
      },
      {
        id: 3,
        name: 'Burberry',
        checked: false,
      },
      {
        id: 4,
        name: 'Calvin Klein',
        checked: false,
      },
      {
        id: 5,
        name: 'Chanel',
        checked: false,
      },
      {
        id: 6,
        name: 'Forever 21',
        checked: false,
      },
      {
        id: 7,
        name: 'Gap',
        checked: false,
      },
      {
        id: 8,
        name: 'Gucci',
        checked: false,
      },
      {
        id: 9,
        name: 'H&M',
        checked: false,
      },
      {
        id: 10,
        name: "Levi's",
        checked: false,
      },
      {
        id: 11,
        name: 'Louis Vuitton',
        checked: false,
      },
      {
        id: 12,
        name: 'Nike',
        checked: false,
      },
      {
        id: 13,
        name: 'Prada',
        checked: false,
      },
      {
        id: 14,
        name: 'Puma',
        checked: false,
      },
      {
        id: 15,
        name: 'Ralph Lauren',
        checked: false,
      },
      {
        id: 16,
        name: 'Tommy Hilfiger',
        checked: false,
      },
      {
        id: 17,
        name: 'Under Armour',
        checked: false,
      },
      {
        id: 18,
        name: 'Versace',
        checked: false,
      },
      {
        id: 19,
        name: "Victoria's Secret",
        checked: false,
      },
      {
        id: 20,
        name: 'Zara',
        checked: false,
      },
    ],
  },
  {
    id: 2,
    title: 'colors',
    key: 'color',
    values: [
      {
        id: 1,
        name: 'Beige',
        checked: false,
      },
      {
        id: 2,
        name: 'Black',
        checked: false,
      },
      {
        id: 3,
        name: 'Blue',
        checked: false,
      },
      {
        id: 4,
        name: 'Brown',
        checked: false,
      },
      {
        id: 5,
        name: 'Coral',
        checked: false,
      },
      {
        id: 6,
        name: 'Cream',
        checked: false,
      },
      {
        id: 7,
        name: 'Gold',
        checked: false,
      },
      {
        id: 8,
        name: 'Gray',
        checked: false,
      },
      {
        id: 9,
        name: 'Green',
        checked: false,
      },
      {
        id: 10,
        name: 'Magenta',
        checked: false,
      },
      {
        id: 11,
        name: 'Navy',
        checked: false,
      },
      {
        id: 12,
        name: 'Olive',
        checked: false,
      },
      {
        id: 13,
        name: 'Orange',
        checked: false,
      },
      {
        id: 14,
        name: 'Pink',
        checked: false,
      },
      {
        id: 15,
        name: 'Purple',
        checked: false,
      },
      {
        id: 16,
        name: 'Red',
        checked: false,
      },
      {
        id: 17,
        name: 'Silver',
        checked: false,
      },
      {
        id: 18,
        name: 'Teal',
        checked: false,
      },
      {
        id: 19,
        name: 'White',
        checked: false,
      },
      {
        id: 20,
        name: 'Yellow',
        checked: false,
      },
    ],
  },
];
