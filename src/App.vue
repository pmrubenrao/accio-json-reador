<template>
  <section>
    <h1>ACCIO - An Event Explorer <span>🧙‍♂️✨</span></h1>
    <div class="main-container">
      <div>
        <div class="main-container-request">
          <div>
            <input
              type="radio"
              id="one"
              name="rqid"
              value="request id"
              v-model="idPicked"
              checked
            />
            <label for="one">Request ID</label>
            <input
              type="radio"
              id="two"
              name="rqid"
              value="reference_id"
              v-model="idPicked"
            />
            <label for="two">Reference ID</label>
          </div>
          <div class="break"></div>
          <form
            @submit.prevent="submitRequest(idPicked)"
            class="main-container-request-patch"
          >
            <div>
              <input
                id="requestId"
                name="requestId"
                type="text"
                ref="requestIdentifier"
                placeholder="enter your Request / Payment id"
                class="main-input"
              />
            </div>
            <div>
              <base-button>Fetch</base-button>
            </div>
          </form>

          <div><base-button @click="loadRawJSON">RAW</base-button></div>
        </div>

        <div v-if="isLoading"><base-spinner></base-spinner></div>
        <div v-else class="event-type-container">
          <div class="control-panel-select">
            <select
              name="eventSelector"
              id="event-selector"
              v-model="eventType"
            >
              <option value="" disabled>Select Event Type</option>
              <option v-for="event in content.data" :key="event">
                {{ event.EVENT_TYPE }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="transaction-container">
        <base-card :mode="transactionCardtheme">
          <ul v-for="tran of transactionDetails.data" :key="tran">
            <li v-for="requestStatus of tran" :key="requestStatus">
              {{
                isNaN(Date.parse(requestStatus))
                  ? requestStatus
                  : new Date(requestStatus).toUTCString()
              }}
            </li>
          </ul>
        </base-card>
      </div>
      <base-dialog
        :show="isloadRawJSONFlag"
        :title="eventTypeJson"
        @close="closeDialog"
      >
      </base-dialog>

      <event-table-view
        v-if="!isLoading"
        :contentData="content.data"
        class="event-table-container"
      ></event-table-view>

      <event-type-extracter
        :key="componentKey"
        :event-type="eventType"
        :event-template="eventTemplate"
        :event-type-json="eventTypeJson"
        class="transaction-detail-container"
      >
      </event-type-extracter>
      <div class="footer">
        <p>
          <a href="mailto:ruben.rao@db.com">
            Created with <span>♥</span> by Ruben</a
          >
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import EventTypeExtracter from './components/eventTypeExtracter.vue';
import EventTableView from './components/eventTableView.vue';

export default {
  name: 'App',
  components: {
    EventTypeExtracter,
    EventTableView,
  },

  data() {
    return {
      content: '',
      transactionDetails: '',
      eventType: '',
      eventTemplate: [],
      eventTypeJson: {},
      componentkey: 1,
      isLoading: false,
      isloadRawJSONFlag: false,
      closedialogFlag: null,
      transactionCardtheme: '',
      idPicked: 'request id',
    };
  },

  watch: {
    eventType: {
      async handler() {
        let self = this;
        await import('./assets/event_template/' + this.eventType + '.js')
          .then(function (data) {
            self.eventTemplate = [];
            self.eventTemplate = data.default;
          })
          .catch((e) => {
            console.log('Template loading FAILED :: ', e);
          });

        this.eventTypeJson = this.content.data.filter(function (field) {
          if (field.EVENT_TYPE === self.eventType) {
            return true;
          } else {
            return false;
          }
        });
        this.eventTypeJson = JSON.parse(this.eventTypeJson[0].ADDITIONAL_DATA);
        self.componentkey += 1;
      },
      deep: true,
    },
  },

  methods: {
    closeDialog() {
      this.isloadRawJSONFlag = !this.isloadRawJSONFlag;
    },

    loadRawJSON() {
      this.isloadRawJSONFlag = !this.isloadRawJSONFlag;
    },

    transactionCard(data) {
      if (data[0].includes('Error') || data[0].includes('RJCT')) {
        this.transactionCardtheme = 'transaction-card-error';
      } else if (data[0].includes('Executed') || data[0].includes('ACTC')) {
        this.transactionCardtheme = 'transaction-card-success';
      } else {
        this.transactionCardtheme = 'transaction-card-warn';
      }
    },

    async submitRequest() {
      const requestIdentifier = this.$refs.requestIdentifier.value;
      const column_name = this.idPicked;
      console.log('column name', column_name);
      this.isLoading = true;
      await axios
        .post('http://localhost:5500/aisDetails/' + requestIdentifier, {
          column_name: column_name,
        })
        .then((response) => {
          this.content = response;
          console.log(response);
          this.checkTransaction();
        })
        .catch((e) => console.log(e))
        .finally((data) => console.log(data));
      this.isLoading = false;
    },

    async checkTransaction() {
      await axios
        .post(
          'http://localhost:5500/transactionDetails/',
          this.content.data[0].REFERENCE_ID,
          { table_name: this.content.data[0].REFERENCE_ID_TYPE }
        )
        .then((response) => {
          this.transactionDetails = response;
          console.log('tranaction detail', response);
          this.transactionCard(response.data);
          // this.content = this.content.replace(/W/g,
        })
        .catch((e) => console.log(e))
        .finally((data) => console.log(data));
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu:ital,wght@0.300;0,400;0,500;0,700;1,400;1,500;1,700&display=swap');

#app {
  font-family: 'Ubuntu', sans-serif;
  background-color: #1e1e1e;
  color: #aebbc4;
  height: 100%;
  width: 100%;
}
h1 {
  margin: 0px;
  padding: 1em;
  font-size: 2rem;
  text-align: center;
  span {
    font-weight: 400;
  }
}

.footer {
  display: table;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  grid-column-start: 1;
  grid-column-end: 3;
  a {
    color: #aebbc4;
    text-decoration: none;
  }
  span {
    color: red;
    text-decoration: none;
  }
}

body {
  margin: 0px;
  padding: 0px;
}
section {
  padding: 0rem 2rem;
  padding-bottom: 1em;
}

.main-container {
  display: grid;
  // margin-bottom: 4em;
  grid-template-rows: repeat(1, auto);
  grid-template-columns: repeat(2, 1fr);
  // overflow: auto;
  .main-container-request-patch {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // margin: 1rem 2rem;
  }
  .main-container-request {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 1.5rem 0.5rem 2rem;
  }
  .event-type-container {
    // display: flex;
    top: Opx;
    position: sticky;
    // justify-content: flex-start;
    margin: 1rem 2rem;
  }

  .transaction-container {
    // display: flex;
    padding: 10px 28px;
    line-height: 1.8;
    font-family: 'Courier Prime', monospace;
    font-size: 15px;
    list-style-type: none;

    ul {
      margin: 0em;
      padding: 0em;
    }
    li {
      font-family: 'Courier Prime', monospace;
      font-size: 15px;
      list-style-type: none;
      // line-height: 0:
      // margin: 0 0 4px 0;
    }
  }

  .transaction-detail-container {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  .event-table-container {
    grid-column-start: 1;
    grid-column-end: 3;
  }
}

.break {
  flex-basis: 100%;
  height: 0;
}
.main-input {
  display: block;
  width: 21rem;
  height: 36px;
  margin: 0 10px 0 0;
  font: inherit;
  color: inherit;
  padding: 0.15rem;
  border: 2px solid #455d7a;
  border-radius: 8px;
  background-color: #181e22;
}
.main-input focus,
select:focus {
  outline: none;
  border-color: #3db2ff;
  box-shadow: 2px 8px #3db2ff;
  transition: 0.5s;
  background-color: #181e22;
}

.form-control {
  margin: 1rem 10rem;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

pre {
  overflow-x: auto !important;
  white-space: pre-wrap !important; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
  white-space: -pre-wrap !important; /* Opera 4-6 */
  white-space: -o-pre-wrap !important; /* Opera 7 */
  word-wrap: break-word !important; /* Internet Explorer 5.5+ */
}

/* Weird the css styling for select tag */
select {
  display: block;
  width: 21.5rem;
  height: 46px;
  font: inherit;
  padding: 0.15rem;
  // top: 10px;
  position: sticky;
  color: #aebbc4;
  border: 2px solid #455d7a;
  border-radius: 8px;
  background-color: #181e22;
  margin: 0 10px 0 0;
  // opacity: 40%;
  /* margin: 50px; */
  /* width: 27rem;
font-size: 14px;
border: 2px solid #959797;
border-radius: 8px;
height: 44px;
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
background: urlhttps://stackoverflow.com/favicon.ico) 96% / 15% no-repeat*/
  /* #eee;*/
}
/* CAUTION: Internet Explorer hackery ahead */
select::-ms-expand {
  display: none; /* Remove default arrow in Internet Explorer 10 and 11 */
}
/* Targat Internet Explorer 9 to undo the custom arrow */
@media screen and (min-width: 0\0) {
  select {
    background: none\9;
    padding: 5px\9;
  }
}
@media (max-width: 1400px) {
  .main-input {
    width: 18rem;
    height: 28px;
  }
  select {
    width: 18.5rem;
    height: 38px;
  }
  body {
    font-size: 14px;
  }
}
</style>
