import { AsideButton, type AsideButtonProps } from './AsideButton';
import { Logo } from './Logo';
import { Nav } from './Nav';

export function Header({ toggleAside }: AsideButtonProps) {
  return (
    <>
      <AsideButton toggleAside={toggleAside} />
      <Logo />
      <Nav />
    </>
  );
}
