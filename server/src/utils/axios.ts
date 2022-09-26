import axios from 'axios';

export function getPhoneCheck(phonePrefix: string, phone: string, code: string) {
  return axios.get('http://api.twsms.com/json/sms_send.php', {params: {
    username: 'admin888',
    password: 'dls24068812',
    mobile: `${phonePrefix}${phone}`,
    message: `好幣多平台簡訊驗證碼: ${code}。請勿代收簡訊以防詐騙。`,
  }});
}
