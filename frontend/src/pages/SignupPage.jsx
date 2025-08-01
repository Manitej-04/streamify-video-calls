import React, { useState } from 'react';
import { ShipWheelIcon } from "lucide-react";
import { Link } from 'react-router';

import useSignUp from '../hooks/useSignUp';

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
 
  // const queryClient = useQueryClient();

  // const {mutate: signupMutation, isPending, error} = useMutation({
  //   mutationFn: signup,
  //   onSuccess: ()=> queryClient.invalidateQueries({ queryKey: ["authUser"]}),
  // });

  const {isPending, error, signupMutation} = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };
  
  return <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
    <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
      {/* SIGNUP FORM - LEFT SIDE */}
      <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
        {/*LOGO*/}
        <div className='mb-4 flex items-center justify-start gap-2'>
          <ShipWheelIcon className="size-9 text-primary" />
          <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
            Streamify
          </span>
        </div>
        
        {/*Error Message If Any*/}
        { error && (
          <div className='alert alert-error mb-4'>
            <span>{ error.response.data.message }</span>
          </div>
        )}

        <div className='w-full'>
          <form onSubmit={handleSignup}>
            <div className='space-y-4'>
              <div>
                <h2 className='text-xl font-semibold'> Create an Account </h2>
                <p>
                  Join Streamify and start your language learning adventure
                </p>
              </div>

              <div className='space-y-3'>
                {/* Full Name */}
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'> Full Name </span>
                  </label>
                  <input type="text" 
                    placeholder='John Doe' 
                    className='input input-bordered w-full' 
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                    required 
                  />
                </div>
                {/* Email */}
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'> Email </span>
                  </label>
                  <input type="email" 
                    placeholder='johndoe@gmail.com' 
                    className='input input-bordered w-full' 
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    required 
                  />
                </div>
                {/* Password */}
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'> Password </span>
                  </label>
                  <input type="password" 
                    placeholder='******' 
                    className='input input-bordered w-full' 
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    required 
                  />
                  <p className='text-xs opacity-70 mt-1'>
                    Password must be atleast 6 characters
                  </p>
                </div>
                <div className='form-control'>
                  <label className='label cursor-pointer justify-start gap-2'>
                    <input type="checkbox" className='checkbox checked-sm' required />
                    <span className='text-xs leading-tight'>
                      I agree to the {" "}
                      <span className='text-primary hover-underline'>terms of services</span> and{" "}
                      <span className='text-primary hover-underline'>privacy policy</span>
                    </span>
                  </label>
                </div>                
              </div>

              <button className='btn btn-primary w-full' type='submit'>
                {isPending ? (
                  <>
                  <span className='loading loading-spinner loading-xs'></span>
                  Loading...
                  </>
                ) : ("Create Account")}
              </button>

              <div className='text-center mt-4'>
                <p className='text-sm'>
                  Already have an Account?{" "}
                  <Link to="/login" className='text-primary hover:underline'>
                    Sign in
                  </Link>
                </p>
              </div>

            </div>
          </form>
        </div>
      </div>

      {/* SIGNUP FORM - LEFT SIDE */}
      <div className='hidden lg:flex w-full lg:w-1/2 bg/primary/10 items-center justify-center'>
        <div className='max-w-md p-8'>
          {/* Illustration */}
          <div className='relative aspect-square max-w-sm mx-auto'>
            <img src="/i.png" alt="Language connection illustration" className='w-full h-full'/>
          </div>
          
          <div className='text-center space-y-3 mt-6'>
            <h2 className='text-xl font-semibold'> Connect with language partners worldwide</h2>
            <p className='opacity-70'>
              Practice conversation, make friends and improve your language skills together
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default SignupPage;
