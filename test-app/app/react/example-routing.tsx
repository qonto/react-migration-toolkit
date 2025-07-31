import { Link } from "@qonto/react-migration-toolkit/react/components";
export function ExampleRouting() {
  return (
    <div>
      <Link data-test-about-link to="/about">
        Visit About page
      </Link>

      <Link data-test-about-link-replace to="/about" replace>
        Visit About page replacing
      </Link>
    </div>
  );
}
