<template>
  <div class="message" :class="{ 'from-user': message.user_id }">
    <p class="message-user" v-if="message.user_id && previous_user_id !== message.user_id">{{ message.user_id ? message.user_name : '' }}</p>
    <div class="message-bubble">
      <div v-if="message.media">
        <div v-if="['IMAGE', 'STICKER', 'VIDEO', 'DOCUMENT'].includes(message.type)" class="document-container">
          <img v-if="['IMAGE', 'STICKER'].includes(message.type)" class="media-video-image" :src="`data:${message.media.mime_type};base64,${message.media.content}`">
          <video v-if="message.type === 'VIDEO'" class="media-video-image" :src="`data:${message.media.mime_type};base64,${message.media.content}`" controls></video>
          <iframe v-if="message.type === 'DOCUMENT'" class="media-document" :src="`data:${message.media.mime_type};base64,${message.media.content}`"></iframe>
          <button @click="downloadDocument" class="download-button"><i class="fa-regular fa-circle-down"></i></button> 
        </div>
        <audio v-if="message.type === 'AUDIO'" class="media-audio" :src="`data:${message.media.mime_type};base64,${message.media.content}`" controls></audio>
      </div>
      <p class="message-text">{{ message.message }}</p>
      <p class="message-time">{{ message.sent_at }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: Object,
    previous_user_id: Number
  },
  methods: {
    downloadDocument() {
      // const linkSource = `data:${this.message.media.mime_type};base64,${this.message.media.content}`;
      const downloadLink = document.createElement('a');
      const fileName = this.message.media.filename;

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

.from-user {
  align-items: flex-end;
}

.message-user {
  font-weight: bold;
  margin-bottom: 5px;
  color: #888;
}

.message-bubble {
  max-width: 70%;
  padding: 10px;
  border-radius: 15px;
  background-color: #2a2a2a;
  color: #ddd;
  word-wrap: break-word;
  min-width: 20%;
}

.from-user .message-bubble {
  background-color: #FFD700;
  color: black;
}

.from-user .message-bubble::after {
  right: -20px;
  border-left-color: #4a4a4a;
  border-right: 0;
  margin-top: -10px;
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
}

.message-time {
  font-size: 0.8em;
  color: #888;
  text-align: left;
  margin-bottom: 0.2em;
}

.from-user .message-time {
  color: black
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
}

.download-button:hover {
  background-color: #ffd90086 !important;
  color: black !important;
 
}

.document-container:hover .download-button {
  opacity: 1;
  backdrop-filter: blur(50px); /* Borroso el fondo */
}
</style>
