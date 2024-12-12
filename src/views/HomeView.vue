<template>
  <div>
    <div class="box">🔔 {{ billboard.content }}</div>
    <div class="columns">
      <div class="column is-three-quarters">
        <PostIndexView></PostIndexView>
      </div>
      <div class="column">
        <CardBarView></CardBarView>
      </div>
    </div>
  </div>
</template>

<script>
import { getBillboard } from "@/api/billboard";
import CardBarView from "@/views/card/CardBarView"
import PostIndexView from '@/views/post/PostIndexView'

export default {
  name: "HomeView",
  components: { CardBarView, PostIndexView },
  data() {
    return {
      billboard: {
        content: "",
      },
    };
  },
  created() {
    this.fetchBillboard();
  },
  methods: {
    async fetchBillboard() {
      getBillboard().then((value) => {
        const { data } = value;
        this.billboard = data;
      });
    },
  },
};
</script>
