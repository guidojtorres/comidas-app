import MealPlanApp from "@/components/MealPlanApp";
import { DAYS } from "@/data/days";
import { RECIPES } from "@/data/recipes";
import { SHOPPING } from "@/data/shopping";
import { TIPS } from "@/data/tips";

export default function Page() {
  return (
    <MealPlanApp days={DAYS} recipes={RECIPES} shopping={SHOPPING} tips={TIPS} />
  );
}
