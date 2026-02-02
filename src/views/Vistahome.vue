<template>
  <div class="flex flex-col items-center justify-center max-w-sm mx-auto h-50 mt-25">

      <!-- <div class="flex flex-col gap-[30px] text-center text-[xx-large]"> -->
        <div class="relative">
              <img 
                src="../assets/sources/img/Gemini_Generated_Image_segyufsegyufsegy-Photoroom.png" 
                alt="Logo" 
                class="w-[300px] h-[300px] object-cover transition-transform duration-500 hover:rotate-720 hover:scale-140"
              >
              </div>
     <!--  </div> -->

      <div class="flex flex-col gap-[10px] text-center text-[large] text-[#4ab491] font-mono w-[90%] md:flex-row md:justify-center md:items-center md:gap-[30px]">
        <RouterLink to="/login" class="mx-[5px] p-[8px] text-center rounded-[5px] text-[#4ab491] bg-white border hover:bg-[#abb3b7] transform transition hover:scale-140 duration-800 ">
          Iniciar sesion
        </RouterLink>
        <RouterLink to="/registro" class="mx-[5px] p-[8px] text-center rounded-[5px] bg-[#4ab491] text-white hover:bg-[#3d9679] transform transition hover:scale-140 duration-800">
          Registrarse
        </RouterLink>
      </div>
  
  </div>
</template>