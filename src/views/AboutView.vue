<template>
  <div>
    <button @click="handleButtonClick">Click me</button>
  </div>
</template>

<script setup>
// Assume we have a function called onClick in the component
const onClick = (callback) => {
  // Assuming Telegram.WebApp.onEvent is available in your context
  Telegram.WebApp.onEvent("mainButtonClicked", callback);
};

// Function to be called when the button is clicked
const handleButtonClick = () => {
  console.log("Button clicked!");
};

// Set up the click event using onClick
onClick(handleButtonClick);
</script>

<style>
/* Add your styles here if needed */
</style>
