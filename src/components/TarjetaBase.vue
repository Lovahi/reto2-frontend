<script setup></script>
<template>
    <div
      class="bg-white rounded-lg overflow-hidden shadow-2xl xl:w-1/5 lg:w-1/4 md:w-1/4 sm:w-full"
    >
      <slot name="image"></slot>
      <div class="p-6">
        <div v-if="$slots.titulo" class="flex items-baseline">
          <span
            class="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide"
          >
            <slot name="titulo"></slot>
          </span>
        </div>

        <div v-if="$slots.fecha"  class="mt-2 text-lg">
          <slot name="fecha"></slot>
        </div>

        <div v-if="$slots.hora" class="mt-1">
          <span class="text-gray-600">
            <slot name="hora"></slot>
          </span>
        </div>

        <div v-if="$slots.plazas"  class="mt-4 flex items-center">
          <span class="text-teal-600 text-sm font-semibold">
            <slot name="plazas"></slot>
          </span>
        </div>
        <div v-if="$slots.genero">
          <span><slot name="genero"></slot></span>
        </div>
        <p v-if="$slots.descripcion">
          <slot name="descripcion"></slot>
        </p>
        <div v-if="$slots.plataformas">
          <slot name="plataformas"></slot>
        </div>
      </div>
    </div>
</template>
