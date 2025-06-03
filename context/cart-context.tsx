"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { CartItem } from "@/lib/types"

interface CartState {
    items: CartItem[]
    orderType: "dine_in" | "takeout"
    language: "ko" | "en"
}

type CartAction =
    | { type: "ADD_ITEM"; payload: CartItem }
    | { type: "REMOVE_ITEM"; payload: number }
    | { type: "UPDATE_QUANTITY"; payload: { index: number; quantity: number } }
    | { type: "CLEAR_CART" }
    | { type: "SET_ORDER_TYPE"; payload: "dine_in" | "takeout" }
    | { type: "SET_LANGUAGE"; payload: "ko" | "en" }

const initialState: CartState = {
    items: [],
    orderType: "dine_in",
    language: "ko",
}

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM":
            const existingIndex = state.items.findIndex(
                (item) =>
                    item.menu.id === action.payload.menu.id &&
                    JSON.stringify(item.selectedOptions) === JSON.stringify(action.payload.selectedOptions),
            )

            if (existingIndex >= 0) {
                const newItems = [...state.items]
                newItems[existingIndex].quantity += action.payload.quantity
                newItems[existingIndex].totalPrice += action.payload.totalPrice
                return { ...state, items: newItems }
            }

            return { ...state, items: [...state.items, action.payload] }

        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter((_, index) => index !== action.payload),
            }

        case "UPDATE_QUANTITY":
            const updatedItems = [...state.items]
            if (action.payload.quantity <= 0) {
                updatedItems.splice(action.payload.index, 1)
            } else {
                const item = updatedItems[action.payload.index]
                const basePrice = item.totalPrice / item.quantity
                updatedItems[action.payload.index] = {
                    ...item,
                    quantity: action.payload.quantity,
                    totalPrice: basePrice * action.payload.quantity,
                }
            }
            return { ...state, items: updatedItems }

        case "CLEAR_CART":
            return { ...state, items: [] }

        case "SET_ORDER_TYPE":
            return { ...state, orderType: action.payload }

        case "SET_LANGUAGE":
            return { ...state, language: action.payload }

        default:
            return state
    }
}

const CartContext = createContext<{
    state: CartState
    dispatch: React.Dispatch<CartAction>
    totalItems: number
    totalPrice: number
} | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0)

    // 5분 후 자동 초기화
    useEffect(() => {
        let timeout: NodeJS.Timeout

        const resetTimer = () => {
            clearTimeout(timeout)
            timeout = setTimeout(
                () => {
                    dispatch({ type: "CLEAR_CART" })
                },
                5 * 60 * 1000,
            ) // 5분
        }

        resetTimer()

        const handleActivity = () => resetTimer()

        document.addEventListener("click", handleActivity)
        document.addEventListener("touchstart", handleActivity)

        return () => {
            clearTimeout(timeout)
            document.removeEventListener("click", handleActivity)
            document.removeEventListener("touchstart", handleActivity)
        }
    }, [state.items])

    return <CartContext.Provider value={{ state, dispatch, totalItems, totalPrice }}>{children}</CartContext.Provider>
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
