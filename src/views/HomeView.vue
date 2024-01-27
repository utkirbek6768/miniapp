<template>
  <div class="home_wrapper">
    <h1>This home page</h1>
    <header>
      <div class="wrapper">
        <div class="title">Title</div>
        <div class="hint">Qisqacha izoh yozish mumkin</div>
        <nav>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/register">Register</RouterLink>
          <RouterLink to="/abaut">Abaut</RouterLink>
        </nav>
        <RouterView />
      </div>
    </header>
  </div>
</template>

<script setup></script>

<style scoped></style>
