<template>
  <div style="display:contents;">
    <v-container style="max-width:1920px;" class="pa-0">
      <v-img :src="cover" :lazy-src="thumbnail" class="subcategory-cover">
        <v-overlay class="align-end justify-start" absolute>
          <v-card dark width="100%" color="transparent">
            <v-card-title class="text-h5 text-md-h4">
              {{ subcategory.name }}
            </v-card-title>
            <v-card-subtitle class="text-subtitle-1">
              {{ subcategory.description }}
            </v-card-subtitle>
          </v-card>
        </v-overlay>
      </v-img>
    </v-container>
    <div class="loadingbar-wrapper">
      <v-progress-linear v-show="loading" indeterminate />
    </div>
    <v-container>
      <v-row>
        <v-col
          v-show="!products.length && loading"
          class="pa-1 pa-sm-3"
          cols="6"
          sm="4"
          md="3"
        >
          <v-skeleton-loader type="card" />
        </v-col>
        <v-col v-show="!(products.length || loading)" class="text-center">
          No products found
        </v-col>
        <v-col
          v-for="product in products"
          :key="product.id"
          class="pa-1 pa-sm-3"
          cols="6"
          sm="4"
          md="3"
        >
          <product-card :product="product" />
        </v-col>

        <v-col class="text-center" cols="12">
          <v-btn
            :disabled="!products.length"
            color="primary"
            outlined
            large
            @click="fetchMore"
          >
            load more
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SubCategory",
  data: () => ({
    loading: false,
    cover: "",
    thumbnail: "",
    subcategory: {
      products: []
    },
    products: [],
    filterParams: {
      sortField: "published_at",
      sortOrder: "desc",
      subcatKey: null
    }
  }),
  async fetch() {
    try {
      this.loading = true;
      const key = this.$route.params.key;
      this.filterParams.subcatKey = key;
      const [subcats, products] = await Promise.all([
        this.$repositories.subcategory.get({ key }),
        this.$repositories.product.get(this.filterParams)
      ]);
      const [subcategory] = subcats;
      if (!subcategory) {
        return this.$nuxt.error({ statusCode: 404, message: "not found" });
      }

      this.products = products;
      this.cover = subcategory.cover.url;
      this.thumbnail = subcategory.cover.formats.thumbnail.url;
      this.subcategory = subcategory;
    } catch (error) {
      this.$nuxt.error(error);
    } finally {
      this.loading = false;
    }
  },
  head() {
    return {
      title: this.subcategory.name,
      meta: [
        { hid: "title", name: "title", content: this.subcategory.name },
        { hid: "og:title", name: "og:title", content: this.subcategory.name },
        {
          hid: "description",
          name: "description",
          content: this.subcategory.description
        },

        {
          hid: "og:description",
          name: "og:description",
          content: this.subcategory.description
        },
        { hid: "og:image", name: "og:image", content: this.cover }
      ]
    };
  },
  methods: {
    async fetchMore() {
      try {
        const products = await this.$repositories.product.get(
          this.filterParams,
          { start: this.products.length }
        );
        if (!products.length) {
          return this.$store.commit("SHOW_ALERT", "No more products to show");
        }
        this.products = [...this.products, ...products];
      } catch (error) {
        this.$store.commit("SHOW_ALERT", error.message);
      }
    }
  }
};
</script>

<style>
@media (min-width: 960px) {
  .subcategory-cover {
    height: 300px;
  }
}
@media (min-width: 600px) and (max-width: 960px) {
  .subcategory-cover {
    height: 240px;
  }
}
@media (max-width: 600px) {
  .subcategory-cover {
    height: 200px;
  }
}
</style>
