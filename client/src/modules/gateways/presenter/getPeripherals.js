import { api } from "../../../common/network/Axios";
import { map } from "rxjs/operators";

export default function getPeripherals(filters) {
  return api.get("/peripheral", {
    params: filters
  })
    .pipe(
      map(({ data }) => data?.data)
    )
}