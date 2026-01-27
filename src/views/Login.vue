<template>
    

<form class="max-w-sm mx-auto">
  <div class="mb-5">
    <label for="email-alternative" class="block mb-2.5 text-sm font-medium text-heading">Your email</label>
    <input type="email" id="email-alternative" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body" placeholder="name@flowbite.com" required />
  </div>
  <div class="mb-5">
    <label for="password-alternative" class="block mb-2.5 text-sm font-medium text-heading">Your password</label>
    <input type="password" id="password-alternative" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body" placeholder="••••••••" required />
  </div>
  <button type="submit" class="mx-[10px] p-[10px] text-center rounded-[5px] bg-[#4ab491] text-white hover:bg-[#3d9679] transition-colors">Iniciar sesión</button>
  <div class="flex items-start mb-5">
      <p class="ms-2 text-sm font-medium text-heading select-none">Aun no tienes cuenta?<a href="#" class="text-fg-brand hover:underline"> registrate</a>.</p>
  </div>
</form>
</template>