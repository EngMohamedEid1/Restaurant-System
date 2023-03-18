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
            type="email"
            class="form-control"
            placeholder="Enter your email"
            v-model="email"
          />
        </div>
        <span class="error-feedback" v-if="v$.email.$error">
          {{ v$.email.$errors[0].$message }}
        </span>
      </div>
      <br />
      <div class="row align-items-center g-3">
        <div class="col-auto d-block mx-auto">
          <input
            type="password"
            class="form-control"
            placeholder="Enter your password"
            v-model="pass"
          />
          <span class="error-feedback" v-if="v$.pass.$error">
            {{ v$.pass.$errors[0].$message }}
          </span>
        </div>
      </div>
      <br />
      <div class="row align-items-center g-3">
        <div class="col-auto d-block mx-auto">
          <button
            type="submit"
            class="btn btn-primary"
            @click="updataProfileNow()"
          >
            Update Profile Now
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
  
  <script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { mapActions } from "vuex";
import navBar from "../Header/navBar.vue";
export default {
  components: {
    navBar,
  },
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      email: "",
      pass: "",
      userId: "",
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(10) },
      email: { required, email },
      pass: { required, minLength: minLength(10) },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.name = JSON.parse(user).name;
      this.email = JSON.parse(user).email;
      this.pass = JSON.parse(user).pass;
      this.userId = JSON.parse(user).id;
    } else {
      this.redirectTO({ val: "signup" });
    }
  },
  methods: {
    ...mapActions(["redirectTO"]),
    async updataProfileNow() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.put(
          `http://localhost:3000/users/${this.userId}`,
          {
            name: this.name,
            email: this.email,
            pass: this.pass,
          }
        );

        if (result.status == 200) {
          localStorage.setItem("user-info", JSON.stringify(result.data));
          this.redirectTO({ val: "home" });
        }
      }
    },
  },
};
</script>
  
  <style>
</style>