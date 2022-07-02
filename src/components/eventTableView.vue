<template>
  <section>
    <base-button @click="showHide" mode="eventTable"
      >{{ isActive ? 'Show' : 'Hide' }}
    </base-button>

    <table class="table-view">
      <thead>
        <tr>
          <th scope="col">Event Type</th>
          <th scope="col">Description</th>
          <th scope="col">Created Date Time</th>
        </tr>
      </thead>
      <tbody v-if="!isActive">
        <tr
          v-for="event in content"
          :key="event.EVENT_TYPE_ROWID"
          @click="selectEventType(event.EVENT_TYPE_ROWID)"
          :class="{ highlight: event.EVENT_TYPE_ROWID === selectedEvent }"
        >
          <td>
            {{ event.EVENT_TYPE_ROWID }}
          </td>
          <td>
            {{ event.DESCRIPTION }}
          </td>

          <td>
            {{ getdate(event.CREATED_DATE_TIME) }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  props: {
    contentData: {
      type: Object,
      default() {
        return { event1: 'date' };
      },
    },
  },

  emits: ['event-type-table'],

  data() {
    return {
      content: this.contentData,
      isActive: false,
      eventTable: 'event-table',
      selectedEvent: null,
    };
  },

  methods: {
    showHide() {
      this.isActive = !this.isActive;
    },

    selectEventType(evt) {
      this.$emit('event-type-table', evt);
      this.selectedEvent = evt;
    },

    getdate(requestDate) {
      const date = new Date(requestDate).getDate();
      const month = new Date(requestDate).getMonth() + 1;
      const year = new Date(requestDate).getFullYear();
      const hour = new Date(requestDate).getHours();
      const minutes = new Date(requestDate).getMinutes();
      const seconds = new Date(requestDate).getSeconds();
      const milliseconds = (
        '00' + new Date(requestDate).getMilliseconds()
      ).slice(-3);
      return (
        date +
        '-' +
        month +
        '-' +
        year +
        ' ' +
        hour +
        ':' +
        minutes +
        ':' +
        seconds +
        ':' +
        milliseconds +
        ' UTC/GMT' +
        new Date(requestDate).toLocaleTimeString('en-Us', {
          timezone: 'CET',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) +
        'CET'
      );
    },
  },
};
</script>

<style lang="scss">
table {
  margin: 0px;
  padding: 20px;
  text-align: center;
  vertical-align: middle;
  width: 100%;

  th,
  td {
    border: 1px solid black;
    padding: 8px;
    width: 25%;
  }

  thead {
    background-color: #181e22;
    color: #919ba3;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 28;
  }
}
.table-view {
  margin: Opx;
  caption-side: bottom;
  color: rgb(174, 170, 170);
  letter-spacing: 1px;
  box-shadow: 0 2px 8px #3db2ff;
  border-collapse: separate;
  border-radius: 8px;
  .highlight {
    background-color: #3db2ff;
    color: #2c353a;
  }

  tbody tr:hover {
    cursor: pointer;
    background-color: #3db2ff;
    color: #2c353a;
  }
}
</style>
