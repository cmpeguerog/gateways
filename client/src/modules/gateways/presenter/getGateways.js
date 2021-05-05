import { api } from "../../../common/network/Axios";
import { map } from "rxjs/operators";

export default function getGateways(filters) {
  return api.get("/gateway", {
    params: filters
  })
    .pipe(
      map(({ data }) => data?.data)
    )
}