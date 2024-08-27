import { FC } from 'react';
import Button from '../../defaults/Button'
import Input from '../../defaults/Input'

export interface PasswordResetPros {
    setActiveScreen: React.Dispatch<React.SetStateAction<string>>;
  }  

const ForgotPassword: FC<PasswordResetPros> = ({ setActiveScreen }) => {
  return (
    <div>
      <div className="px-4 pt-10">
        <div className="h-2 w-[100%] flex space-x-3">
          <div className="w-[50%] bg-[#7d6c3a] h-[100%] rounded-md"></div>
          <div className="w-[50%] bg-[#F4E8B7] h-[100%] rounded-md"></div>
        </div>
        <h2 className="text-[24px] font-semibold mt-6">Forgot Password</h2>
        <p className="text-[15px] mt-2">Enter your phone number</p>

        <div className="mt-4">
            <Input label="Phone number" type="number" />
        </div>

      </div>
        <div className="fixed px-4 bottom-6 w-[100%] space-y-6">
        <Button
          filled={true}
          onClick={() => setActiveScreen("otp")}
          content="Continue"
          className="text-[18px]"
        />
        <Button
          filled={false}
          content="Or make use of your email"
          className="text-[18px]"
        />
        </div>
    </div>
  )
}

export default ForgotPassword
