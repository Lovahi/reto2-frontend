<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);


const obtenerUsuarios = async () => {

    const response = await fetch('http://10.5.13.204:8000/api/users');

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    users.value = data;

};

onMounted(() => {
    obtenerUsuarios();
});
</script>

<template>
    <div class="p-5">
        <h1 class="text-2xl">Prueba</h1>

        <pre>{{ users }}</pre>

        <h2>Lista:</h2>
        <ul>
            <li v-for="user in users" :key="user.id">
                - {{ user.username }}({{ user.email }})
            </li>
        </ul>
    </div>
</template>