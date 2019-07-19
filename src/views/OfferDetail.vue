<template>
  <div class="hello">
    <h2>{{ result.car.make }} {{ result.car.model }} {{ result.car.version }}</h2>

    <div class="w3-content w3-display-container">
      <img v-for="image in result.images" :key='image' class="mySlides" :src="image.src" style="width:100%">

      <button class="w3-button w3-black w3-display-left" onclick="plusDivs(-1)">&#10094;</button>
      <button class="w3-button w3-black w3-display-right" onclick="plusDivs(1)">&#10095;</button>
    </div>

    <form>
      <fieldset>
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

      <fieldset>
        <legend>Your subscription:</legend>
        <div class='au-mp-features-list'>
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
      result: null
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

var slideIndex = 1
showDivs(slideIndex)

function plusDivs (n) {
  showDivs(slideIndex += n)
}

function showDivs (n) {
  var i
  var x = document.getElementsByClassName('mySlides')
  if (n > x.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = x.length }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none'
  }
  x[slideIndex - 1].style.display = 'block'
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
.au-mp-fblock .au-mp-features-list {
    float: left;
    min-width: 30%;
    padding-right: 25px;
}
</style>
