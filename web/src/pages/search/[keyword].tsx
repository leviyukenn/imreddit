import { useRouter } from "next/router";
import React from "react";

interface SearchResultPageProps {}

const SearchResultPage = ({}: SearchResultPageProps) => {
  const router = useRouter();
  const keyword = router.query.router as string;
  return <div>{keyword}</div>;
};
export default SearchResultPage;
