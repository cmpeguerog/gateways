import { api } from "../../../common/network/Axios";
import { map } from "rxjs/operators";

export default function addPeripheral(gateway, peripheral) {
  return api.put(`/gateway/${gateway}`, {
    peripheral
  })
    .pipe(
      map(({ data }) => data?.data)
    )
}