<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <br/>

    <b-form>
      <b-row>
        <b-col lg="6">
          <b-form-group
          id="input-group-1"
          label="Name:"
          label-for="input-1"
          >
            <b-input-group class="mt-3">
              <b-form-input id="input-1" type="text" v-model="search"></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
    <br/>
    <b-row>
      <b-col md="4" v-for="offer in filteredOffers" :key="offer">
        <b-card
          :title='offer.teaser.title'
          :img-src='offer.teaser.teaserImage'
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2"
        >
          <!-- <b-card-text>
          </b-card-text> -->
          <router-link :to="{ name: 'offer-detail', params: { id: offer.id } }">
            <b-button variant="primary">More details</b-button>
          </router-link>
        </b-card>
      </b-col>
    </b-row>
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

.row {
  margin-left: unset;
  margin-right: unset;
}

</style>
