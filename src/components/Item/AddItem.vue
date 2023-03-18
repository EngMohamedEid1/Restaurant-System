<template>
  <div class="container">
    <nav-bar></nav-bar>

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
    <hr />
    <form @click.prevent>
      <h2>Add New Item</h2>
      <br />
      <div class="row">
        <div class="w-25 col-auto mx-auto">
          <div class="form-floating mb-3">
            <input
              :class="{ 'form-error': v$.itemName.$error }"
              type="text"
              class="form-control"
              id="floatingItem"
              placeholder=" Enter Item Name"
              v-model.trim="itemName"
            />
            <label for="floatingItem"> Enter Item Name</label>
            <span class="error-feedback" v-if="v$.itemName.$error">
              {{ v$.itemName.$errors[0].$message }}
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="w-25 col-auto mx-auto">
          <div class="form-floating mb-3">
            <input
              :class="{ 'form-error': v$.itemPrice.$error }"
              type="number"
              class="form-control"
              id="floatingItemPrice"
              placeholder=" Enter Item Price"
              v-model.trim="itemPrice"
            />
            <label for="floatingItemPrice"> Enter Item Price</label>
            <span class="error-feedback" v-if="v$.itemPrice.$error">
              {{ v$.itemPrice.$errors[0].$message }}
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="w-25 col-auto mx-auto">
          <div class="form-floating mb-3">
            <input
              :class="{ 'form-error': v$.itemQty.$error }"
              type="number"
              class="form-control"
              v-model.trim="itemQty"
              id="floatingItemQty"
              placeholder=" Enter Item qty"
            />
            <label for="floatingItemQty"> Enter Item quantities</label>
            <span class="error-feedback" v-if="v$.itemQty.$error">
              {{ v$.itemQty.$errors[0].$message }}
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="w-25 col-auto mx-auto">
          <div class="form-floating mb-3">
            <textarea
              :class="{ 'form-error': v$.Description.$error }"
              class="form-control"
              placeholder="Enter Item Description"
              v-model.trim="Description"
              id="floatingItemDesc"
            ></textarea>

            <label for="floatingItemDesc"> Enter Item Description</label>
            <span class="error-feedback" v-if="v$.Description.$error">
              {{ v$.Description.$errors[0].$message }}
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="w-25 col-auto mx-auto">
          <div class="form-floating mb-3">
            <select
              :class="{ 'form-error': v$.pickedCategory.$error }"
              class="form-select"
              id="floatingSelect"
              v-model.trim="pickedCategory"
            >
              <option
                v-for="(cat, i) in listOfCategories"
                :key="i"
                :value="cat.id"
              >
                {{ cat.name }}
              </option>
            </select>
            <label for="floatingSelect"> Select Category Name</label>
            <span class="error-feedback" v-if="v$.pickedCategory.$error">
              {{ v$.pickedCategory.$errors[0].$message }}
            </span>
            <!-- <label for="floatingSelect">Works with selects</label> -->
          </div>
        </div>
      </div>
      <div class="row align-items-center g-3">
        <div class="col-auto d-block mx-auto">
          <button type="button" @click="addNewItem()" class="btn btn-primary">
            Add Now
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
  
  <script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, between } from "@vuelidate/validators";
import { mapActions, mapState, mapMutations } from "vuex";
import navBar from "@/components/Header/navBar.vue";
import axios from "axios";
export default {
  data() {
    return {
      v$: useVuelidate(),

      userId: "",
      userName: "",
      locId: "",

      locName: "",
      locAddress: "",
      locPhone: "",

      pickedCategory: "",
      Description: "",
      itemName: "",
      itemPrice: "",
      itemQty: "",
    };
  },
  validations() {
    return {
      itemName: { required, minLength: minLength(5) },
      Description: { required, minLength: minLength(5) },
      itemQty: { required, between: between(1, 10000) },
      pickedCategory: { required },
      itemPrice: { required, between: between(10, 1000) },
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
    async addNewItem() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("error");
        let result = await axios.post("http://localhost:3000/items", {
          name: this.itemName,
          price: this.itemPrice,
          Description: this.Description,
          Qty: this.itemQty,
          userId: this.userId,
          locId: parseInt(this.locId),
          catId: this.pickedCategory,
        });
        if (result.status == 201) {
          this.redirectTO({ val: "home" });
        } else {
          console.log("faild added");
        }
      } else {
        console.log("error");
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
.form-error {
  border-color: rgb(240, 0, 0);
}
</style>