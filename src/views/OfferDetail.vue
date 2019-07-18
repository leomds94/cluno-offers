<template>
  <div class="hello">
    <h2>Manufacturer: {{ result.car.make }}</h2>
    <h2>Model: {{ result.car.model }}</h2>
    <h2>Number of doors: {{ result.car.doors }}</h2>
    <h2>Estimated time: {{ result.estimatedDeliveryTime }} ({{ result.earliestAvailabilityDays }} Tage)</h2>
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
</style>
