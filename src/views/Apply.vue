<template>
  <!-- <div>Register</div> -->
  <div class="container mt-5">
    <div class="card ms-auto me-auto p-3 shadow-lg custom-card">
      <font-awesome-icon icon="user-circle" class="ms-auto me-auto user-icon" />
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      <form>
        <!-- <Field name="name" rules="required" /> -->
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
            accept=".pdf"
            name="resume"
            ref="resume"
            placeholder="Resume"
            @change="selectResume"
            required
          /><br />
          <p>{{resumeErrorMessage}}</p>
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
            accept="image/jpeg"
            placeholder="Passport"
            ref="passport"
            @change="selectPassport"
            required
          /><br />
          <p>{{passportErrorMessage}}</p>
          <button
            type="button"
            class="btn btn-primary"
            @click="upload('passport', $event)"
          >
            Upload Passport
          </button>
          <div class="invalid-feedback">Passport is required.</div>
        </div>

        <button class="btn btn-success w-100 mt-3" type="submit" @click="postApply()">Apply</button>
      </form>

      <router-link to="/login" class="btn btn-link" style="color: darkgray">
        We wish you the best!
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
import { useField } from 'vee-validate';

export default {
  name: "application",
  // components: {
  //   Field,
  //   Form,
  // },
  setup() {
    // a simple `name` field with basic required validator
    const { firstname, errorMessage } = useField('name', inputValue => !!inputValue);
    return {
      firstname,
      errorMessage,
    };
  },
  data() {
    return {
      firstname: "",
      surname: "",
      phone: "",
      email: "",
      coverLetter: "",
      resume: "",
      passport: "",
      // errorMessage: "",
      resumeErrorMessage:"",
      passportErrorMessage:"",
    };
  },
computed: {
  errorMessage(){
    return "";
  }
},
  methods: {
    postApply() {
      console.log("I am here 168");
      if(!this.firstname || !this.surname || !this.phone || !this.email || !this.coverLetter || !this.resume || !this.passport){
          this.errorMessage = "Field cannot be empty";
          console.log("I am here 172");
          return;
      };
          
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
           if(!this.firstname || !this.surname || !this.phone || !this.email || !this.coverLetter || !this.resume || !this.passport){
          this.errorMessage = "Field cannot be empty";
          console.log("I am here 172");
          
      };
          console.log(e);
        });
    },

    selectResume(e) {
      // const [file] = e.target.files;
      // this.resume = file;
      this.resume = this.$refs.resume.files[0];
    },
    async upload(file_type, event) {
      console.log(event);

      if (file_type === "passport") {
            console.log(this.passport);
      let splitFile = this.passport.name.split(".");
      console.log(splitFile);
      const exts = ['jpeg','jpg'];
      let fileExtension = splitFile[splitFile.length - 1];
      if(!exts.includes(fileExtension)) {
        this.$refs.passport.value = "";
        this.passport = "";
        this.passportErrorMessage = "Please Upload Jpg only";
        setTimeout(() => {
          this.passportErrorMessage = "";
        }, 3000);
        console.log(this.passport);
        return;
      }
      console.log(this.passport.size);
      if(this.passport.size > 102400) {
        this.$refs.passport.value = "";
        this.passportErrorMessage = "Please Upload only 100KB jpeg image";
        this.passport = "";
        setTimeout(() => {
          this.passportErrorMessage = "";
        }, 3000);
        return;
      }
        let response = cloudinary(this.passport);
        if (response) {
          response.then((data) => {
            this.passport = data.data.url;
            console.log(this.passport);
           // console.log(this.event);
          });
        }
      } else if (file_type === "resume") {
      
      console.log(this.resume);
      let splitFile = this.resume.name.split(".");
      console.log(splitFile);
      const exts = ['pdf'];
      let fileExtension = splitFile[splitFile.length - 1];
      if(!exts.includes(fileExtension)) {
        this.$refs.resume.value = "";
        this.resumeErrorMessage = "Please Upload only pdf file";
        setTimeout(() => {
          this.resumeErrorMessage = "";
        }, 3000);
        this.resume = "";
        console.log(this.resume);
        return;
      }
      console.log(this.resume.size);
      if(this.resume.size > 2 * 1024 * 1024) {
        this.$refs.resume.value = "";
        this.resumeErrorMessage = "Please Upload only 2MB file size";
        setTimeout(() => {
          this.resumeErrorMessage = "";
        }, 3000);
        this.resume = "";
        return;
      }
        let response = cloudinary(this.resume);
        if (response) {
          response.then((data) => {
            this.resume = data.data.url;
            console.log(this.resume);
          });
        }
      }
    },

    selectPassport(e) {
     // const file = e.target.files[0];
      this.passport = this.$refs.passport.files[0];

    },
  },
};
</script>

<style scoped></style>
