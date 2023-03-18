<template>
  <div class="container">
    <nav-bar></nav-bar>
    <div class="d-flex justify-content-center">
      <!-- <div>
        <router-link :to="{ name: 'viewcategories' }">
          <button class="btn btn-info me-3">Back To Categories</button>
        </router-link>
      </div> -->
      <br />
      <div>
        <router-link :to="{ name: 'menu' }">
          <button class="btn btn-dark">Back To Menu</button>
        </router-link>
      </div>
    </div>
    <div class="locInfo">
      <table class="table w-25 mx-auto">
        <tr scope="col">
          <th>
            <h1>
              {{ locName }}
            </h1>
          </th>
        </tr>
        <tr scope="col">
          <td>
            <p>
              {{ locPhone }}
            </p>
          </td>
        </tr>
        <tr scope="col">
          <td>
            <p>
              {{ locAddress }}
            </p>
          </td>
        </tr>
      </table>
      <hr />
      <form @click.prevent>
        <div class="row align-items-center g-3">
          <div class="col-auto d-block mx-auto">
            <h2>Update Category</h2>
          </div>
        </div>
        <br />
        <div class="row align-items-center g-3">
          <div class="col-auto d-block mx-auto">
            <input
              type="text"
              class="form-control"
              placeholder="Add Category Name"
              v-model.trim="name"
            />
            <span class="error-feedback" v-if="v$.name.$error">
              {{ v$.name.$errors[0].$message }}
            </span>
          </div>
        </div>

        <br />
        <div class="row align-items-center g-3">
          <div class="col-auto d-block mx-auto">
            <button
              type="button "
              @click="updateCategory()"
              class="btn btn-primary"
            >
              Update Now
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import axios from "axios";
import { mapActions, mapMutations } from "vuex";
import navBar from "./Header/navBar.vue";
export default {
  components: { navBar },
  data() {
    return {
      v$: useVuelidate(),

      userId: "",
      locId: "",

      locName: "",
      locAddress: "",
      locPhone: "",

      name: "",

      listOfUserCategories: [],

      catId: this.$route.params.catId,
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(3), maxLength: maxLength(15) },
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTO({ val: "signup" });
    } else {
      this.userId = JSON.parse(user).id;
      this.locId = this.$route.params.locationId;
      this.isLoggedInUser();
      this.displayAllCategories({
        userIdIs: this.userId,
        locationIdIs: this.locId,
      });
      this.canUserAccessThisLocation({
        userIdIs: this.userId,
        locationIdIs: this.locId,
        redirectTOPage: "home",
      });
      this.getLocationInfo(this.userId, this.locId);
      this.displayUserCategories(this.userId, this.locId);
      this.canUserAccessThisCategory({
        userIdIs: this.userId,
        locationIdIs: this.locId,
        catIdIs: this.catId,
        redirectTOPage: "home",
      });
    }
  },
  methods: {
    ...mapActions(["redirectTO"]),
    ...mapMutations([
      "isLoggedInUser",
      "displayAllCategories",
      "canUserAccessThisLocation",
      "canUserAccessThisCategory",
    ]),
    async getLocationInfo(userId, locId) {
      let result = await axios.get(
        `http://localhost:3000/locations?userId=${userId}&id=${locId}`
      );
      let locDetails = [];
      if (result.status == 200 && result.data.length > 0) {
        locDetails = result.data;
        this.locName = locDetails[0].name;
        this.locAddress = locDetails[0].address;
        this.locPhone = locDetails[0].phone;
      }
    },
    async displayUserCategories(userId, locId) {
      let result = await axios.get(
        `http://localhost:3000/categories?userId=${userId}&locationId=${locId}`
      );
      if (result.status == 200) {
        this.listOfUserCategories = result.data;
      }
    },
    async updateCategory() {
      this.v$.$validate();
      let filterCategoryName = this.listOfUserCategories.filter(
        (v) => v.name.toLowerCase() == this.name.toLowerCase()
      );
      if (filterCategoryName.length > 0) {
        console.log("name already exists");
      } else {
        if (!this.v$.$error) {
          let result = await axios.put(
            `http://localhost:3000/categories/${this.catId}`,
            {
              name: this.name,
              userId: this.userId,
              locationId: parseInt(this.locId),
            }
          );
          if (result.status == 200) {
            this.$router.push({
              name: "menu",
            });
          }
        }
      }
    },
  },
};
</script>
  
  <style>
</style>