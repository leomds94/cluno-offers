<template>
  <div class="hello">
    <router-link :to="{ name: 'offers'}">
      <a style='display:flex;padding-left:25%'>Back</a>
    </router-link>

    <h2>{{ result.car.make }} {{ result.car.model }} {{ result.car.version }}</h2>

    <b-carousel
      :interval="4000"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      controls
    >
      <b-carousel-slide v-for="image in result.images" :key='image' class="mySlides" :img-src="image.src"></b-carousel-slide>
    </b-carousel>

    <form>
      <fieldset class="field-tight">
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
      </fieldset>

      <fieldset style="width: 35%; margin: auto">
        <legend>Details:</legend>
        <b-row>
          <b-col lg='6' v-for="detail in result.car.equipmentDetails" :key='detail'>
            {{ detail }}
          </b-col>
          <b-col lg='6'>
            {{ result.car.kw }} kW / {{ result.car.ps }} hp
          </b-col>
          <b-col lg='6'>{{ result.car.gearingType }}</b-col>
          <b-col lg='6'>{{ result.car.drive }}</b-col>
          <b-col lg='6'>{{ result.car.fueltype }}</b-col>
          <b-col lg='6'>{{ result.car.doors }} doors</b-col>
        </b-row>
      </fieldset>
    </form>
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
}

.carousel-control-prev .carousel-control-next {
  background-image: linear-gradient(to left, black , white) !important;
}

.carousel-control-prev {
  background-image: linear-gradient(to right, black , white) !important;
}

</style>
