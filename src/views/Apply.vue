<template>
  <!-- <div>Register</div> -->
  <div class="container mt-5">
    <div class="card ms-auto me-auto p-3 shadow-lg custom-card">
      <font-awesome-icon icon="user-circle" class="ms-auto me-auto user-icon" />
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="postApply">
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
            type="file"
            id="resume"
            class="form-control"
            name="resume"
            placeholder="Resume"
            @change="selectResume"
            required
          /><br />
          <button type="button" class="btn btn-primary" @click="upload('resume', $event)">
            Upload Resume
          </button>
          <div class="invalid-feedback">Resume is required.</div>
        </div>
        <div class="form-group">
          <label for="passport">Passport</label>
          <input
            type="file"
            id="passport"
            class="form-control"
            name="passport"
            placeholder="Passport"
            @change="selectPassport"
            required
          /><br />
          <button
            type="button"
            class="btn btn-primary"
            @click="upload('passport', $event)"
          >
            Upload Passport
          </button>
          <div class="invalid-feedback">Passport is required.</div>
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
import { cloudinary } from "../common/Constants";

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
  // computed: {
  //   ...vuex.mapGetters(["currentUser"]),
  // },
  // mounted() {
  //   //this.currentUser?.username = this.currentUser != null && this.currentUser.username != null
  //   if (this.currentUser?.username) {
  //     this.$router.push("/profile");
  //   }
  // },

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
    // onResumeChange(e) {
    //   var files = e.target.files;
    //   if (!files.length) return;
    //   this.resume = files[0];
    // },
    // onPassportChange(e) {
    //   var [file] = e.target.files;
    //   if (!files.length) return;
    //   this.passport = file;
    // },
    selectResume(e) {
      const [file] = e.target.files;
      this.resume = file;
    },
    async upload(file_type, event) {
      console.log(event);
      console.log(this.passport);
      // event.target.innerHTML = "Loading...";
      // event.target.disabled = true;

      if (file_type === "passport") {
        let response = cloudinary(this.passport);
        if (response) {
          response.then((data) => {
            // event.target.innerHTML = "Upload Image";
            // event.target.disabled = false;
            this.passport = data.data.url;
            console.log(this.passport);
          });
        }
      } else if (file_type === "resume") {
        let response = cloudinary(this.resume);
        if (response) {
          response.then((data) => {
            event.target.innerHTML = "Upload Resume";
            event.target.disabled = false;
            this.resume = data.data.url;
            console.log(this.resume);
          });
        }
      }

      // this[file_type] = url
    },

    selectPassport(e) {
      const [file] = e.target.files;
      this.passport = file;
    },

    // uploadPassport = (file) => {
    //   const preset = "a8bs3p6w";
    //   let cloudinaryUrl = "https://api.cloudinary.com/v1_1/a8bs3p6w/upload";
    //   const fd = new FormData();
    //   fd.append("upload_preset", preset);
    //   fd.append("file", file);
    //   const data = axios.post(cloudinaryUrl, fd);
    //   console.log(data);
    //   return data;
    // },
    // uploadResume() {
    //   const preset = "gk7pdfe7";
    //   let cloudinaryUrl = "https://api.cloudinary.com/v1_1/gk7pdfe7/upload";
    //   const fd = new FormData();
    //   fd.append("upload_preset", preset);
    //   fd.append("file", this.resume);
    //   const data = axios.post(cloudinaryUrl, fd);
    //   console.log(data);
    //   return data;
    // },

    // handleApply() {
    //   if (
    //     !this.firstname ||
    //     !this.surname ||
    //     !this.phone ||
    //     !this.email ||
    //     !this.coverLetter ||
    //     !this.resume ||
    //     !this.passport
    //   ) {
    //     return;
    //   }

    // this.loading = true;

    //   ApplicationService.apply(this.formData)
    //     .then(() => {
    //       this.$router.push("/home");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       if (err?.response?.status === 409) {
    //         this.errorMessage = "Username is not valid.";
    //       } else {
    //         this.errorMessage = "Unexpected error occured";
    //       }
    //     })
    //     .then(() => (this.loading = false));
  },
};
</script>

<style scoped></style>
