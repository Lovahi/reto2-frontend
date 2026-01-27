<script setup>
// No necesitamos lógica JS por ahora en el footer
</script>

<template>
  <footer class="bg-[#4ab491] text-white py-6 mt-10 shadow-inner">
    
    <div class="container mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-4">
      
      <div class="flex items-center gap-3">
        <img 
          src="../assets/sources/img/Gemini_Generated_Image_segyufsegyufsegy-Photoroom.png" 
          alt="Logo" 
          class="h-10 w-auto mix-blend-multiply contrast-[1.1]"
        >
        <div class="text-sm">
            <p class="font-bold">GameFest</p>
            <p class="opacity-80">© 2024 Todos los derechos reservados.</p>
        </div>
      </div>

      <ul class="flex gap-6 text-sm font-medium">
        <li><a href="#" class="hover:text-emerald-100 transition-colors">Sobre Nosotros</a></li>
        <li><a href="#" class="hover:text-emerald-100 transition-colors">Contacto</a></li>
        <li><a href="#" class="hover:text-emerald-100 transition-colors">Privacidad</a></li>
      </ul>

      <div class="flex gap-4">
        <a href="#" class="hover:scale-110 transition-transform">
            <i class="pi pi-facebook text-xl"></i>
        </a>
        <a href="#" class="hover:scale-110 transition-transform">
            <i class="pi pi-linkedin text-xl"></i>
        </a>
        <a href="#" class="hover:scale-110 transition-transform">
            <i class="pi pi-instagram text-xl"></i>
        </a>
        <a href="#" class="hover:scale-110 transition-transform">
            <i class="pi pi-youtube text-xl"></i>
        </a>
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
</style>

