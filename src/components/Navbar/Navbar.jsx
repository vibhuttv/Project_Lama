import React from "react";
import styles from "./nav.module.css";
import { MdOutlineSettings, MdOutlineNotifications } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <Image
        src="/logoP.svg"
        alt="Ques.AI logo"
        className={styles.logo}
        height={54}
        width={268}
        onClick={() => router.push("/")}
      />
      <div className={styles.icons}>
        <a>
          <MdOutlineSettings
            size={54}
            onClick={() => router.push("/user")}
            className={styles.setting}
          />
        </a>
        <a>
          <MdOutlineNotifications size={54} />
        </a>
      </div>
    </div>
  );
}

export default Navbar;
