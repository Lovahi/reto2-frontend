<script setup>
// No necesitamos lógica JS por ahora en el footer
</script>

<template>
  <footer class="relative mt-20 bg-[#4ab491] overflow-hidden text-white">
    <div class="absolute inset-0 opacity-10 pointer-events-none" 
         style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 20px 20px;">
    </div>

    <div class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-200 to-transparent shadow-[0_0_15px_rgba(167,243,208,0.5)]"></div>

    <div class="container relative mx-auto px-6 py-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        
        <div class="flex flex-col items-center md:items-start group cursor-pointer">
          <div class="flex items-center gap-3">
            <div class="relative">
              <img 
                src="../assets/sources/img/Gemini_Generated_Image_segyufsegyufsegy-Photoroom.png" 
                alt="Logo" 
                class="h-14 w-auto mix-blend-multiply contrast-[1.1] z-10 relative group-hover:scale-110 transition-transform duration-500"
              >
              <div class="absolute inset-0 bg-white/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700"></div>
            </div>
            <div class="flex flex-col">
              <span class="text-2xl font-black tracking-tighter leading-none">GAMEFEST</span>
              <span class="text-[10px] uppercase tracking-[0.2em] opacity-70 font-bold">Gaming Community</span>
            </div>
          </div>
        </div>

        <nav class="flex justify-center">
          <ul class="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold">
            <li>
              <a href="#" class="px-4 py-2 rounded-full border border-white/10 hover:bg-white hover:text-[#4ab491] transition-all duration-300">Sobre Nosotros</a>
            </li>
            <li>
              <a href="#" class="px-4 py-2 rounded-full border border-white/10 hover:bg-white hover:text-[#4ab491] transition-all duration-300">Contacto</a>
            </li>
            <li>
              <a href="#" class="px-4 py-2 rounded-full border border-white/10 hover:bg-white hover:text-[#4ab491] transition-all duration-300">Privacidad</a>
            </li>
          </ul>
        </nav>

        <div class="flex justify-center md:justify-end gap-4">
          <a v-for="icon in ['facebook', 'instagram', 'linkedin']" 
             :key="icon"
             href="#" 
             class="relative w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-[#4ab491] hover:-translate-y-2 transition-all duration-300 group shadow-lg"
          >
            <i :class="`pi pi-${icon} text-lg`" class="z-10"></i>
            <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-white/20 to-transparent"></div>
          </a>
        </div>

      </div>

      <div class="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
        <p class="text-[10px] text-emerald-100/60 uppercase tracking-widest font-medium text-center">
          © 2024 <span class="text-white">GameFest</span> — Diseñado con <i class="pi pi-heart text-[8px] mx-1 text-red-300 animate-pulse"></i> para la comunidad.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Opcional: Si quieres que el footer siempre esté abajo aunque haya poco contenido */
footer {
    width: 95%;
    margin-left: 2.5%;
    border-radius: 10px 10px 0 0; 
    margin-bottom: 0;
}
.pi {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

