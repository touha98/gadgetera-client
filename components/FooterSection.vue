<template>
  <v-footer class="py-3">
    <v-row>
      <v-col class="secondary-routes" cols="12" sm="6">
        <v-list-item dense @click="openDialer">
          <v-icon left>
            mdi-phone
          </v-icon>
          {{ contact.phone }}
        </v-list-item>
        <v-list-item dense :href="'mailto:' + contact.email">
          <v-icon left>
            mdi-email-outline
          </v-icon>
          {{ contact.email }}
        </v-list-item>
      </v-col>
      <v-col cols="12" sm="6">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-sm-right">
              <v-btn
                v-for="network in networks"
                :key="network.name"
                small
                icon
                text
                large
                target="_blank"
                :href="network.link"
              >
                <v-icon>{{ network.icon }}</v-icon>
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col class="secondary-routes" cols="12" sm="6">
        <v-list-item dense nuxt active-class="secondary--text" to="/contact">
          Contact Us
        </v-list-item>
        <v-list-item
          dense
          nuxt
          active-class="secondary--text"
          to="/terms-and-conditions"
        >
          Terms and conditions
        </v-list-item>
        <v-list-item
          dense
          nuxt
          active-class="secondary--text"
          to="/privacy-policy"
        >
          Privacy policy
        </v-list-item>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "FooterSection",
  data: () => ({
    networks: [
      {
        name: "Facebook",
        icon: "mdi-facebook",
        link: "https://www.facebook.com/bdgadgetera"
      },
      {
        name: "Messenger",
        icon: "mdi-facebook-messenger",
        link: "https://m.me/bdgadgetera"
      },
      {
        name: "Instagram",
        icon: "mdi-instagram",
        link: "https://www.instagram.com/gadget.era/"
      }
    ],
    contact: {
      phone: "+880 1517-019546",
      email: "gadgeterabd@gmail.com"
    }
  }),
  methods: {
    openDialer() {
      window.open("tel:" + this.contact.phone);
    }
  }
};
</script>
<style>
.secondary-routes > a,
.secondary-routes > div {
  max-width: fit-content;
}
</style>
