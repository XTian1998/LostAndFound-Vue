<template>
  <div>
    <carousel />
    <search-bar />
    <guest-book />
  </div>
</template>

<script>
import Carousel from "@/components/user/Carousel";
import SearchBar from "@/components/user/SearchBar";
import GuestBook from "@/components/user/GuestBook";

export default {
  data() {
    return {};
  },
  components: {
    Carousel,
    SearchBar,
    GuestBook
  },
};
</script>
<style scoped>
</style>