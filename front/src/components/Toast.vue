<template>
  <v-snackbar
    :timeout="timeout"
    :color="color"
    v-model="active"
    multi-line
    location="top right"
    @click="dismiss"
  >
    <v-icon
      dark
      left
      v-if="icon.length > 0"
    >
      {{ icon }}
    </v-icon>

    <div class="text-subtitle-1 pb-2">
      {{ title }}
    </div>
    <p>{{ textParsed }}</p>

    <template v-slot:actions>
      <v-btn
        icon="mdi-close"
        @click="active = false"
      />
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { EventBus } from "@/plugins/event-bus";
import { isArray } from "lodash";

interface ToastOptions {
  title?: string;
  text?: string | string[];
  icon?: string;
  color?: string;
  timeout?: number;
  dismissible?: boolean;
}

export default {
  data() {
    return {
      active: false,
      title: '',
      text: '' as string | string[],
      icon: '',
      color: 'info',
      timeout: 3000,
      dismissible: true,
    };
  },
  created() {
      EventBus.$on('toast', this.show);
  },
  computed: {
    textParsed() {
      if (isArray(this.text)) {
        return this.text.join('\n');
      }

      return this.text;
    },
  },
  methods: {
    show(options: ToastOptions = {}) {

      if (this.active) {
        this.close();
        this.$nextTick(() => this.show(options));
        return;
      }

      this.title = options.title || '';
      this.text = options.text || '';
      this.icon = options.icon || '';
      this.color = options.color || 'info';
      this.timeout = options.timeout || 5000;
      this.dismissible = options.dismissible || true;

      this.active = true;
    },
    close() {
      this.active = false;
    },
    dismiss() {
      if (this.dismissible) {
        this.active = false;
      }
    },
  },
};
</script>
