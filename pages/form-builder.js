import { Provider } from "react-redux";
import { useSession } from "next-auth/client";
import { FormBuilder } from "../components/formBuilder";
import store from "../store";

export default function App() {
  const [session, loading] = useSession();

  return (
    <Provider store={store}>
      <FormBuilder username="marcus" />
    </Provider>
  );
}
