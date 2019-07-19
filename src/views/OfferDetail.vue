<template>
  <div class="hello">
    <h2>{{ result.car.make }} {{ result.car.model }} {{ result.car.version }}</h2>

    <div class="w3-content w3-display-container">
      <img v-for="image in result.images" :key='image' class="mySlides" :src="image.src" style="width:100%">

      <button class="w3-button w3-black w3-display-left" v-on:click="plusDivs(-1)">&#10094;</button>
      <button class="w3-button w3-black w3-display-right" v-on:click="plusDivs(1)">&#10095;</button>
    </div>

    <form>
      <fieldset style='margin: 0 30%'>
        <legend>Detalhes:</legend>
        <div class='au-mp-features-list'>
          <ul>
            <li v-for="detail in result.car.equipmentDetails" :key='detail'>
              {{ detail }}
            </li>
          </ul>
        </div>
        <div class='au-mp-features-list'>
          <ul>
            <li>
              {{ result.car.kw }} kW / {{ result.car.ps }} hp
            </li>
            <li>{{ result.car.gearingType }}</li>
            <li>{{ result.car.drive }}</li>
            <li>{{ result.car.fueltype }}</li>
            <li>{{ result.car.doors }} doors</li>
          </ul>
        </div>
      </fieldset>

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
      slideIndex: 1
    }
  },
  methods: {
    showDivs: function (n) {
      var i
      var x = document.getElementsByClassName('mySlides')
      if (n > x.length) { this.slideIndex = 1 }
      if (n < 1) { this.slideIndex = x.length }
      for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none'
      }
      x[this.slideIndex - 1].style.display = 'block'
    },
    plusDivs: function (n) {
      this.showDivs(this.slideIndex += n)
    }
  },
  created () {
    axios
      .get('https://api.staging.cluno.com/offerservice/v1/offer/' + this.$route.params.id)
      .then(response => {
        this.result = response.data
      })
    this.showDivs(2)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.au-mp-features-list {
    display: inline-table;
    text-align: center;
    justify-content: center;
    max-width: 30%;
}
.w3-content {
  max-width: 60% !important;
}
.field-tight {
  display: -webkit-inline-box;
}
</style>
