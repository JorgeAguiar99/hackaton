import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Usuarios() {
  const cookie = cookies();
  const ra = cookie.get("ra");
  
  if (!ra?.value) {
    redirect("/login/status=1");
  }

  redirect("/autores/listagem");
}
