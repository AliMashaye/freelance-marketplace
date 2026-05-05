import http from "./httpService";

interface TGetOtp {
  phoneNumber: string;
}

interface TCheckOtp {
  phoneNumber: string;
  otp: string;
}

export function getOtp(data: TGetOtp) {
  return http.post("/user/get-otp", data).then(({ data }) => data.data);
}

export function checkOtp(data: TCheckOtp) {
  return http.post("/user/check-otp", data).then(({ data }) => data.data);
}
