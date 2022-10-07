import axios from 'axios';

// IP 定位
export async function IP(
  key: string,
  clientIp: string,
): Promise<null | object> {
  // key = '6NABZ-IGQE2-WPTUC-CFO4A-PRVFJ-UEFOA'
  const url =
    'https://apis.map.qq.com/ws/location/v1/ip?key=' +
    `${key}` +
    '&ip=' +
    `${clientIp}`;
  const responseHttp = await axios.get(url);
  const res = responseHttp.data;
  if (res.status !== 0) {
    return null;
  }
  return res.result.ad_info;
}
