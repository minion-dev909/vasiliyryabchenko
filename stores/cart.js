import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      order: {
        track: false,
        id: null,
        state: 0
      },
      items: [],
    };
  },
  persist: {
    key: "cart", // Уникальный ключ для localStorage
    paths: ["items"], // Сохраняем только items
    storage: persistedState.localStorage,
  },
  getters: {
    totalPrices: (state) => {
      const totals = state.items.reduce(
        (totals, { Item, Quantity }) => {
          const originalPrice = Item.Information.Price.Original * Quantity;
          const salePrice = Item.Information.Price.Sale
            ? Item.Information.Price.Sale * Quantity
            : originalPrice;
          return {
            totalOriginalPrice: totals.totalOriginalPrice + originalPrice,
            totalSalePrice: totals.totalSalePrice + salePrice,
          };
        },
        { totalOriginalPrice: 0, totalSalePrice: 0 }
      );

      // Расчет экономии
      const savings = totals.totalOriginalPrice - totals.totalSalePrice;

      return {
        ...totals,
        savings: parseFloat(savings.toFixed(2)), // Добавляем значение экономии к возвращаемому объекту
      };
    },
  },
  actions: {
    successScreen(orderId){
      this.order.id = orderId;
      this.order.state = 1;
      this.order.track = false;
      this.clearCart();
    },
    cancelIntent() {
      this.order.intentId = null;
    },
    saveIntent(intentId) {
      this.order.intentId = intentId;
    },
    closeTrack() {
      this.order.track = false;
      this.order.id = null;
      this.order.state = 0;
      console.log("close");
    },
    track(orderId) {
      this.order.state = 0;
      this.order.id = orderId;
      this.order.track = true;
    },
    openTrackModal() {
      this.order.state = 0;
      this.order.id = null;
      this.order.track = true;
    },
    closeTrackModal() {
      this.order.state = 0;
      this.order.id = null;
      this.order.track = false;
    },
    clearState() {
      this.order.track = false;
      this.order.id = null;
      this.order.state = 0;
    },
    addToCart(Item) {
      const index = this.items.findIndex((i) => i.Item._id === Item._id);
      index !== -1
        ? (this.items[index].Quantity += 1)
        : this.items.push({ Item, Quantity: 1 });
    },
    removeFromCart(_id) {
      this.items = this.items.filter(({ Item }) => Item._id !== _id);
    },
    updateQuantity(_id, Quantity) {
      const index = this.items.findIndex((i) => i.Item._id === _id);
      if (index !== -1) {
        Quantity > 0
          ? (this.items[index].Quantity = Quantity)
          : this.removeFromCart(_id);
      }
    },
    clearCart() {
      this.items = [];
    },
  },
});
