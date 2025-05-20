import { Suspense } from "react";
import ResetPassword from "@/components/resetPassword/resetPassword";

// This component passed as a fallback to the Suspense boundary
// will be rendered in place of the search bar in the initial HTML.
// When the value is available during React hydration the fallback
// will be replaced with the `<SearchBar>` component.
function FallbackComp() {
  return <></>;
}

export default function Page() {
  return (
    <>
      <Suspense fallback={<FallbackComp />}>
        <ResetPassword />
      </Suspense>
    </>
  );
}
