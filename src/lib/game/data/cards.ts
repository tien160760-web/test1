import type { CardDef } from "@/src/types/game";

export const CARDS: Record<string, CardDef> = {
//Structures
    "Berry Bush": {
        id: "berry_bush",
        name: "bụi quả mọng",
        type: "Structure",
        
    },


//Villagers
    "Villager": {
        id: "villager",
        name: "Dân làng",
        type: "Villager",
        healthPoint: 10,
        attackPoint: 5,
        foodCost: 2,
    },

    "Baby" : {
        id: "baby",
        name: "Trẻ em",
        type: "Villager",
        healthPoint: 5,
        attackPoint: 0,
        foodCost: 1,
    },


// Resources

    "Wood": {
        id: "wood",
        name: "Gỗ",
        type: "Resource",
    },

    "Stone": {
        id: "stone",
        name: "Đá",
        type: "Resource",
    },


//Ideas



//Food
    "Apple": {
        id: "apple",
        name: "Táo",
        type: "Food",
        foodValue: 5,
        sellValue: 2,
    },

    "Banana": {
        id: "banana",
        name: "Chuối",
        type: "Food",
        foodValue: 4,
        sellValue: 1,
    },

    "Berry": {
        id: "berry",
        name: "Quả mọng",
        type: "Food",
        foodValue: 2,
        sellValue: 1,
    },



//Mobs 
    "Rat": {
        id: "rat",
        name: "Chuột",
        type: "Mob",
        healthPoint: 5,
        attackPoint: 1,
    },

    "Rabbit": {
        id: "rabbit",
        name: "Thỏ",
        type: "Mob",
        healthPoint: 5,
        attackPoint: 2,
    },


//Locations
    "Cave": {
        id: "cave",
        name: "Hang động",
        type: "Location",
    },

    "Forest": {
        id: "forest",
        name: "Rừng",
        type: "Location",
    },


//Fish


//Rumors


//Equipment
    "Axe": {
        id: "axe",
        name: "Rìu",
        type: "Equipment",
        durability: 100,
        damage: 5,
    },

//Spirits and Curses



}