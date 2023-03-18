<template>
  <div class="profile-form container">
    <nav-bar></nav-bar>
    <form @click.prevent>
      <div class="row align-items-center g-3">
        <h1>Update Your Profle</h1>
        <div class="col-auto d-block mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Enter your name"
            v-model="name"
            disabled
          />
        </div>
      </div>
      <br />
      <div class="row align-items-center g-3">
        <div class="col-auto d-block mx-auto">
          <input
            type="email"
            class="form-control"
            placeholder="Enter your email"
            v-model="email"
            disabled
          />
        </div>
      </div>
      <br />
      <div class="row align-items-center g-3">
        <div class="col-auto d-block mx-auto">
          <input
            type="password"
            class="form-control"
            placeholder="Enter your password"
            v-model="pass"
            disabled
          />
        </div>
      </div>
      <br />
      <div class="row align-items-center g-3">
        <div class="col-auto d-block mx-auto">
          <button type="submit" class="btn btn-primary" @click="updataNow()">
            Update Profile Now
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import navBar from "../Header/navBar.vue";
export default {
  components: {
    navBar,
  },
  data() {
    return {
      name: "",
      email: "",
      pass: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.name = JSON.parse(user).name;
      this.email = JSON.parse(user).email;
      this.pass = JSON.parse(user).pass;
    } else {
      this.redirectTO({ val: "signup" });
    }
  },
  methods: {
    ...mapActions(["redirectTO"]),
    updataNow() {
      this.redirectTO({ val: "updateprofile" });
    },
  },
};
</script>

<style>
</style>