<template>
  <div class="container mt-5">
    <div class="card ms-auto me-auto p-3 shadow-lg custom-card">
      <font-awesome-icon icon="user-circle" class="ms-auto me-auto user-icon" />
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="postApply()">
        <div class="form-group">
          <label for="firstname">First Name</label>
          <input
            v-model="firstname"
            type="text"
            id="firstname"
            class="form-control"
            name="firstname"
            placeholder="First Name"
            required
          />
          <div class="invalid-feedback">First Name is required.</div>
        </div>
        <div class="form-group">
          <label for="username">Surname</label>
          <input
            v-model="surname"
            type="text"
            id="surname"
            class="form-control"
            name="surname"
            placeholder="Surname"
            required
          />
          <div class="invalid-feedback">Surname is required.</div>
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input
            v-model="phone"
            type="tel"
            id="phone"
            class="form-control"
            name="phone"
            placeholder="Phone Number"
            required
          />
          <div class="invalid-feedback">Phone Number is required.</div>
        </div>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            v-model="email"
            type="email"
            id="phone"
            class="form-control"
            name="email"
            placeholder="Email Address"
            required
          />
          <div class="invalid-feedback">Email Address is required.</div>
        </div>
        <div class="form-group">
          <label for="coverLetter">Cover Letter</label>
          <textarea
            v-model="coverLetter"
            type="text"
            id="coverLetter"
            class="form-control"
            name="email"
            placeholder="Cover Letter"
            required
          />
          <div class="invalid-feedback">Cover Letter is required.</div>
        </div>
        <div class="form-group">
          <label for="resume">Resume</label>
          <input
            v-model="resume"
            type="text"
            id="resume"
            class="form-control"
            name="resume"
            placeholder="Resume"
            required
          /><br />

          <div class="invalid-feedback">Resume is required.</div>
        </div>
        <div class="form-group">
          <label for="passport">Passport</label>
          <input
            v-model="passport"
            type="text"
            id="passport"
            class="form-control"
            name="passport"
            placeholder="Passport"
            required
          /><br />
        </div>

        <button class="btn btn-success w-100 mt-3">Apply</button>
      </form>

      <router-link to="/login" class="btn btn-link" style="color: darkgray">
        We wish the best!
      </router-link>
    </div>
  </div>
</template>

<script>
import Application from "../models/application";
import vuex from "vuex";
import ApplicationService from "../services/application.service";
import axios from "axios";

export default {
  name: "application",
  data() {
    return {
      firstname: "",
      surname: "",
      phone: "",
      email: "",
      coverLetter: "",
      resume: "",
      passport: "",
      errorMessage: "",
    };
  },

  methods: {
    postApply() {
      axios
        .post(`http://localhost:5000/api/user/save`, {
          firstname: this.firstname,
          surname: this.surname,
          phone: this.phone,
          email: this.email,
          coverLetter: this.coverLetter,
          resume: this.resume,
          passport: this.passport,
        })
        .then((response) => {
          response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped></style>
