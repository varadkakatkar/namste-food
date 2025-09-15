import { useEffect } from "react";

const useRestaurantMenu = (restaurantId) => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [restaurantId]);

  async function fetchData() {
    try {
      setLoading(true);
      const data = await fetch(
        `http://localhost:3030/api/menu/${restaurantId}?lat=12.9716&lng=77.5946`
      );
      const json = await data.json();
      console.log("Menu data:", json);
      console.log("Full response structure:", JSON.stringify(json, null, 2));

      // Extract restaurant info
      console.log("Looking for restaurant info in cards:", json.data?.cards);
      const restaurantCard = json.data?.cards?.find(
        (card) => card.card?.card?.info
      );
      console.log("Found restaurant card:", restaurantCard);
      if (restaurantCard) {
        setRestaurantInfo(restaurantCard.card.card.info);
        console.log("Set restaurant info:", restaurantCard.card.card.info);
      }

      // Extract menu items
      console.log("Looking for menu cards:", json.data?.cards);
      const menuCard = json.data?.cards?.find(
        (card) => card.groupedCard?.cardGroupMap?.REGULAR
      );
      console.log("Found menu card:", menuCard);

      if (menuCard) {
        const allMenuItems = [];
        const regularCards = menuCard.groupedCard.cardGroupMap.REGULAR.cards;
        console.log("Regular cards:", regularCards);

        regularCards.forEach((category) => {
          console.log("Processing category:", category.card?.card?.title);
          if (category.card?.card?.itemCards) {
            console.log("Found item cards:", category.card.card.itemCards);
            category.card.card.itemCards.forEach((item) => {
              allMenuItems.push({
                ...item.card.info,
                category: category.card.card.title || "Menu Items",
              });
            });
          }
        });

        console.log("All menu items:", allMenuItems);
        setMenuItems(allMenuItems);
      } else {
        console.log(
          "No menu card found. Available cards:",
          json.data?.cards?.map((card) => ({
            type: card.card?.card?.type || "unknown",
            hasGroupedCard: !!card.groupedCard,
            hasInfo: !!card.card?.card?.info,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching menu data:", error);
    } finally {
      setLoading(false);
    }
  }
  //fetch Data
  return { restaurantInfo, menuItems, loading };
};

export default useRestaurantMenu;
