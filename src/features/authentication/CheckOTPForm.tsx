import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { checkOtp } from "../../services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import Loading from "../../ui/Loading";

const RESEND_TIME = 20;

function CheckOTPForm({ phoneNumber, onBack, onResendOtp, otpResponse }) {
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(RESEND_TIME);

  const navigate = useNavigate();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: checkOtp,
  });

  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const { user, message } = await mutateAsync({ phoneNumber, otp });
      toast.success(message);
      

      if(!user.isActive) return navigate("/complete-profile");
      if(user.status !== 2) {
        navigate("/");
        toast("پروفایل شما در انتظار تایید است", {icon:"👏"});
        return;
      }
      if(user.role === "OWNER") return navigate("/owner")
      if(user.role === "FREELANCER") return navigate("/freelancer")

      if (user.isActive) {
        console.log(user);
        console.log(otp);
      } else {
        navigate("/complete-profile");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  return (
    <div>
      <button onClick={onBack}>
        <HiArrowLeft className="w-6 h-6 text-secondary-500" />
      </button>
      {otpResponse && (
        <p className="flex items-center gap-x-2 my-4">
          <span>{otpResponse?.message}</span>
          {time <= 0 && (
            <button onClick={onBack}>
              <CiEdit className="w-6 h-6 text-secondary-900" />
            </button>
          )}
        </p>
      )}
      <div className="mb-4 text-secondary-500">
        {time > 0 ? (
          <p>{time} تا ارسال مجدد کد</p>
        ) : (
          <button onClick={onResendOtp}>ارسال مجد کد تایید</button>
        )}
      </div>
      <form className="space-y-10" onSubmit={checkOtpHandler}>
        <p className="font-bold text-secondary-800">کد تایید را وارد کنید</p>

        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input type="number" {...props} />}
          containerStyle="flex flex-row gap-x-2 justify-center"
          inputStyle={{
            width: "2.5rem",
            padding: "0.5rem 0.2rem",
            border: "1px solid var(--color-primary-400)",
            borderRadius: "0.5rem",
          }}
        />
        <div>
          {isPending ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CheckOTPForm;
