export default function({ $cookies, redirect, store }) {
  const token = $cookies.get("jwt_token");
  if (token) {
    store.commit("SHOW_ALERT", "Already logged In");
    return redirect("/account");
  }
}
