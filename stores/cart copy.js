import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      order: {
        track: false,
        id: null,
        state: 0
      },
      items: []
    };
  },
  persist: {
    key: 'cart', // Уникальный ключ для localStorage
    paths: ['items'], // Сохраняем только items
    storage: persistedState.localStorage,
  },
  getters: {
    totalPrices: (state) =>
      state.items.reduce(
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
      ),
  },
  actions: {
    closeTrack(){
      this.order.track = false; 
      this.order.id = null;
      this.order.state = 0;
      console.log('close')
    },
    track(orderId){
      this.order.state = 0;
      this.order.id = orderId;
      this.order.track = true; 
    },
    openTrackModal(){
      this.order.state = 0;
      this.order.id = null;
      this.order.track = true; 
    },
    closeTrackModal(){
      this.order.state = 0;
      this.order.id = null;
      this.order.track = false; 
    },
    clearState(){
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
    async generateUniqueId(apiBase, apiToken, attempts = 0) {
      if (attempts > 10)
        throw new Error(
          "Превышено количество попыток генерации уникального ID"
        );
      let id = Array.from({ length: 6 }, () =>
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(
          Math.floor(Math.random() * 36)
        )
      ).join("");
      const isUnique = await this.isUniqueIdExists(id, apiBase, apiToken);
      !isUnique ? console.log(id) : console.log("еще");
      return isUnique
        ? this.generateUniqueId(apiBase, apiToken, attempts + 1)
        : id;
    },
    async isUniqueIdExists(id, apiBase, apiToken) {
      try {
        const response = await fetch(
          `${apiBase}/content/item/Orders?filter=${encodeURIComponent(
            JSON.stringify({ ID: id })
          )}`,
          {
            method: "GET",
            headers: { "api-key": apiToken },
          }
        );
        return response.status !== 404;
      } catch (error) {
        console.error("Ошибка при проверке уникальности ID:", error);
        return true; // По умолчанию считаем, что ID может существовать
      }
    },
    async postOrder(payment) {
      const { apiBase, apiToken } = useRuntimeConfig().public;
      const orderId = await this.generateUniqueId(apiBase, apiToken);
      const products = this.items;
    
      const response = await fetch(`${apiBase}/content/item/Orders`, {
        method: "POST",
        headers: { "api-key": apiToken, "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            ID: orderId,
            Products: products,
            Payment: {
              ID: payment.id,
              Status: "Paid",
              Method: "PayPal",
              Created: payment.create_time,
              Updated: payment.update_time,
            },
            Shipment: {
              FullName: payment.purchase_units?.[0]?.shipping?.name?.full_name || "",
              Address1: payment.purchase_units?.[0]?.shipping?.address?.address_line_1 || "",
              Address2: payment.purchase_units?.[0]?.shipping?.address?.address_line_2 || "",
              AdminArea1: payment.purchase_units?.[0]?.shipping?.address?.admin_area_1 || "",
              AdminArea2: payment.purchase_units?.[0]?.shipping?.address?.admin_area_2 || "",
              CountryCode: payment.purchase_units?.[0]?.shipping?.address?.country_code || "",
              PostalCode: payment.purchase_units?.[0]?.shipping?.address?.postal_code || "",
            },
            Contacts: {
              Name: {
                First: payment.payer?.name?.given_name || "",
                Middle: payment.payer?.name?.middle_name || "", // Исправлено
                Last: payment.payer?.name?.surname || "" // Исправлено
              },
              CountryCode: payment.payer?.address?.country_code || "",
              Email: payment.payer?.email_address || "",
              Phone: payment.payer?.phone?.phone_number?.national_number || "",
            },
          },
        }),
      });
      const data = await response.text();
      console.log(data);
      this.clearCart()
      this.order.id = orderId; // Исправлено
      this.order.state = 1; // Исправлено
    },
    async createOrder(payment) {
      if (payment.status === "COMPLETED") {
        await this.postOrder(payment);
      }
    },
  },
});
