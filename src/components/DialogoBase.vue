<script setup>
// Definimos que este componente avisa cuando quieren cerrarlo
defineEmits(['cerrar'])
</script>

<template>
    <Teleport to="body">

        <div class="fixed inset-0 bg-opacity-70 flex justify-center items-center z-50 p-4 backdrop-blur-sm" @click="$emit('cerrar')">
            <div class="bg-emerald-50 border-green-200 rounded-xl shadow-2xl w-full max-w-lg relative overflow-hidden animate-fade-in-up"@click.stop>
                <button @click="$emit('cerrar')"
                    class="absolute top-3 right-3 p-1 rounded-full text-gray-600 hover:text-red-500 hover:bg-gray-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div class="max-h-[90vh] overflow-y-auto">
                    <slot></slot>
                </div>

            </div>
        </div>
    </Teleport>
</template>

<style scoped>
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(90px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.4s ease-out;
}
</style>