<script setup>
import { useStore } from '@/stores/store'
import { ref, computed, onMounted } from 'vue'

const store = useStore()
const usuario = ref({ username: 'Cargando...', email: '...', role: '...' })

const misEventosDetallados = computed(() => {
    return store.listaEventos.filter(evento => store.estoyInscrito(evento.id));
});

onMounted(async () => {

    await Promise.all([
        store.cargarEventos(),
        store.cargarMisInscripciones(1)
    ]);

    try {
        const res = await fetch('http://localhost:8000/api/users/1');
        if (res.ok) usuario.value = await res.json();
    } catch (e) {
        usuario.value = { username: 'Usuario Test', email: 'test@gamefest.com', role: 'user' }
    }
});

const desapuntarse = async (eventoId) => {
    if (!confirm("¿Seguro que quieres dejar de asistir a este evento?")) return;

    const res = await store.desapuntarse(eventoId);
    if (res.success) {
    } else {
        alert(res.message);
    }
}
</script>

<template>
    <div class="container mx-auto p-4 max-w-6xl">

        <div
            class="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 shadow-xl mb-10 text-white flex flex-col md:flex-row items-center gap-6 animate-fade-in-down">
            <img :src="`https://ui-avatars.com/api/?name=${usuario.username}&background=0D9488&color=fff&size=128`"
                class="w-24 h-24 rounded-full border-4 border-teal-500 shadow-lg" alt="Avatar">
            <div class="text-center md:text-left space-y-2">
                <h1 class="text-3xl font-bold">Hola, <span class="text-teal-400">{{ usuario.username }}</span></h1>
                <p class="text-gray-300 flex items-center justify-center md:justify-start gap-2">
                    <i class="pi pi-envelope"></i> {{ usuario.email }}
                </p>
                <span
                    class="inline-block bg-teal-900 text-teal-300 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold border border-teal-700">
                    {{ usuario.role || 'Usuario' }}
                </span>
            </div>

            <div class="md:ml-auto bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 text-center">
                <p class="text-3xl font-bold text-teal-400">{{ misEventosDetallados.length }}</p>
                <p class="text-xs text-gray-300 uppercase">Eventos Inscritos</p>
            </div>
        </div>

        <div class="flex items-center gap-3 mb-6">
            <h2 class="text-2xl font-bold text-gray-800">📅 Mi Agenda de Eventos</h2>
            <div class="h-1 flex-grow bg-gray-200 rounded"></div>
        </div>

        <div v-if="misEventosDetallados.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="evento in misEventosDetallados" :key="evento.id"
                class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col">
                <div class="relative h-48 overflow-hidden">
                    <img :src="evento.image || 'https://placehold.co/600x400?text=Evento'"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div
                        class="absolute top-3 right-3 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded shadow-lg">
                        INSCRITO
                    </div>
                </div>

                <div class="p-5 flex-grow space-y-3">
                    <h3 class="text-xl font-bold text-gray-800 line-clamp-1" :title="evento.title || evento.titulo">
                        {{ evento.title || evento.titulo }}
                    </h3>

                    <div class="space-y-2 text-sm text-gray-600">
                        <div class="flex items-center gap-2">
                            <i class="pi pi-calendar text-teal-600"></i>
                            <span>{{ evento.date || evento.fecha }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="pi pi-clock text-teal-600"></i>
                            <span>{{ evento.time || evento.hora }}</span>
                        </div>
                    </div>
                </div>

                <div class="p-4 bg-gray-50 border-t border-gray-100">
                    <button @click="desapuntarse(evento.id)"
                        class="w-full py-2 px-4 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors font-semibold flex items-center justify-center gap-2">
                        <i class="pi pi-times-circle"></i>
                        Desapuntarse
                    </button>
                </div>
            </div>
        </div>

        <div v-else
            class="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 animate-fade-in">
            <div class="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="pi pi-calendar-times text-4xl text-teal-600"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-700">No tienes eventos próximos</h3>
            <p class="text-gray-500 mt-2 max-w-md mx-auto">Parece que aún no te has inscrito a nada. ¡Echa un vistazo a
                la lista y apúntate!</p>
            <router-link to="/eventos"
                class="mt-6 inline-block bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition shadow-lg hover:shadow-teal-500/30 font-bold">
                Explorar Eventos
            </router-link>
        </div>

    </div>
</template>

<style scoped>
.animate-fade-in-down {
    animation: fadeInDown 0.6s ease-out;
}

.animate-fade-in {
    animation: fadeIn 0.8s ease-out;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>