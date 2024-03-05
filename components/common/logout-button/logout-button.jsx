"use client";

import { swalQuestion } from "@/utils/functions/swal/swal-question";
import { IoIosLogOut } from "react-icons/io";
import { logout } from "@/actions/auth/logout";
import { swalToast } from "@/utils/functions/swal/swal-toast";
import styles from "./logout-button.module.scss";

export default function LogoutButton() {
    const handleLogout = () => {
        try {
            swalQuestion("Are you sure you want to logout?").then(
                async (response) => {
                    if (response.isConfirmed) {
                        await logout();
                        swalToast("You have been logged out!", "success");
                    }
                }
            );
        } catch (error) {
            swalToast(
                "There was a problem logging you out! Please try again.",
                "error"
            );
        }
    };

    return (
        <button
            className={styles.button}
            onClick={handleLogout}
            type="button"
            title="Logout">
            <span>
                <IoIosLogOut size={30} />
            </span>
            <span>Logout</span>
        </button>
    );
}
