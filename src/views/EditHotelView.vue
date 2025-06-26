<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const router = useRouter()

const route = useRoute()
const id = route.params.id

const name = ref('')
const place = ref('')
const time = ref('')

const saveData = async () => {
  const event = JSON.stringify({
    name: name.value,
    place: place.value,
    time: Date.parse(time.value)/1000,
  })

  const response = await fetch(`/api/hotels/${id}`, {
    method: 'PUT',
    body: event,
  })
  const data = await response.json()
    router.push('/')
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
    <div class="container px-4 py-6 mx-auto w-lg">Add commentMore actions
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