import { useSession } from "next-auth/client";
import { useDispatch } from "react-redux";
import { FormBuilder } from "../components/formBuilder";
import {
  fetchFormData,
  fetchFormElementData,
  fetchUserData,
} from "../features/userData/userDataSlice";

export default function App() {
  const [session, loading] = useSession();

  const dispatch = useDispatch();
  dispatch(fetchUserData("hmcilwrick0"));
  dispatch(
    fetchFormData([
      "608055d8cac45a2092177173",
      "608055d8cac45a209217717f",
      "608055d8cac45a2092177182",
    ])
  );
  dispatch(
    fetchFormElementData([
      "608055d7cac45a2092177165",
      "608055d7cac45a2092177167",
      "608055d7cac45a2092177169",
      "608055d7cac45a2092177166",
      "608055d7cac45a2092177168",
      "608055d7cac45a209217716a",
    ])
  );

  return <FormBuilder username="marcus" />;
}
