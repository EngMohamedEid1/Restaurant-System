<template>
  <div class="container">
    <nav-bar></nav-bar>
    <form @click.prevent>
      <div class="row align-items-center g-3">
        <div class="col-auto d-block mx-auto">
          <h2>Delete Location</h2>
          <hr />
          <p class="text-danger">
            Are You Sure you want to delete this Location ?
          </p>
          Restaurant Name : &nbsp;{{ name }}
          <br />
          <br />
          Restaurant phone :&nbsp;{{ phone }}
          <br />
          <br />
          Restaurant Address :&nbsp; {{ address }}
          <br />
          <br />
          <br />
        </div>
      </div>
      <div class="row align-items-center g-3">
        <div class="col-auto d-block mx-auto">
          <button @click="goBack()" class="btn btn-info me-3">Go Back</button>
          <button class="btn btn-danger" @click="deleteRestaurant()">
            Delete Now
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import navBar from "./Header/navBar.vue";
export default {
  components: { navBar },
  data() {
    return {
      name: "",
      phone: "",
      address: "",
      userId: "",
      locId: "",
      locationData: "",

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
      this.locId = this.$route.params.locationId;
      this.validateUserWithLocation();
      let result = await axios.get(
        `http://localhost:3000/items?locId=${this.locId}`
      );
      let resultLen = result.data.length;
      for (let i = 0; i < resultLen; i++) {
        this.allItemsIdis.push(result.data[i].id);
      }
      let resultForCategories = await axios.get(
        `http://localhost:3000/categories?locationId=${this.locId}`
      );
      let resultLength = resultForCategories.data.length;
      for (let i = 0; i < resultLength; i++) {
        this.allCatsIdis.push(resultForCategories.data[i].id);
      }
    }
    console.log(` items : ${this.allItemsIdis}`);
    console.log(` cats : ${this.allCatsIdis}`);
  },
  methods: {
    ...mapActions(["redirectTO"]),
    goBack() {
      this.redirectTO({ val: "home" });
    },
    async validateUserWithLocation() {
      let result = await axios.get(
        `http://localhost:3000/locations?userId=${this.userId}&id=${this.locId}`
      );
      if ((result.status = 200 && result.data.length > 0)) {
        this.locationData = result.data;
        this.name = this.locationData[0].name;
        this.phone = this.locationData[0].phone;
        this.address = this.locationData[0].address;
      } else {
        this.redirectTO({ val: "home" });
      }
    },
    async deleteRestaurant() {
      let allItemsResults = [];
      for (let i = 0; i < this.allItemsIdis.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/items/${this.allItemsIdis[i]}`
        );
        if (result.status == 200) {
          allItemsResults.push(true);
          console.log(" item done");
        }
      }
      let allCatsResults = [];
      for (let i = 0; i < this.allCatsIdis.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/categories/${this.allCatsIdis[i]}`
        );

        if (result.status == 200) {
          allCatsResults.push(true);
          console.log(" cat done");
        }
      }
      let result = await axios.delete(
        `http://localhost:3000/locations/${this.locId}`
      );
      if (
        result.status == 200 &&
        !allCatsResults.includes(false) &&
        !allItemsResults.includes(false)
      ) {
        this.redirectTO({ val: "home" });
        // console.log("true");
      }
    },
  },
};
</script>

<style>
</style>