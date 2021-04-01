import { useSession } from "next-auth/client";
import { FormBuilder } from "../components/formBuilder";

export default function App() {
  const [session, loading] = useSession();

  return <FormBuilder username="marcus" />;
}
