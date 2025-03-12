<template>
  <div v-if="Order" class="flex flex-col gap-10">
    <div class="flex flex-col gap-5">
      <div class="text-xl text-gray-500">{{ $t("Information") }}</div>
      <div class="flex flex-row [&>div]:w-full">
        <ShopOrderTrackScreenInfoItem
          v-if="Order.Contacts.Name"
          label="Name"
          :value="Order.Contacts.Name"
        />
      </div>
      <div class="flex flex-row [&>div]:w-full">
        <ShopOrderTrackScreenInfoItem
          v-if="Order.Contacts.Email"
          label="E-mail"
          :value="Order.Contacts.Email"
        />
        <ShopOrderTrackScreenInfoItem
          v-if="Order.Contacts.Phone"
          label="Phone Number"
          :value="Order.Contacts.Phone"
        />
      </div>
    </div>
    <div class="flex flex-col gap-5">
      <div class="text-xl text-gray-500">{{ $t("Shipment") }}</div>
      <div class="flex flex-row [&>div]:w-full">
        <ShopOrderTrackScreenInfoItem
          v-if="Order.Shipment.Address1"
          label="Address 1"
          :value="Order.Shipment.Address1"
        />
        <ShopOrderTrackScreenInfoItem
          v-if="Order.Shipment.Address2"
          label="Address 2"
          :value="Order.Shipment.Address2"
        />
      </div>
      <div class="flex flex-row [&>div]:w-full">
        <ShopOrderTrackScreenInfoItem
          v-if="Order.Shipment.State"
          label="State / Region"
          :value="Order.Shipment.State"
        />
        <ShopOrderTrackScreenInfoItem
          v-if="Order.Shipment.City"
          label="City / Town"
          :value="Order.Shipment.City"
        />
      </div>
      <div class="flex flex-row [&>div]:w-full">
        <ShopOrderTrackScreenInfoItem
          v-if="Order.Shipment.Country"
          label="Country"
          :value="Order.Shipment.Country"
        />
        <ShopOrderTrackScreenInfoItem
          v-if="Order.Shipment.PostalCode"
          label="Postal Code"
          :value="Order.Shipment.PostalCode"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
const { t } = useRuntimeData();
const props = defineProps({
  Order: Object,
});
</script>
