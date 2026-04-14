import { Recipe } from "@/src/types/game";
import { CARDS } from "./cards";

export function validateRecipe(recipe: Recipe) {
    if (recipe.inputs.some(input => !(input in CARDS))) {
        throw new Error('Invalid recipe inputs');
    }
    if (!(recipe.output in CARDS)) {
        recipe.output = "thẻ thất lạc";
        throw new Error('Invalid recipe output');
    }
    return recipe;
}

export const RECIPES: Recipe[] = [
    {
        id: "berry_recipe",
        inputs: ["berry_bush", "villager"],
        output: "berry",
        duration: 3000,
        deletedId: ["berry_bush"],
    },
    {
        id: "stick_recipe",
        inputs: ["farmer", "wood"],
        output: "stick",
        duration: 3000,
        deletedId: ["wood"],
    }


]

