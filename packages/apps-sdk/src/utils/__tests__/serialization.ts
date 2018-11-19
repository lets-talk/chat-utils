import {
  serialize,
  deserialize
} from '../serialization';

const MOCK_BASE_64_SET_DISPLAY_STATE_CALL = 'eyJtZXRob2QiOiJzZXREaXNwbGF5U3RhdGUiLCJhcmdzIjpbIm1pbmltaXplZCJdfQ==';
const MOCK_BASE_64_ADD_CHAT_METADATA_CALL = 'eyJtZXRob2QiOiJhZGRDaGF0TWV0YURhdGEiLCJhcmdzIjpbeyJ0aXBvQ2xpZW50ZSI6InBhZ28iLCJuaXZlbCI6IlZJUCJ9LHRydWVdfQ==';

describe('Testing the serialize function', () => {
  it('Serialize with 1 parameter string', () => {
    const mockFunctionCall = {
      method: 'setDisplayState',
      args: ['minimized'],
    };
    const serialized = serialize(mockFunctionCall);
  
    expect(serialized).toBe(MOCK_BASE_64_SET_DISPLAY_STATE_CALL);
  });

  it('Serialize with 2 parameters: One object other boolean', () => {
    const mockFunctionCall = {
      method: 'addChatMetaData',
      args: [
        {
          tipoCliente: 'pago',
          nivel: 'VIP'
        },
        true
      ],
    };

    const serialized = serialize(mockFunctionCall);
  
    expect(serialized).toBe(MOCK_BASE_64_ADD_CHAT_METADATA_CALL);
  });
});

describe('Testing the deserialize function', () => {
  it('Correctly deserializes 2 parameters: 1 object other boolean', () => {
    const deserialzed = deserialize(MOCK_BASE_64_ADD_CHAT_METADATA_CALL);
  
    expect(deserialzed).toMatchObject({
      method: 'addChatMetaData',
      args: [
        {
          tipoCliente: 'pago',
          nivel: 'VIP'
        },
        true,
      ]
    });
  });
});
