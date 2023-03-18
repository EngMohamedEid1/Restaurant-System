<template>
  <div class="container">
    <nav-bar></nav-bar>
    <div class="home">
      <h2 class="bg-success p-5 rounded text-light">welcome {{ userName }}</h2>
      <br />
    </div>
    <router-link :to="{ name: 'profile' }">
      <button type="button" class="mb-3 btn btn-info">profile</button>
    </router-link>
    <br />
    <router-link :to="{ name: 'addnewlocation' }">
      <button type="button" class="btn btn-primary">Add New Restaurant</button>
    </router-link>
    <br />
    <br />
    <user-locations-vue :allLocations="listOfLocations"></user-locations-vue>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import navBar from "@/components/Header/navBar.vue";
import UserLocationsVue from "@/components/UserLocations.vue";
import axios from "axios";
// @ is an alias to /src

export default {
  name: "HomeView",
  components: { navBar, UserLocationsVue },
  data() {
    return {
      userName: "",
      listOfLocations: [],
      userId: "",
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTO({ val: "signup" });
    } else {
      this.userName = JSON.parse(user).name;
      this.userId = JSON.parse(user).id;
    }
    let result = await axios.get(
      `http://localhost:3000/locations?userId=${this.userId}`
    );
    if (result.status == 200 && result.data.length > 0) {
      this.listOfLocations = result.data;
    }
  },
  methods: {
    ...mapActions(["redirectTO"]),
  },
};
</script>
