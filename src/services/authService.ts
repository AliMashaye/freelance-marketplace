import http from "./httpService";

interface TGetOtp {
  phoneNumber: string;
}

interface TCheckOtp {
  phoneNumber: string;
  otp: string;
}

interface TCompleteProfile {
  name: string;
  email: string;
  role: string;
}

export function getOtp(data: TGetOtp) {
  return http.post("/user/get-otp", data).then(({ data }) => data.data);
}

export function checkOtp(data: TCheckOtp) {
  return http.post("/user/check-otp", data).then(({ data }) => data.data);
}

export function completeProfile(data: TCompleteProfile) {
  return http.post("/user/complete-profile", data).then(({ data }) => data.data);
}