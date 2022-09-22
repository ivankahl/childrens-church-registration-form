<template>
  <v-form>
    <p class="subheader">
      Please fill in the form below to register your child for Children's
      Church.
    </p>
    <div v-if="step == 'Children'">
      <h2 class="section-header">Child Information</h2>
      <p>Please enter in your child's details below</p>
      <v-expansion-panel expand v-model="panels.children">
        <v-expansion-panel-content
          v-for="(child, index) in children"
          :key="index"
          :value="true"
        >
          <div slot="header">
            <v-icon>child_care</v-icon>
            <span style="margin-left: 20px; font-weight:bold; font-size:1.1em;"
              >{{ child.firstName }} {{ child.lastName }}</span
            >
          </div>
          <v-container>
            <child-form :data="child" :errors="errors.children[index]" />
            <v-btn @click="removeChild(index)" dark color="red" block depressed
              >Remove</v-btn
            >
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <br />
      <v-btn color="secondary" @click="addChild()" block dark depressed
        >Add Child</v-btn
      >
    </div>
    <div v-else-if="step == 'Parents'">
      <h2 class="section-header">Parent/Guardian Information</h2>
      <p>
        Please fill in contact information for parents here. You can fill in up
        two contact people.
      </p>
      <v-expansion-panel expand v-model="panels.contacts">
        <v-expansion-panel-content>
          <div slot="header">
            <v-icon>person</v-icon>
            <span style="margin-left: 20px; font-weight:bold; font-size:1.1em;"
              >Contact Person 1</span
            >
          </div>
          <v-container>
            <p>
              Please fill in the details for the first contact person below.
            </p>
            <v-layout>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="contacts.first.firstName"
                  label="First Name*"
                  required
                  :error-messages="errors.contacts.first.firstName"
                  outline
                  class="mr-1"
                />
              </v-flex>

              <v-flex xs12 md6>
                <v-text-field
                  v-model="contacts.first.lastName"
                  label="Last Name*"
                  :error-messages="errors.contacts.first.lastName"
                  required
                  outline
                  class="ml-1"
                />
              </v-flex>
            </v-layout>
            <v-text-field
              v-model="contacts.first.contactNumber"
              :error-messages="errors.contacts.first.contactNumber"
              required
              mask="phone"
              outline
              label="Contact Number*"
            />
            <v-text-field
              v-model="contacts.first.alternateContactNumber"
              :error-messages="errors.contacts.first.alternateContactNumber"
              mask="phone"
              outline
              label="Alternate Contact Number"
            />
          </v-container>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <div slot="header">
            <v-icon>person</v-icon>
            <span style="margin-left: 20px; font-weight:bold; font-size:1.1em;"
              >Contact Person 2 (optional)</span
            >
          </div>
          <v-container>
            <p>
              If possible, please fill in contact details for a second person in
              the event that we cannot contact the first contact person.
            </p>
            <v-layout>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="contacts.second.firstName"
                  label="First Name"
                  required
                  outline
                  class="mr-1"
                />
              </v-flex>

              <v-flex xs12 md6>
                <v-text-field
                  v-model="contacts.second.lastName"
                  label="Last Name"
                  required
                  outline
                  class="ml-1"
                />
              </v-flex>
            </v-layout>
            <v-text-field
              v-model="contacts.second.contactNumber"
              required
              mask="phone"
              outline
              label="Contact Number"
            />
            <v-text-field
              v-model="contacts.second.alternateContactNumber"
              required
              mask="phone"
              outline
              label="Alternate Contact Number"
            />
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
    <div v-else-if="step == 'Final'">
      <h2 class="section-header">Almost there!</h2>
      <p>
        Please read and accept the conditions below in order for your child to
        attend Children's Church.
      </p>
      <h3 class="section-header-2">Tag Policy</h3>
      <p>
        I, the parent/guardian understand that my child/ren need to be dropped
        and collected by an adult with the issued tag and that I will be on the
        premises for the duration of the church service.
      </p>
      <v-checkbox
        color="secondary"
        v-model="policies.tag"
        :error-messages="errors.policies.tag"
        label="I have read and accept the Tag Policy above."
      />
      <h3 class="section-header-2">Medical Release Policy</h3>
      <p>
        I/we understand that, in the event of medical treatment being required,
        every effort will be made to contact me. However, if I cannot be
        reached, I give my permission to the staff or sponsor to procure medical
        treatment, including anesthesia, for my child's wellbeing.
      </p>
      <v-checkbox
        color="secondary"
        v-model="policies.medicalRelease"
        :error-messages="errors.policies.medicalRelease"
        label="I have read and accept the Medical Release Policy above."
      />
      <h3 class="section-header-2">Indemnity</h3>
      <p>
        I, the parent/guardian, of the above-mentioned child/ren, will not hold
        any of the leaders or volunteers responsible for any mishap whatsoever
        that might occur to my child/ren while at Cornerstone Children's Church.
        I will not leave the church premises without my child/ren. I understand
        that a specific tag will be issued per child and that my child/ren can
        only be collected by an adult with this specific tag, as per the tag
        policy.
      </p>
      <v-checkbox
        color="secondary"
        v-model="policies.indemnity"
        :error-messages="errors.policies.indemnity"
        label="I have read and accept the Indemnity above."
      />
      <v-btn
        color="secondary"
        block
        depressed
        dark
        @click="register"
        :loading="submitting"
        >Register</v-btn
      >
    </div>
    <v-divider class="mt-3" />
    <div class="d-flex mt-3">
      <v-spacer />
      <v-btn color="secondary" outline v-if="step == 'Parents'">← Back</v-btn>
      <v-btn
        color="secondary"
        outline
        v-if="step == 'Children' || step == 'Parents'"
        @click="
          () => {
            if (step == 'Children' && validateChildren()) {
              step = 'Parents';
            } else if (step == 'Parents' && validateParents()) {
              step = 'Final';
            }
          }
        "
        >Next →</v-btn
      >
      <v-spacer />
    </div>
    <v-snackbar
      v-model="errors.showToast"
      color="red"
      bottom
      right
      :timeout="5000"
    >
      {{ toastErrorMessage || "Please correct the errors." }}
    </v-snackbar>
  </v-form>
</template>

<script>
import ChildForm from "./ChildForm";
import axios from "axios";
import moment from "moment";

export default {
  components: {
    ChildForm
  },
  props: ["done"],
  name: "RegistrationForm",
  methods: {
    removeChild: function(childIndex) {
      this.panels.children.splice(childIndex, 1);
      this.errors.children.splice(childIndex, 1);
      this.children.splice(childIndex, 1);
    },
    addChild: function() {
      this.children.push({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        grade: "",
        gender: "",
        allergies: "",
        anythingElse: ""
      });

      this.errors.children.push({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        grade: "",
        gender: "",
        allergies: "",
        anythingElse: ""
      });

      this.panels.children.push(true);
      console.log(this.children);
    },
    register: function() {
      if (this.validate()) {
        // For easier reference later
        var contactPerson1 = this.contacts.first;
        var contactPerson2 = this.contacts.second;

        var numberProcessed = 0;
        this.submitting = true;
        var t = this;

        for (var i = 0; i < this.children.length; i++) {
          var formData = new FormData();

          var child = this.children[i];
          formData.append("First Name", child.firstName);
          formData.append("Last Name", child.lastName);
          formData.append(
            "Date of Birth",
            moment(child.dateOfBirth).format("DD/MM/YYYY")
          );
          formData.append("Grade", child.grade);
          formData.append("Gender", child.gender);
          formData.append("Allergies", child.allergies);
          formData.append("Anything else", child.anythingElse);

          formData.append(
            "Contact Person 1 First Name",
            contactPerson1.firstName
          );
          formData.append(
            "Contact Person 1 Last Name",
            contactPerson1.lastName
          );
          formData.append(
            "Contact Person 1 Lifegroup",
            contactPerson1.lifegroup
          );
          formData.append(
            "Contact Person 1 Contact Number",
            "'" + contactPerson1.contactNumber
          );
          formData.append(
            "Contact Person 1 Alternate Contact Number",
            "'" + contactPerson1.alternateContactNumber
          );

          formData.append(
            "Contact Person 2 First Name",
            contactPerson2.firstName
          );
          formData.append(
            "Contact Person 2 Last Name",
            contactPerson2.lastName
          );
          formData.append(
            "Contact Person 2 Contact Number",
            "'" + contactPerson2.contactNumber
          );
          formData.append(
            "Contact Person 2 Alternate Contact Number",
            "'" + contactPerson2.alternateContactNumber
          );

          formData.append("Tag Policy", "Yes");
          formData.append("Medical Release", "Yes");
          formData.append("Indemnity", "Yes");
          formData.append("Tag Number", "");

          axios({
            method: "post",
            url: "/api/submit",
            data: formData,
            config: { headers: { "Content-Type": "multipart/form-data" } }
          })
            .then(function(response) {
              numberProcessed++;

              if (numberProcessed === t.children.length) {
                t.$emit("doneRegistering");
              }
            })
            .catch(function(response) {
              numberProcessed++;
              console.log(response);
            });
        }
      }
    },
    validateChildren: function() {
      this.resetErrors();

      var anyErrors = false;

      if (this.children.length == 0) {
        this.toastErrorMessage = "Please add at least one child's details.";
        anyErrors = true;
      }

      // Check all the children
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];

        if (child.firstName === "") {
          this.errors.children[i].firstName =
            "Please enter the child's first name.";
          anyErrors = true;
        }

        if (child.lastName === "") {
          this.errors.children[i].lastName =
            "Please enter the child's last name.";
          anyErrors = true;
        }

        if (child.dateOfBirth === "") {
          this.errors.children[i].dateOfBirth =
            "Please enter the child's date of birth.";
          anyErrors = true;
        }

        if (child.grade === "") {
          this.errors.children[i].grade = "Please select the child's grade.";
          anyErrors = true;
        }

        if (child.gender === "") {
          this.errors.children[i].gender = "Please select the child's gender.";
          anyErrors = true;
        }
      }

      if (anyErrors) this.errors.showToast = true;

      return !anyErrors;
    },
    validateFinal: function() {
      this.resetErrors();

      var anyErrors = false;

      // Check the first contact
      var firstContact = this.contacts.first;
      if (firstContact.firstName === "") {
        this.errors.contacts.first.firstName =
          "Please enter in the first contact person's first name.";
        anyErrors = true;
      }

      if (firstContact.lastName === "") {
        this.errors.contacts.first.lastName =
          "Please enter in the first contact person's last name.";
        anyErrors = true;
      }

      if (firstContact.contactNumber === "") {
        this.errors.contacts.first.contactNumber =
          "Please enter in the first contact person's contact number.";
        anyErrors = true;
      }

      if (anyErrors) this.errors.showToast = true;

      return !anyErrors;
    },
    validateParents: function() {
      this.resetErrors();

      var anyErrors = false;

      // Check policies
      if (!this.policies.tag) {
        this.errors.policies.tag = "Please read and accept the Tag Policy.";
        anyErrors = true;
      }

      if (!this.policies.medicalRelease) {
        this.errors.policies.medicalRelease =
          "Please read and accept the Medical Release Policy.";
        anyErrors = true;
      }

      if (!this.policies.indemnity) {
        this.errors.policies.indemnity =
          "Please read and accept the Indemnity.";
        anyErrors = true;
      }

      if (anyErrors) this.errors.showToast = true;

      return !anyErrors;
    },
    resetErrors: function() {
      this.toastErrorMessage = null;

      this.errors.contacts = {
        first: {
          firstName: "",
          lastName: "",
          contactNumber: "",
          alternateContactNumber: ""
        },
        second: {
          firstName: "",
          lastName: "",
          contactNumber: "",
          alternateContactNumber: ""
        }
      };

      this.errors.policies = {
        tag: "",
        medicalRelease: "",
        indemnity: ""
      };

      for (var i = 0; i < this.errors.children.length; i++) {
        this.errors.children[i] = {
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          grade: "",
          gender: "",
          allergies: "",
          anythingElse: ""
        };
      }
    }
  },
  data() {
    return {
      step: "Children",
      toastErrorMessage: null,
      submitting: false,
      children: [],
      contacts: {
        first: {
          firstName: "",
          lastName: "",
          contactNumber: "",
          alternateContactNumber: ""
        },
        second: {
          firstName: "",
          lastName: "",
          contactNumber: "",
          alternateContactNumber: "",
          lifegroup: ""
        }
      },
      policies: {
        tag: false,
        medicalRelease: false,
        indemnity: false
      },
      panels: {
        children: [],
        contacts: [0]
      },
      errors: {
        children: [],
        contacts: {
          first: {
            firstName: "",
            lastName: "",
            contactNumber: "",
            alternateContactNumber: ""
          },
          second: {
            firstName: "",
            lastName: "",
            contactNumber: "",
            alternateContactNumber: ""
          }
        },
        policies: {
          tag: "",
          medicalRelease: "",
          indemnity: ""
        },
        showToast: false
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.section-header {
  font-weight: 300;
  font-size: 2em;
  margin-top: 40px;
}

.section-header-2 {
  font-weight: 400;
  font-size: 1.6em;
}
</style>
