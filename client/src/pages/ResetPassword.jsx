import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false)

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or expired token!');
      navigate('/'); 
    }
  }, [token, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/resetPassword`, {
        token,
        newPassword
      });

      if (response.status === 200) {
        toast.success('Password reset successfull!');
        navigate('/login'); 
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative h-[calc(100vh-72px)] items-center flex justify-center '>
        <video
        poster='/img/bg9.jpg'
        src="/img/bg-video.mp4"
        className='absolute h-full w-full object-cover filter'
        autoPlay
        muted
        loop
        playsInline
      />
    <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative bg-transparent border-2 border-white text-white py-4 px-3 xxs:p-8 w-full max-w-md font-manrope mx-5">
        <h2 className="text-xl xxs:text-2xl font-semibold text-center mb-6">Reset Your Password</h2>
        <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <input
              type={passwordShown ? "text" : "password"}
              id="new-password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-white bg-transparent outline-none"
            />

            <input
              type={passwordShown ? "text" : "password"}
              id="confirm-password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-white bg-transparent outline-none"
            />
          </div>

          <div className='items-center flex gap-1'>
                  <input
                    type="checkbox"
                    checked={passwordShown}
                    onChange={()=>setPasswordShown((prev) => !prev)}
                    id="password-checked"
                    className='h-4 w-4 accent-black checked:ring-1 checked:ring-white'
                  />
                  <label htmlFor="password-checked">Show Password</label>
                </div>
          <button
            type="submit"
            className={`bg-[#f7f7f733] border-2 border-white text-white w-full py-2 cursor-pointer font-bold hover:bg-[#f7f7f743] duration-300 transition-all tracking-wider ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
