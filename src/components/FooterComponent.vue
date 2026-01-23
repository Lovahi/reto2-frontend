<script setup>

</script>

<template>
<footer class="footer">
    <div class="footer-info">
        <img src="../assets/Gemini_Generated_Image_segyufsegyufsegy-Photoroom.png" alt="">
        <ul>
            <li>about</li>
            <li>contact</li>
            <li>privacy policy</li>
        </ul>
    </div>
    <div class="footer-social">
        <i class="pi pi-facebook"></i>
        <i class="pi pi-linkedin"></i>
        <i class="pi pi-instagram"></i>
        <i class="pi pi-youtube"></i>
    </div>
</footer>
</template>

<style scoped>

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(74, 180, 145);
    color: #fff;
    padding: 20px 0;
    height: 60px;
}

.footer-info {
    display: flex;
    align-items: center;
    justify-content: center;
   
}

.footer-info img {
    max-width: 100px;
    margin-right: 20px;
}

.footer-info ul {
    display: flex;
    justify-content: center;
    list-style: none;
    gap:10px;
    padding: 0;

}



.footer-social {
    display: flex;
    justify-content: center;
    margin-right: 40%;
}

.footer-social i {
    display: flex;
    margin: 0 10px;
    font-size: 24px;
    cursor: pointer;
}

</style>
