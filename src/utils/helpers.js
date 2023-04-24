import { useQuery } from "react-query";

export const getToken = () => {
  //eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: token } = useQuery("getToken", () =>
    localStorage.getItem("token")
  );
  return token;
};
