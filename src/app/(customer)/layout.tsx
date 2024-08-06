import { Nav, NavLink } from "@/components/Nav";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return  <>
    <Nav>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/products">Products</NavLink>
      <NavLink href="/shipping">Shipping</NavLink>
      <NavLink href="/orders">Contact</NavLink>
    </Nav>
    <div className="container my-4">{children}</div>
  </>
}