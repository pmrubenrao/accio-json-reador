<template>
  <div class="bang-container">
    <div
      v-for="(value, group) of groupedFields"
      :key="group"
      class="bang-container-list"
      :class="idUrlClassSelector(group)"
    >
      <b> {{ group }} :</b>

      <base-card>
        <li v-for="(value, field) in groupedFields[group]" :key="field">
          <p>{{ field }} -</p>
          <p>{{ value === null || value === '' ? 'No-data' : value }}</p>
        </li>
      </base-card>
    </div>
  </div>
</template>

<script>
// import BaseButton from './ui-components/BaseButton.vue';
import BaseCard from './ui-components/BaseCard.vue';
import groupedFieldsTemplate from '../../assets/groupedFields.js';
import structuredClone from '@ungap/structured-clone';

export default {
  components: { BaseCard },
  props: {
    eventType: String,
    eventTypeJson: {
      type: Object,
    },
    componentKey: Number,
  },

  data() {
    return {
      fields: {},
      groupedFields: structuredClone(groupedFieldsTemplate),
    };
  },

  mounted() {
    console.log(this.eventTypeJson);
    this.getData();
  },

  methods: {
    getData() {
      this.eventExtracter(this.eventTypeJson);
      this.groupedEvent();
    },

    idUrlClassSelector(field) {
      if (!(field === 'ID_URL_ INFORMATION')) {
        return {
          'button-span': false,
        };
      }
      return { 'button-span': true };
    },
    eventExtracter(jsonResponse) {
      const jsonResponseObject = JSON.parse(JSON.stringify(jsonResponse));
      for (var k in jsonResponseObject) {
        if (
          (jsonResponseObject[k] instanceof Object &&
            !Array.isArray(jsonResponseObject[k])) ||
          (Array.isArray(jsonResponseObject[k]) &&
            jsonResponseObject[k].some(
              (x) => typeof x === 'object' && !Array.isArray(x)
            ))
        ) {
          this.eventExtracter(jsonResponseObject[k]);
        } else {
          this.fields[k.toUpperCase()] = jsonResponseObject[k];
        }
      }
    },

    groupedEvent() {
      Object.keys(this.groupedFields).forEach((key) => {
        Object.keys(this.groupedFields[key]).forEach((keyInner) => {
          if (this.fields.hasOwnProperty(keyInner)) {
            this.groupedFields[key][keyInner] = this.fields[keyInner];
          }
        });
      });

      this.groupedFields = JSON.parse(JSON.stringify(this.groupedFields));
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap');

body {
  p {
    margin: 0px 30px 0 0;
  }
}

pre {
  overflow-x: auto limportant;
  white-space: pre-wrap !important; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
  white-space: -pre-wrap !important; /* Opera 4-6 */
  white-space: -o-pre-wrap !important; /* Opera 7 */
  word-wrap: break-word !important; /* Internet Explorer 5.5+ */
}

.bang-container {
  display: grid;

  grid-template-rows: repeat(4, auto);
  grid-template-columns: repeat(2, 1fr);
  // grid-template-rows: 50px 1fr 1fr;

  // background: rgb(255, 255, 255) ;
  // height: 700px;
  // width: 900px;
  // row-gap: 12px;
  // column-gap: 12px;
  li {
    display: flex;
    justify-content: space-between;
    font-family: 'Courier Prime', monospace;
    // font-size: 12px;
    list-style-type: none;
    // line-height: 0;
    // margin: 0 0 4px 0;
  }

  .bang-container-list {
    padding: 10px 28px;
    line-height: 1.8;
    // background; rgb(255, 255, 255) ;
  }

  button-span {
    // grid-column: span 1 / auto;
    grid-column-start: 1;
    grid-column-end: 3;
  }
}
</style>
