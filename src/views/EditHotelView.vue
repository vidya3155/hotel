<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/button'
import { Input } from '@/components/button/ui/input'

const router = useRouter()
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
  const event = JSON.stringify({
    name: name.value,
    place: place.value,
    time: Date.parse(time.value) / 1000,
  })

  const response = await fetch(`/api/eshops/${id}`, {
    method: 'PUT',
    body: event,
  })

  if (response.ok) {
    router.push('/')
  }
}

onMounted(() => {
     fetch(`/api/hotels/${id}`)
    .then((response) => response.json())
    .then((data) => {
      name.value = data.name
      place.value = data.place
      time.value = new Date(data.time * 1000).toISOString().slice(0, 16)
    })
})
</script>

<template>
<main class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">Add commentMore actions
    <!-- Animated Background -->
    <div class="absolute inset-0 -z-10 animate-gradient opacity-30"></div>

    <div class="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl p-8 w-full max-w-xl text-white">
      <h1 class="text-3xl font-bold text-center mb-6">Edit Hotel</h1>
      <form @submit.prevent="saveData" class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium">Nama</label>
          <Input type="text" v-model="name" class="w-full text-black" />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium">Tempat</label>
          <Input type="text" v-model="place" class="w-full text-black" />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium">Waktu</label>
          <Input type="datetime-local" v-model="time" class="w-full text-black" />
        </div>
        <div class="pt-4 text-center">
          <Button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
            Update
          </Button>
        </div>
      </form>
    </div>
  </main>Add commentMore actions
</template>

<style scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background: linear-gradient(270deg, #1e3a8a, #06b6d4);
  background-size: 600% 600%;
  animation: gradient 10s ease infinite;
}
</style>