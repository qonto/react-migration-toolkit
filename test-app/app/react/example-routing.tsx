import { Link } from "@qonto/react-migration-toolkit/react/components";
import { useNavigate } from "@qonto/react-migration-toolkit/react/hooks";

export function ExampleRouting() {
  const navigate = useNavigate();

  return (
    <div>
      <Link data-test-about-link to="/about">
        Visit About page
      </Link>

      <Link data-test-about-link-replace to="/about" replace>
        Visit About page
      </Link>

      <button
        data-test-about-button-push
        onClick={() => {
          navigate("/about");
        }}
      >
        Push to About page
      </button>

      <button
        data-test-about-button-push-query
        onClick={() => {
          navigate("/about?foo=bar&baz=qux");
        }}
      >
        Push to About page with query params
      </button>

      <button
        data-test-about-button-replace
        onClick={() => {
          navigate("/about", { replace: true });
        }}
      >
        Replace to About page
      </button>

      <button
        data-test-about-button-replace-query
        onClick={() => {
          navigate("/about?foo=bar&baz=qux", { replace: true });
        }}
      >
        Replace to About page with query params
      </button>
    </div>
  );
}
