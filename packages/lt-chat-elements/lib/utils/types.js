// types/index.js
import { shape, boolean, instanceOf, number, string, oneOf, object } from 'prop-types';
import { messagesTypes, messagesStatus, personTypes } from './constants';

// const FileDataType = shape({
//   uri: string,
//   status: {
//     click: boolean,
//     loading: number,
//   },
//   width: number,
//   height: number,
//   latitude: string,
//   longitude: string,
// });

const PersonType = shape({
  id: number,
  name: string,
  internal_name: string,
  active: boolean,
  email: string,
  avatar: string,
  role: string,
  status_name: string,
  availability_status_name: string,
  type: oneOf(Object.values(personTypes)),
});

const MessageType = shape({
  id: number,
  position: oneOf(['left', 'right']),
  forwarded: boolean,
  type: oneOf(Object.values(messagesTypes)),
  theme: string,
  view: string,
  title: string,
  text: string,
  data: object,
  status: oneOf(Object.values(messagesStatus)),
  date: instanceOf(Date),
  dateString: string,
  person: shape(PersonType),
});

export { MessageType, PersonType };
