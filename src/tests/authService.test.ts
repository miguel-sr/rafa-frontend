import authService  from '../features/auth/authService';
//Sample basic unit tests for register and login
jest.mock('axios');

  
describe('AuthService', () => {
  test('login should return user data on successful login', async () => {
    const expectedUserData = {
      _id: '65a420e714d01e5c107cc2e3',
      firstName: 'User666',
      lastName: 'One',
      email: 'user6@examplee.com',
      gender: 'M',
      permissions: ['user:profile:email:edit', 'user:profile:firstname:view'],
    };

    require('axios').post.mockResolvedValue({ data: expectedUserData });

    const result = await authService.login({ email: 'user6@examplee.com', password: 'password5' });
    expect(result).toEqual(expectedUserData);
  });



  test('login should return an error when password is wrong', async () => {
    const errorResponse = {
      message: 'Invalid credentials',
    };
  
    require('axios').post.mockRejectedValue({ response: { data: errorResponse, status: 401 } });
  
    try {
      await authService.login({ email: 'user6@examplee.com', password: 'wrongpassword' });
    } catch (error:any) {
      expect(error.response.data).toEqual(errorResponse);
      expect(error.response.status).toBe(401);
    }
  });
  

  test('register should return user id on successful registration', async () => {
    const expectedUserData = {
        _id: 'user123',
        firstName: 'User6662',
        lastName: 'One',
        email: 'user66@examplee.com',
        gender: 'M',
        permissions: ['user:profile:email:edit', 'user:profile:firstname:view'],
        password: "try"
    };
  
    require('axios').post.mockResolvedValue({ data: expectedUserData });
  
    const result = await authService.register({
        firstName: 'User6dfh662',
        lastName: 'Ofne',
        email: 'usergfhd66@examplee.com',
        gender: 'M',
        permissions: ['user:profile:firstname:view'],
        password: "try"
    });
    
    expect(result._id).toBeTruthy();
  });
  

//   test('updateUser should return updated user data on successful update', async () => {
//     const expectedUpdatedUserData = {
//         _id: '65a3f4122b58439c9823eea7',
//         firstName: 'User5',
//         lastName: 'One',
//         email: 'user5@example.com',
//         gender: 'M',
//         permissions: ['user:profile:firstname:view'],
//     };

//     require('axios').put.mockResolvedValue({ data: expectedUpdatedUserData });

//     const result = await authService.updateUser({ firstName: 'UpdateUser5' });
//     expect(result).toEqual(expectedUpdatedUserData);
//   });
});
