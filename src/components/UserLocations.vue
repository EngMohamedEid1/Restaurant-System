<template>
  <table class="table caption-top" v-if="allLocations.length > 0">
    <caption class="text-center">
      <span class="me-5">List Of Locations : {{ allLocations.length }}</span>
      <span>
        <router-link :to="{ name: 'deleteall' }">
          <button class="btn btn-danger">Delete All</button>
        </router-link>
      </span>
    </caption>
    <thead class="table-dark">
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Phone</th>
        <th scope="col">Address</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(loc, i) in allLocations" :key="i">
        <td>{{ loc.name }}</td>
        <td>{{ loc.phone }}</td>
        <td>{{ loc.address }}</td>
        <td>
          <router-link
            :to="{ name: 'deletelocation', params: { locationId: loc.id } }"
          >
            <button class="btn btn-danger mb-1 me-3">Delete</button>
          </router-link>
          <router-link
            :to="{ name: 'updatelocation', params: { locationId: loc.id } }"
          >
            <button class="btn btn-primary mb-1 me-3">Update</button>
          </router-link>
          <router-link :to="{ name: 'menu', params: { locationId: loc.id } }">
            <button class="btn btn-success mb-1 me-3">Menu</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else class="alert alert-warning">No Locations Added Yet</div>
</template>

<script>
export default {
  props: {
    allLocations: Array,
  },
};
</script>

<style>
</style>