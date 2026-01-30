<template>
  <div class="flex flex-col items-center justify-center bg-white max-w-sm mx-auto h-50 mt-25">

      <!-- <div class="flex flex-col gap-[30px] text-center text-[xx-large]"> -->
        <div class="relative">
              <img 
                src="../assets/sources/img/Gemini_Generated_Image_segyufsegyufsegy-Photoroom.png" 
                alt="Logo" 
                class="size-5 h-14 w-auto mix-blend-multiply contrast-[1.1] z-10 relative group-hover:scale-110 transition-transform duration-500"
              >
              </div>
     <!--  </div> -->

      <div class="mt-5 flex flex-col gap-[10px] text-center text-[large] text-[#4ab491] font-mono w-[90%]">
        <RouterLink to="/login" class="mx-[5px] p-[8px] text-center rounded-[5px] text-[#4ab491] bg-white border hover:bg-[#abb3b7] transition-colors ">
          Iniciar sesion
        </RouterLink>
        <RouterLink to="/registro" class="mx-[5px] p-[8px] text-center rounded-[5px] bg-[#4ab491] text-white hover:bg-[#3d9679] transition-colors ">
          Registrarse
        </RouterLink>
      </div>
  
  </div>
</template>