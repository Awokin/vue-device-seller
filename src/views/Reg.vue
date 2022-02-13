<template>
  <div class="modal fade" id="deviceModal" tabIndex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <form
          @submit.prevent="saveUserApp"
          noValidate
          :class="submitted ? 'was-validated' : ''"
        >
          <div class="modal-header">
            <h5 class="modal-title">Apply</h5>
            <button class="btn-close" type="button" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="alert alert-danger" v-if="errorMessage">
              <strong>Error!</strong>{{ errorMessage }}
            </div>

            <div class="form-group">
              <label for="firstname">First Name </label>
              <input
                v-model="reg.firstname"
                type="text"
                id="firstname"
                name="firstname"
                class="form-control"
                required
              />
              <div class="invalid-feedback">First name is required.</div>
            </div>
            <!-- </div> -->

            <div class="form-group">
              <label for="surname">Surname</label>
              <input
                v-model="reg.surname"
                type="text"
                id="surname"
                name="surname"
                class="form-control"
                required
              />
              <div class="invalid-feedback">Surname is required.</div>
            </div>

            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input
                v-model="reg.phone"
                type="number"
                id="phone"
                name="phone"
                class="form-control"
                required
              />
              <div class="invalid-feedback">Phone Number is required.</div>
            </div>

            <div class="form-group">
              <label for="email">Email Address</label>
              <input
                v-model="reg.email"
                type="text"
                id="email"
                name="email"
                class="form-control"
                required
              />
              <div class="invalid-feedback">Email Address is required.</div>
            </div>
            <!-- </div> -->
            <div class="form-group">
              <label for="coverLetter">Cover Letter</label>
              <textarea
                v-model="reg.coverLetter"
                id="coverLetter"
                name="coverLetter"
                class="form-control"
                required
              ></textarea>
              <div class="invalid-feedback">Cover Letter is required.</div>
            </div>
            <div class="form-group">
              <label for="resume">Resume</label>
              <input
                v-model="reg.resume"
                type="text"
                id="resume"
                name="resume"
                class="form-control"
                required
              />
              <div class="invalid-feedback">Resume is required.</div>
            </div>
            <button
              class="btn btn-success w-100 mt-3"
              @click="submitted = true"
              :disabled="loading"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import UserApp from "../models/reg";
import UserAppService from "../services/reg.service";
import vuex from "vuex";

export default {
  name: "reg",
  data() {
    return {
      userapp: new UserApp(),
      errorMessage: "",
      loading: false,
      submitted: false,
    };
  },
  computed: {
    ...vuex.mapGetters(["currentUser"]),
  },
  methods: {
    saveUserApp() {
      if (
        !this.userapp.firstname ||
        !this.userapp.surname ||
        !this.userapp.phone ||
        !this.userapp.email ||
        !this.userapp.coverLetter ||
        !this.userapp.resume ||
        !this.userapp.passport
      ) {
        return;
      }
      this.loading = true;
      UserAppService.signup(this.userapp)
        .then(() => {
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.status === 409) {
            this.errorMessage = "Username is not valid.";
          } else {
            this.errorMessage = "Unexpected error occured";
          }
        })
        .then(() => (this.loading = false));
    },
  },
};
</script>

<style scoped></style>
