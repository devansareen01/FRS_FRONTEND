import React, { useState } from 'react';
import { Toaster, toast } from 'sonner'

const ChangePasswordFaculty = () => {
  const [oldPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') setCurrentPassword(value);
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'confirmNewPassword') setConfirmNewPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('New passwords do not match.');
      return;
    }

    // Send request to backend
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.BASE_URL}/api/faculty/changePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
      }
      toast.success(data.message);
      setSuccessMessage('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      setErrorMessage('Failed to change password. Please try again later.');
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
          {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block mb-2">Current Password</label>
            <input type="password" id="oldPassword" name="oldPassword" value={oldPassword} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400" />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block mb-2">New Password</label>
            <input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400" />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmNewPassword" className="block mb-2">Confirm New Password</label>
            <input type="password" id="confirmNewPassword" name="confirmNewPassword" value={confirmNewPassword} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Change Password</button>
        </form>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
};

export default ChangePasswordFaculty;
