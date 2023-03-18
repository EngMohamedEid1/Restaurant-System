<template>
  <nav id="nav">
    <router-link :to="{ name: 'home' }" exact>Home</router-link>

    &nbsp;&nbsp;&nbsp;

    <a href="#" @click="logout()">Logout</a>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>

<style lang="scss">
nav {
  margin-bottom: 50px;
  padding: 30px;

  a {
    font-weight: bolder;
    color: #467a76;
    text-decoration: none;
    font-size: large;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>