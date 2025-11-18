import { Init } from "#/components/layout/init";
import { Nav } from "#/components/layout/nav";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Init />
      <Nav />
      {children}
    </>
  );
}
