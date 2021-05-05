import { api } from "../../../common/network/Axios";
import { map } from "rxjs/operators";

export default function removePeripheral(gateway, peripheral) {
  return api.delete(`/gateway/${gateway}`, {
    params: {
      peripheral
    }
  })
    .pipe(
      map(({ data }) => data?.data)
    )
}