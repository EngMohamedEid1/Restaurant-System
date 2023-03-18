<template>
  <form @click.prevent>
    <div class="row align-items-center g-3">
      <h1>Sign Up</h1>
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
        <span class="error-feedback" v-if="v$.email.$error">
          {{ v$.email.$errors[0].$message }}
        </span>
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
          @click="validateEmailBeforeSignUp()"
        >
          Sign Up Now
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          type="button"
          @click="redirectTO({ val: 'login' })"
          class="btn btn-link"
        >
          login
        </button>
        <div class="mt-3 alert alert-danger" v-if="alertMessage.length > 0">
          {{ alertMessage }}
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      email: "",
      pass: "",

      userEmailExist: "",

      alertMessage: "",
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(10) },
      pass: { required, minLength: minLength(10) },
      email: { required, email },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.redirectTO({ val: "home" });
    }
  },
  methods: {
    ...mapActions(["redirectTO"]),
    async validateEmailBeforeSignUp() {
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.email}`
      );
      if (result.status == 200) {
        this.userEmailExist = result.data;
        if (this.userEmailExist.length > 0) {
          this.alertMessage = "This email exists , try another one";
          console.log(this.alertMessage);
        } else {
          this.signUpNow();
        }
      }
    },
    async signUpNow() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.post("http://localhost:3000/users", {
          name: this.name,
          email: this.email,
          pass: this.pass,
        });
        if (result.status == 201) {
          localStorage.setItem("user-info", JSON.stringify(result.data));
          // console.log("success");
          this.redirectTO({ val: "home" });
        } else {
          console.log("failed");
        }
      }
    },
  },
};
</script>

<style>
.error-feedback {
  color: red;
  font-size: 12px;
}
</style>