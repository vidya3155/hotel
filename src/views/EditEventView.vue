<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter();

const route = useRoute()
const id = route.params.id

// Declare reactive variables
const name = ref('')
const place = ref('')
const time = ref('')

// Optional: Fetch existing data for editing
onMounted(async () => {
  if (id) {
    const response = await fetch(`/api/hotels/${id}`)
    const data = await response.json()
    name.value = data.name
    place.value = data.place
    // Convert timestamp to datetime-local format
    const date = new Date(data.time * 1000)
    time.value = date.toISOString().slice(0, 16)
  }
})

const saveData = async () => {
    const payload = {
        name: name.value,
        place: place.value,
        time: Date.parse(time.value)/1000,
    }

    // Use PUT/PATCH for editing if ID exists
    const method = id ? 'PUT' : 'POST'
    const url = id ? `/api/hotels/${id}` : '/api/hotels'
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
})

router.push('/')
}
</script>

<template>
    <h1>Edit Event Baru</h1>
    <form @submit.prevent="saveData">
        <div>
            <label>Nama</label>
            <input type="Hotel Bintang Lima" v-model="name">
        </div>
        <div>
            <label>Tempat</label>
            <input type="Pasuruan" v-model="place">
        </div>
        <div>
            <label>Waktu</label>
            <input type="1672531200" v-model="time">
        </div>

        <div>
            <input type="submit">
        </div>
    </form>
</template>