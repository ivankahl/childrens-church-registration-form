<template>
  <div>
    <v-layout>
      <v-flex xs12 md6>
        <v-text-field
          v-model="data.firstName"
          label="First Name*"
          :error-messages="errors.firstName"
          required
          outline
          class="mr-1"
        />
      </v-flex>

      <v-flex xs12 md6>
        <v-text-field
          v-model="data.lastName"
          label="Last Name*"
          :error-messages="errors.lastName"
          required
          outline
          class="ml-1"
        />
      </v-flex>
    </v-layout>
    <v-menu
      :close-on-content-click="false"
      v-model="showDatepicker"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
    >
      <v-text-field
        slot="activator"
        :value="formattedDateOfBirth"
        label="Date of Birth*"
        :error-messages="errors.dateOfBirth"
        readonly
        required
        outline
      />
      <v-date-picker v-model="data.dateOfBirth" @input="showDatepicker = false"></v-date-picker>
    </v-menu>
    <v-select
      :items="ages"
      label="Grade*"
      v-model="data.grade"
      :error-messages="errors.grade"
      required
      outline
    >
    </v-select>
    <v-select
      :items="genders"
      label="Gender*"
      v-model="data.gender"
      :error-messages="errors.gender"
      required
      outline
    >
    </v-select>
    <v-textarea
      label="Allergies"
      v-model="data.allergies"
      :error-messages="errors.allergies"
      outline
    >
    </v-textarea>
    <v-textarea
      label="Anything else we should know? (conditions, disabilities, etc.)"
      v-model="data.anythingElse"
      :error-messages="errors.anythingElse"
      outline
    >
    </v-textarea>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: ['data', 'errors'],
  data: function() {
    return {
      showDatepicker: false,
      ages: [
        'Age 3 (Potty Trained)',
        'Age 4 (Grade 000)',
        'Age 5 (Grade 00)',
        'Grade R (Grade 0)',
        'Grade 1',
        'Grade 2',
        'Grade 3',
        'Grade 4',
        'Grade 5',
        'Grade 6',
        'Grade 7'
      ],
      genders: [
        'Boy',
        'Girl'
      ]
    }
  },
  computed: {
    formattedDateOfBirth() {
      return this.data.dateOfBirth ? moment(this.data.dateOfBirth).format("DD/MM/YYYY") : "";
    }
  }
}
</script>
