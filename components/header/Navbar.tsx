import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { useEffect, useState } from "preact/hooks";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class={`${
          scrolled ? "bg-black" : "bg-transparent"
        } md:hidden flex flex-row justify-between items-center w-full pl-5`}
      >
        <a
          href="/"
          class="flex-grow inline-flex items-center"
          style={{ minHeight: navbarHeight }}
          aria-label="Store logo"
        >
          <Icon id="NewLogo" width={96} height={12} />
        </a>

        <div class="flex gap-1">
          <Buttons variant="search" />
          <Buttons variant="cart" />
          <Buttons variant="menu" />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6">
        <div class="flex-none w-44">
          <a href="/" aria-label="Store logo" class="block px-4 py-3 w-[160px]">
            <Icon id="Logo" width={126} height={16} />
          </a>
        </div>
        <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
        <div class="flex-none w-44 flex items-center justify-end gap-2">
          <Buttons variant="search" />
          <Searchbar searchbar={searchbar} />
          <a
            class="btn btn-circle btn-sm btn-ghost"
            href="/login"
            aria-label="Log in"
          >
            <Icon id="User" width={20} height={20} strokeWidth={0.4} />
          </a>
          <a
            class="btn btn-circle btn-sm btn-ghost"
            href="/wishlist"
            aria-label="Wishlist"
          >
            <Icon
              id="Heart"
              size={20}
              strokeWidth={2}
              fill="none"
            />
          </a>
          <Buttons variant="cart" />
        </div>
      </div>
    </>
  );
}

export default Navbar;