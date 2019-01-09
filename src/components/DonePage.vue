<template>
  <div>
    <br/>
    <v-alert
      :value="true"
      type="success"
    >
      Your children were registered successfully!!!
    </v-alert>
    <br/>
    <p>Please take note of where your kid should go:</p>
    <ul>
      <li>Age 3 - Grade 2: Little Ones (Pebbles)</li>
      <li>Grade 3 - 7: Junior Youth (The House)</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DonePage"
}
</script>
