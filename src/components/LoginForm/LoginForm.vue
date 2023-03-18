<template>
  <form @click.prevent>
    <div class="row align-items-center g-3">
      <h1>Login</h1>

      <div class="col-auto d-block mx-auto">
        <input
          autocomplete
          type="email"
          class="form-control"
          placeholder="Enter your email"
          v-model="state.email"
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
          v-model="state.pass"
          autocomplete
        />
        <span class="error-feedback" v-if="v$.pass.$error">
          {{ v$.pass.$errors[0].$message }}
        </span>
      </div>
    </div>
    <br />
    <div class="row align-items-center g-3">
      <div class="col-auto d-block mx-auto">
        <button type="submit" @click="userLogin()" class="btn btn-primary">
          Login
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          type="button"
          class="btn btn-link"
          @click="redirectTO({ val: 'signup' })"
        >
          Sign Up
        </button>
      </div>
    </div>
  </form>
  <br />
  <div class="error-feedback row align-items-center g-3">
    <div class="col-auto d-block mx-auto">
      {{ userNotFound }}
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue"; // زيادة عن ال option api
export default {
  setup() {
    const state = reactive({
      email: "",
      pass: "",
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        pass: { required, minLength: minLength(10) },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
  data() {
    return {
      userNotFound: "",
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
    async userLogin() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.get(
          `http://localhost:3000/users?email=${this.state.email}&pass=${this.state.pass}`
        );
        if (result.status == 200 && result.data.length > 0) {
          localStorage.setItem("user-info", JSON.stringify(result.data[0]));
          this.redirectTO({ val: "home" });
        } else {
          this.userNotFound = "User Not Found";
        }
      }
    },
  },
};
</script>
  
  <style>
</style>