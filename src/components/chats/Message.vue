<template>
  <div class="message" :class="{ 'from-user': message.user_id }">
    <p class="message-user" :class="message.user_id == user.id ? 'message-user-self' : 'message-user-mate'" v-if="message.user_id && previous_user_id !== message.user_id">{{ message.user_id ? message.user_name : '' }}</p>
    <div class="message-bubble" :class="message.user_id == user.id ? 'message-self' : 'message-mate'">
      <div v-if="message.media">
        <div v-if="['IMAGE', 'STICKER', 'VIDEO', 'DOCUMENT'].includes(message.type)" class="document-container">
          <img v-if="['IMAGE', 'STICKER'].includes(message.type)" class="media-video-image" :src="`data:${message.media.mime_type};base64,${message.media.content}`">
          <video v-if="message.type === 'VIDEO'" class="media-video-image" :src="`data:${message.media.mime_type};base64,${message.media.content}`" controls></video>
          <div v-if="message.type === 'DOCUMENT'" class="document-content">
            <iframe v-if="['application/pdf'].includes(message.media.mime_type)" class="media-document" :src="`data:${message.media.mime_type};base64,${message.media.content}`"></iframe>
            <i v-else class="fa fa-file" style="font-size: 5em;"></i>
            <p>{{ getFileTypeDescription(message.media.mime_type) }}</p>
          </div>
          <button @click="downloadDocument" class="download-button"><i class="fa-regular fa-circle-down"></i></button> 
        </div>
        <audio v-if="message.type === 'AUDIO'" class="media-audio" :src="`data:${message.media.mime_type};base64,${message.media.content}`" controls></audio>
        
      </div>
      <a class="message-text location-message" target="_blank" :href="message.message" v-if="message.type=='LOCATION'">Maps Location</a>
      <p class="message-text" v-else>{{ message.message }}</p>
      <p class="message-time">{{ message.sent_at }}</p>
      <div v-if="message.user_id" class="chat-status">
        <i v-if="message.status==0" class="fa-solid fa-hourglass-half"></i>
        <i v-if="message.status==1" class="fa-solid fa-check"></i>
        <i v-if="message.status==2" class="fa-solid fa-check-double"></i>
        <i v-if="message.status==3" class="fa-solid fa-check-double" style="color:#1E90FF"></i>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';


export default {
  name: 'Message',
  props: {
    message: Object,
    previous_user_id: Number
  },

  computed: {
    ...mapGetters(['user']),
  },

  methods: {
    downloadDocument() {
      // const linkSource = `data:${this.message.media.mime_type};base64,${this.message.media.content}`;
      const downloadLink = document.createElement('a');
      // const fileName = this.message.media.filename;
      const fileName = 'file';

      // Convertir la base64 a Blob y crear una URL de objeto
      const binary = atob(this.message.media.content);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      const blob = new Blob([new Uint8Array(array)], { type: this.message.media.mime_type });
      const blobUrl = URL.createObjectURL(blob);

      downloadLink.href = blobUrl;
      downloadLink.download = fileName;
      downloadLink.click();
      URL.revokeObjectURL(blobUrl); // Liberar el objeto URL después de usarlo
    },
    getFileTypeDescription(mimeType) {
      const mimeTypesMap = {
        'application/zip': 'Archivo ZIP',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Documento Word',
        'application/msword': 'Documento Word',
        'application/vnd.ms-excel': 'Documento Excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Documento Excel',
        'application/pdf': 'Documento PDF',
      };
      return mimeTypesMap[mimeType] || `Documento ${mimeType.split('/')[1]}`;
    }
  }
};
</script>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
}

.location-message {
  color: red;
}

.from-user {
  align-items: flex-end;
}

.message-user {
  font-weight: bold;
  margin-bottom: 5px;
  color: #888;
}

.message-user-self {
  color: #FFEB3B;
}

.message-user-mate {
  color: #48C9B0;
}

.message-mate .message-user {
  color: #48C9B0;
}

.message-bubble {
  max-width: 70%;
  padding: 10px;
  border-radius: 15px;
  background-color: #2a2a2a;
  color: #ddd;
  word-wrap: break-word;
  min-width: 20%;
  position: relative; /* Asegúrate de que message-bubble tiene posición relativa */
}

.from-user .message-bubble {
  color: black;
}

.message-self {
  background-color: #FFEB3B;
}

.from-user .message-mate {
  background-color: #48C9B0;
}

.message-bubble::after {
  left: -20px;
  border-right-color: #2a2a2a;
  border-left: 0;
  margin-top: -10px;
  min-width: 20%;
}

.message-text {
  margin: 0;
  text-align: left;
  white-space: pre-line;
}

.message-time {
  font-size: 0.8em;
  color: #888;
  text-align: left;
  margin-bottom: 0.2em;
}

.from-user .message-time {
  color: black;
}

.media-video-image {
  height: 25vh;
  max-width: 40ch;
  min-width: 30ch;
}

.media-audio {
  max-width: 40ch;
}

.document-container {
  position: relative;
  width: 100%;
}

.media-document {
  height: 25vh;
  width: 100%;
  border: none;
}

.download-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  color: black;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.26);
  width: 18%;
  height: 18%;
  min-height: 50px;
}

.download-button:hover {
  background-color: #ffd90086 !important;
  color: black !important;
}

.document-container:hover .download-button {
  opacity: 1;
  backdrop-filter: blur(50px); /* Borroso el fondo */
}

.chat-status {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 1em;
  color: #888;
}

.chat-status {
  color: #666666;
}

</style>
