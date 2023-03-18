<template>
  <div class="container">
    <nav-bar></nav-bar>

    <h2>Add New Restaurant</h2>
    <hr />

    <form @click.prevent>
      <div class="row align-items-center g-3">
        <div class="col-auto d-block mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Restaurant Name"
            v-model="name"
          />
          <span class="error-feedback" v-if="v$.name.$error">
            {{ v$.name.$errors[0].$message }}
          </span>
        </div>
      </div>
      <br />
      <div class="row align-items-center g-3">
        <div class="col-auto d-block mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Enter phone"
            v-model="phone"
          />
          <span class="error-feedback" v-if="v$.phone.$error">
            {{ v$.phone.$errors[0].$message }}
          </span>
        </div>
      </div>
      <br />
      <div class="row align-items-center g-3">
        <div class="col-auto d-block mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Enter Address"
            v-model="address"
          />
          <span class="error-feedback" v-if="v$.address.$error">
            {{ v$.address.$errors[0].$message }}
          </span>
        </div>
      </div>
      <br />
      <div class="row align-items-center g-3">
        <div
          class="col-auto d-block mx-auto alert alert-success"
          v-if="successMsg.length > 0"
        >
          {{ successMsg }}
        </div>
        <div
          class="col-auto d-block mx-auto alert alert-danger"
          v-if="errorMsg.length > 0"
        >
          {{ errorMsg }}
        </div>
      </div>

      <br />
      <div class="row align-items-center g-3">
        <div class="col-auto d-block mx-auto">
          <button type="button " @click="addNow()" class="btn btn-primary">
            Add Now
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
  
  <script>
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { mapActions } from "vuex";
import axios from "axios";
import navBar from "./Header/navBar.vue";
export default {
  components: { navBar },
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      phone: "",
      address: "",
      userId: "",
      errorMsg: "",
      successMsg: "",
    };
  },
  validations() {
    return {
      name: { required },
      phone: { required },
      address: { required, minLength: minLength(10) },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      //   this.redirectTO({ val: "home" });
      this.userId = JSON.parse(user).id;
    }
  },
  methods: {
    ...mapActions(["redirectTO"]),
    async addNow() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.post("http://localhost:3000/locations", {
          name: this.name,
          phone: this.phone,
          address: this.address,
          userId: this.userId,
        });
        if (result.status == 201) {
          this.successMsg = "Good Job";
          this.errorMsg = "";
          setTimeout(() => {
            this.redirectTO({ val: "home" });
            this.name = "";
            this.phone = "";
            this.address = "";
            this.v$.name.$errors[0].$message = "";
            this.v$.phone.$errors[0].$message = "";
            this.v$.address.$errors[0].$message = "";
          }, 2000);
        } else {
          this.successMsg = "";
          this.errorMsg = "Something went Wrong";
        }
      }
    },
  },
};
</script>
  
  <style>
</style>