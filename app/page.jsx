import MealPlanApp from "@/components/MealPlanApp";
import { DAYS } from "@/data/days";
import { RECIPES } from "@/data/recipes";
import { TIPS } from "@/data/tips";
import { getShoppingItems } from "@/app/actions/shopping";

export default async function Page() {
  let dbItems = [];
  let dbReady = false;
  
  try {
    const rawItems = await getShoppingItems();
    // Safely structure for Client Component to prevent non-serializable properties mapping issues
    dbItems = rawItems.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        is_completed: item.is_completed,
    }));
    dbReady = true;
  } catch (error) {
    console.error("No database logic found or table missing");
  }

  return (
    <MealPlanApp days={DAYS} recipes={RECIPES} shoppingItems={dbItems} dbReady={dbReady} tips={TIPS} />
  );
}
