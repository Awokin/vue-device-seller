<template>
  <div class="container">
    <div class="pt-5">
      <div class="alert alert-danger" v-if="errorMessage">
        {{ errorMessage }}
      </div>
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <h3>All Applications</h3>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email Address</th>
                <th scope="col">Cover Letter</th>
                <th scope="col">Passport</th>
                <th scope="col">Resume</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(application, ind) in applicationList" :key="ind">
                <th scope="row">{{ ind + 1 }}</th>
                <td>{{ application.firstname }}</td>
                <td>{{ application.surname }}</td>
                <td>{{ application.phone }}</td>
                <td>{{ application.email }}</td>
                <td>{{ application.coverLetter }}</td>
                <td>{{ application.resume }}</td>
                <td>{{ application.passport }}</td>
                <th></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { nextTick } from "vue";

export default {
  name: "applicationAdmin",
  data() {
    return {
      applicationList: [],
      errorMessage: "",
      selectedIndex: undefined,
    };
  },
  mounted() {
    axios.get(`http://localhost:5000/api/users/`).then((response) => {
      this.applicationList = response.data;
    });
  },
  methods: {
    applicationSaved(application) {
      const itemIndex = this.applicationList.findIndex(
        (item) => item.id === application.id
      );
      if (itemIndex !== -1) {
        this.applicationList[itemIndex] = application;
      } else {
        this.applicationList.push(application);
      }
    },
  },
};
</script>
