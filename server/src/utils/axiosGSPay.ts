import axios from 'axios';
import md5 from 'md5';
const gsPayAccount = 'cbp001';
const apiKey = '48184aea02090d7305549daee6465471';
const prefixUrl = 'https://test.gs-pay.net';

export async function getGSPayDeposit(param : {
  amount : string,
  clinetAccount : string,
  dueTime : string,
  memberOrderNo : string,
  memo : string,
  productName : string,
}) {
  const data = {
    Account: gsPayAccount,
    Amount: param.amount,
    ClinetAccount: param.clinetAccount,
    DueTime: param.dueTime,
    Gateway: 'bank_virtual',
    MemberOrderNo: param.memberOrderNo,
    Memo: param.memo,
    ProductName: param.productName,
  };

  const Sign = await makeHash(data, apiKey);
  const hashData = Object.assign(data, {Sign});
  return await axios({
    method: 'post',
    url: `${prefixUrl}/api/pay/deposit`,
    data: hashData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function getGSPayQuery(param : {
    memberOrderNo : string,
  }) {
  const data = {
    Account: gsPayAccount,
    MemberOrderNo: param.memberOrderNo,
  };

  const Sign = await makeHash(data, apiKey);
  const hashData = Object.assign(data, {Sign});
  return await axios({
    method: 'post',
    url: `${prefixUrl}/api/pay/query`,
    data: hashData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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
