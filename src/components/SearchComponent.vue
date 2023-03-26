<template>
  <div class="search-zip-component">
    <div class="search-block card">
      <div class="search-block__title">
        <span>Search data by ZIP code</span>
      </div>
      <div class="search-block__search-form">
        <form class="search-form form-floating" @submit.prevent="searchZipCode">
          <input
            v-model="zipCode"
            class="form-control search-form__input"
            :class="{ 'is-invalid': isValid }"
            type="text"
            id="floatingInput"
            placeholder="Enter"
            @input="handlerInput($event)"
          />
          <div v-if="isValid" id="floatingInput" class="invalid-feedback">
            Enter number only
          </div>
          <label for="floatingInput" class="search-form__label"
            >Enter zip code</label
          >
          <button
            class="search-form__button btn btn-outline-primary"
            type="submit"
            :disabled="zipCode === '' || isNaN(zipCode)"
          >
            Render
          </button>
          <div class="spinner-block">
            <div
              v-if="isLoading"
              class="spinner-border text-primary"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </form>
      </div>
      <div v-if="showResult" class="search-block__search-result">
        <div class="search-result__title">
          <span>Data Information about - {{ data.zip_code }}</span>
        </div>
        <div class="search-result__list">
          <ul class="list__information list-group">
            <li class="information__city list-group-item">
              City - {{ data.city }}
            </li>
            <li class="information__state list-group-item">
              State - {{ data.state }}
            </li>
          </ul>
        </div>
        <button class="btn btn-outline-primary" @click="lookupIP">
          IP Lookup
        </button>
        <div class="spinner-block">
          <div
            v-if="isIPLoading"
            class="spinner-border text-primary"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <div v-if="showIPResult" class="search-block__ip-result">
        <div class="ip-result__title">
          <span>Data Information by IP</span>
        </div>
        <div class="ip-result__list">
          <ul class="list-group">
            <li class="list-group-item">ISP - {{ ip_data.org }}</li>
            <li class="list-group-item">City - {{ ip_data.city }}</li>
            <li class="list-group-item">Region - {{ ip_data.region }}</li>
            <li class="list-group-item">
              Country - {{ ip_data.country_name }}
            </li>
          </ul>
        </div>
      </div>
      <button
        v-if="showResult && showIPResult"
        class="btn btn-outline-primary link-main"
        @click="reset"
      >
        Main Page
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    zipCode: "",
    zipCodeData: null,
    ip_data: null,
    isValid: false,
    isLoading: false,
    isIPLoading: false,
    showResult: false,
    showIPResult: false,
  }),

  methods: {
    handlerInput(event) {
      if (isNaN(event.target.value) || isNaN(event.target.value === "")) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    },

    async searchZipCode() {
      try {
        this.isLoading = true;
        const response = await axios.get(
          `/api/1HOCSVZxZwdKwpU4nxYOrehERPfkG6F5dMgC0n0I0PwsxbOP7xAeFIwY3Mt6lT34/info.json/${this.zipCode}/degrees`
        );
        console.log("response: ", response);
        this.data = response.data;
        this.isLoading = false;
        this.showResult = true;
      } catch (error) {
        console.log(`Problem with: ${error}`);
      }
    },

    async lookupIP() {
      try {
        this.isIPLoading = true;
        const response = await axios.get("https://ipapi.co/json/");
        this.ip_data = response.data;
        console.log("ip response: ", response);
        this.isIPLoading = false;
        this.showIPResult = true;
      } catch (error) {
        console.log(`Error with: ${error}`);
      }
    },

    reset() {
      this.showResult = false;
      this.showIPResult = false;
      this.zipCode = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.search-zip-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .card {
    width: 500px;
    height: auto;
    padding: 20px;
    .search-block__title {
      text-align: center;
    }
    .search-block__search-form {
      margin-top: 20px;
      .search-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        .spinner-block {
          display: flex;
          justify-content: center;
        }
      }
    }
    .search-block__search-result {
      display: flex;
      flex-direction: column;
      gap: 15px;
      .search-result__title {
        text-align: center;
      }
      .spinner-block {
        display: flex;
        justify-content: center;
      }
    }
    .search-block__ip-result {
      display: flex;
      flex-direction: column;
      gap: 15px;
      .ip-result__title {
        text-align: center;
      }
    }
    .link-main {
      margin-top: 15px;
    }
  }
}
</style>
