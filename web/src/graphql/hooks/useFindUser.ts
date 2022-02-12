import { useFindUserQuery } from "../../generated/graphql";

export function useFindUser(userName: string) {
  const response = useFindUserQuery({ variables: { userName } });
  const user = response.data?.user;

  return user;
}
