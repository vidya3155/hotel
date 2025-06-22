<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/button'
import { Input } from '@/components/button/ui/Input.vue'

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
    <div class="container px-4 py-6 mx-auto w-lg">
        <h1 class="text-lg sm:text-2xl text-center">Edit Event</h1>
        <form @submit.prevent="saveData">
            <div class="w-full">
                <label>Nama</label>
                <Input type="text" v-model="name" />
            </div>
            <div>
                <label>Tempat</label>
                <Input type="text" v-model="place" />
            </div>
            <div>
                <label>Waktu</label>
                <Input type="datetime-local" v-model="time" />
            </div>
    
            <div class="mt-3">
                <Button type="submit">Update</Button>
            </div>
        </form>
    </div>
</template>