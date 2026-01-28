<script setup></script>
<template>

<form class="text-[#4ab491] max-w-sm mx-auto pt-40 space-y-4">
    <div class="bg-[#000000] text-[#4ab491] p-6 rounded-lg shadow-md space-y-4">
        <div class="flex justify-center text-[#4ab491] mb-4">
            <i class="pi pi-user-plus text-xl"></i>
        </div>
    <div>
        <label for="username" class="block mb-2.5 text-sm text-[#4ab491] font-medium text-heading">UserName</label>
        <input type="text" id="username" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="" required />
    </div>
    <div>
        <label for="email" class="block mb-2.5 text-sm text-[#4ab491] font-medium text-heading">Email</label>
        <input type="email" id="email" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" required />
    </div>
    <div>
        <label for="password" class="block mb-2.5 text-sm text-[#4ab491] font-medium text-heading">Password</label>
        <input type="password" id="password" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="" required />
    </div>
    <div>
        <label for="confirm-password" class="block mb-2.5 text-sm text-[#4ab491] font-medium text-heading">Confirm Password</label>
        <input type="password" id="confirm-password" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="" required />
    </div>
    <button type="submit" class="w-full text-black bg-[#4ab491] hover:bg-brand-dark focus:ring-4 focus:outline-none focus:ring-brand font-bold rounded-md text-lg px-5 py-2.5 text-center shadow-sm">Registrarse</button>
    <p class="text-[#4ab491]">ya tienes cuenta? <a href="#" class="text-white">Iniciar sesión</a></p>
    </div>
</form>

</template>
<script scoped></script>