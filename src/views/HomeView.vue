<script setup>
import { RouterLink } from 'vue-router'
import CardComponent from '@/components/CardComponent.vue'

// Import de imágenes de assets
import gamesImg from '@/assets/sources/img/games.png'
import eventsImg from '@/assets/sources/img/events.png'
import tournamentsImg from '@/assets/sources/img/tournaments.png'
import networkingImg from '@/assets/sources/img/networking.png'
import cosplayImg from '@/assets/sources/img/cosplay.png'
import communityImg from '@/assets/sources/img/community.png'
</script>

<template>
  <div class="flex flex-col w-full">
    <!-- HERO SECTION -->
    <section class="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 z-0">
        <img
          src="../assets/sources/img/hero_bg.png"
          alt="Hero Background"
          class="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        <div class="absolute inset-0 bg-black/50"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 text-center px-4 max-w-5xl">
        <h1
          class="text-7xl md:text-9xl font-black italic tracking-tighter text-white mb-4 uppercase animate-fade-up"
        >
          Game<span class="text-(--primary)">Fest</span>
        </h1>
        <p
          class="text-xl md:text-2xl text-white/70 mb-10 font-medium tracking-wide animate-fade-up delay-100"
        >
          La mayor plataforma de eventos gaming para la comunidad.
        </p>

        <div class="flex flex-col sm:flex-row gap-5 justify-center animate-fade-up delay-200">
          <RouterLink
            to="/games"
            class="px-10 py-4 bg-(--primary) text-black font-black uppercase italic tracking-tighter rounded-full hover:scale-105 hover:bg-white transition-all shadow-[0_0_30px_rgba(255,139,0,0.3)]"
          >
            Explorar Juegos
          </RouterLink>
          <RouterLink
            to="/register"
            class="px-10 py-4 bg-transparent border-2 border-white/30 text-white font-black uppercase italic tracking-tighter rounded-full hover:bg-white hover:text-black transition-all"
          >
            Unirse Ahora
          </RouterLink>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <i class="pi pi-angle-double-down text-(--text-muted)/50 text-2xl"></i>
      </div>
    </section>

    <!-- BENTO GRID SECTION -->
    <section class="py-24 px-6 md:px-20 bg-(--bg-color)">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div class="max-w-xl">
            <h2 class="text-xs font-black uppercase tracking-[0.4em] text-(--primary) mb-4">
              La Experiencia GameFest
            </h2>
            <p
              class="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none"
            >
              Mucho más que una <span class="text-(--primary)">plataforma de eventos.</span>
            </p>
          </div>
          <p class="text-(--text-muted) max-w-xs text-sm font-medium leading-relaxed">
            Descubre un ecosistema diseñado para potenciar tu carrera gaming y conectar con la
            industria.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[950px]">
          <!-- Card 1: Industry Talks (Horizontal Medium) -->
          <div class="md:col-span-2 md:row-span-1">
            <CardComponent
              title="Charlas de la Industria"
              description="Insight exclusivo de los líderes que mueven el mundo gaming."
              badge="Insight"
              :image="networkingImg"
              class="rounded-[2.5rem]! bg-(--surface-2)/40! backdrop-blur-md"
            />
          </div>

          <!-- Card 2: Community (Square) -->
          <div class="md:col-span-1 md:row-span-1">
            <CardComponent
              title="Comunidad"
              description="Conecta y comparte con la comunidad."
              badge="Social"
              :image="communityImg"
              class="rounded-[2.5rem]! bg-(--surface)!"
            />
          </div>

          <!-- Card 3: Events (Square) -->
          <div class="md:col-span-1 md:row-span-1">
            <CardComponent
              title="Eventos Impresionantes"
              description="Descubre los eventos que tenemos para ti."
              badge="Featured"
              :image="eventsImg"
              class="rounded-[2.5rem]! bg-(--surface)!"
            />
          </div>

          <!-- Card 4: High Performance (Large Focal Point) -->
          <div class="md:col-span-2 md:row-span-2">
            <CardComponent
              title="Competiciones a otro nivel"
              description="Torneos competitivos, vive la pasión del gaming pro al máximo nivel. \n Conviértete en el mejor jugador y demuestra tu talento. Gana premios increíbles y reconocimiento internacional."
              badge="Pro Elite"
              :image="tournamentsImg"
              class="rounded-[2.5rem]! bg-(--surface)!"
            >
              <template #footer-extra>
                <RouterLink
                  to="/events"
                  class="inline-flex items-center px-4 py-2 bg-(--primary) text-black font-black uppercase italic tracking-tighter rounded-full hover:scale-105 hover:bg-white transition-all shadow-[0_0_30px_rgba(255,139,0,0.3)]"
                >
                  Explorar Calendario <i class="pi pi-arrow-right pl-2 text-[10px]"></i>
                </RouterLink>
              </template>
            </CardComponent>
          </div>

          <!-- Card 5: Games Library (Horizontal Medium) -->
          <div class="md:col-span-2 md:row-span-1">
            <CardComponent
              title="Lanzamientos & Demos"
              description="Prueba los títulos antes que nadie en nuestros showcases de temporada."
              badge="+500 Games"
              :image="gamesImg"
              class="rounded-[2.5rem]! bg-(--surface)!"
            />
          </div>

          <!-- Card 6: Cosplay (Horizontal Medium) -->
          <div class="md:col-span-2 md:row-span-1">
            <CardComponent
              title="Cosplay"
              description="Demuestra tu talento y creatividad en nuestros concursos de cosplay."
              badge="Cosplay"
              :image="cosplayImg"
              class="rounded-[2.5rem]! bg-(--surface-2)/30!"
            />
          </div>
        </div>
      </div>

      <!-- FINAL CTA SECTION -->
      <section class="py-32 px-6 overflow-hidden relative">
        <div class="max-w-4xl mx-auto text-center relative z-10">
          <h2
            class="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none"
          >
            ¿Listo para <span class="text-(--primary)">subir de nivel?</span>
          </h2>
          <p class="text-xl text-(--text-muted) mb-12 max-w-2xl mx-auto font-medium">
            Únete a miles de jugadores, desarrolladores y creadores en la comunidad de eventos más
            activa del mundo.
          </p>
          <RouterLink
            to="/register"
            class="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-black uppercase italic tracking-tighter rounded-2xl hover:scale-105 transition-all duration-500 overflow-hidden"
          >
            <span class="relative z-10">Crear Mi Cuenta Gratis</span>
            <i
              class="pi pi-arrow-right relative z-10 group-hover:translate-x-2 transition-transform"
            ></i>
            <div
              class="absolute inset-0 bg-(--primary) translate-y-full group-hover:translate-y-0 transition-transform duration-500"
            ></div>
          </RouterLink>
        </div>
        <!-- Decorative background elements -->
        <div
          class="absolute top-1/2 left-0 w-64 h-64 bg-(--primary)/10 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-96 h-96 bg-(--secondary)/5 blur-[150px] rounded-full translate-y-1/3 translate-x-1/3"
        ></div>
      </section>
    </section>
    <!-- STATS / BRAND TICKER -->
    <section class="py-12 border-y border-(--border-color) bg-(--surface)/30 overflow-hidden">
      <div class="flex whitespace-nowrap gap-16 animate-infinite-scroll">
        <span
          v-for="n in 10"
          :key="n"
          class="text-xs font-black uppercase tracking-[0.5em] text-(--text-dim)/40 hover:text-(--primary) transition-colors cursor-default"
        >
          Torneos Pro • Workshops AAA • LAN Party • Indie Showcase • Networking •
        </span>
      </div>
    </section>

    <!-- TRUST BANNER -->
    <section class="py-20 border-t border-(--border-color)">
      <div class="container mx-auto px-6">
        <p
          class="text-center text-[10px] uppercase font-black tracking-[0.4em] text-(--text-dim) mb-12"
        >
          Impulsado por los líderes de la industria
        </p>
        <div
          class="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700"
        >
          <div
            v-for="brand in ['discord', 'twitch', 'google', 'apple', 'microsoft']"
            :key="brand"
            class="group"
          >
            <i
              :class="`pi pi-${brand}`"
              class="text-4xl hover:text-(--primary) transition-colors"
            ></i>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes infinite-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-infinite-scroll {
  animation: infinite-scroll 40s linear infinite;
  width: max-content;
}
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
