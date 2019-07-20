<template>
  <div class="hello">
    <router-link :to="{ name: 'offers'}">
      <a style='display:flex;padding-left:15%'>Back</a>
    </router-link>

    <b-card class='main-card'>
    <h2>{{ result.car.make }} {{ result.car.model }} {{ result.car.version }}</h2>

    <b-carousel
      :interval="4000"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      controls
    >
      <b-carousel-slide v-for="image in result.images" :key='image' class="mySlides" :img-src="image.src"></b-carousel-slide>
    </b-carousel>
    <b-card-group deck>
    <b-card header="Details">
        <legend>Your subscription:</legend>
        <div>
          <ul>
            <li>
              <h1>{{ result.pricing.price }} € per month</h1>
              <h4>plus {{ result.pricing.startingFee }} one-time Cluno entry fee for new customers</h4>
              <h5>{{ result.estimatedDeliveryTime }}</h5>
            </li>
          </ul>
        </div>
    </b-card>

      <!-- <b-card-group deck> -->
        <b-card header="Details">
          <b-row>
            <b-col>
          <b-list-group>
            <b-list-group-item v-for="detail in result.car.equipmentDetails" :key='detail'>{{ detail }}</b-list-group-item>
          </b-list-group>
            </b-col>
            <b-col>
          <b-list-group>
            <b-list-group-item>{{ result.car.kw }} kW / {{ result.car.ps }} hp</b-list-group-item>
            <b-list-group-item>{{ result.car.gearingType }}</b-list-group-item>
            <b-list-group-item>{{ result.car.drive }}</b-list-group-item>
            <b-list-group-item>{{ result.car.fueltype }}</b-list-group-item>
            <b-list-group-item>{{ result.car.doors }} doors</b-list-group-item>
          </b-list-group>
            </b-col>
          </b-row>
        </b-card>
      </b-card-group>
    </b-card>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'offer-detail',
  data () {
    return {
      id: 0,
      result: null,
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  },
  created () {
    axios
      .get('https://api.staging.cluno.com/offerservice/v1/offer/' + this.$route.params.id)
      .then(response => {
        this.result = response.data
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.carousel-indicators li {
  background-color: #777 !important;
}

.carousel.pointer-event {
  width: 50%;
  margin: auto;
  padding-bottom: 20px;
}

.carousel-control-prev {
  background-image: linear-gradient(to left, black , white) !important;
}

.carousel-control-prev {
  background-image: linear-gradient(to right, black , white) !important;
}

.main-card {
  width: 70%;
  margin: auto;
}

.carousel-control-prev-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
}

.carousel-control-next-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
}

.card-deck .card {
  display: inline-table;
}

</style>
