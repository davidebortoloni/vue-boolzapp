Vue.config.devtools = true;

const app = new Vue({
  el: "#app",
  data: {
    user: {
      name: "Davide Bortoloni",
      avatar: "_io",
    },
    contacts: [
      {
        name: "Michele",
        avatar: "_1",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Hai portato a spasso il cane?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Ricordati di dargli da mangiare",
            status: "sent",
          },
          {
            date: "10/01/2020 16:15:22",
            message: "Tutto fatto!",
            status: "received",
          },
        ],
      },
      {
        name: "Fabio",
        avatar: "_2",
        visible: true,
        messages: [
          {
            date: "20/03/2020 16:30:00",
            message: "Ciao come stai?",
            status: "sent",
          },
          {
            date: "20/03/2020 16:30:55",
            message: "Bene grazie! Stasera ci vediamo?",
            status: "received",
          },
          {
            date: "20/03/2020 16:35:00",
            message: "Mi piacerebbe ma devo andare a fare la spesa.",
            status: "sent",
          },
        ],
      },
      {
        name: "Samuele",
        avatar: "_3",
        visible: true,
        messages: [
          {
            date: "28/03/2020 10:10:40",
            message: "La Marianna va in campagna",
            status: "received",
          },
          {
            date: "28/03/2020 10:20:10",
            message: "Sicuro di non aver sbagliato chat?",
            status: "sent",
          },
          {
            date: "28/03/2020 16:15:22",
            message: "Ah scusa!",
            status: "received",
          },
        ],
      },
      {
        name: "Luisa",
        avatar: "_4",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Lo sai che ha aperto una nuova pizzeria?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Si, ma preferirei andare al cinema",
            status: "received",
          },
        ],
      },
    ],
    currentChat: 0,
    newMessage: "",
    contactSought: "",
  },
  methods: {
    setCurrentChat(index) {
      this.currentChat = index;
      this.newMessage = "";
    },
    addMessage(message, status) {
      this.contacts[this.currentChat].messages.push({
        date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
        message,
        status,
      });
      this.newMessage = "";
      this.goToBottom("messages");
    },
    sendMessage() {
      if (this.newMessage) {
        this.addMessage(this.newMessage, "sent");
        this.autoReply();
      }
    },
    autoReply() {
      setTimeout(() => {
        this.addMessage("Ok", "received");
      }, 1000);
    },
    getLastSeen() {
      const messages = this.contacts[this.currentChat].messages;
      const receivedMessages = messages.filter(
        (message) => message.status === "received"
      );
      const lastMessage = receivedMessages[receivedMessages.length - 1];
      return lastMessage.date;
    },
    goToBottom(id) {
      setTimeout(() => {
        const element = document.getElementById(id);
        element.scrollTop = element.scrollHeight;
      }, 0);
    },
    filterContact() {
      if (this.contactSought) {
        this.contacts.forEach((contact) => {
          if (
            contact.name
              .toLowerCase()
              .includes(this.contactSought.toLowerCase())
          ) {
            contact.visible = true;
          } else {
            contact.visible = false;
          }
        });
      } else {
        this.contacts.forEach((contact) => {
          contact.visible = true;
        });
      }
    },
  },
});
