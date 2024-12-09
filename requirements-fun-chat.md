## Task «Fun Chat»

## Functional Requirements (+250)

#### 1. User Authentication Page (+30)

1. (+5) The login field is checked by a validator. The validator must be different from the password applied in the field. The selection of validation criteria and their display options is at the student's discretion.
2. (+5) The password field is checked by a validator. The validator must be different from the one used in the login field. The selection of validation criteria and their display options is at the student's discretion.
3. (+5) The user is unable to submit an authentication request with data that has not passed validation.
4. (+5) In case of an authentication error (based on the server response), a message indicating the corresponding error sent by the server must be displayed. The message does not have to be a complete copy of the server's response.
5. (+5) User authentication is possible both by clicking the button with the mouse or by pressing the "Enter" key without the need to focus on the button.
6. (+5) Only not authenticated users have access to this page. If the user is authorized and tries to proceed to the Authentication page, they must be redirected to the Main page automatically.

#### 2. Main Page (+5)

1. (+5) Only authenticated users have access to this page. If the user is unauthorized and tries to proceed to the Main page, they must be redirected to the Authentication page automatically.

#### 3. Header (on the main page) (+15)

1. (+5) Displays the current authenticated user's name.
2. (+5) Displays the app's name.
3. (+5) Includes a logout button which when pressed terminates the current session and opens the authentication form (window/page).

#### 4. Footer (on the main page) (+5)

1. (+5) Includes the school's logo and name, the author's name, a link to the author's GitHub, and the year of the app creation.

#### 5. User List (on the main page) (+30)

1. (+10) Displays all registered users and an indicator of each user's online status.
2. (+5) The currently authenticated user is not in the list.
3. (+5) Implements user search by name. The search will be case sensitive or case-insensitive at the student's discretion.
4. (+10) Displays information about the number of unread messages from each user.

#### 6. User Dialogue (on the main page) (+75)

1. (+5) Provides information about the user with whom the dialogue is open, as well as indicating whether that user is online.
2. (+5) Provides a complete message history with the selected user, including messages from both the current user and the user with whom the dialogue is currently open.
3. (+5) Arranges messages chronologically based on the time of sending. The latest message is displayed near the message input and send component.
4. (+5) In the absence of message history, a message in the message history field indicates that this is the beginning of the dialogue.
5. (+5) When sending a message to another user, the message history scrolls to the sent message (making the just-sent message visible to the user).
6. (+5) When receiving a message from another user in an open dialogue, the message history scrolls to the received message (making the just-received message visible to the user).
7. (+5) When opening a dialogue with unread messages, new messages are separated from the read messages by a dividing line, and the user can see the dividing line and at least one unread message. When receiving new unread messages in an open dialogue, the line must always stay within the dialogue area and not hide in the scroll area until the conditions to remove it are met.
8. (+5) The dividing line between read and unread messages in an open dialogue can be removed by each of the following actions: when scrolling the message history area, after clicking the message send button, or clicking inside the message history area.
9. (+5) After meeting the conditions to remove the dividing line, new messages are immediately given a "read" status. This must be implemented for both old dialogues that already have a history and new dialogues that have just been started for the first time.
10. (+5) If no recipient is selected, the message send button and message input field must be inactive (or hidden), and there must be a message in the message history field indicating the need to select a recipient.
11. (+5) Sending a message to a user is possible both by clicking the send button with the mouse or by pressing the "Enter" key without the need to focus on the send button.
12. (+10) The user can delete their own previously sent messages.
13. (+10) The user can edit the text of their own previously sent messages.

#### 7. Message Content (on the main page) (+25)

1. (+15) Messages include the time of sending, sender's username, message delivery status, message text, and indication of whether the message has been edited.
2. (+5) The message "delivered"/"read" status is visible only to the sender of the message.
3. (+5) A user cannot send a message without any content (without text).

#### 8. Message Delivery and Read Status (on the main page) (+20)

1. (+10) The status changes to "delivered" when the message recipient logs into the application or if the message is sent to the user who is online.
2. (+10) The status changes to "read" when the message recipient opens a dialogue with unread messages and performs any of the following actions: scrolls in the message history area, sends a new message, or clicks inside the message history area.

#### 9. About Page (+10)

1. (+5) Contains brief information about the application and its author. The content is at the student's discretion.
2. (+5) Access is granted to both authenticated and unauthorized users.

#### 10. Interface and Visual Design (+15)

1. (+5) The browser tab must display the application icon.
2. (+5) The interface elements with which the user will interact must be responsive and the cursor must change when they are hovered over.
3. (+5) Responsive layout must be implemented for resolutions ranging from 1440 px to 380 px, inclusive.

#### 11. Server Connection (on all pages) (+20)

1. (+10) If a sudden disconnection from the server occurs, a message must be displayed to the user, and an attempt to restore the connection must be made.
2. (+10) Upon reconnecting to the server, the application must perform the current user reauthorization without requiring user intervention.

## Technical Requirements (+160)

1. (+20) The application is divided into logical modules/layers, such as, for example, API interaction, user interface rendering, application state management, etc.
2. (+20) All HTML content is generated using JavaScript. `Body` must be empty. Either `head` or `body` can contain the only `<script> tag` (`body` containing only the `<script> tag` is considered to be empty).
3. (+20) The application is a Single Page Application (SPA) with implemented routing.
4. (+20) Input/output parameters of all methods are explicitly typed, and the `any` type is not used.
5. (+20) ESLint with the Airbnb style guide is used, with the `noInlineConfig: true` rule enabled in the configuration.
6. (+10) Prettier is used to automatically format code, ensuring a consistent and readable code style.
7. (+10) Husky is used to manage Git hooks, automating tasks such as code formatting and linting checks during the commit process.
8. (+10) Webpack or another module bundler is used.
9. (+10) Code is organized into small functions with clear names and purposes, with each function not exceeding 40 lines.
10. (+10) There is no code duplication.
11. (+10) The code does not contain magic numbers or strings.
