const expect = require('expect');
let {Users} = require('./users.js')

describe('Users',()=>{
  let users;
  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Thomas',
      room: 'Cat lovers'
    },
    {
      id: 2,
      name: 'Amanda',
      room: 'Dog lovers'
    },
    {
      id: 3,
      name: 'Lauren',
      room: 'Cat lovers'
    }]
  });

  it('should add new user',()=>{
    let users = new Users();
    let user = {
      id: '123',
      name: 'Thomas',
      room: 'Cat lovers'
    };

    let resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user',()=>{
    let userId = 1;
    let user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);

  });

  it('should not remove a user',()=>{
    let userId = 99;
    let user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user',()=>{
    let res = users.getUser(1);
    expect(res.id).toBe(1);
  });

  it('should not find user',()=>{
    let res = users.getUser(1463464);
    expect(res).toNotExist();
  });

  it('should return names for cat lovers',()=>{
    let userList = users.getUserList('Cat lovers');

    expect(userList).toEqual(['Thomas','Lauren']);
  });

  it('should return names for dog lovers',()=>{
    let userList = users.getUserList('Dog lovers');

    expect(userList).toEqual(['Amanda']);
  });
});
