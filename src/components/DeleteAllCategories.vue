<template>
  <div class="container">
    <nav-bar></nav-bar>
    <form @click.prevent>
      <div class="row align-items-center g-3">
        <div class="col-auto d-block mx-auto">
          <h2>Delete All Categories</h2>
          <hr />
          <p class="text-danger">
            Are You Sure you want to delete All Categories ?
          </p>
        </div>
      </div>
      <div class="row align-items-center g-3">
        <div class="col-auto d-block mx-auto">
          <button @click="goBack()" class="btn btn-info me-3">Go Back</button>
          <button class="btn btn-danger" @click="deleteAllCategories()">
            Delete Now
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
    
    <script>
import axios from "axios";
import { mapActions, mapMutations } from "vuex";
import navBar from "./Header/navBar.vue";
export default {
  components: { navBar },
  data() {
    return {
      userId: "",
      locId: "",
      locationData: "",

      catId: "",

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
      this.catId = this.$route.params.catId;
      this.canUserAccessThisLocation({
        userIdIs: this.userId,
        locationIdIs: this.locId,
        // redirectTOPage: "home",
      });

      //   this.validateUserWithLocation();
      //   this.canUserAccessThisCategory({
      //     userIdIs: this.userId,
      //     locationIdIs: this.locId,
      //     catIdIs: this.catId,
      //     redirectTOPage: "home",
      //   });
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
    console.log(this.allItemsIdis);
    console.log(this.allCatsIdis);
  },

  methods: {
    ...mapActions(["redirectTO"]),
    ...mapMutations(["canUserAccessThisCategory", "canUserAccessThisLocation"]),
    goBack() {
      this.redirectTO({ val: "home" });
    },
    // async validateUserWithLocation() {
    //   let result = await axios.get(
    //     `http://localhost:3000/locations?userId=${this.userId}&id=${this.locId}`
    //   );
    //   if ((result.status = 200 && result.data.length > 0)) {
    //     this.locationData = result.data;
    //     this.name = this.locationData[0].name;
    //     this.phone = this.locationData[0].phone;
    //     this.address = this.locationData[0].address;
    //   }
    // },
    async deleteAllCategories() {
      let allCatsResults = [];
      for (let i = 0; i < this.allCatsIdis.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/categories/${this.allCatsIdis[i]}`
        );

        if (result.status == 200) {
          allCatsResults.push(true);
        } else {
          allCatsResults.push(false);
        }
      }
      let allItemsResults = [];
      for (let i = 0; i < this.allItemsIdis.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/items/${this.allItemsIdis[i]}`
        );
        if (result.status == 200) {
          allItemsResults.push(true);
        } else {
          allItemsResults.push(false);
        }
      }
      if (!allCatsResults.includes(false) && !allItemsResults.includes(false)) {
        this.redirectTO({ val: "home" });
      }
    },
  },
};
</script>
    
    <style>
</style>