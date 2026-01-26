<template>
  <div id="navbar">
    <div class="logo-wrapper">
      <img src="../assets/sources/img/Gemini_Generated_Image_segyufsegyufsegy-Photoroom.png" alt="Logo"
        class="logo-gaming">
      <p>GameFest</p>
    </div>
    <div class="nav-links">
      <RouterLink to="/" class="nav-item">Inicio</RouterLink>
      <RouterLink to="/videojuegos" class="nav-item">Juegos</RouterLink>
      <RouterLink to="/eventos" class="nav-item">Eventos</RouterLink>
    </div>
    <div class="login">
      <i class="pi pi-user"></i>
      <button class="btn-login">Login</button>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
#navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(74, 180, 145);
  height: 40px;
  padding: 0 20px;
  border-radius: 10px;
  width: 95%;
  margin-top: 1%;
  margin-left: 2.5%;

}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
}

.logo-gaming {
  height: 60px;
  width: auto;
  mix-blend-mode: multiply;
  filter: contrast(1.1);
}

.logo-wrapper p {
  color: azure;
  font-size: larger;
}

.login {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  color: white;
}

.btn-login {
  background: white;
  color: rgb(74, 180, 145);
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.router-link-active {
  text-decoration: underline;
  color: #0f172a;
}

.nav-item {
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #e2e8f0;
}
</style>