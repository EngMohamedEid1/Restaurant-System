<template>
  <div class="container">
    <nav-bar></nav-bar>
    <form @click.prevent>
      <div class="row align-items-center g-3">
        <div class="col-auto d-block mx-auto">
          <h2>Delete All Locations</h2>
          <hr />
          <p class="text-danger">
            Are You Sure you want to delete All Locations ?
          </p>
        </div>
      </div>
      <div class="row align-items-center g-3">
        <div class="col-auto d-block mx-auto">
          <button @click="goBack()" class="btn btn-info me-3">Go Back</button>
          <button class="btn btn-danger" @click="deleteAllRestaurants()">
            Delete All Now
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import navBar from "./Header/navBar.vue";
import { mapActions } from "vuex";
export default {
  components: { navBar },
  data() {
    return {
      userId: "",
      allLocationId: [],

      allItemsIdis: [],

      allCatsIdis: [],
    };
  },

  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTO({ val: "login" });
    } else {
      this.userId = JSON.parse(user).id;

      // locations
      let result = await axios.get(
        `http://localhost:3000/locations?userId=${this.userId}`
      );
      for (let i = 0; i < result.data.length; i++) {
        this.allLocationId.push(result.data[i].id);
      }

      // categories
      let resultCatLoc = await axios.get(
        `http://localhost:3000/categories?userId=${this.userId}`
      );
      for (let i = 0; i < resultCatLoc.data.length; i++) {
        this.allCatsIdis.push(resultCatLoc.data[i].id);
      }

      // items
      let resultItemsLoc = await axios.get(
        `http://localhost:3000/items?userId=${this.userId}`
      );
      for (let i = 0; i < resultItemsLoc.data.length; i++) {
        this.allItemsIdis.push(resultItemsLoc.data[i].id);
      }
    }
    // console.log(this.allLocationId);
    // console.log(this.allCatsIdis);
    // console.log(this.allItemsIdis);
  },

  methods: {
    ...mapActions(["redirectTO"]),
    goBack() {
      this.redirectTO({ val: "home" });
    },

    async deleteAllRestaurants() {
      let allItemsresults = [];
      for (let i = 0; i < this.allItemsIdis.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/items/${this.allItemsIdis[i]}`
        );
        if (result.status == 200) {
          allItemsresults.push(true);
          console.log(" items true");
        } else {
          allItemsresults.push(false);
          console.log("false");
        }
        console.log(allItemsresults);
      }

      let allCatsresults = [];
      for (let i = 0; i < this.allCatsIdis.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/categories/${this.allCatsIdis[i]}`
        );
        if (result.status == 200) {
          allCatsresults.push(true);
          console.log(" cats true");
        } else {
          allCatsresults.push(false);
          console.log("false");
        }
        console.log(allCatsresults);
      }

      let allLocresults = [];
      for (let i = 0; i < this.allLocationId.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/locations/${this.allLocationId[i]}`
        );
        if (result.status == 200) {
          allLocresults.push(true);
          console.log(" loc true");
        } else {
          allLocresults.push(false);
          console.log(" loc false");
        }
        console.log(allLocresults);
      }
      // if (allresults) {
      this.redirectTO({ val: "home" });
      // }
    },
  },
};
</script>
  
  <style>
</style>