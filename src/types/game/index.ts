import { UUID } from "crypto";

type CardType =
    "Structure"
    | "Villager"
    | "Resource"
    | "Idea"
    | "Food"
    | "Mob"
    | "Location"
    | "Fish"
    | "Rumor"
    | "Equipment"
    | "Spirit and Curse";

export interface CardDef {
    id: string;
    name: string;
    type: CardType;

    // quantity?: number; 
    sellValue?: number;

    healthPoint?: number;
    attackPoint?: number;
    foodCost?: number; // villager need ? food

    foodValue?: number; // Số lương thực nó cung cấp - for type food 
    durability?: number; // Độ bền - for type equipment
    damage?: number; // Sát thương - for type equipment
}


interface CardInstance {
    instanceId: UUID;
    defId: string;

    position: { x: number, y: number };
    // zIndex?: number; // thẻ nào nằm trên

    attachedToId?: string;   // ID của thẻ nằm dưới thẻ này
    childCardId?: string;    // ID của thẻ đang đè lên thẻ này (tạo thành một stack)

    progress?: number;       // Giá trị từ 0 đến 100
    timerStartTime?: number; // Timestamp khi bắt đầu một hành động (nấu ăn, rèn...)

    // durability?: number;     // Cho các công cụ như Rìu, Cuốc
    // isFrozen?: boolean;      // Ví dụ: thẻ bị khóa trong mùa đông
}

export interface Recipe {
    id : string;
    inputs: string[];
    output: string;
    duration: number; 
    deletedId: string[];
}

interface CardStack {
    stackId: string;
    stacks : CardInstance[];
    // rootCardId?: string;

    activeRecipe?: string;
    progress?: number;
    // lastTick: number;
}

interface GameState {
    cards: Record<string, CardInstance>;  // instanceId → CardInstance
    stacks: Record<string, CardStack>;     // stackId → CardStack
    moon: number;                          // vòng hiện tại
    moonTimeLeft: number;                  // millisecond còn lại
    coins: number;
    cardLimit: number;                     // số thẻ tối đa trên bàn
    phase: "playing" | "gameover" | "gamewin"
}

interface PackItem {
    defId: string;
    chance: number;// 0-1, xác suất xuất hiện
}

interface Pack {
    id: string;
    name: string;
    cost: number;
    numOfItems: number; // số lượng item trong pack
    items: PackItem[];
}

type GameEventType = "enemy_attack" | "natural_disaster" | "peaceful"

interface GameEvent {
    type: GameEventType;
    description: string;
    payload?: {
        mobDefIds?: string[];  // giặc xuất hiện
        destroyCount?: number;  // số ruộng bị phá
    }
}