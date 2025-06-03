export const translations = {
    ko: {
        // 메인 화면
        welcome: "카페 SOOM에 오신 것을 환영합니다",
        selectOrderType: "주문 방식을 선택해주세요",
        dineIn: "매장 이용",
        takeout: "포장 주문",

        // 카테고리
        coffee: "커피",
        beverage: "음료",
        dessert: "디저트",
        seasonal: "시즌 메뉴",

        // 메뉴
        addToCart: "장바구니 담기",
        options: "옵션 선택",
        price: "가격",
        allergens: "알레르기 정보",

        // 장바구니
        cart: "장바구니",
        quantity: "수량",
        total: "총 금액",
        order: "주문하기",
        empty: "장바구니가 비어있습니다",

        // 주문
        orderSummary: "주문 내역",
        payment: "결제하기",
        orderComplete: "주문이 접수되었습니다",
        orderNumber: "주문번호",
        backToMain: "처음으로",

        // 공통
        cancel: "취소",
        confirm: "확인",
        back: "뒤로가기",
        language: "언어",
        won: "원",
    },
    en: {
        // Main screen
        welcome: "Welcome to Cafe SOOM",
        selectOrderType: "Please select order type",
        dineIn: "Dine In",
        takeout: "Takeout",

        // Categories
        coffee: "Coffee",
        beverage: "Beverage",
        dessert: "Dessert",
        seasonal: "Seasonal",

        // Menu
        addToCart: "Add to Cart",
        options: "Select Options",
        price: "Price",
        allergens: "Allergen Info",

        // Cart
        cart: "Cart",
        quantity: "Quantity",
        total: "Total",
        order: "Order",
        empty: "Cart is empty",

        // Order
        orderSummary: "Order Summary",
        payment: "Payment",
        orderComplete: "Order has been placed",
        orderNumber: "Order Number",
        backToMain: "Back to Main",

        // Common
        cancel: "Cancel",
        confirm: "Confirm",
        back: "Back",
        language: "Language",
        won: "KRW",
    },
}

export function t(key: string, lang: "ko" | "en" = "ko"): string {
    const keys = key.split(".")
    let value: any = translations[lang]

    for (const k of keys) {
        value = value?.[k]
    }

    return value || key
}
