<template>
  <div class="container">
    <nav-bar></nav-bar>
    <router-link :to="{ name: 'addcategory' }">
      <button class="btn btn-dark me-5">Add Category</button>
    </router-link>
    <router-link :to="{ name: 'menu' }">
      <button class="btn btn-info">Back To Menu</button>
    </router-link>
    <br />
    <br />
    <div class="locInfo">
      <h1>
        {{ locName }}
      </h1>

      <p>
        {{ locPhone }}
      </p>

      <p>
        {{ locAddress }}
      </p>
    </div>
    <br />
    <table
      class="table table-striped caption-top"
      v-if="listOfCategories.length > 0"
    >
      <caption class="text-center">
        <span class="me-5"
          >List Of Categories : {{ listOfCategories.length }}</span
        >
        <span>
          <router-link
            :to="{
              name: 'deleteallcategories',
            }"
          >
            <button class="btn btn-danger">Delete All</button>
          </router-link>
        </span>
      </caption>
      <thead class="table-dark">
        <tr>
          <th scope="col">Name</th>
          <!-- <th scope="col">Phone</th>
          <th scope="col">Address</th> -->
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cat, i) in listOfCategories" :key="i">
          <td>{{ cat.name }}</td>
          <td>
            <router-link
              :to="{
                name: 'updatecategory',
                params: { catId: cat.id, locationId: cat.locationId },
              }"
            >
              <button class="btn btn-info me-3">Update</button>
            </router-link>
            <router-link
              :to="{
                name: 'deletecategory',
                params: { catId: cat.id, locationId: cat.locationId },
              }"
            >
              <button class="btn btn-danger me-3">Delete</button>
            </router-link>
          </td>

          <!-- <td>
            <router-link
              :to="{ name: 'deletelocation', params: { locationId: loc.id } }"
            >
              <button class="btn btn-danger me-3">Delete</button>
            </router-link>
            <router-link
              :to="{ name: 'updatelocation', params: { locationId: loc.id } }"
            >
              <button class="btn btn-primary me-3">Update</button>
            </router-link>
            <router-link :to="{ name: 'menu', params: { locationId: loc.id } }">
              <button class="btn btn-success">Menu</button>
            </router-link>
          </td> -->
        </tr>
      </tbody>
    </table>
    <div class="alert alert-danger" v-else>
      there is no categories added yet
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapMutations, mapState } from "vuex";
import NavBar from "./Header/navBar.vue";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      locId: this.$route.params.locationId,
      userId: "",

      locName: "",
      locAddress: "",
      locPhone: "",
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTO({ val: "signup" });
    } else {
      this.userId = JSON.parse(user).id;

      this.canUserAccessThisLocation({
        userIdIs: this.userId,
        locationIdIs: this.locId,
        redirectTOPage: "home",
      });
      this.getLocationInfo(this.userId, this.locId);
      this.displayAllCategories({
        userIdIs: this.userId,
        locationIdIs: this.locId,
      });
    }
  },
  methods: {
    ...mapActions(["redirectTO"]),
    ...mapMutations([
      "isLoggedInUser",
      "displayAllCategories",
      "canUserAccessThisLocation",
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
  },
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "loggedInUserId",
      "numOfCategories",
      "listOfCategories",
    ]),
  },
};
</script>

<style>
</style>