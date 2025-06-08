<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

interface Hotel {
  id: number
  name: string
  place: string
  time: string
}

const hotels = ref<Hotel[]>([])

const fetchHotels = async () => {
  const response = await fetch('/api/hotels')
  const data = await response.json()
  hotels.value = data
}

onMounted(() => {
  fetchHotels()
})

</script>

<template>
  <main>

    <div>
      <RouterLink to="/hotel">Buat Event</RouterLink>
    </div>
    <div>
      <ul>
        <li v-for="hotel in hotels" :key="hotel.id">
          <div>{{ hotel.name }}</div>
          <div>{{ hotel.place }}</div>
          <div>{{ new Date(Number(hotel.time) * 1000).toLocaleString() }}</div>
          <div>
            <RouterLink :to="`/hotel/${hotel.id}`">Edit</RouterLink>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>
