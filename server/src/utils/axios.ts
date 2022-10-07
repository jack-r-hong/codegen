import axios from 'axios';
import md5 from 'md5';

export function getPhoneCheck(phonePrefix: string, phone: string, code: string) {
  return axios.get('http://api.twsms.com/json/sms_send.php', {params: {
    username: 'admin888',
    password: 'dls24068812',
    mobile: `${phonePrefix}${phone}`,
    message: `好幣多平台簡訊驗證碼: ${code}。請勿代收簡訊以防詐騙。`,
  }});
}

const makeHash = async (data: any, apiKey: string) => {
  const newData: any = {};

  Object.keys(data).sort()
      .forEach(function(v) {
        return newData[v] = data[v];
      });

  const checkString = JSON.stringify(newData);

  const hash = await md5(`${checkString}${apiKey}`);
  return hash;
};

export async function getGSPayDeposit(param : {
  amount : string,
  clinetAccount : string,
  dueTime : string,
  memberOrderNo : string,
  memo : string,
  productName : string,
}) {
  const apiKey = '48184aea02090d7305549daee6465471';
  const data = {
    Amount: param.amount,
    ClinetAccount: param.clinetAccount,
    Account: 'cbp001',
    DueTime: param.clinetAccount,
    Gateway: 'bank_virtual',
    MemberOrderNo: param.memberOrderNo,
    Memo: param.memo,
    ProductName: param.productName,
  };

  const Sign = await makeHash(data, apiKey);
  const hashData = Object.assign(data, {Sign});
  return await axios({
    method: 'post',
    url: `https://test.gs-pay.net/api/pay/deposit`,
    data: hashData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

