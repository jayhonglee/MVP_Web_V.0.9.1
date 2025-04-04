const hangoutCategories = [
  {
    id: "food-drinks",
    name: "Food•Drinks",
    icon: new URL("@assets/images/interest_food_drink.png", import.meta.url)
      .href,
    description: "Touring trendy food places, or drinks with new friends",
  },
  {
    id: "sports",
    name: "Sports",
    icon: new URL("@assets/images/interest_sports.png", import.meta.url).href,
    description: "Sports game, workout session, or casual team play",
  },
  {
    id: "books-study",
    name: "Books•Study",
    icon: new URL("@assets/images/interest_book.png", import.meta.url).href,
    description: "Study group, book club, or knowledge sharing",
  },
  {
    id: "travel-outdoor",
    name: "Outdoor",
    icon: new URL("@assets/images/interest_outdoor.png", import.meta.url).href,
    description: "Hiking, picnic, or outdoor activities",
  },
  {
    id: "art-crafting",
    name: "Art•Crafting",
    icon: new URL("@assets/images/interest_craft.png", import.meta.url).href,
    description: "Art gallery, crafting workshop, or creative session",
  },
  {
    id: "local-chat",
    name: "Chat",
    icon: new URL("@assets/images/interest_local.png", import.meta.url).href,
    description: "coffee chat and make new friends in your community",
  },
];

export default hangoutCategories;

export type HangoutCategory = (typeof hangoutCategories)[number];
