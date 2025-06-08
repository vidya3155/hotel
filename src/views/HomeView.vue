<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

interface Hotel {
  id: string
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

const removeEvent = async (id: string) => {
  const response = await fetch(`/api/events/${id}`, {
    method: 'DELETE',
  })
  if (response.ok) {
    fetchHotels() // Refresh the list after deletion
  }
}
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
          <div>More actions
            <button @click="removeEvent(hotel.id)">Hapus Data</button>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>
