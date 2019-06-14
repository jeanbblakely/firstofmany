import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User('user', 'password', 'user@example.com', 'First Last', '7/7/89', 'male')).toBeTruthy();
  });
});
