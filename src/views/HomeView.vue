<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col w-full -mt-24">
    <!-- HERO SECTION -->
    <section class="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 z-0">
        <img
          src="../assets/sources/img/hero_bg.png"
          alt="Hero Background"
          class="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        <div
          class="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-(--bg-color)"
        ></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 text-center px-4 max-w-5xl">
        <h1
          class="text-7xl md:text-9xl font-black italic tracking-tighter text-white mb-4 uppercase animate-fade-up"
        >
          Game<span class="text-(--primary)">Fest</span>
        </h1>
        <p
          class="text-xl md:text-2xl text-gray-300 mb-10 font-medium tracking-wide animate-fade-up delay-100"
        >
          La mayor plataforma de eventos gaming para la comunidad.
        </p>

        <div class="flex flex-col sm:flex-row gap-5 justify-center animate-fade-up delay-200">
          <RouterLink
            to="/games"
            class="px-10 py-4 bg-(--primary) text-black font-black uppercase italic tracking-tighter rounded-full hover:scale-105 hover:bg-white transition-all shadow-[0_0_30px_rgba(255,139,0,0.4)]"
          >
            Explorar Juegos
          </RouterLink>
          <RouterLink
            to="/register"
            class="px-10 py-4 bg-transparent border-2 border-white/20 text-white font-black uppercase italic tracking-tighter rounded-full hover:bg-white hover:text-black transition-all"
          >
            Unirse Ahora
          </RouterLink>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <i class="pi pi-angle-double-down text-white/50 text-2xl"></i>
      </div>
    </section>

    <!-- FEATURES SECTION -->
    <section class="py-24 px-6 md:px-20 bg-(--bg-color)">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div
          class="p-8 rounded-3xl bg-(--surface) border border-(--border-color) hover:border-(--primary) transition-all duration-500 group"
        >
          <div
            class="w-16 h-16 rounded-2xl bg-black/20 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3"
          >
            <i class="pi pi-bolt text-4xl text-(--primary)"></i>
          </div>
          <h3 class="text-2xl font-black italic uppercase mb-2">Eventos Pro</h3>
          <p class="text-gray-400">Torneos, charlas y talleres con los mejores del sector.</p>
        </div>

        <div
          class="p-8 rounded-3xl bg-(--surface) border border-(--border-color) hover:border-(--primary) transition-all duration-500 group"
        >
          <div
            class="w-16 h-16 rounded-2xl bg-black/20 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3"
          >
            <i class="pi pi-users text-4xl text-(--secondary)"></i>
          </div>
          <h3 class="text-2xl font-black italic uppercase mb-2">Comunidad</h3>
          <p class="text-gray-400">Conecta con otros jugadores y comparte tu pasión.</p>
        </div>

        <div
          class="p-8 rounded-3xl bg-(--surface) border border-(--border-color) hover:border-(--primary) transition-all duration-500 group"
        >
          <div
            class="w-16 h-16 rounded-2xl bg-black/20 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3"
          >
            <i class="pi pi-trophy text-4xl text-yellow-500"></i>
          </div>
          <h3 class="text-2xl font-black italic uppercase mb-2">Recompensas</h3>
          <p class="text-gray-400">Participa y gana premios exclusivos en cada evento.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes slow-zoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}

.animate-slow-zoom {
  animation: slow-zoom 20s infinite alternate linear;
}

.animate-fade-up {
  animation: fadeUp 1s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.delay-100 {
  animation-delay: 0.1s;
}
.delay-200 {
  animation-delay: 0.2s;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
