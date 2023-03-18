import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupViewVue from "@/views/SignupView.vue";
import LoginViewVue from "@/views/LoginView.vue";
import ProfileViewVue from "@/views/ProfileView.vue";
import UpdateProfile from "@/components/Profile/UpdateProfile.vue";
import AddNewLocationVue from "@/components/AddNewLocation.vue";
import DeleteLocation from "@/components/DeleteLocation.vue";
import ErrorPageVue from "@/components/ErrorPage.vue";
import DeleteAllVue from "@/components/DeleteAll.vue";
import UpdateLocation from "@/components/UpdateLocation.vue";
import MenuForm from "@/components/MenuForm.vue";
import AddCategoryVue from "@/components/AddCategory.vue";
import ViewCategoriesVue from "@/components/ViewCategories.vue";
import UpdateCategoryVue from "@/components/UpdateCategory.vue";
import DeleteCategoryVue from "@/components/DeleteCategory.vue";
import DeleteAllCategoriesVue from "@/components/DeleteAllCategories.vue";
import AddItemVue from "@/components/Item/AddItem.vue";
import UpdateItemVue from "@/components/Item/UpdateItem.vue";
import DeleteItemVue from "@/components/Item/DeleteItem.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/sign-up",
    name: "signup",
    component: SignupViewVue,
  },
  {
    path: "/login",
    name: "login",
    component: LoginViewVue,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileViewVue,
  },
  {
    path: "/update-profile",
    name: "updateprofile",
    component: UpdateProfile,
  },
  {
    path: "/add-new-location",
    name: "addnewlocation",
    component: AddNewLocationVue,
  },
  {
    path: "/delete-location/:locationId",
    name: "deletelocation",
    component: DeleteLocation,
  },
  {
    path: "/delete-all",
    name: "deleteall",
    component: DeleteAllVue,
  },
  {
    path: "/update-location/:locationId",
    name: "updatelocation",
    component: UpdateLocation,
  },
  {
    path: "/menu/location/:locationId",
    name: "menu",
    component: MenuForm,
  },
  {
    path: "/menu/category/view/:locationId",
    name: "viewcategories",
    component: ViewCategoriesVue,
  },
  {
    path: "/menu/category/add/:locationId",
    name: "addcategory",
    component: AddCategoryVue,
  },
  {
    path: "/menu/category/update/:locationId/:catId",
    name: "updatecategory",
    component: UpdateCategoryVue,
  },
  {
    path: "/menu/category/delete/:locationId/:catId",
    name: "deletecategory",
    component: DeleteCategoryVue,
  },
  {
    path: "/menu/category/delete-all-categories/:locationId",
    name: "deleteallcategories",
    component: DeleteAllCategoriesVue,
  },
  {
    path: "/menu/category/add-item/:locationId",
    name: "additem",
    component: AddItemVue,
  },
  {
    path: "/menu/update-item/:itemId/loc/:locationId",
    name: "updateitem",
    component: UpdateItemVue,
  },
  {
    path: "/menu/delete-item/:itemId/loc/:locationId",
    name: "deleteitem",
    component: DeleteItemVue,
  },
  {
    path: "/:catchAll(.*)",
    name: "errorpage",
    component: ErrorPageVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.name} | ${process.env.VUE_APP_TITLE}`;
  if (to.name == null) {
    document.title = "unknown page";
  }
  next();
});

export default router;
