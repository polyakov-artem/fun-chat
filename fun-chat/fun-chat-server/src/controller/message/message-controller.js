const DefaultController = require('../default-controller');
const MessageFromUserHandler = require('./handlers/message-from-user-handler');
const MessageSendHandler = require('./handlers/message-send-handler');
const MessageDeleteHandler = require('./handlers/message-delete-handler');
const MessageEditHandler = require('./handlers/message-edit-handler');
const MessageReadedHandler = require('./handlers/message-readed-handler');

/**
 * @exports
 * @typedef {{
 * messages: string[];
 * }} MessageHistoryPayload
 */

/**
 * @exports
 * @typedef {{
 * id: string;
 * from: User;
 * to: User;
 * text: string,
 * }} MessageTextPayload
 */

module.exports = class MessageController extends DefaultController {
  /**
   * @param {string} currentUserLogin
   */
  constructor(currentUser = null) {
    super();

    let loginCurrentUser = null;
    if (currentUser) {
      loginCurrentUser = currentUser.login;
    }
    this.handler = new MessageSendHandler(loginCurrentUser);
    this.handler
      .setNextHandler(new MessageDeleteHandler(loginCurrentUser))
      .setNextHandler(new MessageEditHandler(loginCurrentUser))
      .setNextHandler(new MessageFromUserHandler(loginCurrentUser))
      .setNextHandler(new MessageReadedHandler(loginCurrentUser));
  }
};
