import { api } from "../../../common/network/Axios";
import { map } from "rxjs/operators";

export default function addGateway(params) {
  return api.post("/gateway", params)
    .pipe(
      map(({ data }) => data?.data)
    )
}