// types/index.js
/* TODO -> Use this Types accross the App once Storybook generates correctly the
*  documentation when importing propTypes
*/
import { shape, bool, oneOf, instanceOf, number, string, object } from 'prop-types';
import { messagesTypes, messagesStatus, personTypes } from './constants';

const FileDataType = shape({
  uri: string,
  status: {
    click: bool,
    loading: number,
  },
  width: number,
  height: number,
  latitude: string,
  longitude: string,
});

const PersonType = shape({
  id: number,
  name: string,
  internal_name: string,
  active: bool,
  email: string,
  avatar: string,
  role: string,
  status_name: string,
  availability_status_name: string,
  type: oneOf(Object.values(personTypes)),
});

const MessageType = shape({
  /**
   * Id: Message unique identifier
   */
  id: number,
  /**
   * Position: What side the message is displayed inside the chatbox
   */
  position: oneOf(['left', 'right']),
  /**
   * Type of Message: Type of the message. Values are defined as constants.
   * The current supported types are: SYSTEM, TEXT, TYPING, TIME, ACTIONABLE, FILE, PHOTO.
   */
  type: oneOf(Object.values(messagesTypes)),
  /**
  * forwarded: bool that indicates if message was forwareded. If this is false (default) onForwardClick
  * handler has no effect at all
  */
  forwarded: bool,
  theme: string,
  view: string,
  /**
   * Title: Message title. Is used to display as a first line. It is also possible to make it clickable
   */
  title: string,
  /**
   * Text: Actual message content text.
   */
  text: string,
  /**
   * data: Object with extra data used to display information about the message
   */
  data: object,
  /**
   * status: Message status. Values are defined as constants.
   * Current supported values are: WAITING, SENT, RECEIVED, READ
   */
  status: oneOf(Object.values(messagesStatus)),
  /**
   * date: Message creation date.
   */
  date: instanceOf(Date),
  /**
   * dateString: Formated date string to show. This is the default to use.
   * If this is not provided by default to show the time moment(props.date).fromNow() is used.
   */
  dateString: string,
  /**
   * person: Object representing the person that created or submited this message.
   */
  person: shape(PersonType),
});

export {
  MessageType,
  PersonType,
  FileDataType,
};
