import { signIn, useSession } from "next-auth/client";
import { useDispatch, useSelector } from "react-redux";
import { grabFormElementIDsFromForm } from "../lib/apollo/resolvers/shared";
import { FormBuilder } from "../components/formBuilder";
import {
  fetchAllData,
  formElementDataSelector,
  formDataSelector,
  userDataSelector,
} from "../features/userData/userDataSlice";

export default function App() {
  const [session, loading] = useSession();

  if (session) {
    const dispatch = useDispatch();
    dispatch(fetchAllData(session.user.name));
    return <FormBuilder username="marcus" />;
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign In</button>
    </>
  );
}
