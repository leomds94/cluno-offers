<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <h2>{{ results.items }}</h2> -->
    <input type="text" v-model="search" placeholder="search cars">
    <ul>
      <li v-for="offer in filteredOffers" :key="offer">
        <router-link :to="{ name: 'offer-detail', params: { id: offer.id } }">
          <img :src="offer.teaser.teaserImage" />
          <h2>{{ offer.teaser.title }}</h2>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'offers',
  data () {
    return {
      msg: 'Your new car is Cluno - monthly fixed rate & everything in it, except complicated',
      search: '',
      results: []
    }
  },
  mounted () {
    axios
      .get('https://api.staging.cluno.com/offerservice/v1/offer/query')
      .then(response => { this.results = response.data.items })
  },
  computed: {
    filteredOffers: function () {
      return this.results.filter((offer) => {
        return offer.teaser.title.match(this.search)
      })
    }
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
