export interface Category {
    id: number
    name_ko: string
    name_en: string
    order: number
    isActive: boolean
    menus?: Menu[]
}

export interface Menu {
    id: number
    name_ko: string
    name_en: string
    description_ko?: string
    description_en?: string
    price: number
    image?: string
    isActive: boolean
    order: number
    categoryId: number
    options?: MenuOption[]
    allergens?: string
    category?: Category
}

export interface MenuOption {
    type: string // 'size', 'temperature', 'sweetness', 'ice'
    name_ko: string
    name_en: string
    options: {
        value: string
        name_ko: string
        name_en: string
        priceChange: number
    }[]
}

export interface CartItem {
    menu: Menu
    quantity: number
    selectedOptions: Record<string, string>
    totalPrice: number
}

export interface Order {
    id: number
    orderNumber: string
    orderType: "dine_in" | "takeout"
    totalPrice: number
    status: string
    createdAt: Date
    orderItems: OrderItem[]
}

export interface OrderItem {
    id: number
    menuId: number
    quantity: number
    price: number
    options?: Record<string, string>
    menu: Menu
}

export type Language = "ko" | "en"
