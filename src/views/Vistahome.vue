<script setup>

</script>

<template>
<div class="main">
    <div class="title">
    <h1>GameFest!</h1>
    <p>Explora el mundo virtual!</p>
    </div>
    <div class="buttons">
    <button class="btn-login">Iniciar sesion</button>
    <button class="btn-register"> Registrarse </button>
    </div>
</div>
</template>

<style>
.main{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    gap: 20px;
}
.title{
    display: flex;
    flex-direction: column;
    gap: 30px;
    text-align: center;
    font-size: xx-large;
}
.title h1{
    color:rgb(74, 180, 145);
}


.buttons{
    margin-top: 20px;

}
.btn-login, .btn-register{
    margin: 0 10px;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
}
.btn-login {
    color: rgb(74, 180, 145);
    background-color: white;
    border: 1px solid;

}

.btn-register {
    background-color: rgb(74, 180, 145);
    color: white;
}



</style>