import { RootState } from 'app/rootReducer';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, reset } from '../features/auth/authSlice';
import { AppDispatch } from 'app/store';
import { UserUpdateRequest } from 'features/auth/interface';
import Spinner from 'components/Spinner';
import {toast} from "react-toastify"


const Home: React.FC = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>()

  const [newFirstName, setNewFirstName] = useState<string>(user?.firstName || '');
  const [newEmail, setNewEmail] = useState<string>(user?.email || '');
  useEffect(() => {
    return () => {
      //Clear local state when user is changed
      dispatch(reset());
    };
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUserData : UserUpdateRequest = {_id : user?._id}
    if (user?.permissions?.includes('user:profile:firstname:edit')) {
      updatedUserData.firstName = newFirstName
    }
  
    if (user?.permissions?.includes('user:profile:email:edit')) {
      updatedUserData.email = newEmail
  };

  dispatch(updateUser(updatedUserData));
  toast.success("User updated!")

}
if(isLoading){
  return <Spinner />
}
return (
  <div className="form">
    <h1>Welcome to the home page!</h1>

    {user ? (
      <div className="form-group">
        <h2>User data:</h2>
        {user?.permissions?.includes('user:profile:view') && (
          <>
            <p>First Name: {user.firstName}</p>
            <p>Email: {user.email}</p>
          </>
        )}

        {(user?.permissions?.includes('user:profile:firstname:view') && (
          <p>First Name: {user.firstName}</p>
        )) || (user?.permissions?.includes('user:profile:firstname:edit') && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="newFirstName">First Name:</label>
            <input
              className="form-control"
              type="text"
              id="newFirstName"
              value={newFirstName}
              required
              onChange={(e) => setNewFirstName(e.target.value)}
            />
            <button className="btn btn-block" type="submit">Save</button>
          </form>
        ))}

        {(user?.permissions?.includes('user:profile:email:view') && (
          <p>Email: {user.email}</p>
        )) || (user?.permissions?.includes('user:profile:email:edit') && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="newEmail">Email:</label>
            <input
              className="form-control"
              type="text"
              id="newEmail"
              value={newEmail}
              required
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <button className="btn btn-block" type="submit">Save</button>
          </form>
        ))}
      </div>
    ) : (
      <p>Login to see your user data.</p>
    )}
  </div>
);

};

export default Home;
