import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { mdi } from 'vuetify/lib/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
    },
  },
});
