import { createApp } from 'vue';
import App from './App.vue';
import BaseButton from './components/ui-components/BaseButton.vue';
import BaseCard from './components/ui-components/BaseCard.vue';
import BaseSpinner from './components/ui-components/BaseSpinner.vue';
import BaseDialog from './components/ui-components/BaseDialog.vue';

const app = createApp(App);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.mount('#app');
