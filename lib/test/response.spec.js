const response = require('../response');

const res = {
  setHeader: jest.fn(),
  write: jest.fn(),
  end: jest.fn(),
};

function assertSend() {
  expect(res.setHeader).toBeCalled();
  expect(res.write).toBeCalled();
  expect(res.end).toBeCalled();
}

describe('Response', () => {
  it('should return a response object', () => {
    expect(response(res)).toEqual(res);
  });

  describe('send', () => {
    it('should plain text data ', () => {
      const data = 'hello test!';
      response(res).send(data);
      assertSend();
    });

    it('should plain text data ', () => {
      const data = 'hello test!';
      response(res).send(data);
      assertSend();
    });
  });
});
