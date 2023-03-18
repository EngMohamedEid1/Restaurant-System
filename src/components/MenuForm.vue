<template>
  <div class="container">
    <nav-bar></nav-bar>
    <div class="buttons">
      <router-link :to="{ name: 'viewcategories' }">
        <button class="btn btn-success float-start">
          View / Add Categories
        </button>
      </router-link>
      <router-link :to="{ name: 'additem' }">
        <button class="btn btn-success float-end" v-if="numOfCategories > 0">
          Add New Items
        </button>
      </router-link>
    </div>
    <div class="clearfix"></div>
    <div class="user">
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
    <br />

    <hr />
    <div class="each-category">
      <div
        class="text-start text-success"
        v-for="(cat, i) in listOfCategories"
        :key="i"
      >
        <h3>{{ cat.name }}</h3>
        <div class="each-item" v-for="(item, i) in listOfUserItems" :key="i">
          <div c v-if="cat.id == item.catId">
            <div class="d-flex flex-column mx-auto w-25">
              <div class="d-flex justify-content-between text-dark">
                <h4>{{ item.name }}</h4>
                <p>{{ item.price }}$</p>
              </div>
              <p class="text-muted">{{ item.Description }}</p>
              <div class="d-flex justify-content-between">
                <router-link
                  :to="{
                    name: 'updateitem',
                    params: { itemId: item.id, locationId: locId },
                  }"
                >
                  <button class="btn btn btn-outline-primary">Update</button>
                </router-link>
                <router-link
                  :to="{
                    name: 'deleteitem',
                    params: { itemId: item.id, locationId: locId },
                  }"
                >
                  <button class="btn btn btn-outline-danger">Delete</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import navBar from "./Header/navBar.vue";
import axios from "axios";
export default {
  data() {
    return {
      userId: "",
      userName: "",
      locId: "",

      locName: "",
      locAddress: "",
      locPhone: "",

      listOfUserItems: [],
    };
  },
  components: { navBar },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTO({ val: "signup" });
    } else {
      this.userName = JSON.parse(user).name;
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
      this.getCurrentUserItems(this.userId, this.locId);
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
    async getCurrentUserItems(userId, locId) {
      let result = await axios.get(
        `http://localhost:3000/items?userId=${userId}&locId=${locId}`
      );
      if (result.status == 200) {
        this.listOfUserItems = result.data;
      }
      console.log(this.listOfUserItems);
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