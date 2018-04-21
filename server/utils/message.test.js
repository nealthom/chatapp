let expect = require('expect');
let {generateMessage} = require('./message');

describe('generateMessage',()=>{
  it('should generate the correct message object',()=>{
    let from = 'Amanda';
    let text = 'message';
    let message = generateMessage(from, text);

    expect(message).toInclude({from,text});
    expect(message.createdAt).toBeA('number');
  })
});
