let expect = require('expect');
let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
  it('should generate the correct message object',()=>{
    let from = 'Amanda';
    let text = 'message';
    let message = generateMessage(from, text);

    expect(message).toInclude({from,text});
    expect(message.createdAt).toBeA('number');
  })
});

describe('generateLocationMessage',()=>{
  it('should generate correct location object',()=>{
    let from = 'Amanda';
    let lat = 1;
    let long = 1;
    let url = 'https://www.google.com/maps?q=1,1';
    let message = generateLocationMessage(from,lat,long);

    expect(message).toInclude({from, url});
    expect(message.createdAt).toBeA('number');
  });
});
