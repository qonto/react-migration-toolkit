import { Link } from "react-migration-toolkit/react/components";
import { useRouter } from "react-migration-toolkit/react/hooks";

export function ExampleRouting() {
  const router = useRouter();

  return (
    <div>
      <Link data-test-about-link href="/about">
        Visit About page
      </Link>

      <button
        data-test-about-button-push
        onClick={() => {
          router.push("/about");
        }}
      >
        Push to About page
      </button>

      <button
        data-test-about-button-push-query
        onClick={() => {
          router.push("/about?foo=bar&baz=qux");
        }}
      >
        Push to About page with query params
      </button>

      <button
        data-test-about-button-replace
        onClick={() => {
          router.replace("/about");
        }}
      >
        Replace to About page
      </button>

      <button
        data-test-about-button-replace-query
        onClick={() => {
          router.replace("/about?foo=bar&baz=qux");
        }}
      >
        Replace to About page with query params
      </button>
    </div>
  );
}
