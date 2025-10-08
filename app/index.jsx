import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../src/context/AuthContext";

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace("/(auth)/login");
      else router.replace("profile");
    }
  }, [user, loading]);

  return null;
}
