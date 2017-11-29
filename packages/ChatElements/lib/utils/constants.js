module.exports = Object.freeze({
  messagesTypes: {
    SYSTEM: 'System',
    TEXT: 'Text',
    TYPING: 'Typing',
    TIME: 'Time',
    ACTIONABLE: 'Actionable',
    FILE: 'File',
    PHOTO: 'Photo',
  },
  messagesStatus: {
    WAITING: 'waiting',
    SENT: 'sent',
    RECEIVED: 'received',
    READ: 'read',
  },
  personTypes: {
    AGENT: 'Agent',
    BOT: 'Bot',
    CLIENT: 'Client',
  },
});
