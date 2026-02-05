<script setup>
// No necesitamos lógica JS por ahora en el footer
</script>

<template>
  <footer
    class="relative mt-20 bg-(--surface) overflow-hidden text-(--text-main) border-t border-(--border-color)"
  >
    <div
      class="absolute inset-0 opacity-[0.03] pointer-events-none"
      style="
        background-image: radial-gradient(var(--primary) 1px, transparent 1px);
        background-size: 20px 20px;
      "
    ></div>

    <div class="container relative mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        <!-- Logo Section -->
        <div class="flex flex-col items-center md:items-start group cursor-pointer">
          <div class="flex items-center gap-4">
            <div class="relative">
              <img
                src="../assets/sources/img/Gemini_Generated_Image_segyufsegyufsegy-Photoroom.png"
                alt="Logo"
                class="h-12 w-auto brightness-110 z-10 relative group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-2xl font-black tracking-tighter leading-none italic uppercase"
                >GAME<span class="text-(--primary)">FEST</span></span
              >
              <span class="text-[9px] uppercase tracking-[0.3em] text-(--text-muted) font-black"
                >Gaming Community</span
              >
            </div>
          </div>
        </div>

        <!-- Links Section -->
        <nav class="flex justify-center">
          <ul
            class="flex flex-wrap justify-center gap-4 text-[10px] font-black uppercase tracking-widest"
          >
            <li>
              <a
                href="#"
                class="px-4 py-2 rounded-xl border border-(--border-color) hover:border-(--primary) hover:text-(--primary) transition-all duration-300"
                >Sobre Nosotros</a
              >
            </li>
            <li>
              <a
                href="#"
                class="px-4 py-2 rounded-xl border border-(--border-color) hover:border-(--primary) hover:text-(--primary) transition-all duration-300"
                >Contacto</a
              >
            </li>
            <li>
              <a
                href="#"
                class="px-4 py-2 rounded-xl border border-(--border-color) hover:border-(--primary) hover:text-(--primary) transition-all duration-300"
                >Privacidad</a
              >
            </li>
          </ul>
        </nav>

        <!-- Social Icons -->
        <div class="flex justify-center md:justify-end gap-3">
          <a
            v-for="icon in ['facebook', 'instagram', 'linkedin']"
            :key="icon"
            href="#"
            class="relative w-10 h-10 flex items-center justify-center rounded-xl bg-(--surface-2)/40 backdrop-blur-md border border-(--border-color) hover:border-(--primary) hover:text-(--primary) hover:-translate-y-1 transition-all duration-300 group shadow-lg"
          >
            <i :class="`pi pi-${icon} text-base`" class="z-10"></i>
          </a>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t border-(--border-color)/30 flex flex-col items-center gap-4">
        <p class="text-[9px] text-(--text-muted) uppercase tracking-[0.2em] font-black text-center">
          © 2024 <span class="text-(--text-main)">GameFest</span> — Diseñado para la comunidad.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
}
.pi {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
